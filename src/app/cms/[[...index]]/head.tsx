import { NextStudioHead } from "next-sanity/studio/head";

export default function CustomStudioHead() {
  return (
    <>
      <NextStudioHead favicons={false} title={"Subaan's Studio"} />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/icons/favicon-32x32.png"
      />
    </>
  );
}
