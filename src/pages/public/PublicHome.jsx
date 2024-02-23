import { useNavigate } from "react-router-dom";

const PublicHome = () => {
  const navigate = useNavigate();

  const handleSingInBtnClicked = () => {
    navigate("/sign-in");
  };
  const handleSignUpBtnClicked = () => {
    navigate("/sign-up");
  };

  return (
    <>
      <h1>Public Home Page</h1>
      <button onClick={handleSingInBtnClicked}>로그인하러 가기</button>
      <button onClick={handleSignUpBtnClicked}>회원가입하러 가기</button>
    </>
  );
};

export default PublicHome;
