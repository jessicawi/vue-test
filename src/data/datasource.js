import {URLForEndpoint, NewRequest, parseResponseAndHandleErrors, parseObject} from "../data/requests";
import {ERROR_SERVER_UNREACHABLE} from "../data/datasourceConst";
import axios from "axios";

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


    // LOGIN SAMPLE, NOT TESTED
    async login(username, password) {
        const headers = new Headers();
        // headers.append("Content-Type", "application/json");
        const request = {
            method: "POST",
            // headers: headers,
        };

        const requestBody = {
            userID: username,
            userPassword: password,
        };
        console.log(requestBody)

        request.body = JSON.stringify(requestBody);

        let response;
        try {
            response = await axios.post("http://local.emsv2/controller/Login.asmx/checkLogin", requestBody);
            console.log(response, ' 1')
            console.log(response.hasOwnProperty("d"), ' 2')
            const data = response.hasOwnProperty("d") ? response.d : response;
            console.log(data, ' 3')
        } catch (err) {
            console.log(err);
            throw ERROR_SERVER_UNREACHABLE;
        }
        return await parseObject(response.data);
    }

    // LOGIN SAMPLE, NOT TESTED
    async login2(username, password) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const request = {
            method: "POST",
            headers: headers,
        };

        const requestBody = {
            userID: username,
            userPassword: password,
        };
        console.log(requestBody)

        request.body = JSON.stringify(requestBody);

        let response;
        try {
            response = await axios("http://local.emsv2/controller/Login.asmx/checkLogin", {
                method: "post",
                headers: {
                    'Content-Type': null
                },
                data: {
                    userID: username,
                    userPassword: password,
                },

            });
        } catch (err) {
            console.log(err);
            throw ERROR_SERVER_UNREACHABLE;
        }
        return await parseResponseAndHandleErrors(response);
    }
}

