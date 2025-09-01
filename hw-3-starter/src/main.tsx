import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Gallery from "./components/Gallery.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Gallery itemsPerPage={0} data={[]} />
    </React.StrictMode>
);
