import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MoneyTransactions from "./MoneyTransactions";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MoneyTransactions />
  </StrictMode>,
);
