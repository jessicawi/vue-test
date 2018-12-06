import {URLForEndpoint, NewRequest, parseResponseAndHandleErrors, parseObject} from "../data/requests";
import {ERROR_SERVER_UNREACHABLE} from "../data/datasourceConst";
import axios from "axios";
import jQuery from 'jquery';

const API_HOST = process.env.VUE_APP_ROOT_API;
export default class DataSource {
    static get shared() {
        if (DataSource.instance == null || DataSource.instance === undefined) {
            DataSource.instance = new DataSource();
        }
        return DataSource.instance;
    }

    async callAPI(endPoint, method = "GET", queryObject, requestBody, hasContentType = true) {
        const url = URLForEndpoint(endPoint, queryObject);
        const request = NewRequest(method, hasContentType);

        if (!hasContentType) {
            delete request.headers["Content-Type"];
            request.body = requestBody;
        } else if (method !== "GET" && requestBody) {
            request.body = JSON.stringify(requestBody);
        }
        let response;
        try {
            response = await fetch(url, request);
        } catch (err) {
            throw ERROR_SERVER_UNREACHABLE;
        }
        return await parseResponseAndHandleErrors(response);
    }


    callWebService(endPoint, data, method) {
        const request = {
            dataType: "json",
            url: `${API_HOST}${endPoint}`,
            cache: false,
            success: function (response) {
                return response
            }
        };

        if (method) {
            request.method = method
        }

        if (data) {
            request.data = data
        }

        return jQuery.ajax(request);
    }


    async login(userId, password) {
        const data = {
            userID: userId,
            userPassword: password
        }
        const response = await this.callWebService("/login", data);
        sessionStorage.setItem('authToken', response.token);
        return response
    }

    async login2(userId, password) {
        const data = {
            username: userId,
            password: password
        }
        const response = await this.callAPI("/login", "POST", null, data)
        sessionStorage.setItem('authToken', response.token);
        return response
    }

    async getCountryList() {
        let response;
        try {
            response = await fetch("http://local.emsv2/controller/Students.asmx/getCountryList?countryID=");
        } catch (err) {
            console.log(err);
            throw ERROR_SERVER_UNREACHABLE;
        }
        return await parseResponseAndHandleErrors(response);
    }

    // SAMPLE 2 using axios
    async PostToGetDataWEIRD() {
        const options = {
            countryID: "",
        };

        let response;
        try {
            response = await axios.post("http://local.emsv2/controller/Students.asmx/getCountryList?countryID=", options);
        } catch (err) {
            console.log(err);
            throw ERROR_SERVER_UNREACHABLE;
        }
        return response.data;
    }

    // POST SAMPLE
    async createStudent() {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const request = {
            method: "POST",
            headers: headers,
        };
        const requestBody = {
            countryID: "",
        };
        request.body = JSON.stringify(requestBody);

        let response;
        try {
            response = await fetch("URL", request);
        } catch (err) {
            console.log(err);
            throw ERROR_SERVER_UNREACHABLE;
        }
        return await parseResponseAndHandleErrors(response);
    }


}

