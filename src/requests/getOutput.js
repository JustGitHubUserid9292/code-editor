import axios from "axios";

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
});

export default async function getOutput(sourceCode) {
    const response = await API.post('/execute', {
        language: "javascript",
        version: "18.15.0",
        files: [
        {
          content: sourceCode,
        },
    ],
    })
    return response.data;
}