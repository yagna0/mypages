import React from "react";
import { createRoot } from "react-dom/client"; // ✅ Import createRoot

import ItemList from "../react-components/ItemList";

function App() {
  return <h1>Hello, world! (from react)</h1>;
}

const root = createRoot(document.getElementById("react-root-main")); // ✅ Ensure element exists
root.render(<ItemList />);
