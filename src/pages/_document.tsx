import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="shortcut icon"
            href="/emoji-thinking-face.png"
            type="image/png"
          />

          <meta
            name="og:title"
            content="ENS Ideas — Instant .eth domain search"
          />
          <meta name="og:url" content="https://ensideas.com/" />
          <meta
            name="og:description"
            content="Search for .eth domains and get inspired by a realtime feed of .eth domain registrations"
          />
          <meta
            name="og:image"
            content="https://ensideas.com/twitter-card.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@frolic" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
