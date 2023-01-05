import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Exit the current user from "Preview Mode".
  res.clearPreviewData();

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: "/" });

  res.end();
}
