import ky from "ky";
import { WhmcsApi } from "..";

export abstract class BaseModule {
  async request(methodName: string, options?: any): Promise<any> {

    const searchParams = new URLSearchParams();
    searchParams.set("identifier", WhmcsApi.options.identifier);
    searchParams.set("secret", WhmcsApi.options.secret);
    searchParams.set("action", methodName);
    searchParams.set("responsetype", "json");

    return new Promise(async (resolve, reject) => {
      try {
        const res = await ky(WhmcsApi.options.apiUrl, {
          method: "post",
          body: searchParams,
        })

        const data = await res.json() as any;

        if (data.result != "success") return reject(data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}
