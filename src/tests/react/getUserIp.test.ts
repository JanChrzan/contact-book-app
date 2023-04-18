import axios from "axios";
import { getUserIp } from "../../utils/getUserIp";

jest.mock("axios");

describe("getUserIp", () => {
  it("returns the user's IP address", async () => {
    const ip = "1.2.3.4";
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { ip } });

    const result = await getUserIp();
    expect(result).toEqual(ip);
  });

  it('returns "error" if the request fails', async () => {
    const error = new Error("Network Error");
    (axios.get as jest.Mock).mockRejectedValueOnce(error);

    const result = await getUserIp();
    expect(result).toEqual("error");
  });
});
