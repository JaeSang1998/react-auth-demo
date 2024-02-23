import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";

const SignUp = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const password = e.target.password.value;
    const nickname = e.target.nickname.value;

    const success = await signUp({ id, password, nickname });
    if (success) {
      navigate("/sign-in");
    } else {
      window.alert("회원가입 실패!");
    }
  };

  return (
    <>
      <h1>SignUp Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">아이디</label>
          <input name="id" type="text" />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input name="password" type="password" autoComplete="off" />
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <input name="nickname" />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </>
  );
};

export default SignUp;
