// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发
import { User } from "screens/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL;
const tokenK3y = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(tokenK3y);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(tokenK3y, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(data);
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(data);
    }
  });
};

export const logout = async () => window.localStorage.removeItem(tokenK3y);
