import axios from "axios";

const baseUrl = "https://fe-task-api.mainstack.io/";

const httpBase = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });


  export const fetchUser = async () => {
    return httpBase.get('/user');
  }

  export const fetchWallet = async () => {
    return httpBase.get('/wallet');
  }

  export const fetchTransaction = async () => {
    return httpBase.get('/transactions');
  }