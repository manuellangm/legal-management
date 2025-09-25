export const AuthUser = () => {
  const local = JSON.parse(localStorage.getItem("user"));
  if (!local) {
    console.log("User not found in local storage");
    return;
  }
  return local;
};
