import { createRoot } from "react-dom/client";
import ItemList from "../react-components/ItemList";
function App() {
  return <h1>Hello, world! (from react)</h1>;
}
const root = createRoot(document.getElementById("react-root-main"));
root.render(<ItemList />);
