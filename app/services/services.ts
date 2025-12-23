

import axios from "axios";

export const baseUrlBackend = `${process.env.NEXT_PUBLIC_URL_BACKEND}/connectx/api`;

export const lineDropform = async ( body: any): Promise<any> => {
  try {
    await axios.post(`api/line`, body);
  } catch (error) {
    console.log("lineDropform service error", { error });
  }
};

