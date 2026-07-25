import { createContext } from "react";

/* Provided by App when authenticated; UserProfile's menu calls it to return to the login flow */
export const LogoutContext = createContext<() => void>(() => {});
