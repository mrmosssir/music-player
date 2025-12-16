import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Main = lazy(() => import("@/views/Main.tsx"));
const Top = lazy(() => import("@/views/Top.tsx"));

const Router = () => {
  const routes = [
    { name: "home", path: "", component: <Main /> },
    { name: "top", path: "top", component: <Top /> },
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((item) => (
          <Route path={`/music-player/${item.path}`} element={item.component} key={item.name}></Route>
        ))}
      </Routes>
    </Suspense>
  );
};

export default Router;
