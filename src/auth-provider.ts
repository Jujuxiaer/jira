// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

import { User } from "./screens/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL;
const tokenK3y = "__auth_provider_token__";

export const getToken = () => {
  return window.localStorage.getItem(tokenK3y);
};

export const handUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(tokenK3y, user.token || "");
};

export const login = (data: { username: string; password: string }) => {
  fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handUserResponse(await response.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handUserResponse(await response.json());
    }
  });
};

export const logout = () => window.localStorage.removeItem(tokenK3y);
