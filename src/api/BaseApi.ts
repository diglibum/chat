import { BaseRequest } from "./types";

/* eslint-disable @typescript-eslint/no-unused-vars */
export abstract class BaseAPI {
  create (_data?: BaseRequest | unknown): Promise<XMLHttpRequest> { throw new Error("Not implemented"); }

  request (_data?: BaseRequest | unknown): Promise<XMLHttpRequest> { throw new Error("Not implemented"); }

  update (_data?: BaseRequest | unknown): Promise<XMLHttpRequest> { throw new Error("Not implemented"); }

  delete () { throw new Error("Not implemented"); }
}
