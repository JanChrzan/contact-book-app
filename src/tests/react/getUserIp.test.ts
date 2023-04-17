import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getUserIp } from "../../utils/getUserIp";

describe("getUserIp", () => {
  it("returns the user's IP address", async () => {
    const mock = new MockAdapter(axios);
    const ip = "1.2.3.4";
    mock.onGet("https://api.ipify.org?format=json").reply(200, { ip });

    const result = await getUserIp();
    expect(result).toEqual(ip);
  });

  it("returns 'error' if the request fails", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("https://api.ipify.org?format=json").networkError();

    const result = await getUserIp();
    expect(result).toEqual("error");
  });
});
