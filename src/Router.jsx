import { Routes, Route } from "react-router-dom"

import Main from "@/views/Main";
import Top from "@/views/Top";

const Router = function () {
  const prefix = "/music-player"
  const routes = [
    { name: "home", path: "", component: <Main /> },
    { name: "top", path: "top", component: <Top /> },
  ]
  return (
    <Routes>
      { routes.map(item => <Route path={ `${prefix}/${item.path}` } element={ item.component } key={ item.name }></Route>) }
    </Routes>
  )
}

export default Router;