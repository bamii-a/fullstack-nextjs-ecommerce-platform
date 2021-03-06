import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, createClient } from "urql";
import Nav from "../components/Nav";
import { StateContext } from "../utils/context";

const client = createClient({ url: "http://localhost:1337/graphql" });
// const clientTEST = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <Provider value={client}>
        <Nav />
        <Component {...pageProps} />;
      </Provider>
    </StateContext>
  );
}
export default MyApp;
