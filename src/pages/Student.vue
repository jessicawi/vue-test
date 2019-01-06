<template>
    <div id="student" class="mt-3 container">
        <div class="row form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" >
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <label>Mode: </label><label>{{lblCreateOrEdit}}</label>
                <label style="display:none;">{{lblStudentID}}</label>
                <label style="display:none;">{{lblParentID}}</label>
            </div>
        </div>

        <div class="row form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" >
            <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 studentAreaDiv">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h2>Personal Information</h2>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>First Name</label>
                    <input type="text" class="form-control" v-model="inputStudentFirstName">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Middle Name</label>
                    <input type="text" class="form-control" v-model="inputStudentMiddleName">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Last Name</label>
                    <input type="text" class="form-control"  v-model="inputStudentLastName">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Preferred Name</label>
                    <input type="text" class="form-control"  v-model="inputStudentPreferredName">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Nationality</label>
                    <select v-model="ddlStudentNationality" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in countryList" v-bind:value="{ id: item.CNYnationality.trim(), text: item.CNYname.trim() }">{{ item.CNYname.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Gender</label>
                    <select v-model="ddlStudentGender" class="form-control pro-edt-select form-control-primary">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Date of Birth</label>
                    <div class="date">
                        <el-date-picker v-model="inputStudentDateOfBirth" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date" placeholder="Pick a date"></el-date-picker>
                    </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Birth Place</label>
                    <select v-model="ddlStudentBirthPlace" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in countryList" v-bind:value="{ id: item.CNYnationality.trim(), text: item.CNYname.trim() }">{{ item.CNYname.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Identification Type</label>
                    <select v-model="ddlStudentIdentificationType" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentIdentificationTypeList" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Identification No</label>
                    <input type="text" class="form-control"  v-model="inputStudentIdentificationNo">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Identification Expiry Date</label>
                    <div class="date">
                        <el-date-picker v-model="inputStudentIdentificationExpiryDate" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"></el-date-picker>

                    </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Religion</label>
                    <select v-model="ddlStudentReligion" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentReligionList" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Additional Language</label>
                    <select v-model="ddlStudentAdditionalLanguage" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentAdditionalLanguageList" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>1st Emergency Contact No</label>
                    <input type="text" class="form-control"  v-model="inputStudent1stEmergencyContactNo">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>2nd Emergency Contact No</label>
                    <input type="text" class="form-control"  v-model="inputStudent2ndEmergencyContactNo">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Meal Preferences</label>
                    <select v-model="ddlStudentMealPreferences" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentMealPreferencesList" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>First Language Spoken</label>
                    <input type="text" class="form-control"  v-model="inputStudentFirstLanguageSpoken">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Second Language Spoken</label>
                    <input type="text" class="form-control"  v-model="inputSecondLanguageSpoken">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Membership</label>
                    <select v-model="ddlStudentMembership" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentMembershipList" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
                    </select>
                </div>
            </div>

            <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 studentAreaDiv">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h2>Registration Details</h2>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Select Level</label>
                    <select v-model="ddlStudentSelectLevel" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in levelList" v-bind:value="{ id: item.PK_Course_ID.trim(), text: item.CRS_Course_Name.trim() }">{{ item.CRS_Course_Name.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>First Commencement Date</label>
                    <div class="date">
                        <el-date-picker v-model="inputFirstCommencementDate" type="date" format="dd/MM/yyyy" value-format="dd/MM/yyyy" placeholder="Pick a day"></el-date-picker>
                    </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>First Academic Year</label>
                    <select v-model="ddlStudentFirstAcademicYear" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in academicYearList" v-bind:value="{ id: item.PK_Semester_ID.trim(), text: item.SMT_Code.trim() }">{{ item.SMT_Code.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Residency Status</label>
                    <select v-model="ddlStudentResidencyStatus" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentResidencyStatusList" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Payer</label>
                    <select v-model="ddlStudentPayer" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentPayerList" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Student ID</label>
                    <input type="text" class="form-control" v-model="inputStudentID" readonly="readonly">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Intake Year</label>
                    <select v-model="ddlStudentIntakeYear" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in studentIntakeYearList" v-bind:value="{ id: item.PK_PAI_ID.trim(), text: item.PAI_Intake_No.trim() }">{{ item.PAI_Intake_No.trim() }}</option>
                    </select>
                </div>
            </div>

            <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 studentAreaDiv">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h2>Student Permanent Address</h2>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Address 1</label>
                    <input type="text" class="form-control"  v-model="inputStudentAddress1">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Address 2</label>
                    <input type="text" class="form-control"  v-model="inputStudentAddress2">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Address 3</label>
                    <input type="text" class="form-control"  v-model="inputStudentAddress3">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>City</label>
                    <input type="text" class="form-control"  v-model="inputStudentCity">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Country</label>
                    <select v-model="ddlStudentAddressCountry" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in countryList" v-bind:value="{ id: item.CNYnationality.trim(), text: item.CNYname.trim() }">{{ item.CNYname.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Postal Code</label>
                    <input type="text" class="form-control"  v-model="inputStudentPostalCode">
                </div>
            </div>

            <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 studentAreaDiv">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h2>Student Correspondance Address</h2>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Address 1</label>
                    <input type="text" class="form-control"  v-model="inputStudentCorrespondanceAddress1">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Address 2</label>
                    <input type="text" class="form-control"  v-model="inputStudentCorrespondanceAddress2">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Address 3</label>
                    <input type="text" class="form-control"  v-model="inputStudentCorrespondanceAddress3">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>City</label>
                    <input type="text" class="form-control"  v-model="inputStudentCorrespondanceCity">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Country</label>
                    <select v-model="ddlStudentAddressCorrespondanceCountry" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in countryList" v-bind:value="{ id: item.CNYnationality.trim(), text: item.CNYname.trim() }">{{ item.CNYname.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Postal Code</label>
                    <input type="text" class="form-control"  v-model="inputStudentCorrespondancePostalCode">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Mobile No</label>
                    <input type="text" class="form-control"  v-model="inputStudentMobileNo">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Home Tel No</label>
                    <input type="text" class="form-control"  v-model="inputStudentOfficeTelNo">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Email</label>
                    <input type="text" class="form-control"  v-model="inputStudentEmail">
                </div>
            </div>

            <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 studentAreaDiv">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h2>Medical Details</h2>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Major Ailments List</label>
                    <textarea rows="3" style="width:100%;resize:none;" v-model="taMajorAilmentsList"></textarea>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Medication Allergies List</label>
                    <textarea rows="3" style="width:100%;resize:none;" v-model="taMedicationAllergiesList"></textarea>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Blood Group</label>
                    <input type="text" class="form-control"  v-model="inputBloodGroup">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Blood Donor No</label>
                    <input type="text" class="form-control"  v-model="inputBloodDonorNo">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Name of Family Doctor</label>
                    <input type="text" class="form-control"  v-model="inputNameofFamilyDoctor">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Clinic Address</label>
                    <input type="text" class="form-control"  v-model="inputClinicAddress">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Clinic Phone No</label>
                    <input type="text" class="form-control"  v-model="inputClinicPhoneNo">
                </div>
            </div>
        </div>

        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="review-content-section">
                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 familyIDAreaDiv">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Family No</label>
                        <input type="text" class="form-control" v-model="inputFamilyID" readonly="readonly">
                        <input type="text" class="form-control" v-model="inputFamilyParentID" style="display:none;" >
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label style="width:100%;">Search Family</label>
                        <button v-bind:disabled="editModeDisable" type="button" class="btn btn-primary waves-effect waves-light m-r-10" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#myModal" style="display:block;" id="btnSearchFamilyID">Search</button>
                    </div>
                </div>

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 parentAreaDiv">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h2>Father's Details</h2>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Parent Mode</label>
                        <select v-model="ddlParentMode" v-bind:disabled="editModeDisable" class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in ddlParentModeList" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
                        </select>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>First Name</label>
                        <input type="text" class="form-control"  v-model="inputFatherFirstName">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Middle Name</label>
                        <input type="text" class="form-control"  v-model="inputFatherMiddleName" v-bind:disabled="editModeDisable">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Last Name</label>
                        <input type="text" class="form-control"  v-model="inputFatherLastName" v-bind:disabled="editModeDisable">
                        <label id = "lblFatherNameDuplicated" style="display:none;">Father name is duplicated, please double confirm</label>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Date of Birth</label>
                        <div class="date">
                            <el-date-picker v-model="inputFatherDateofBirth" v-bind:disabled="editModeDisable" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"></el-date-picker>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Occupation</label>
                        <input type="text" class="form-control"  v-model="inputFatherOccupation" v-bind:disabled="editModeDisable">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification Type</label>
                        <select v-model="ddlFatherIdentificationType" v-bind:disabled="editModeDisable" class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in ddlFatherIdentificationTypeList" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
                        </select>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification No</label>
                        <input type="text" class="form-control"  v-model="inputFatherIdentificationNo" v-bind:disabled="editModeDisable">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification No Expiry Date</label>
                        <div class="date">
                            <el-date-picker v-model="inputFatherIdentificationNoExpiryDate" v-bind:disabled="editModeDisable" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"></el-date-picker>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Mobile No</label>
                        <input type="text" class="form-control"  v-model="inputFatherMobileNo" v-bind:disabled="editModeDisable">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Email</label>
                        <input type="text" class="form-control"  v-model="inputFatherEmail" v-bind:disabled="editModeDisable">
                    </div>
                </div>

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 parentAreaDiv">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h2>Mother's Details</h2>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>First Name</label>
                        <input type="text" class="form-control"  v-model="inputMotherFirstName" v-bind:disabled="editModeDisable">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Middle Name</label>
                        <input type="text" class="form-control"  v-model="inputMotherMiddleName" v-bind:disabled="editModeDisable">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Last Name</label>
                        <input type="text" class="form-control"  v-model="inputMotherLastName" v-bind:disabled="editModeDisable">
                        <label id = "lblMotherNameDuplicated" style="display:none;">Mother name is duplicated, please double confirm</label>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Date of Birth</label>
                        <div class="date">
                            <el-date-picker v-model="inputMotherDateofBirth" v-bind:disabled="editModeDisable" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"></el-date-picker>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Occupation</label>
                        <input type="text" class="form-control"  v-model="inputMotherOccupation" v-bind:disabled="editModeDisable">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification Type</label>
                        <select v-model="ddlMotherIdentificationType" v-bind:disabled="editModeDisable" class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in ddlMotherIdentificationTypeList" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
                        </select>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification No</label>
                        <input type="text" class="form-control" v-model="inputMotherIdentificationNo" v-bind:disabled="editModeDisable">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification No Expiry Date</label>
                        <div class="date">
                            <el-date-picker v-model="inputMotherIdentificationNoExpiryDate" v-bind:disabled="editModeDisable" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"></el-date-picker>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Mobile No</label>
                        <input type="text" class="form-control"  v-model="inputMotherMobileNo" v-bind:disabled="editModeDisable">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Email</label>
                        <input type="text" class="form-control"  v-model="inputMotherEmail" v-bind:disabled="editModeDisable">
                    </div>
                </div>

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 parentAreaDiv">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h2>Residential/Billing Address</h2>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Address 1</label>
                        <input type="text" class="form-control"  v-model="inputParentAddress1" v-bind:disabled="editModeDisable">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Address 2</label>
                        <input type="text" class="form-control"  v-model="inputParentAddress2" v-bind:disabled="editModeDisable">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Address 3</label>
                        <input type="text" class="form-control"  v-model="inputParentAddress3" v-bind:disabled="editModeDisable">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>City</label>
                        <input type="text" class="form-control"  v-model="inputParentCity" v-bind:disabled="editModeDisable">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Landline No</label>
                        <input type="text" class="form-control"  v-model="inputParentLandlineNo" v-bind:disabled="editModeDisable">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Country</label>
                        <select v-model="ddlParentCountry" v-bind:disabled="editModeDisable" class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in countryList" v-bind:value="{ id: item.CNYnationality.trim(), text: item.CNYname.trim() }">{{ item.CNYname.trim() }}</option>
                        </select>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Postal Code</label>
                        <input type="text" class="form-control"  v-model="inputParentPostalCode" v-bind:disabled="editModeDisable">
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="text-center mg-b-pro-edt custom-pro-edt-ds">
                <button type="button" ID="btnSave" class="btn btn-primary waves-effect waves-light m-r-10" v-on:click="Save">Save</button>
                <button type="button" ID="btnActivate" class="btn btn-primary waves-effect waves-light m-r-10" style="display:none;">Activate</button>
            </div>
        </div>
    </div>



