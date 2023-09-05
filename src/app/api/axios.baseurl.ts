import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://localhost:3333/',
  withCredentials: true, // Isso pode ajudar com solicitações de CORS com credenciais
});
