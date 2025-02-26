import React from "react";
import ReactDOM from "react-dom/client";
import ItemList from "../react-components/ItemList.jsx";


function App() {
  return (
    <main>
      <h1>Welcome to the React Page!</h1>
      <ItemList />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("react-root-main")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
