import axios from "axios";
import { languageVersions } from "../assets/constants";

const API = axios.create({
    baseURL: "https://wandbox.org",
});

export default async function getOutput(sourceCode, language) {
    const response = await API.post("/api/compile.json",{
        compiler: `${languageVersions[language].name}-${languageVersions[language].version}`,
        code: sourceCode
    });
    
    return response.data;
}