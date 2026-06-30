import Index from "./pages/Index";
import Accounts from "./pages/Accounts";
import AccountDetail from "./pages/AccountDetail";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

export const routers = [
  {
    path: "/",
    name: "home",
    element: <Index />,
  },
  {
    path: "/accounts",
    name: "accounts",
    element: <Accounts />,
  },
  {
    path: "/account/:id",
    name: "account-detail",
    element: <AccountDetail />,
  },
  {
    path: "/faq",
    name: "faq",
    element: <FAQ />,
  },
  /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
  {
    path: "*",
    name: "404",
    element: <NotFound />,
  },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
