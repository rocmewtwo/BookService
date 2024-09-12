// src/utils/auth.js
// Retrieve the token from localStorage
export const getToken = () => {
  const token = localStorage.getItem('token') || '';
  if (token && isTokenExpired(token)) {
    localStorage.removeItem('token');
    return '';
  }
  return token;
};

// Check if the JWT token is expired
export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  const jwtPayload = JSON.parse(jsonPayload);
  const exp = jwtPayload.exp;
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime > exp;
};