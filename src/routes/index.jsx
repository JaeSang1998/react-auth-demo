import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";

import SignIn from "../pages/public/SignIn";
import SignUp from "../pages/public/SignUp";
import PublicHome from "../pages/public/PublicHome";

import Home from "../pages/protected/Home";
import Profile from "../pages/protected/Profile";

const Routes = () => {
  const { isSignIn } = useAuth();

  // 모두가 접근 가능한 public Route
  const publicRoutes = [
    {
      path: "/about-us",
      element: <>About Us</>,
    },

    {
      path: "/read-me",
      element: <>Read Me</>,
    },
  ];

  // 로그인 안 한 유저들을 위한 라우트
  // 로그인 안 한 유저들은 '/' 에 Public Home 이 노출됨
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <PublicHome />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
  ];

  // 로그인 한 유저들을 위한 라우트
  // 중복된 '/' route 가 있지만 isSignIn 에 따라 먼저 들어간 route 가 보여지게 됨으로 자연스럽게 동작함
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ];

  // notfound 없는 페이지에 대해서 home 으로 리다이렉션
  const notFound = {
    path: "*",
    element: <Navigate to="/" />,
  };

  /*
    createBrowserRouter 로 router 들을 묶어줌
    1. publicRoutes : 누구나 접근 가능한 route
    2. routesForNotAuthenticatedOnly: 이 부분은 isSignIn 이 false 라면 라우트에 포함되고 아니라면 라우트에서 없어지게 됨
    3. routesForAuthenticatedOnly: isSignIn이 true 일때 자연스럽게 Home 이 보여지게됨 + Protected Routes 를 구현함
    4. notFound
  */
  const router = createBrowserRouter([
    ...publicRoutes,
    ...(!isSignIn ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
    notFound,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
