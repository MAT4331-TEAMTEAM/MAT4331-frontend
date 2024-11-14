export const CheckLogin = (): boolean => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (accessToken && refreshToken) {
    return true;
  } else {
    if (accessToken) {
      localStorage.removeItem("accessToken");
    }

    if (refreshToken) {
      localStorage.removeItem("refreshToken");
    }

    return false;
  }
};
