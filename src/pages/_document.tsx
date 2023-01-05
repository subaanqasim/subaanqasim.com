import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      style={{ scrollBehavior: "smooth", scrollPaddingTop: "4rem" }}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/static/subaanqasim.webmanifest" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/icons/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/static/icons/safari-pinned-tab.svg"
          color="#2e2e2e"
        />
        <link rel="shortcut icon" href="/static/icons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#171717" />
        <meta
          name="msapplication-config"
          content="/static/icons/browserconfig.xml"
        />
        <meta name="theme-color" content="#171717" />
        <meta
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          name="robots"
        />
      </Head>
      <body className="flex h-full flex-col bg-neutral-50 text-base font-normal tracking-wide text-neutral-800 dark:bg-black dark:text-neutral-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
