export const useAuth = () =>
  useState(() => ({
    isAuth: false,
    authToken: "",
  }));
