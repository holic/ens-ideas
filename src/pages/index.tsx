import type { NextPage } from "next";
import { App } from "../App";
import { createClient, Provider as GraphProvider } from "urql";

export const graph = createClient({
  url: "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
});

const Home: NextPage = () => {
  return (
    <GraphProvider value={graph}>
      <App />
    </GraphProvider>
  );
};

export default Home;
