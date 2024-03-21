const jwt_token = localStorage.getItem("jwt_token");

export const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${jwt_token}`,
};
