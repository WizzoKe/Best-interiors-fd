import Head from "next/head";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Layout({ children, title = "Interior Solutions Kenya" }) {
  const router = useRouter();
  const GA_ID  = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (window.gtag) window.gtag("config", GA_ID, { page_path: url });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events, GA_ID]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Stylish interior design solutions in Nairobi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}
      </Head>
      <Navbar />
      <main>{children}</main>
      <footer style={{ background: "#333", color: "#fff", padding: "40px 0", textAlign: "center" }}>
        <p>© {new Date().getFullYear()} Interior Solutions Kenya</p>
      </footer>
    </>
  );
}