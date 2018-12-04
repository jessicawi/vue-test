import {URLForEndpoint, NewRequest, parseResponseAndHandleErrors} from "../data/requests";
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

    // SAMPLE 2
    async PostToGetDataWEIRD() {
        const options = {
            countryID: ''
        };

        let response;
        try {
            response = await axios.post('http://local.emsv2/controller/Students.asmx/getCountryList?countryID=', options);
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
            countryID: ''
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


// search javascript fetch API with a SOAP web service in google
//     async soapTest() {
//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         const request = {
//             method: "GET",
//             headers: headers
//         };
//
//         let response;
//         try {
//             response = await fetch("http://local.emsv2/controller/Students.asmx/activeStudent?studentID=string", request);
//             console.log(response, " eton house soap test response, should get 'code:1'")
//         } catch (err) {
//             throw ERROR_SERVER_UNREACHABLE;
//         }
//         return await parseResponseAndHandleErrors(response);
//     }


//test
    async soapRequest() {
        var str =
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap' + '.org/soap/envelope/">' +
            '<soap:Body>' +
            '<getCountryList xmlns="http://tempuri.org/">' +
            '<countryID>string</countryID>' +
            '</getCountryList>' +
            '</soap:Body>' +
            '</soap:Envelope>';


        function createCORSRequest(method, url) {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                xhr.open(method, url, false);
            } else if (typeof XDomainRequest != "undefined") {
                alert;
                xhr = new XDomainRequest();
                xhr.open(method, url);
            } else {
                console.log("CORS not supported");
                alert("CORS not supported");
                xhr = null;
            }
            return xhr;
        }

        var xhr = createCORSRequest("POST", "http://local.emsv2/controller/Students.asmx/getCountryList");
        if (!xhr) {
            console.log("XHR issue");
            return;
        }

        xhr.onload = function () {
            var results = xhr.responseText;
            console.log(results);
        };

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(str);
    }

}
