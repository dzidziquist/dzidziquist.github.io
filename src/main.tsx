import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Links shared before the move to clean addresses look like /#/about. Rewrite them to /about before the app starts.
if (window.location.protocol !== "file:" && !import.meta.env.VITE_SAMPLE && window.location.hash.startsWith("#/")) {
  window.history.replaceState(null, "", window.location.hash.slice(1));
}
// GitHub Pages redirects /about to /about/ (it is a folder); drop the trailing slash so routes match exactly.
const { pathname, search, hash } = window.location;
if (!import.meta.env.VITE_SAMPLE && pathname.length > 1 && pathname.endsWith("/")) {
  window.history.replaceState(null, "", pathname.replace(/\/+$/, "") + search + hash);
}

createRoot(document.getElementById("root")!).render(<App />);
