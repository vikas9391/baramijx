import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Disable the browser's native scroll-position restoration on reload/back-forward
// navigation — our own ScrollToTop component handles this instead.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(<App />);