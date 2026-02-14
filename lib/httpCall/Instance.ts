import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ms-be-depapei1911-coi02xkx.apn.leapcell.dev/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default API;
