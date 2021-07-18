import fetch from "isomorphic-unfetch";

const name = ({ user }) => {
  const username = user && user.name;

  return <div>{username}</div>;
};

name.getInitialProps = async ({ query }) => {
  const { name } = query;

  try {
    const res = await fetch(`https://api.github.com/users/${name}`);

    if (res.status === 200) {
      const user = await res.json();

      console.log(user); // getInitialProps에서는 처음에는 console.log가 브라우저쪽에서 찍히고 새로고침을 하게되면 console.log가 터미널에서 찍힌다.
      return { user }; // getInitialProps는 getServerSideProps와 다르게 props 속성을 사용하지 않고 return을 한다
    }

    return { props: {} };
  } catch (e) {
    console.log(e);
    return {};
  }
};

export default name;
