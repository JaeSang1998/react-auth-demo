import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const authApiInstance = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});

// auth 의 모든 행동을 모아둔 Provider
const AuthProvider = ({ children }) => {
  // user 와 isSignIn 이라는 가장 중요한 state 를 최상단에 관리함
  // isSignIn 은 user 를 통해서 계산된 boolean 이므로 isSignUp 이 true 일때 우리는 user 가 null 이 아님을 보장할 수 있다.
  const [user, setUser] = useState(null);
  const isSignIn = !!user;

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: user } = await authApiInstance.get("/user");
      setUser(user);
      return true;
    } catch (error) {
      return false;
    }
  };

  // 로그인 로직
  // authApiInstance 에 default header 를 업데이트 해주고,
  // user 를 setting 해줌
  // 성공하면 true 실패하면 false 를 반환해서 사용처에서 명시적으로 navigate 를 할 수 있도록 도와줌
  const signIn = async ({ id, password }) => {
    try {
      const {
        data: { accessToken, ...user },
      } = await authApiInstance.post("/login", { id, password });
      setUser(user);
      setToken(accessToken);

      return true;
    } catch (error) {
      return false;
    }
  };

  // 회원가입 로직
  // 성공하면 true 실패하면 false 를 반환해서 사용처에서 명시적으로 navigate 를 할 수 있도록 도와줌
  // 로그인에서도 보았듯 이 코드는 navigation 을 auth 의 비지니스로직(동작)으로 생각하지 않음.
  // auth 의 비지니스로직(동작)으로 본다면 이 안에서 useNavgation 등의 훅을 통해 navigate 까지 해주어도 됨
  const signUp = async ({ id, password, nickname }) => {
    try {
      await authApiInstance.post("/register", {
        id,
        password,
        nickname,
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  // 로그아웃 로직
  // 토큰을 비워주고 user 를 초기값으로 돌려줌
  // isSignIn 이 false 로 변경되고 route 도 초기화됨
  // 사용하지 않을때 불필요한 정보들은 삭제하는 습관 들이기!
  const signOut = async () => {
    setUser(null);
    deleteToken();
  };

  // defaults 토큰을 업데이트 함
  // 변수 안에 token 을 관리하게 되어 안전함
  const setToken = (token) => {
    authApiInstance.defaults.headers.common["Authorization"] =
      "Bearer " + token;
  };

  // defaults 토큰을 삭제함
  const deleteToken = () => {
    delete authApiInstance.defaults.headers.common["Authorization"];
  };

  const contextValue = {
    isSignIn,
    user,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// context 를 Custom Hook 으로 사용하도록 Wrapping 해줌.
export const useAuth = () => {
  // 이 불필요한 2가지 import 를 줄여주는 이점이 있음.
  return useContext(AuthContext);
};

export default AuthProvider;
