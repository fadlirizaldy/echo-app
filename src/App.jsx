import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Thread from "./pages/Thread";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Loading from "./components/Loading";
import { asyncPreloadProccess } from "./states/isPreload/action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProccess());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Loading />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/threads/:id"
          element={
            <>
              <Thread />
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <Register />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
