import { useEffect } from "react";

const NAME = "Maureen Dzifa Quist";

/** Sets the browser tab title while a page is shown, matching the titles the build writes into each page file. */
export const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} | ${NAME}` : `${NAME} (Dzidzi) | Business Intelligence Engineer`;
  }, [title]);
};
