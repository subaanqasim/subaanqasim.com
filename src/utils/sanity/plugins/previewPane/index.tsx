// This plugin is responsible for adding a “Preview” tab to the document pane
// You can add any React component to `S.view.component` and it will be rendered in the pane
// and have access to content in the form in real-time.
// It's part of the Studio's “Structure Builder API” and is documented here:
// https://www.sanity.io/docs/structure-builder-reference

import { type DefaultDocumentNodeResolver } from "sanity/desk";
import articleType from "../../schemas/article";

import ArticlePreviewPane from "./ArticlePreviewPane";

export const previewDocumentNode = ({
  apiVersion,
  previewSecretId,
}: {
  apiVersion: string;
  previewSecretId: `${string}.${string}`;
}): DefaultDocumentNodeResolver => {
  return (S, { schemaType }) => {
    switch (schemaType) {
      case articleType.name:
        return S.document().views([
          S.view.form(),
          S.view
            .component(({ document }) => (
              <ArticlePreviewPane
                slug={document.displayed.slug?.current}
                apiVersion={apiVersion}
                previewSecretId={previewSecretId}
              />
            ))
            .title("Preview"),
        ]);

      default:
        return null;
    }
  };
};
