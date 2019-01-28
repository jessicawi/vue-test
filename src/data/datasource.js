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

    constructor() {
        this.loggedIn = false;
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
    callWebService(endPoint, data, method, withToken = true, withFormData = false) {
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

        // this is just testing, remove this if savePost not working
        // this might just use for upload file request only(formData), not for whole request
        if (withFormData) {
            request.processData = false;
            request.contentType = false;
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

    async uploadFile(files, postID) {
        console.log(postID);
        const formData = new FormData();
        formData.append('token', sessionStorage.getItem('authToken'));
        formData.append('UserID_Session', sessionStorage.getItem('userIDSession'));

        console.log(files);

        formData.append("file", files[0]);
        formData.append("postID", postID);
        // console.log(formData);
        // console.log(files);

        const request = {
            url: `${API_HOST}/controller/Upload_File.asmx/uploadFile`,
            cache: false,
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        return jQuery.ajax(request);

        // const response = await this.callWebService("/controller/Upload_File.asmx/uploadFile", data, "POST", true, true);
        // return response;
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

    logout() {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('schoolSession');
        sessionStorage.removeItem('userIDSession');
        sessionStorage.removeItem('userTypeSession');
        sessionStorage.removeItem('userUniversitySession');
        sessionStorage.removeItem('usRidSession');
        window.location.replace("/login");

    }

    async resetEmailPassword(userEmail) {
        const data = {
            userEmail: userEmail
        };
        const response = await this.callWebService("/controller/Login.asmx/resetPasswordEmail", data, "POST", false);
        return response;
    }

    async resetPassword(userEmail, userPassword, otp) {
        const data = {
            userEmail: userEmail,
            userPassword: userPassword,
            otp: otp
        };
        const response = await this.callWebService("/controller/Login.asmx/resetPassword", data, "POST", false);
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
        let response = await this.callWebService("/controller/Register.asmx/parentRegistration", data, "POST", false);

        if (typeof response === "string") {
            response = JSON.parse(response);
        }

        return response;

    }

    async getStudent(studentID, studentID_Index, studentFirstName, studentLastName, parentName) {
        const data = {
            studentID: studentID,
            studentID_Index: studentID_Index,
            studentFirstName: studentFirstName,
            studentLastName: studentLastName,
            parentName: parentName,
            // token: sessionStorage.getItem('authToken'),
            // UserSchool_Session: sessionStorage.getItem('schoolSession'),
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudent", data, "POST");
        return response;
    }

    async checkStudentDuplication(studentFirstName, studentLastName, studentDOB, finExpire, fin, birthCert, ic, passport, passportExpire, otherID) {
        const data = {
            studentFirstName: studentFirstName,
            studentLastName: studentLastName,
            studentDOB: studentDOB,
            finExpire: finExpire,
            fin: fin,
            birthCert: birthCert,
            ic: ic,
            passport: passport,
            passportExpire: passportExpire,
            otherID: otherID,
        };
        const response = await this.callWebService("/controller/Students.asmx/checkStudentDuplication", data, "POST");
        return response;
    }

    async getStudentProfilePicture(studentID) {
        const data = {
            studentID: studentID,
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudentProfilePicture", data, "POST");
        return response;
    }

    async saveStudent(files, jsonString, jsonString2, academicYearID, intakeYear, levelID, familyID, parentID) {
        const data = new FormData();
        data.append('token', sessionStorage.getItem('authToken'));
        data.append('UserSchool_Session', sessionStorage.getItem('schoolSession'));
        data.append('UserID_Session', sessionStorage.getItem('userIDSession'));
        data.append('UserUniversity_Session', sessionStorage.getItem('userUniversitySession'));

        if (files && files.length > 1) {
            for (let key in files) {
                 //console.log(key);
                if (files.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        data.append(`upload_${key}`, files[key]);
                    } else {
                        data.append("upload", files[key]);
                    }
                }
            }
        } else if (files) {
            data.append("upload", files[0]);
        }

        data.append("jsonString", jsonString);
        data.append("jsonString2", jsonString2);
        data.append("academicYearID", academicYearID);
        data.append("intakeYear", intakeYear);
        data.append("levelID", levelID);
        data.append("familyID", familyID);
        data.append("parentID", parentID);

        const request = {
            url: `${API_HOST}/controller/Students.asmx/saveStudent`,
            cache: false,
            type: 'POST',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async updateStudent(files, studentID, jsonString) {
        const data = new FormData();
        data.append('token', sessionStorage.getItem('authToken'));

        if (files && files.length > 1) {
            for (let key in files) {
                //console.log(key);
                if (files.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        data.append(`upload_${key}`, files[key]);
                    } else {
                        data.append("upload", files[key]);
                    }
                }
            }
        } else if (files) {
            data.append("upload", files[0]);
        }

        data.append("studentID", studentID);
        data.append("jsonString", jsonString);

        const request = {
            url: `${API_HOST}/controller/Students.asmx/updateStudent`,
            cache: false,
            type: 'POST',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async activeStudent(studentID) {
        const data = {
            studentID: studentID,
        };
        const response = await this.callWebService("/controller/Students.asmx/activeStudent", data, "POST");
        return response;
    }

    async getStudentAvailableStatusAction(currentStatus) {
        const data = {
            currentStatus: currentStatus,
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudentAvailableStatusAction", data, "POST");
        return response;
    }

    async updateStudentStatus(studentID, newStatus) {
        const data = {
            studentID: studentID,
            newStatus: newStatus,
        };
        const response = await this.callWebService("/controller/Students.asmx/updateStudentStatus", data, "POST");
        return response;
    }

    async getParentList(familyId, parentLastName, parentFirstName) {
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

    async getParent(parentID, familyID) {
        const data = {
            parentID: parentID,
            familyID: familyID,
        };
        const response = await this.callWebService("/controller/Parents.asmx/getParent", data, "POST");
        return response;
    }

    async getRelationship(familyID, studentID, parentFirstName, parentLastName, studentName) {
        const data = {
            familyID: familyID,
            studentID: studentID,
            parentFirstName: parentFirstName,
            parentLastName: parentLastName,
            studentName: studentName,
        };
        const response = await this.callWebService("/controller/Parents.asmx/getRelationship", data, "POST");
        return response;
    }

    async updateRelationship(familyID, studentID) {
        const data = {
            familyID: familyID,
            studentID: studentID,
        };
        const response = await this.callWebService("/controller/Parents.asmx/updateRelationship", data, "POST");
        return response;
    }

    async getStudentLevel(studentID) {
        const data = {
            studentID: studentID,
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudentLevel", data, "POST");
        return response;
    }

    async getStudentLevelActiveOnly(studentID) {
        const data = {
            studentID: studentID,
            onlyActive: 'Yes',
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudentLevel", data, "POST");
        return response;
    }

    async getEditClass(semID, subjectcourseID, customClassNotEqual) {
        const data = {
            semID: semID,
            subjectcourseID: subjectcourseID,
            customClassNotEqual: customClassNotEqual,
        };
        const response = await this.callWebService("/controller/Course.asmx/getEditClass", data, "POST");
        return response;
    }

    async getStudentClass(studentID, courseID) {
        const data = {
            studentID: studentID,
            courseID: courseID,
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudentClass", data, "POST");
        return response;
    }

    async setClass(studentID, classID, studentCourseID) {
        const data = {
            studentID: studentID,
            classID: classID,
            studentCourseID: studentCourseID,
        };
        const response = await this.callWebService("/controller/Students.asmx/setClass", data, "POST");
        return response;
    }

    async updateLevel(studentID, studentCourseID, actionMode) {
        const data = {
            studentID: studentID,
            studentCourseID: studentCourseID,
            actionMode: actionMode,
        };
        const response = await this.callWebService("/controller/Students.asmx/updateLevel", data, "POST");
        return response;
    }

    async getSibling(studentID_Index, studentID) {
        const data = {
            studentID_Index: studentID_Index,
            studentID: studentID,
        };
        const response = await this.callWebService("/controller/Students.asmx/getSibling", data, "POST");
        return response;
    }

    async updateParent(parentID, jsonString) {
        const data = {
            parentID: parentID,
            jsonString: jsonString,
        };
        const response = await this.callWebService("/controller/Parents.asmx/updateParent", data, "POST");
        return response;
    }

    async getAcademicYearDateRange(academicYearID) {
        const data = {
            academicYearID: academicYearID,
        };
        const response = await this.callWebService("/controller/Course.asmx/getAcademicYearDateRange", data, "POST");
        return response;
    }

    async setLevel(studentID, levelID, fromDate, toDate, academicYearID, intakeYear) {
        const data = {
            studentID: studentID,
            levelID: levelID,
            fromDate: fromDate,
            toDate: toDate,
            academicYearID: academicYearID,
            intakeYear: intakeYear,
        };
        const response = await this.callWebService("/controller/Students.asmx/setLevel", data, "POST");
        return response;
    }

    async checkParentDuplication(firstName, lastName, checkMode) {
        const data = {
            firstName: firstName,
            lastName: lastName,
            checkMode: checkMode,
        };
        const response = await this.callWebService("/controller/Parents.asmx/checkParentDuplication", data, "POST");
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

    async getStaffPost() {
        const data = {};

        data.UserID_Session = sessionStorage.getItem('userIDSession');

        const response = await this.callWebService("/controller/Posting.asmx/getPostStaff", data, "POST");
        return response;
    }

    async getPostDropdown() {
        const data = {};
        const response = await this.callWebService("/controller/Posting.asmx/getPostDropDown", data, "POST");
        return response;
    }

    async getParentPost() {
        const data = {};

        data.UserID_Session = sessionStorage.getItem('userIDSession');

        const response = await this.callWebService("/controller/Posting.asmx/getPostParent", data, "POST");
        return response;
    }

    async savePost(files, postContent, tagAcademicYearID, profolio, tagUserID, tagClassID, tagLevelID) {
        const formData = new FormData();
        formData.append('token', sessionStorage.getItem('authToken'));
        formData.append('UserID_Session', sessionStorage.getItem('userIDSession'));

        if (files && files.length > 1) {
            for (let key in files) {
                // console.log(key);
                if (files.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        formData.append(`upload_${key}`, files[key]);
                    } else {
                        formData.append("upload", files[key]);
                    }
                }
            }
        } else if (files) {
            formData.append("upload", files[0]);
        }

        formData.append("postContent", postContent);
        formData.append("tagAcademicYearID", tagAcademicYearID);
        formData.append("profolio", profolio);
        formData.append("tagUserID", tagUserID);
        formData.append("tagClassID", tagClassID);
        formData.append("tagLevelID", tagLevelID);

        const request = {
            url: `${API_HOST}/controller/Posting.asmx/savePost`,
            cache: false,
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async getPostFile(postID) {
        const data = {
            postID: postID
        };
        const response = await this.callWebService("/controller/Posting.asmx/getPostFile", data, "POST");
        return response;
    }
    async saveComment(PostID, postContent) {
        const data = {
            postID: PostID,
            postContent: postContent,
        };
        const response = await this.callWebService("/controller/Posting.asmx/savePostComment", data, "POST");
        return response;
    }
    async getComment(PostID) {
        const data = {
            postId: PostID
        };
        const response = await this.callWebService("/controller/Posting.asmx/getPostComment", data, "POST");
        return response;
    }
    async editComment(commentPostID, postContent, actionMode) {
        const data = {
            commentPostID: commentPostID,
            postContent: postContent,
            actionMode: actionMode
        };
        const response = await this.callWebService("/controller/Posting.asmx/updatePostComment", data, "POST");
        return response;
    }
    async deleteComment(commentPostID, postContent, actionMode) {
        const data = {
            commentPostID: commentPostID,
            postContent: postContent,
            actionMode: actionMode
        };
        const response = await this.callWebService("/controller/Posting.asmx/updatePostComment", data, "POST");
        return response;
    }
    async saveGallery(files, fileType, galFolderID, folderName) {

        const formData = new FormData();
        formData.append('token', sessionStorage.getItem('authToken'));
        formData.append('UserID_Session', sessionStorage.getItem('userIDSession'));

        if (files && files.length > 1) {
            for (let key in files) {
                // console.log(key);
                if (files.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        formData.append(`upload_${key}`, files[key]);
                    } else {
                        formData.append("upload", files[key]);
                    }
                }
            }
        } else if (files) {
            formData.append("upload", files[0]);
        }

        formData.append("fileType", fileType);
        formData.append("galFolderID", galFolderID);
        formData.append("folderName", folderName);

        const request = {
            url: `${API_HOST}/controller/Gallery.asmx/saveFile`,
            cache: false,
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;

    }

    async pendingPost(ID, PostID, PostContent, PostStatus, PostCreatedDate, PostApproverID) {
        const data = {
            ID: ID,
            PostID: PostID,
            PostContent: PostContent,
            PostStatus: PostStatus,
            PostCreatedDate: PostCreatedDate,
            PostApproverID: PostApproverID
        };
        data.UserID_Session = sessionStorage.getItem('userIDSession');
        const response = await this.callWebService("/controller/Posting.asmx/getPendingApproverPost", data, "POST");
        return response;
    }

    async approvePost(postApproverID, actionStatus) {
        const data = {
            actionStatus: actionStatus,
            postApproverID: postApproverID,
        };
        data.UserID_Session = sessionStorage.getItem('userIDSession');
        const response = await this.callWebService("/controller/Posting.asmx/approvePost", data, "POST");
        return response;
    }

    async updatePost(currentFiles, actionStatus, postID, UpdateContent, profolio, tagUserID, tagClassID, tagLevelID) {
        const formData = new FormData();
        formData.append('token', sessionStorage.getItem('authToken'));
        formData.append('UserID_Session', sessionStorage.getItem('userIDSession'));
        console.log(currentFiles);
        if (currentFiles && currentFiles.length > 1) {
            for (let key in currentFiles) {
                // console.log(key);
                if (currentFiles.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        formData.append(`upload_${key}`, currentFiles[key]);
                    } else {
                        formData.append("upload", currentFiles[key]);
                    }
                }
            }
        } else if (currentFiles) {
            formData.append("upload", currentFiles[0]);
        }

        formData.append("actionStatus", actionStatus);
        formData.append("postID", postID);
        formData.append("UpdateContent", UpdateContent);
        formData.append("profolio", profolio);
        formData.append("tagUserID", tagUserID);
        formData.append("tagClassID", tagClassID);
        formData.append("tagLevelID", tagLevelID);

        const request = {
            url: `${API_HOST}/controller/Posting.asmx/updatePost`,
            cache: false,
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }


    async softDeletePost(postId, profolio) {
        const data = {
            postID: postId,
            profolio,
            actionStatus: "Void"
        };

        const response = await this.callWebService("/controller/Posting.asmx/updatePost", data, "POST");
        return response;
    }


    async getApproverMaster() {
        const data = {};

        data.UserSchool_Session = sessionStorage.getItem('schoolSession');

        const response = await this.callWebService("/controller/Posting.asmx/getApproverMaster", data, "POST");
        return response;
    }

    async saveApproverMaster(approverLevel, approverUserID) {
        const data = {
            approverLevel: approverLevel,
            approverUserID: approverUserID
        };

        data.UserSchool_Session = sessionStorage.getItem('schoolSession');
        data.UserID_Session = sessionStorage.getItem('userIDSession');

        const response = await this.callWebService("/controller/Posting.asmx/saveApproverMaster", data, "POST");
        return response;
    }

    async updateApproverMaster(approverID, approverLevel, approverUserID, status) {
        const data = {
            approverID: approverID,
            approverLevel: approverLevel,
            approverUserID: approverUserID,
            status: status,
        };

        // data.UserSchool_Session = sessionStorage.getItem('schoolSession');
        // data.UserID_Session = sessionStorage.getItem('userIDSession');

        const response = await this.callWebService("/controller/Posting.asmx/updateApproverMaster", data, "POST");
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
        // let response;
        // try {
        //     response = await fetch("http://local.emsv2/controller/Students.asmx/getCountryList");
        // } catch (err) {
        //     console.log(err);
        //     throw ERROR_SERVER_UNREACHABLE;
        // }
        // return await parseResponseAndHandleErrors(response);

        const data = {};

        const response = await this.callWebService("/controller/Students.asmx/getCountryList", data, "POST");
        return response;
    }

    async getLevel(customLevelNotEqual) {
        const data = {
            customLevelNotEqual: customLevelNotEqual,
        };
        const response = await this.callWebService("/controller/Course.asmx/getLevel", data, "POST");
        return response;
    }

    async getStudentDropDownList(jsonString) {
        const data = {
            jsonString: jsonString,
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudentDropDownList", data, "POST");
        return response;
    }

    async getAcademicYear() {
        const data = {};
        const response = await this.callWebService("/controller/Course.asmx/getAcademicYear", data, "POST");
        return response;
    }

    async getIntakeYear() {
        const data = {};
        const response = await this.callWebService("/controller/Students.asmx/getIntakeYear", data, "POST");
        return response;
    }

    async getUserList() {
        const data = {};
        const response = await this.callWebService("/controller/UserMagt.asmx/getUserList", data, "POST");
        return response;
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
        request.body = JSON.stringify(rquestBody);

        let response;
        try {
            response = await fetch("URL", request);
        } catch (err) {
            console.log(err);
            throw ERROR_SERVER_UNREACHABLE;
        }
        return await parseResponseAndHandleErrors(response);
    }

    async getAttendanceClass() {
        const data = {};
        const response = await this.callWebService("/controller/Attendance.asmx/getAttendanceClass", data, "POST");
        return response;
    }

    async LoadAttendanceList(classValue) {
        const data = {
            classValue: classValue,
        };
        const response = await this.callWebService("/controller/Attendance.asmx/LoadAttendanceList", data, "POST");
        return response;
    }

    async updateAttendanceList(attID, jsonString) {
        const data = {
            attID: attID,
            jsonString: jsonString,
        };
        const response = await this.callWebService("/controller/Attendance.asmx/updateAttendanceList", data, "POST");
        return response;
    }

    //#region Gallery
    async getFiles(galFolderID, startRowNo, endRowNo) {
        const data = {
            galFolderID: galFolderID,
            startRowNo: startRowNo,
            endRowNo: endRowNo,
            fileRetrieveMode: "File"
        };

        const response = await this.callWebService("/controller/Gallery.asmx/getFile", data, "POST");
        return response;
    }

    async getFolders(galFolderID) {
        const data = {
            galFolderID: galFolderID,
            fileRetrieveMode: "Folder"
        };

        const response = await this.callWebService("/controller/Gallery.asmx/getFile", data, "POST");
        return response;
    }

    async downloadFile(galID) {
        const data = {
            galID: galID
        };

        const response = await this.callWebService("/controller/Gallery.asmx/downloadFile", data, "POST");
        return response;
    }

    async saveFile(files, fileType, galFolderID, folderName) {
        const formData = new FormData();

        formData.append('fileType', fileType);
        formData.append('galFolderID', galFolderID);
        formData.append('token', sessionStorage.getItem('authToken'));
        formData.append('UserID_Session', sessionStorage.getItem('userIDSession'));
        formData.append('folderName', folderName);

        if (files && files.length > 1) {
            for (let i = 0; i < files.length; i++) {
                formData.append("files"+i, files[i]);
                console.log(files[i])
            }
        } else if (files) {
            formData.append("files", files[0]);
        }

        const request = {
            url: `${API_HOST}/controller/Gallery.asmx/saveFile`,
            cache: false,
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async removeFile(galID) {
        const data = {
            galID: galID,
            updateFileMode: "Delete"
        };

        const response = await this.callWebService("/controller/Gallery.asmx/updateFile", data, "POST");
        return response;
    }

    async renameFile(galID, folderRename) {
        const data = {
            galID : galID,
            folderRename: folderRename,
            updateFileMode: "Rename"
        };

        const response = await this.callWebService("/controller/Gallery.asmx/updateFile", data, "POST");
        return response;
    }

    async moveFile(galID, galFolderID) {
        const data = {
            galID: galID,
            galFolderID: galFolderID,
            updateFileMode: "Move"
        };

        console.log(data)

        const response = await this.callWebService("/controller/Gallery.asmx/updateFile", data, "POST");
        return response;
    }
    //#endregion
}

