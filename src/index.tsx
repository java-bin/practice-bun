import * as ReactDOM from "react-dom/client"
import { App } from "./App"
import React from "react";

// bun build ./src/index.tsx --out-dir ./dist
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}