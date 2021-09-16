
import { HTTPTransport as HTTP } from "../modules/HTTPtransport";
import { BaseAPI } from "./BaseApi";

const userAPIInstance = new HTTP("api/v1/messages");

class UserAPI extends BaseAPI {
    create() {
        return userAPIInstance.post('/', {})
            .then({user: {info}} => info);
    }
} 