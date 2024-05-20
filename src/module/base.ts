import ky from "ky";
import { WhmcsApi } from "..";

export abstract class BaseModule {
  async request(methodName: string, options?: any): Promise<any> {
    options.identifier = WhmcsApi.options.identifier;
    options.secret = WhmcsApi.options.secret;
    options.action = methodName;
    options.responsetype = "json";

    const searchParams = new URLSearchParams();
    
    for (const key in options) {
      searchParams.append(key, options[key]);
    }

    return new Promise(async (resolve, reject) => {
      try {
        const res = await ky(WhmcsApi.options.apiUrl, {
          method: "post",
          body: searchParams,
          throwHttpErrors: false,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        })

        let data;

        if (res.headers.get("content-type")?.includes("application/json")) {
          data = await res.json();
        } else {
          data = await res.text();
        }
          

        if (data.result != "success") return reject(data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}
