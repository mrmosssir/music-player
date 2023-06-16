import { createContext, useEffect, useRef, useState } from "react";
import Router from "@/Router";

import Layout from "@/layouts/Layout";

import Context from "@/context";
import { test } from "@/utils/auth"
export const context = createContext();

function App() {
  useEffect(() => {
    test()
  }, [])
  return (
    <Context>
      <Layout>
        <Router />
      </Layout>
    </Context>
  )
}

export default App
