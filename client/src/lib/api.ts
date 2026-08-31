import axios from "axios";

const API_URL = process.env.BUN_PUBLIC_API_URL ?? "http://localhost:2020";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
