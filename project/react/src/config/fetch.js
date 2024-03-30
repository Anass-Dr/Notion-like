export const endpoint = "http://127.0.0.1:8000/api";
export const headers = () => ({
    "content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
});
