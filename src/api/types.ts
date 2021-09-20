export interface SignUpRequest {
    firstName: string,
    secondName: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export interface SignUpResponse {
    id: number
}