</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: "Student",
        async created() {
            await this.BindCountryList();
            await this.BindStudentDropdown();
            await this.BindStudentLevel();
            await this.BindAcademicYear();
            await this.BindStudentIntakeYear();
        },
        async mounted() {
            await this.LoadStudentParentInfo();
        },
        data() {
            return {
                countryList: [],
                ddlStudentIdentificationTypeList: [],
                ddlStudentReligionList: [],
                ddlStudentAdditionalLanguageList: [],
                ddlStudentMealPreferencesList: [],
                ddlStudentMembershipList: [],
                ddlStudentResidencyStatusList: [],
                ddlStudentPayerList: [],
                ddlFatherIdentificationTypeList: [],
                ddlMotherIdentificationTypeList: [],
                ddlParentModeList: [],
                levelList: [],
                academicYearList: [],
                studentIntakeYearList: [],

                inputStudentDateOfBirth: '',
                inputFatherDateofBirth: '',
                inputStudentIdentificationExpiryDate: '',
                inputFirstCommencementDate: '',
                inputFatherIdentificationNoExpiryDate: '',
                inputMotherDateofBirth: '',
                inputMotherIdentificationNoExpiryDate: '',
                ddlStudentGender: '',
                inputStudentFirstName: '',
                inputStudentMiddleName: '',
                inputStudentLastName: '',
                inputStudentPreferredName: '',
                ddlStudentNationality: '',
                ddlStudentBirthPlace: '',
                inputStudentIdentificationNo: '',
                inputStudent1stEmergencyContactNo: '',
                inputStudent2ndEmergencyContactNo: '',
                inputStudentFirstLanguageSpoken: '',
                inputSecondLanguageSpoken: '',
                ddlStudentSelectLevel: '',
                ddlStudentFirstAcademicYear: '',
                inputStudentID: '',
                ddlStudentIntakeYear: '',
                inputStudentAddress1: '',
                inputStudentAddress2: '',
                inputStudentAddress3: '',
                inputStudentCity: '',
                inputStudentPostalCode: '',
                inputStudentCorrespondanceAddress1: '',
                inputStudentCorrespondanceAddress2: '',
                inputStudentCorrespondanceAddress3: '',
                inputStudentCorrespondanceCity: '',
                ddlStudentAddressCorrespondanceCountry: '',
                inputStudentCorrespondancePostalCode: '',
                inputStudentMobileNo: '',
                inputStudentOfficeTelNo: '',
                inputStudentEmail: '',
                taMajorAilmentsList: '',
                taMedicationAllergiesList: '',
                inputBloodGroup: '',
                inputBloodDonorNo: '',
                inputNameofFamilyDoctor: '',
                inputClinicAddress: '',
                inputClinicPhoneNo: '',
                inputFamilyID: '',
                inputFamilyParentID: '',
                inputFatherFirstName: '',
                inputFatherMiddleName: '',
                inputFatherLastName: '',
                inputFatherOccupation: '',
                inputFatherIdentificationNo: '',
                inputFatherMobileNo: '',
                inputFatherEmail: '',
                inputMotherFirstName: '',
                inputMotherMiddleName: '',
                inputMotherLastName: '',
                inputMotherOccupation: '',
                inputMotherIdentificationNo: '',
                inputMotherMobileNo: '',
                inputMotherEmail: '',
                inputParentAddress1: '',
                inputParentAddress2: '',
                inputParentAddress3: '',
                inputParentCity: '',
                inputParentLandlineNo: '',
                ddlParentCountry: '',
                inputParentPostalCode: '',
                ddlStudentAddressCountry: '',
                ddlStudentIdentificationType: '',
                ddlStudentReligion: '',
                ddlStudentAdditionalLanguage: '',
                ddlStudentMealPreferences: '',
                ddlStudentMembership: '',
                ddlStudentResidencyStatus: '',
                ddlStudentPayer: '',
                ddlFatherIdentificationType: '',
                ddlMotherIdentificationType: '',
                ddlParentMode: '',

                editModeDisable:'',
                lblCreateOrEdit:'',
                lblStudentID:'',
                lblParentID: '',
            };
        },
        methods: {
            async BindCountryList() {
                try {
                    const response = await DataSource.shared.getCountryList();
                    if (response) {
                        this.countryListResponse = response.Table;
                        this.countryListResponse.forEach(m => {
                            this.countryList.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentDropdown() {
                try {
                    let jsonString = '"Student Identification Type":"Student Identification Type"';
                    jsonString = jsonString + ',"Religion":"Religion"';
                    jsonString = jsonString + ',"Mother Tongue":"Mother Tongue"';
                    jsonString = jsonString + ',"Meal Preferences":"Meal Preferences"';
                    jsonString = jsonString + ',"Student Membership":"Student Membership"';
                    jsonString = jsonString + ',"Residency Status":"Residency Status"';
                    jsonString = jsonString + ',"Sponsorship Type":"Sponsorship Type"';
                    jsonString = jsonString + ',"ParentID":"ParentID"';
                    jsonString = jsonString + ',"Parent Mode":"Parent Mode"';
                    jsonString = "{" + jsonString + "}";

                    const response = await DataSource.shared.getStudentDropDownList(jsonString);
                    if (response) {
                        this.studentDropDownListResponse = response.Table;
                        this.studentDropDownListResponse.forEach(m => {

                            if (m.OGPname.trim() === "Student Identification Type") {
                                this.ddlStudentIdentificationTypeList.push(m);
                            }
                            else if (m.OGPname.trim() === 'Religion') {
                                this.ddlStudentReligionList.push(m);
                            }
                            else if (m.OGPname.trim() === 'Mother Tongue') {
                                this.ddlStudentAdditionalLanguageList.push(m);
                            }
                            else if (m.OGPname.trim() === 'Meal Preferences') {
                                this.ddlStudentMealPreferencesList.push(m);
                            }
                            else if (m.OGPname.trim() === 'Student Membership') {
                                this.ddlStudentMembershipList.push(m);
                            }
                            else if (m.OGPname.trim() === 'Residency Status') {
                                this.ddlStudentResidencyStatusList.push(m);
                            }
                            else if (m.OGPname.trim() === 'Sponsorship Type') {
                                this.ddlStudentPayerList.push(m);
                            }
                            else if (m.OGPname.trim() === 'ParentID') {
                                this.ddlFatherIdentificationTypeList.push(m);
                                this.ddlMotherIdentificationTypeList.push(m);
                            }
                            else if (m.OGPname.trim() === 'Parent Mode') {
                                this.ddlParentModeList.push(m);
                            }
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentLevel() {
                try {
                    const response = await DataSource.shared.getLevel();
                    if (response) {
                        this.levelListResponse = response.Table;
                        this.levelListResponse.forEach(m => {
                            this.levelList.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindAcademicYear() {
                try {
                    const response = await DataSource.shared.getAcademicYear();
                    if (response) {
                        this.academicYearListResponse = response.Table;
                        this.academicYearListResponse.forEach(m => {
                            this.academicYearList.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentIntakeYear() {
                try {
                    const response = await DataSource.shared.getIntakeYear();
                    if (response) {
                        this.studentIntakeYearListResponse = response.Table;
                        this.studentIntakeYearListResponse.forEach(m => {
                            this.studentIntakeYearList.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async LoadStudentParentInfo() {
                try {
                    if (this.$route.query.id != null)
                    {
                        this.lblCreateOrEdit = "Edit";
                        this.lblStudentID = this.$route.query.id;
                        this.editModeDisable = true;

                        const response = await DataSource.shared.getStudent(this.$route.query.id, "", "", "", "");

                        if (response)
                        {

                        }
                    }
                    else
                    {
                        this.lblCreateOrEdit = "New";
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async Save() {
                try {
                    //students
                    let jsonString = '"Full_Name":"' + this.inputStudentFirstName + '"';
                    jsonString = jsonString + ',"Middle_name":"' + this.inputStudentMiddleName + '"';
                    jsonString = jsonString + ',"Last_name":"' + this.inputStudentLastName + '"';
                    jsonString = jsonString + ',"Sex":"' + this.ddlStudentGender + '"';
                    jsonString = jsonString + ',"st_corr_add_flrNo":"' + this.inputStudentCorrespondanceAddress1 + '"';
                    jsonString = jsonString + ',"st_corr_add_blkNo":"' + this.inputStudentCorrespondanceAddress2 + '"';
                    jsonString = jsonString + ',"st_corr_add_stName":"' + this.inputStudentCorrespondanceCity + '"';
                    jsonString = jsonString + ',"st_corr_add_pstcode":"' + this.inputStudentCorrespondancePostalCode + '"';
                    jsonString = jsonString + ',"st_prm_add_pstcode":"' + this.inputStudentPostalCode + '"';
                    jsonString = jsonString + ',"st_prm_add_blkNo":"' + this.inputStudentAddress1 + '"';
                    jsonString = jsonString + ',"st_prm_add_flrNo":"' + this.inputStudentAddress2 + '"';
                    jsonString = jsonString + ',"st_prm_add_BlgName":"' + this.inputStudentAddress3 + '"';
                    jsonString = jsonString + ',"DOB":"' + this.inputStudentDateOfBirth + '"';
                    jsonString = jsonString + ',"St_Religion":"' + this.ddlStudentReligion.id + '"';
                    jsonString = jsonString + ',"Nationality":"' + this.ddlStudentNationality.id + '"';
                    jsonString = jsonString + ',"Regst_date":"' + this.inputFirstCommencementDate + '"';
                    jsonString = jsonString + ',"st_prm_add_country":"' + this.ddlStudentAddressCountry.id + '"';
                    jsonString = jsonString + ',"Handphone":"' + this.inputStudentMobileNo + '"';
                    jsonString = jsonString + ',"st_corr_add_BlgName":"' + this.inputStudentCorrespondanceAddress3 + '"';
                    jsonString = jsonString + ',"student_type":"' + this.ddlStudentResidencyStatus.id + '"';
                    jsonString = jsonString + ',"sponsor_type":"' + this.ddlStudentPayer.id + '"';
                    jsonString = jsonString + ',"ID_Type":"' + this.ddlStudentIdentificationType.id + '"';
                    jsonString = jsonString + ',"ID_Number":"' + this.inputStudentIdentificationNo + '"';
                    jsonString = jsonString + ',"st_prm_add_stName":"' + this.inputStudentCity + '"';
                    jsonString = jsonString + ',"st_corr_add_country":"' + this.ddlStudentAddressCorrespondanceCountry.id + '"';
                    jsonString = jsonString + ',"Fax":"' + this.inputStudent2ndEmergencyContactNo + '"';
                    jsonString = jsonString + ',"email":"' + this.inputStudentEmail + '"';
                    jsonString = jsonString + ',"Telephone":"' + this.inputStudent1stEmergencyContactNo + '"';
                    jsonString = jsonString + ',"Offphone":"' + this.inputStudentOfficeTelNo + '"';
                    jsonString = jsonString + ',"Course_Type":"' + this.ddlStudentSelectLevel + '"';
                    jsonString = jsonString + ',"Family_Doctor":"' + this.inputNameofFamilyDoctor + '"';
                    jsonString = jsonString + ',"Ailments":"' + this.taMajorAilmentsList + '"';
                    jsonString = jsonString + ',"medication_allergic_to":"' + this.taMedicationAllergiesList + '"';
                    jsonString = jsonString + ',"BLD_grp":"' + this.inputBloodGroup + '"';
                    jsonString = jsonString + ',"BLD_donor_no":"' + this.inputBloodDonorNo + '"';
                    jsonString = jsonString + ',"clinic_add":"' + this.inputClinicAddress + '"';
                    jsonString = jsonString + ',"clinic_ph_no":"' + this.inputClinicPhoneNo + '"';
                    jsonString = jsonString + ',"Semester":"' + this.ddlStudentFirstAcademicYear.id + '"';
                    jsonString = jsonString + ',"St_Preferred_Name":"' + this.inputStudentPreferredName + '"';
                    jsonString = jsonString + ',"St_Mother_Tongue":"' + this.ddlStudentAdditionalLanguage.id + '"';
                    jsonString = jsonString + ',"St_Meal_Preferences":"' + this.ddlStudentMealPreferences.id + '"';
                    jsonString = jsonString + ',"St_Birth_Place":"' + this.ddlStudentBirthPlace.id + '"';
                    jsonString = jsonString + ',"St_AdditionalLanguage":"' + this.inputStudentFirstLanguageSpoken + '"';
                    jsonString = jsonString + ',"St_SecondLanguageSpoken":"' + this.inputSecondLanguageSpoken + '"';
                    jsonString = jsonString + ',"ST_StudentMemership":"' + this.ddlStudentMembership.id + '"';
                    jsonString = jsonString + ',"ID_ExpDate":"' + this.inputStudentIdentificationExpiryDate + '"';
                    //students

                    //parent
                    let jsonString2 = '"PAR_Mode":"' + this.ddlParentMode.id + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_FirstName":"' + this.inputFatherFirstName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_MiddleName":"' + this.inputFatherMiddleName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_LastName":"' + this.inputFatherLastName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_DOB":"' + this.inputFatherDateofBirth + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Occupation":"' + this.inputFatherOccupation + '"';
                    jsonString2 = jsonString2 + ',"PAR_FatResContact":"' + this.inputParentLandlineNo  + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Phone":"' + this.inputFatherMobileNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Email":"' + this.inputFatherEmail + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_IDType":"' + this.ddlFatherIdentificationType.id + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_UID":"' + this.inputFatherIdentificationNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_Residence_No":"' + this.inputParentAddress1 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_Address1":"' + this.inputParentAddress2 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_Address2":"' + this.inputParentAddress3 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_Postalcode":"' + this.inputParentPostalCode + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_City":"' + this.inputParentCity + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_Country":"' + this.ddlParentCountry + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_City":"' + this.inputParentCity + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Country":"' + this.ddlParentCountry.id + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_PostalCode":"' + this.inputParentPostalCode + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_FirstName":"' + this.inputMotherFirstName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_MiddleName":"' + this.inputMotherMiddleName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_LastName":"' + this.inputMotherLastName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_DOB":"' + this.inputMotherDateofBirth + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Occupation":"' + this.inputMotherOccupation + '"';
                    jsonString2 = jsonString2 + ',"PAR_MotResContact":"' + this.inputParentLandlineNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Phone":"' + this.inputMotherMobileNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Email":"' + this.inputMotherEmail + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_IDType":"' + this.ddlMotherIdentificationType.id + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_UID":"' + this.inputMotherIdentificationNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Residence_No":"' + this.inputParentAddress1 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Address1":"' + this.inputParentAddress2 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Address2":"' + this.inputParentAddress3 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_City":"' + this.inputParentCity + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Country":"' + this.ddlParentCountry.id + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Postalcode":"' + this.inputParentPostalCode + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_City":"' + this.inputParentCity + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Country":"' + this.ddlParentCountry + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_PostalCode":"' + this.inputParentPostalCode + '"';
                    jsonString2 = jsonString2 + ',"PAR_GarResContact":"' + this.inputParentLandlineNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Loc_Residence_No":"' + this.inputParentAddress1 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Loc_City":"' + this.inputParentAddress1 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Loc_Country":"' + this.inputParentAddress2 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Loc_PostalCode":"' + this.inputParentAddress3 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Residence_No":"' + this.inputParentAddress1 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Address1":"' + this.inputParentAddress2 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Address2":"' + this.inputParentAddress3 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_City":"' + this.inputParentCity + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Country":"' + this.ddlParentCountry.id + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Postalcode":"' + this.inputParentPostalCode + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_IDExpDate":"' + this.inputFatherIdentificationNoExpiryDate + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_IDExpDate":"' + this.inputMotherIdentificationNoExpiryDate + '"';
                    //parent

                    jsonString = '{ ' + jsonString + ' }'
                    jsonString2 = '{ ' + jsonString2 + ' }'

                    if (this.lblCreateOrEdit == "New")
                    {
                        const chkStuRes = await DataSource.shared.checkStudentDuplication(this.inputStudentFirstName, this.inputStudentLastName, this.inputStudentDateOfBirth, this.inputStudentIdentificationNo, this.ddlStudentIdentificationType.id);
                        if (chkStuRes) {
                            if (chkStuRes.code == "1")
                            {
                                const saveStuRes = await DataSource.shared.saveStudent(jsonString);
                                if (chkStuRes) {
                                    if (saveStuRes.code == "1")
                                    {
                                        let studentID = saveStuRes.studentID;

                                        //parent
                                        if (this.inputFamilyID == "")
                                        {
                                            const saveParRes = await DataSource.shared.saveParent(jsonString2, studentID);

                                            if (saveParRes)
                                            {
                                                if (saveParRes.code != "1")
                                                {
                                                    alert('Save Parent Error - Please try again later');
                                                }
                                            }
                                        }
                                        else
                                        {
                                            const saveParRes = await DataSource.shared.saveParentWithFamilyID(this.inputFamilyParentID, studentID);

                                            if (saveParRes)
                                            {
                                                if (saveParRes.code != "1")
                                                {
                                                    alert('Save Parent With Family ID Error - Please try again later');
                                                }
                                            }
                                        }
                                        //parent

                                        //set level
                                        const getAcaYearRes = await DataSource.shared.getAcademicYearDateRange(this.ddlStudentFirstAcademicYear.id);

                                        if (getAcaYearRes)
                                        {
                                            if (getAcaYearRes.code == "99")
                                            {
                                                alert('Get Academic Year Error - Please try again later');
                                            }
                                            else
                                            {
                                                let academicYearFromDate, academicYearToDate;

                                                this.getAcaYearResTemp = getAcaYearRes.Table;
                                                this.getAcaYearResTemp.forEach(m => {
                                                    academicYearFromDate = m.SMT_From;
                                                    academicYearToDate = m.SMT_To;
                                                });

                                                const getSetLvlRes = await DataSource.shared.setLevel(studentID, this.ddlStudentSelectLevel.id, academicYearFromDate, academicYearToDate, this.ddlStudentFirstAcademicYear.id, this.ddlStudentIntakeYear.id);

                                                if (getSetLvlRes)
                                                {
                                                    if (getSetLvlRes.code == "1")
                                                    {
                                                        this.$router.push('Student?id=' + studentID);
                                                    }
                                                    else
                                                    {
                                                        alert('Save Student Level Error - Please try again later');
                                                    }
                                                }
                                            }
                                        }
                                        //set level
                                    }
                                    else
                                    {
                                        alert("Save Student Error - Please try again later");
                                    }
                                }
                            }
                            else if (chkStuRes.code == "2")
                            {
                                alert("This student is existing");
                            }
                            else
                            {
                                alert("Check Student Error - Please try again later");
                            }
                        }
                    }
                    else if (this.lblCreateOrEdit == "Edit")
                    {
                        //alert(JSON.stringify($("#student")));
                      //  this.$message(JSON.stringify($("#student")))
                    }
                    else
                    {
                        this.$message("Error! Please try again later")
                    }

                    //this.$message(this.ddlStudentNationality.id)
                    //this.$message(this.ddlStudentGender)
                    //console.log(jsonString)
                    //console.log(jsonString2)
                    //console.log(this.lblCreateOrEdit)
                } catch (e) {
                    this.results = e;
                }
            },
        },
    }
</script>

<style scoped>
.studentAreaDiv, .familyIDAreaDiv, .parentAreaDiv
{
    margin-bottom:50px;
}
</style>