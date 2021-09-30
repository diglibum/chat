/* eslint-disable camelcase */

export interface BaseRequest {
    [key: string]: string
  }
export interface SignUpRequest extends BaseRequest {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
  }

export interface SignUpResponse {
    id: number
  }

export interface SignInRequest extends BaseRequest {
    login: string,
    password: string
  }

export interface UserProfileRequest extends BaseRequest {
    first_name: "string",
    second_name: "string",
    display_name: "string",
    login: "string",
    email: "string",
    phone: "string"
  }

export interface UserPasswordRequest extends BaseRequest {
    oldPassword: "string",
    newPassword: "string"
  }
