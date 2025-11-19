import { Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react";

const Main = lazy(() => import("@/views/Main"));
const Top = lazy(() => import("@/views/Top"));

const Router = function () {
  const prefix = "/music-player"
  const routes = [
    { name: "home", path: "", component: <Main /> },
    { name: "top", path: "top", component: <Top /> },
  ]
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        { routes.map(item => <Route path={ `${prefix}/${item.path}` } element={ item.component } key={ item.name }></Route>) }
      </Routes>
    </Suspense>
  )
}

export default Router;