import axios from "axios";
import Rota from "../rota";

const api = axios.create({
    baseURL: Rota+'/',
});

export default api;