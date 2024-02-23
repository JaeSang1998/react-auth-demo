import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";

const SignIn = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  // Protected Route 에서 state 로 설정해둔 redirectedFrom property 가 있다면 pathname 을 변경해줌
  const { state } = useLocation();
  const path = state !== null ? state.redirectedFrom : "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const password = e.target.password.value;

    // 명시적으로 반환된 성공 여부를 통해 navigation 을 해줌
    // 이 프로젝트는 navigation 을 UI 로직(동작)의 역할이라고 가정하고 작성됨.
    const success = await signIn({ id, password });

    if (success) {
      // 유저가 이전에 진입한 page 로 진입
      navigate(path);
    } else {
      window.alert("로그인 똑바로 해라잉");
    }
  };

  return (
    <>
      <h1>SignIn Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">아이디</label>
          <input name="id" type="text" />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input name="password" type="password" autoComplete="off" />
        </div>

        <button type="submit">login</button>
      </form>
    </>
  );
};

export default SignIn;
