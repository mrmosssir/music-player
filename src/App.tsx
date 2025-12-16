import { Provider } from "react-redux";
import Router from "@/Router";

import Layout from "@/layouts/Layout";

import store from "@/store";

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Router />
      </Layout>
    </Provider>
  );
};

export default App;
