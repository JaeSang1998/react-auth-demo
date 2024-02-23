import { useAuth } from "../../provider/authProvider";

const Profile = () => {
  // 여기서 user 는 null 이 아님
  // isSignIn 이 false 일때 이 페이지에 접근할 수 없기 때문
  // isSignIn 은 user 가 null 이 아닐때 true
  const { user, signOut } = useAuth();

  return (
    <>
      <h1>Profile Page</h1>
      {/* user 는 null 이 아님 */}
      <p>{user.nickname}</p>
      <p>{user.userId}</p>
      <button onClick={signOut}>로그아웃</button>
    </>
  );
};

export default Profile;
