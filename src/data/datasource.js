import {URLForEndpoint, NewRequest, parseResponseAndHandleErrors} from "../data/requests";
import {ERROR_SERVER_UNREACHABLE} from "../data/datasourceConst";

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
            delete request.headers['Content-Type'];
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

    async customCatAPI() {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const request = {
            method: "GET",
            headers: headers
        };

        let response;
        try {
            response = await fetch("https://cat-fact.herokuapp.com/facts", request);
        } catch (err) {
            throw ERROR_SERVER_UNREACHABLE;
        }
        return await parseResponseAndHandleErrors(response);
    }

    // SAMPLE 2
    async customCatAPI2() {
        const request = NewRequest('GET');
        let response;
        try {
            response = await fetch("https://cat-fact.herokuapp.com/facts", request);
        } catch (err) {
            throw ERROR_SERVER_UNREACHABLE;
        }
        return await parseResponseAndHandleErrors(response);
    }

// search javascript fetch API with a SOAP web service in google
    async soapTest() {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const request = {
            method: "GET",
            headers: headers
        };

        let response;
        try {
            response = await fetch("http://local.emsv2/controller/Students.asmx/activeStudent?studentID=string", request);
            console.log(response, " eton house soap test response, should get 'code:1'")
        } catch (err) {
            throw ERROR_SERVER_UNREACHABLE;
        }
        return await parseResponseAndHandleErrors(response);
    }

}