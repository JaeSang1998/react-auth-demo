import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

export const ProtectedRoute = () => {
  const { isSignIn } = useAuth();
  const { pathname } = useLocation();

  // 만약 ProtectedRoute 에 isSignIn 이 false 인 채 접근한다면 Navigate 를 통해 redirection
  // 이전 redirect pathname 을 기억할 수 있도록 여기서 state 를 넣어줌
  // 사용처는 /sign-in SignIn.jsx page
  if (!isSignIn) {
    return <Navigate to="/sign-in" state={{ redirectedFrom: pathname }} />;
  }

  return <Outlet />;
};
