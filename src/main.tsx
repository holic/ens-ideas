import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "tailwindcss/tailwind.css";
import { createClient, Provider as GraphProvider } from "urql";

export const graph = createClient({
  url: "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
});

ReactDOM.render(
  <React.StrictMode>
    <GraphProvider value={graph}>
      <App />
    </GraphProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
