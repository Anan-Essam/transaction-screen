import { useState } from "react";
import AuthFlow from "./SignIn";
import { LogoutContext } from "./authContext";
import MoneyTransactions from "./MoneyTransactions";
import MyAuctions from "./MyAuctions";
import AuctionDetail from "./AuctionDetail";
import { AcceptBidProduct, AcceptBidBuyer, AcceptBidScenario, CloseAuctionModal } from "./components/modals/AuctionModals";
import { INITIAL_AUCTIONS } from "./auctionsData";
import type { Auction, AcceptedBid, Bid, Scenario } from "./auctionsData";
import type { AcceptRequest } from "./AuctionDetail";
import WasteTransactions from "./TransactionDetail";
import ProductLibrary from "./ProductLibrary";
import Homepage from "./Dashboard";
import AddNewItem from "./components/modals/AddNewItem";
import productPhoto from "./assets/figma/productPhoto.jpg";
import modalPhoto from "./assets/figma/modalPhoto.jpg";
import TransactionTypePicker from "./components/modals/TransactionTypePicker";
import NewWasteTransaction from "./components/modals/NewWasteTransaction";
import NewMoneyTransaction from "./components/modals/NewMoneyTransaction";
import AddMoneyToTransaction from "./components/modals/AddMoneyToTransaction";
import AddWasteToTransaction from "./components/modals/AddWasteToTransaction";
import {
  INITIAL_ROWS,
  INITIAL_PAYMENTS,
  INITIAL_INSTALLMENTS,
  buildInitialProducts,
  formatLedgerDate,
  formatEGP,
} from "./data";
import type { LedgerRow, LibraryProduct } from "./data";
import type { NewItemSubmission } from "./components/modals/AddNewItem";
import type { SideBarPage } from "./components/SideBar";
import type { WasteSubmission } from "./components/modals/NewWasteTransaction";
import type { MoneySubmission } from "./components/modals/NewMoneyTransaction";

type AuctionModalState =
  | { kind: "acceptProduct"; auctionId: string; bid: Bid }
  | { kind: "acceptBuyer"; auctionId: string; bidderId: string; bids: Bid[] }
  | { kind: "acceptScenario"; auctionId: string; scenario: Scenario }
  | { kind: "closeAuction"; auctionId: string }
  | null;

type ModalState =
  | { kind: "picker" }
  | { kind: "newWaste" }
  | { kind: "newMoney" }
  | { kind: "addMoney"; row: LedgerRow | null }
  | { kind: "addWaste"; row: LedgerRow | null }
  | { kind: "addItem" }
  | { kind: "editItem"; product: LibraryProduct }
  | null;

const DEFAULT_PRODUCT_IMAGES = [productPhoto, modalPhoto, productPhoto];

