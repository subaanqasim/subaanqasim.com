import { Button, Container } from "@components/ui";
import Link from "next/link";

const Development: React.FC<{ title: string }> = ({ title }) => {
  return (
    <>
      <Container>
        <>
          <header>
            <h1>{title}</h1>
          </header>

          <main className="flex h-[50vh] w-full flex-col items-center justify-center text-center">
            <div className="flex items-center gap-2">
              <div className="text-2xl text-red-500">⚠️</div>
              <h2>️Development in progress</h2>
              <div className="text-2xl text-red-500">⚠️</div>
            </div>

            <p className="mt-4">🛠 pls check again soon(-ish) 🛠</p>
          </main>
        </>
      </Container>

      <Button
        as={Link}
        variant="primary"
        glowColour="pink-purple"
        href="/"
        className="mx-auto max-w-xs"
      >
        Return home
      </Button>
    </>
  );
};

export default Development;
