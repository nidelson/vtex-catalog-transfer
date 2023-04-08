import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import { ACCOUNT_NAME, VTEX_API_APP_KEY, VTEX_API_APP_TOKEN } from "../../env";

export const apiSkuBinding = (): AxiosInstance => {
  const baseURL = `https://${ACCOUNT_NAME}.myvtex.com/api/sku-binding/pvt`;

  const configAxios: CreateAxiosDefaults = {
    headers: {
      "x-vtex-api-appkey": VTEX_API_APP_KEY,
      "x-vtex-api-apptoken": VTEX_API_APP_TOKEN,
    },
    baseURL,
  };

  return axios.create(configAxios);
};
