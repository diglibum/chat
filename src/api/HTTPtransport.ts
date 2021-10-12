enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type Options = {
  timeout?: number;
  method?: METHODS;
  headers?: Record<string, string>;
  data?: any;
} & Record<string, unknown>;

export class HTTPTransport {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  get = (url: string, options: Options = {}) => {
    const { data } = options;

    if (data) {
      url = data ? `${url}${this.queryStringify(data)}` : url;
      delete options.data;
    }

    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  post = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  put = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  delete = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  private queryStringify = (data: any) => {
    if (typeof data !== "object") {
      throw new Error("Data must be object");
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
      return `${result}${key}=${data[key]}${
        index < keys.length - 1 ? "&" : ""
      }`;
    }, "?");
  };

  private request = (
    url: string,
    options: Options = { method: METHODS.GET },
    timeout = 5000
  ): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data, isRaw = false } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.open(method as string, url);

      if (!isRaw) {
        xhr.setRequestHeader("content-type", "application/json; charset=utf-8");
      }

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        let result;
        if (xhr.status !== 200) {
          reject(JSON.parse(xhr.response).reason);
        }
        try {
          result = JSON.parse(xhr.response);
        } catch {
          result = xhr.response;
        }
        resolve(result);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (!data) {
        xhr.send();
      } else {
        xhr.send(isRaw ? data : JSON.stringify(data));
      }
    });
  };
}
