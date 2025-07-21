const TOKEN = "token";
export const getToken = () => localStorage.getItem(TOKEN);
export const setToken = (token: string) => localStorage.setItem(TOKEN, token);
export const removeToken = () => localStorage.removeItem(TOKEN);
export const setUserId = (token: string) => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  localStorage.setItem("id", payload.id);
};
export const getUserId = (): number => {
  const id = localStorage.getItem("id");
  return id ? parseInt(id) : 0;
};
export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const exp = payload.exp * 1000; // convert to milliseconds
  return Date.now() < exp; // check if current time is before expiration
};
