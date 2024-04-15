import { endpoint } from "./fetch";

export default async function upload(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${endpoint}/files`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
        body: formData,
    });
    const result = await res.json();
    return result;
}
