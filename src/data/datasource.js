import {URLForEndpoint, NewRequest, parseResponseAndHandleErrors, parseObject} from "../data/requests";
import {ERROR_SERVER_UNREACHABLE} from "../data/datasourceConst";
import axios from "axios";
import jQuery from 'jquery';

const API_HOST = process.env.VUE_APP_ROOT_API || "http://local.emsv2";
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

    // by default, withToken set to true
    callWebService(endPoint, data, method, withToken = true) {
        const request = {
            dataType: "json",
            url: `${API_HOST}${endPoint}`,
            cache: false,
            success: function (response) {
                return response;
            }
        };

        if (method) {
            request.method = method;
        }

        if (data) {
            request.data = data;
        }

        if (withToken) {
            data.token = sessionStorage.getItem('authToken');
            data.UserSchool_Session = sessionStorage.getItem('schoolSession');
            data.UserID_Session = sessionStorage.getItem('userIDSession');
            data.UserType_Session = sessionStorage.getItem('userTypeSession');
            data.UserUniversity_Session = sessionStorage.getItem('userUniversitySession');
        }

        // get token from session
        // const token = sessionStorage.getItem('authToken');

        // if token is available and withToken set as true, then pass request with headers
        // they not using header Authorization so disable this
        // if (token && withToken === true) {
        //     request.headers = {"Authorization": token};
        // }

        return jQuery.ajax(request);
    }


    async login(userId, password) {
        const data = {
            userID: userId,
            userPassword: password
        };
        const response = await this.callWebService("/controller/Login.asmx/checkLogin", data, "POST", false);
        sessionStorage.setItem('authToken', response.token);
        sessionStorage.setItem('schoolSession', response.UserSchool_Session);
        sessionStorage.setItem('userIDSession', response.UserID_Session);
        sessionStorage.setItem('userTypeSession', response.UserType_Session);
        sessionStorage.setItem('userUniversitySession', response.UserUniversity_Session);
        sessionStorage.setItem('usRidSession', response.USRid_Session);
        return response;
    }

    async parentRegister(userEmail, userPassword, studentIDNo, studentID_Index, studentDOB, studentIDType) {
        const data = {
            userEmail: userEmail,
            userPassword: userPassword,
            studentID_Index: studentID_Index,
            studentDOB: studentDOB,
            studentIDType: studentIDType,
            studentIDNo: studentIDNo
        };
        const response = await this.callWebService("/controller/Register.asmx/parentRegistration", data, "POST", false);
        return response;
    }

    async getStudent(studentId = "", studentIndex = "", studentFirstName = "", studentLastName = "", parentName = "") {
        const data = {
            studentID: studentId,
            studentID_Index: studentIndex,
            studentFirstName: studentFirstName,
            studentLastName: studentLastName,
            parentName: parentName,
            // token: sessionStorage.getItem('authToken'),
            // UserSchool_Session: sessionStorage.getItem('schoolSession'),
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudent", data, "POST");
        return response;
    }

    async getParentList(familyId = "", parentLastName = "", parentFirstName = "") {
        const data = {
            familyID: familyId,
            parentFirstName: parentFirstName,
            parentLastName: parentLastName,
            // token: sessionStorage.getItem('authToken'),
            // UserSchool_Session: sessionStorage.getItem('schoolSession'),
        };
        const response = await this.callWebService("/controller/Parents.asmx/getParentList", data, "POST");
        return response;
    }

    async getUserMenu() {
        const data = {};

        const userType = sessionStorage.getItem('userTypeSession');
        if (userType !== "Parent") {
            data.USRid_Session = sessionStorage.getItem('usRidSession');
        }

        const response = await this.callWebService("/controller/User.asmx/getUserMenu", data, "POST");
        return response;
    }

    async login2(userId, password) {
        const data = {
            username: userId,
            password: password
        };
        const response = await this.callAPI("/login", "POST", null, data);
        sessionStorage.setItem('authToken', response.token);
        return response;
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

