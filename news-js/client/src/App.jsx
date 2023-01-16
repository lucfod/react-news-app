import { React, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loading from "./containers/Loading";

const NotFound = lazy(() => import("./pages/NotFound"));
const Layout = lazy(() => import("./containers/Layout"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading p_allPage={true} />}>
        <Routes>
          <Route path="/*" element={<Layout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