let nextId = 100;
const uid = () => `n${nextId++}`;

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [page, setPage] = useState<SideBarPage>("transaction");
  const [detailRow, setDetailRow] = useState<LedgerRow | null>(null);
  const [modal, setModal] = useState<ModalState>(null);
  const [rows, setRows] = useState<LedgerRow[]>(INITIAL_ROWS);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [installments, setInstallments] = useState(INITIAL_INSTALLMENTS);
  const [products, setProducts] = useState<LibraryProduct[]>(() => buildInitialProducts(DEFAULT_PRODUCT_IMAGES));
  const [auctions, setAuctions] = useState<Auction[]>(INITIAL_AUCTIONS);
  const [auctionId, setAuctionId] = useState<string | null>(null);
  const [acceptedMap, setAcceptedMap] = useState<Record<string, AcceptedBid[]>>({});
  const [declinedMap, setDeclinedMap] = useState<Record<string, string[]>>({});
  const [auctionModal, setAuctionModal] = useState<AuctionModalState>(null);

  const today = formatLedgerDate(new Date());
  const close = () => setModal(null);
  const navigate = (p: SideBarPage) => {
    setPage(p);
    setDetailRow(null);
    setModal(null);
    setAuctionId(null);
    setAuctionModal(null);
  };

  const currentAuction = auctions.find((a) => a.id === auctionId) ?? null;

  /* Accept-offer routing from the detail views */
  const requestAccept = (req: AcceptRequest) => {
    if (!currentAuction) return;
    if (req.kind === "product") setAuctionModal({ kind: "acceptProduct", auctionId: currentAuction.id, bid: req.bid });
    else if (req.kind === "buyer") setAuctionModal({ kind: "acceptBuyer", auctionId: currentAuction.id, bidderId: req.bidderId, bids: req.bids });
    else setAuctionModal({ kind: "acceptScenario", auctionId: currentAuction.id, scenario: req.scenario });
  };

  /* Record accepted offers; the auction settles (completed) once every product has an accepted bid */
  const confirmAccept = (targetAuctionId: string, accepted: AcceptedBid[]) => {
    const auction = auctions.find((a) => a.id === targetAuctionId);
    if (!auction) return;
    const next = [...(acceptedMap[targetAuctionId] ?? []), ...accepted.filter((n) => !(acceptedMap[targetAuctionId] ?? []).some((e) => e.bidId === n.bidId))];
    setAcceptedMap((m) => ({ ...m, [targetAuctionId]: next }));
    const acceptedIds = next.map((a) => a.bidId);
    const allAwarded = auction.products.every((p) => auction.bids.some((b) => b.productId === p.id && acceptedIds.includes(b.id)));
    if (allAwarded) setAuctions((list) => list.map((a) => (a.id === targetAuctionId ? { ...a, status: "completed" } : a)));
    setAuctionModal(null);
  };

  /* Close Auction outcomes: end-early -> ready to accept; cancel -> voided */
  const closeAuction = (targetAuctionId: string, outcome: "end" | "cancel") => {
    setAuctions((list) =>
      list.map((a) =>
        a.id === targetAuctionId ? { ...a, status: outcome === "end" ? "ready" : "cancelled", timeRemaining: "0 hours", timeProgress: 1 } : a,
      ),
    );
    setAuctionModal(null);
  };

  const declineBid = (targetAuctionId: string, bidId: string) => {
    setDeclinedMap((m) => ({ ...m, [targetAuctionId]: [...(m[targetAuctionId] ?? []), bidId] }));
  };

  /* Add New Item modal — appends the product to the library */
  const submitNewItem = (item: NewItemSubmission) => {
    const product: LibraryProduct = {
      id: uid(),
      name: item.name,
      category: item.category,
      subcategory: item.subcategory,
      detailTitle: item.name,
      weight: "-",
      color: item.color,
      dimensions: item.dimensions,
      condition: item.condition || "-",
      description: item.description,
      images: item.images.length > 0 ? item.images : DEFAULT_PRODUCT_IMAGES,
    };
    setProducts((p) => [product, ...p]);
    close();
  };

  /* Edit Product — updates the existing library entry in place */
  const submitEditItem = (item: NewItemSubmission) => {
    if (modal?.kind !== "editItem") return;
    const id = modal.product.id;
    setProducts((list) =>
      list.map((p) =>
        p.id === id
          ? {
              ...p,
              name: item.name,
              category: item.category,
              subcategory: item.subcategory,
              detailTitle: item.name,
              color: item.color,
              dimensions: item.dimensions,
              condition: item.condition || "-",
              description: item.description,
              images: item.images.length > 0 ? item.images : p.images,
            }
          : p,
      ),
    );
    close();
  };

  const deleteProduct = (id: string) => setProducts((list) => list.filter((p) => p.id !== id));

  /* Screen 3 — new quantity transaction: one ledger row per delivered product */
  const submitNewWaste = (s: WasteSubmission) => {
    const newRows: LedgerRow[] = s.entries.map((e) => ({
      id: uid(),
      paymentId: "PO-2042",
      buyer: s.buyer,
      auction: "Auction #102",
      product: e.product,
      type: "Waste",
      date: today,
      paymentAmount: "-",
      committedQty: `${e.qty.toLocaleString("en-US")} Ton`,
      // quantities close only via the explicit "final release" checkbox
      status: s.finalRelease ? "Closed" : "Active",
    }));
    setRows((r) => [...newRows, ...r]);
    close();
  };

  /* Screen 4 — new money transaction: money side auto-closes when fully paid */
  const submitNewMoney = (s: MoneySubmission) => {
    const row: LedgerRow = {
      id: uid(),
      paymentId: "MT-2042",
      buyer: s.buyer,
      auction: "Auction #102",
      product: "Buyer-level settlement",
      type: "Money",
      date: today,
      paymentAmount: formatEGP(s.amount),
      committedQty: "-",
      status: s.remaining === 0 ? "Closed" : "Active",
    };
    setRows((r) => [row, ...r]);
    close();
  };

  /* Screen 5 — append a money installment; prior installments stay untouched */
  const submitAddMoney = (s: { amount: number; remaining: number }) => {
    const paymentId = modal?.kind === "addMoney" && modal.row ? modal.row.paymentId : "MT-2041";
    setPayments((p) => [...p, { paymentId, amount: formatEGP(s.amount), date: today }]);
    setRows((r) => [
      {
        id: uid(),
        paymentId,
        buyer: modal?.kind === "addMoney" && modal.row ? modal.row.buyer : "Buyer #7",
        auction: "Auction #102",
        product: "Buyer-level settlement",
        type: "Money",
        date: today,
        paymentAmount: formatEGP(s.amount),
        committedQty: "-",
        status: s.remaining === 0 ? "Closed" : "Active",
      },
      ...r,
    ]);
    close();
  };

  /* Screen 6 — append delivered quantities; prior entries stay untouched */
  const submitAddWaste = (s: { entries: { product: string; qty: number }[]; finalRelease: boolean }) => {
    const source = modal?.kind === "addWaste" ? modal.row : null;
    setInstallments((ins) => [
      ...ins,
      ...s.entries.map((e) => ({ paymentId: source?.paymentId ?? "PO-2041", label: `Delivered ${e.qty.toLocaleString("en-US")} Ton`, date: today })),
    ]);
    setRows((r) => [
      ...s.entries.map((e) => ({
        id: uid(),
        paymentId: source?.paymentId ?? "PO-2041",
        buyer: source?.buyer ?? "Buyer #7",
        auction: "Auction #102",
        product: e.product,
        type: "Waste" as const,
        date: today,
        paymentAmount: "-",
        committedQty: `${e.qty.toLocaleString("en-US")} Ton`,
        status: (s.finalRelease ? "Closed" : "Active") as LedgerRow["status"],
      })),
      ...r,
    ]);
    close();
  };

  /* Successful login always lands on the Dashboard */
  const login = () => {
    setAuthed(true);
    setPage("dashboard");
    setDetailRow(null);
    setModal(null);
  };

  /* Logout returns to the phone-entry login screen; in-memory data stays */
  const logout = () => {
    setAuthed(false);
    setDetailRow(null);
    setModal(null);
  };

  if (!authed) return <AuthFlow onLogin={login} />;

  return (
    <LogoutContext.Provider value={logout}>
      {page === "dashboard" ? (
        <Homepage onNavigate={navigate} />
      ) : page === "myAuctions" ? (
        currentAuction ? (
          <AuctionDetail
            auction={currentAuction}
            accepted={acceptedMap[currentAuction.id] ?? []}
            declined={declinedMap[currentAuction.id] ?? []}
            onNavigate={navigate}
            onBack={() => setAuctionId(null)}
            onRequestAccept={requestAccept}
            onRequestClose={() => setAuctionModal({ kind: "closeAuction", auctionId: currentAuction.id })}
            onDeclineBid={(bidId) => declineBid(currentAuction.id, bidId)}
            onOpenTransaction={() => setModal({ kind: "picker" })}
          />
        ) : (
          <MyAuctions auctions={auctions} onNavigate={navigate} onOpenAuction={(a) => setAuctionId(a.id)} />
        )
      ) : page === "productLibrary" ? (
        <ProductLibrary
          products={products}
          onNavigate={navigate}
          onAddNewItem={() => setModal({ kind: "addItem" })}
          onEditProduct={(product) => setModal({ kind: "editItem", product })}
          onDeleteProduct={deleteProduct}
        />
      ) : detailRow ? (
        <WasteTransactions
          payments={payments}
          installments={installments}
          onBack={() => setDetailRow(null)}
          onAddMoney={() => setModal({ kind: "addMoney", row: detailRow })}
          onAddWaste={() => setModal({ kind: "addWaste", row: detailRow })}
          onNavigate={navigate}
        />
      ) : (
        <MoneyTransactions
          rows={rows}
          onViewRow={(row) => setDetailRow(row)}
          onAddToRow={(row) => setModal(row.type === "Money" ? { kind: "addMoney", row } : { kind: "addWaste", row })}
          onAddTransaction={() => setModal({ kind: "picker" })}
          onNavigate={navigate}
        />
      )}

      {modal?.kind === "picker" && (
        <TransactionTypePicker onClose={close} onContinue={(kind) => setModal(kind === "waste" ? { kind: "newWaste" } : { kind: "newMoney" })} />
      )}
      {modal?.kind === "newWaste" && <NewWasteTransaction onClose={close} onSubmit={submitNewWaste} />}
      {modal?.kind === "newMoney" && <NewMoneyTransaction onClose={close} onSubmit={submitNewMoney} />}
      {modal?.kind === "addMoney" && (
        <AddMoneyToTransaction buyer={modal.row?.buyer ?? "Buyer #7"} bidId="BID-2041" onClose={close} onSubmit={submitAddMoney} />
      )}
      {modal?.kind === "addWaste" && (
        <AddWasteToTransaction buyer={modal.row?.buyer ?? "Buyer #7"} bidId="BID-2041" onClose={close} onSubmit={submitAddWaste} />
      )}
      {auctionModal?.kind === "acceptProduct" && currentAuction && (
        <AcceptBidProduct auction={currentAuction} bid={auctionModal.bid} onClose={() => setAuctionModal(null)} onConfirm={(acc) => confirmAccept(auctionModal.auctionId, acc)} />
      )}
      {auctionModal?.kind === "acceptBuyer" && currentAuction && (
        <AcceptBidBuyer
          auction={currentAuction}
          bidderId={auctionModal.bidderId}
          bids={auctionModal.bids}
          onClose={() => setAuctionModal(null)}
          onConfirm={(acc) => confirmAccept(auctionModal.auctionId, acc)}
        />
      )}
      {auctionModal?.kind === "acceptScenario" && currentAuction && (
        <AcceptBidScenario
          auction={currentAuction}
          scenario={auctionModal.scenario}
          onClose={() => setAuctionModal(null)}
          onConfirm={(acc) => confirmAccept(auctionModal.auctionId, acc)}
        />
      )}
      {auctionModal?.kind === "closeAuction" && currentAuction && (
        <CloseAuctionModal auction={currentAuction} onClose={() => setAuctionModal(null)} onConfirm={(outcome) => closeAuction(auctionModal.auctionId, outcome)} />
      )}
      {modal?.kind === "addItem" && <AddNewItem onClose={close} onSubmit={submitNewItem} />}
      {modal?.kind === "editItem" && <AddNewItem onClose={close} onSubmit={submitEditItem} initial={modal.product} />}
    </LogoutContext.Provider>
  );
}
