import axios, { AxiosResponse } from "axios";

export const getUserIp = async (): Promise<string> => {
  try {
    const response: AxiosResponse<{ ip: string }> = await axios.get(
      "https://api.ipify.org?format=json"
    );
    const { ip } = response.data;
    return ip;
  } catch {
    return "error";
  }
};
