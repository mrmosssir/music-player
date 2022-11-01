import { createContext, useEffect, useRef, useState } from "react";
import Router from "@/Router";

import Layout from "@/layouts/Layout";

import Context from "@/context";

export const context = createContext();

function App() {
  return (
    <Context>
      <Layout>
        <Router />
      </Layout>
    </Context>
  )
}

export default App
