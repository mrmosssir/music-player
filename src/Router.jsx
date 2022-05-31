import { Routes, Route } from "react-router-dom"

import Main from "@/views/Main";

const Router = function () {
  const prefix = "/music-player"
  return (
    <Routes>
      <Route path={ `${prefix}/` } element={ <Main /> }></Route>
    </Routes>
  )
}

export default Router;