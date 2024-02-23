import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <>
      <h1>Home Page</h1>
      <button onClick={handleProfileClick}>프로필 가기</button>
    </>
  );
};

export default Home;
