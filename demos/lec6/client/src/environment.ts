export const API_KEY = import.meta.env.VITE_SUPER_SECRET_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not defined in environment variables");
}
