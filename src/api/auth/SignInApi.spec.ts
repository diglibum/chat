/* eslint-disable no-undef */
import * as sinon from "sinon";
import { expect } from "chai";
import { SignInApi } from "./SignInApi";
import { SignInRequest } from "../types";

describe("SignIn API", () => {
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    let xhr: sinon.SinonFakeXMLHttpRequestStatic;
    (global as any).XMLHttpRequest = xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = (request: sinon.SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };
  });

  afterEach(() => {
    (global as any).XMLHttpRequest.restore();
    requests.length = 0;
  });

  it("signIn sends POST to /auth/signin", () => {
    const api = new SignInApi();
    const data: SignInRequest = {
      first_name: "Имя",
      second_name: "Фамилия",
      login: "login",
      email: "email@yandex.ru",
      password: "6fgt!#rLe7",
      phone: "+79165487962"
    };

    api.signIn(data);

    expect(requests.length).to.eq(1);
    expect(requests[0].method).to.eq("POST");
    expect(requests[0].requestBody).to.eq(JSON.stringify(data));
    expect(requests[0].url).to.eq("https://ya-praktikum.tech/api/v2/auth/signin");
  });
});
