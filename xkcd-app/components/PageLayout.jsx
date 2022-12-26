import Head from "next/head";

export default function PageLayout({ children }) {
  return (
    <>
      <Head>
        <title> XKCD Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  );
}