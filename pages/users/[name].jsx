import css from "styled-jsx/css";
import fetch from "isomorphic-unfetch";

const style = css`
  .profile-box {
    width: 25%;
    max-width: 272px;
    margin-right: 26px;
  }
  .profile-image-wrapper {
    width: 100%;
    border: 1px solid #e1e4e8;
  }
  .profile-image-wrapper .profile-image {
    display: block;
    width: 100%;
  }
  .profile-username {
    margin: 0;
    padding-top: 16px;
    font-size: 26px;
  }
  .profile-user-login {
    margin: 0;
    font-size: 20px;
  }
  .profile-user-bio {
    margin: 0;
    padding-top: 16px;
    font-size: 14px;
  }
  h2 {
    margin-left: 20px;
  }
`;

const username = ({ user }) => {
  if (!user) return null;

  return (
    <>
      <div className="profile-box">
        <div className="profile-image-wrapper">
          <img
            className="profile-image"
            src={user.avatar_url}
            alt={`${user.name} 프로필 이미지`}
          />
        </div>
        <h2 className="profile-username">{user.name}</h2>
        <p className="profile-user-login">{user.login}</p>
        <p className="profile-user-bio">{user.bio}</p>
      </div>
      <style jsx>{style}</style>
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { name } = query;

  try {
    const res = await fetch(`https://api.github.com/users/${name}`);

    if (res.status === 200) {
      const user = await res.json();

      console.log(user); // getInitialProps에서는 처음에는 console.log가 브라우저쪽에서 찍히고 새로고침을 하게되면 console.log가 터미널에서 찍힌다.
      return { props: { user } }; // getInitialProps는 getServerSideProps와 다르게 props 속성을 사용하지 않고 return을 한다
    }
    return { props: {} };
  } catch (e) {
    console.log(e);
    return {};
  }
};

export default username;
