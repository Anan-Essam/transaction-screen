import { useState } from "react";
import MoneyTransactions from "./MoneyTransactions";
import WasteTransactions from "./TransactionDetail";
import ProductLibrary from "./ProductLibrary";
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

type ModalState =
  | { kind: "picker" }
  | { kind: "newWaste" }
  | { kind: "newMoney" }
  | { kind: "addMoney"; row: LedgerRow | null }
  | { kind: "addWaste"; row: LedgerRow | null }
  | { kind: "addItem" }
  | null;

const DEFAULT_PRODUCT_IMAGES = [productPhoto, modalPhoto, productPhoto];

let nextId = 100;
const uid = () => `n${nextId++}`;

export default function App() {
  const [page, setPage] = useState<SideBarPage>("transaction");
  const [detailRow, setDetailRow] = useState<LedgerRow | null>(null);
  const [modal, setModal] = useState<ModalState>(null);
  const [rows, setRows] = useState<LedgerRow[]>(INITIAL_ROWS);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [installments, setInstallments] = useState(INITIAL_INSTALLMENTS);
  const [products, setProducts] = useState<LibraryProduct[]>(() => buildInitialProducts(DEFAULT_PRODUCT_IMAGES));

  const today = formatLedgerDate(new Date());
  const close = () => setModal(null);
  const navigate = (p: SideBarPage) => {
    setPage(p);
    setDetailRow(null);
    setModal(null);
  };

  /* Add New Item modal — appends the product to the library */
  const submitNewItem = (item: NewItemSubmission) => {
    const product: LibraryProduct = {
      id: uid(),
      name: item.name,
      categoryShort: item.category === "Iron & Steel" ? "Iron" : item.category,
      category: item.category,
      subcategory: item.subcategory,
      detailTitle: item.name,
      weight: "-",
      color: item.color ? `Color: ${item.color}` : "Color: -",
      dimensions: item.dimensions ? `Dimensions: ${item.dimensions}` : "Dimensions: -",
      condition: item.condition || "-",
      description: item.description,
      images: item.images.length > 0 ? item.images : DEFAULT_PRODUCT_IMAGES,
    };
    setProducts((p) => [product, ...p]);
    close();
  };

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

  return (
    <>
      {page === "productLibrary" ? (
        <ProductLibrary products={products} onNavigate={navigate} onAddNewItem={() => setModal({ kind: "addItem" })} />
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
      {modal?.kind === "addItem" && <AddNewItem onClose={close} onSubmit={submitNewItem} />}
    </>
  );
}
