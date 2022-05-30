import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import App from "./App"
import "@/style.css"

ReactDOM.createRoot(document.getElementById('root')).render(

  // Run on StrictMode
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  // Run without StrictMode
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
