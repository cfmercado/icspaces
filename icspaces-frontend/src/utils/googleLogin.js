const navigate = (url) => {
  window.location.href = url;
};

const googleLogin = async () => {
  const response = await fetch("https://api.icspaces.online//auth/google", {
    method: "POST",
  });
  const data = await response.json(); // user data
  navigate(data.url);
};

export default googleLogin;
