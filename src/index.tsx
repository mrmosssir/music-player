import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import App from "./App"
import "@/style.css"

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(

  // Run on StrictMode
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  // Run without StrictMode
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
