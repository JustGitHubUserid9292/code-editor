import axios from "axios";
import { languageVersions } from "../assets/constants";

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
});

export default async function getOutput(sourceCode, language) {
    const response = await API.post('/execute', {
        language: language,
        version: languageVersions[language],
        files: [
        {
          content: sourceCode,
        },
    ],
    })
    return response.data;
}