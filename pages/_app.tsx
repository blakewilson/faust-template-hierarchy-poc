import client from "client";
import { FaustProvider } from "new-faust";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FaustProvider client={client} pageProps={pageProps}>
      <Component {...pageProps} />
    </FaustProvider>
  );
}
