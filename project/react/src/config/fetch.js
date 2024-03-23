const jwt_token = localStorage.getItem("jwt_token");

export const endpoint = "http://127.0.0.1:8000/api";
export const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${jwt_token}`,
};
