import Head from "next/head";
import Navbar from "../components/Navbar";
import { trpc } from "../utils/trpc";

const Home = () => {
  const hello = trpc.proxy.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Subaan Qasim</title>
        <meta name="description" content="skr" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container  flex flex-col items-center justify-center h-screen p-4 mx-auto">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-neutral-200">
          <span className="text-orange-500">Subaan</span> Qasim
        </h1>
      </main>
    </>
  );
};

export default Home;
