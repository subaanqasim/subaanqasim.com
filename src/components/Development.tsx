import Link from "next/link";

const Development: React.FC<{ title: string }> = ({ title }) => {
  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>

      <main className="flex flex-col items-center justify-center w-full h-[50vh] text-center">
        <div className="flex items-center gap-2">
          <div className="text-2xl text-red-500">⚠️</div>
          <h2>️Development in progress</h2>
          <div className="text-2xl text-red-500">⚠️</div>
        </div>

        <p className="mt-4">🛠 pls check again soon(-ish) 🛠</p>

        <Link href="/">
          <a className="button-primary mt-12">Return home</a>
        </Link>
      </main>
    </>
  );
};

export default Development;
