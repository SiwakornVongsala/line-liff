 

import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
    cache: "no-store",
  },
});

instance.interceptors.request.use((req: AxiosRequestConfig<any>): any => {
  const headers = {
    ...req?.headers,
  };

  return { ...req, headers };
});

export default instance;
