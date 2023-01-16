import { React, Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";

import Loading from "./Loading";
import Login from "../components/Login";
import Register from "../components/Register";
import Header from "../components/Header";
import Main from "../components/Main";
import PostForm from "../components/post/PostForm";
import Alert from "../components/alert/Alert";
//import PageRender from "../components/PageRender";

const Home = lazy(() => import("../pages/Home"));
const PostDetail = lazy(() => import("../pages/posts/PostDetail"));
const ProfileDetail = lazy(() => import("../pages/profiles/ProfileDetail"));

function Layout() {
  const { state, action } = useStore();
  const { authData, onLogin, onRegister } = state.auth;
  const { onModal } = state.post;
  const { refreshToken } = action.auth;

  useEffect(() => {
    if (authData && authData.token) refreshToken();
  }, [authData]);

  return (
    <>
      {onLogin && <Login />}
      {onRegister && <Register />}
      {onModal && <PostForm />}
      <Alert />

      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex flex-row flex-1 h-screen overflow-hidden">
          <Suspense fallback={<Loading />}>
            <Main>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/profiles/:id" element={<ProfileDetail />} />
              </Routes>
            </Main>
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default Layout;
