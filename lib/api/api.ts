import axios from "axios";

const base =
  (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "") || "";

export const api = axios.create({
  baseURL: `${base}/api`,
  withCredentials: true,
});