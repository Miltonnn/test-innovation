import axios from "axios";

export const api = axios.create({
  baseURL:
    "https://apihomolog.innovationbrindes.com.br/api/innova-dinamica",
  headers: {
    "Content-Type": "application/json",
  },
});
