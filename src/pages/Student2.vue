<template>
    <div id="student" class="mt-3 container">
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
                        <option v-for="item in countryList" v-bind:value="ddlStudentNationality">{{ item.CNYname }}</option>
                    </select>
                    {{ddlStudentNationality}}

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
                        <el-date-picker v-model="inputStudentDateOfBirth" type="date" placeholder="Pick a day" id="inputStudentDateOfBirth" ></el-date-picker>
                    </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Birth Place</label>
                    <select name="ddlBirthPlace" id="ddlStudentBirthPlace" class="form-control pro-edt-select form-control-primary">
                        <!--<option v-for="item in countryList" value="item.CNYnationality">{{ item.CNYname }}</option>-->
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Identification Type</label>
                    <select name="ddlStudentIdentificationType" id="ddlStudentIdentificationType" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentIdentificationType" value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Identification No</label>
                    <input type="text" class="form-control"  id="inputStudentIdentificationNo">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Identification Expiry Date</label>
                    <div class="date">
                        <el-date-picker v-model="inputStudentIdentificationExpiryDate" type="date" placeholder="Pick a day" id="inputStudentIdentificationExpiryDate" ></el-date-picker>
                    </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Religion</label>
                    <select name="ddlStudentReligion" id="ddlStudentReligion" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentReligion" value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Additional Language</label>
                    <select name="ddlStudentAdditionalLanguage" id="ddlStudentAdditionalLanguage" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentAdditionalLanguage" value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>1st Emergency Contact No</label>
                    <input type="text" class="form-control"  id="inputStudent1stEmergencyContactNo">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>2nd Emergency Contact No</label>
                    <input type="text" class="form-control"  id="inputStudent2ndEmergencyContactNo">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Meal Preferences</label>
                    <select name="ddlStudentMealPreferences" id="ddlStudentMealPreferences" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentMealPreferences" value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>First Language Spoken</label>
                    <input type="text" class="form-control"  id="inputStudentFirstLanguageSpoken">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Second Language Spoken</label>
                    <input type="text" class="form-control"  id="inputSecondLanguageSpoken">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Membership</label>
                    <select name="ddlStudentMembership" id="ddlStudentMembership" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentMembership" value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                    </select>
                </div>
            </div>

            <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 studentAreaDiv">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h2>Registration Details</h2>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Select Level</label>
                    <select name="ddlStudentSelectLevel" id="ddlStudentSelectLevel" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in levelList" value="item.PK_Course_ID.trim())">{{ item.CRS_Course_Name.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>First Commencement Date</label>
                    <div class="date">
                        <el-date-picker v-model="inputFirstCommencementDate" type="date" placeholder="Pick a day" id="inputFirstCommencementDate" ></el-date-picker>
                    </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>First Academic Year</label>
                    <select name="ddlStudentFirstAcademicYear" id="ddlStudentFirstAcademicYear" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in academicYearList" value="item.PK_Semester_ID.trim()">{{ item.SMT_Code.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Residency Status</label>
                    <select name="ddlStudentResidencyStatus" id="ddlStudentResidencyStatus" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentResidencyStatus" value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Payer</label>
                    <select name="ddlStudentPayer" id="ddlStudentPayer" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentPayer" value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Student ID</label>
                    <input type="text" class="form-control" id="inputStudentID" readonly="readonly">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Intake Year</label>
                    <select name="ddlStudentIntakeYear" id="ddlStudentIntakeYear" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in studentIntakeYearList" value="item.PK_PAI_ID.trim()">{{ item.PAI_Intake_No.trim() }}</option>
                    </select>
                </div>
            </div>

            <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 studentAreaDiv">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h2>Student Permanent Address</h2>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Address 1</label>
                    <input type="text" class="form-control"  id="inputStudentAddress1">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Address 2</label>
                    <input type="text" class="form-control"  id="inputStudentAddress2">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Address 3</label>
                    <input type="text" class="form-control"  id="inputStudentAddress3">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>City</label>
                    <input type="text" class="form-control"  id="inputStudentCity">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Country</label>
                    <select name="ddlStudentAddressCountry" id="ddlStudentAddressCountry" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in countryList" value="item.CNYnationality">{{ item.CNYname }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Postal Code</label>
                    <input type="text" class="form-control"  id="inputStudentPostalCode">
                </div>
            </div>

            <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 studentAreaDiv">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h2>Student Correspondance Address</h2>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Address 1</label>
                    <input type="text" class="form-control"  id="inputStudentCorrespondanceAddress1">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Address 2</label>
                    <input type="text" class="form-control"  id="inputStudentCorrespondanceAddress2">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Address 3</label>
                    <input type="text" class="form-control"  id="inputStudentCorrespondanceAddress3">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>City</label>
                    <input type="text" class="form-control"  id="inputStudentCorrespondanceCity">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Country</label>
                    <select name="ddlStudentAddressCorrespondanceCountry" id="ddlStudentAddressCorrespondanceCountry" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in countryList" value="item.CNYnationality">{{ item.CNYname }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Postal Code</label>
                    <input type="text" class="form-control"  id="inputStudentCorrespondancePostalCode">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Mobile No</label>
                    <input type="text" class="form-control"  id="inputStudentMobileNo">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Home Tel No</label>
                    <input type="text" class="form-control"  id="inputStudentOfficeTelNo">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Email</label>
                    <input type="text" class="form-control"  id="inputStudentEmail">
                </div>
            </div>

            <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 studentAreaDiv">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h2>Medical Details</h2>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Major Ailments List</label>
                    <textarea rows="3" style="width:100%;resize:none;" id="taMajorAilmentsList"></textarea>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Medication Allergies List</label>
                    <textarea rows="3" style="width:100%;resize:none;" id="taMedicationAllergiesList"></textarea>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Blood Group</label>
                    <input type="text" class="form-control"  id="inputBloodGroup">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Blood Donor No</label>
                    <input type="text" class="form-control"  id="inputBloodDonorNo">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Name of Family Doctor</label>
                    <input type="text" class="form-control"  id="inputNameofFamilyDoctor">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Clinic Address</label>
                    <input type="text" class="form-control"  id="inputClinicAddress">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Clinic Phone No</label>
                    <input type="text" class="form-control"  id="inputClinicPhoneNo">
                </div>
            </div>
        </div>

        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="review-content-section">
                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 familyIDAreaDiv">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Family No</label>
                        <input type="text" class="form-control" id="inputFamilyID" readonly="readonly">
                        <input type="text" class="form-control" id="inputFamilyParentID" style="display:none;" >
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label style="width:100%;">Search Family</label>
                        <button type="button" class="btn btn-primary waves-effect waves-light m-r-10" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#myModal" style="display:block;" id="btnSearchFamilyID">Search</button>
                    </div>
                </div>

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 parentAreaDiv">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h2>Father's Details</h2>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Parent Mode</label>
                        <select name="ddlParentMode" id="ddlParentMode" class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in ddlParentMode" value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                        </select>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>First Name</label>
                        <input type="text" class="form-control"  id="inputFatherFirstName">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Middle Name</label>
                        <input type="text" class="form-control"  id="inputFatherMiddleName">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Last Name</label>
                        <input type="text" class="form-control"  id="inputFatherLastName">
                        <label id = "lblFatherNameDuplicated" style="display:none;">Father name is duplicated, please double confirm</label>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Date of Birth</label>
                        <div class="date">
                            <el-date-picker v-model="inputFatherDateofBirth" type="date" placeholder="Pick a day" id="inputFatherDateofBirth" ></el-date-picker>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Occupation</label>
                        <input type="text" class="form-control"  id="inputFatherOccupation">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification Type</label>
                        <select name="ddlFatherIdentificationType" id="ddlFatherIdentificationType" class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in ddlFatherIdentificationType" value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                        </select>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification No</label>
                        <input type="text" class="form-control"  id="inputFatherIdentificationNo">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification No Expiry Date</label>
                        <div class="date">
                            <el-date-picker v-model="inputFatherIdentificationNoExpiryDate" type="date" placeholder="Pick a day" id="inputFatherIdentificationNoExpiryDate" ></el-date-picker>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Mobile No</label>
                        <input type="text" class="form-control"  id="inputFatherMobileNo">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Email</label>
                        <input type="text" class="form-control"  id="inputFatherEmail">
                    </div>
                </div>

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 parentAreaDiv">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h2>Mother's Details</h2>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>First Name</label>
                        <input type="text" class="form-control"  id="inputMotherFirstName">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Middle Name</label>
                        <input type="text" class="form-control"  id="inputMotherMiddleName">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Last Name</label>
                        <input type="text" class="form-control"  id="inputMotherLastName">
                        <label id = "lblMotherNameDuplicated" style="display:none;">Mother name is duplicated, please double confirm</label>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Date of Birth</label>
                        <div class="date">
                            <el-date-picker v-model="inputMotherDateofBirth" type="date" placeholder="Pick a day" id="inputMotherDateofBirth" ></el-date-picker>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Occupation</label>
                        <input type="text" class="form-control"  id="inputMotherOccupation">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification Type</label>
                        <select name="ddlFatherIdentificationType" id="ddlMotherIdentificationType" class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in ddlMotherIdentificationType" value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                        </select>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification No</label>
                        <input type="text" class="form-control"  id="inputMotherIdentificationNo">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification No Expiry Date</label>
                        <div class="date">
                            <el-date-picker v-model="inputMotherIdentificationNoExpiryDate" type="date" placeholder="Pick a day" id="inputMotherIdentificationNoExpiryDate" ></el-date-picker>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Mobile No</label>
                        <input type="text" class="form-control"  id="inputMotherMobileNo">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Email</label>
                        <input type="text" class="form-control"  id="inputMotherEmail">
                    </div>
                </div>

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 parentAreaDiv">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h2>Residential/Billing Address</h2>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Address 1</label>
                        <input type="text" class="form-control"  id="inputParentAddress1">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Address 2</label>
                        <input type="text" class="form-control"  id="inputParentAddress2">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Address 3</label>
                        <input type="text" class="form-control"  id="inputParentAddress3">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>City</label>
                        <input type="text" class="form-control"  id="inputParentCity">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Landline No</label>
                        <input type="text" class="form-control"  id="inputParentLandlineNo">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Country</label>
                        <select name="ddlParentCountry" id="ddlParentCountry" class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in countryList" value="item.CNYnationality">{{ item.CNYname }}</option>
                        </select>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Postal Code</label>
                        <input type="text" class="form-control"  id="inputParentPostalCode">
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
        },
        data() {
            return {
                countryList: [],
                ddlStudentIdentificationType: [],
                ddlStudentReligion: [],
                ddlStudentAdditionalLanguage: [],
                ddlStudentMealPreferences: [],
                ddlStudentMembership: [],
                ddlStudentResidencyStatus: [],
                ddlStudentPayer: [],
                ddlFatherIdentificationType: [],
                ddlMotherIdentificationType: [],
                ddlParentMode: [],
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
                ddlStudentNationality: '{ id: Afghanistani, text: Afghanistan }'
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
                                this.ddlStudentIdentificationType.push(m);
                            }
                            else if (m.OGPname.trim() === 'Religion') {
                                this.ddlStudentReligion.push(m);
                            }
                            else if (m.OGPname.trim() === 'Mother Tongue') {
                                this.ddlStudentAdditionalLanguage.push(m);
                            }
                            else if (m.OGPname.trim() === 'Meal Preferences') {
                                this.ddlStudentMealPreferences.push(m);
                            }
                            else if (m.OGPname.trim() === 'Student Membership') {
                                this.ddlStudentMembership.push(m);
                            }
                            else if (m.OGPname.trim() === 'Residency Status') {
                                this.ddlStudentResidencyStatus.push(m);
                            }
                            else if (m.OGPname.trim() === 'Sponsorship Type') {
                                this.ddlStudentPayer.push(m);
                            }
                            else if (m.OGPname.trim() === 'ParentID') {
                                this.ddlFatherIdentificationType.push(m);
                                this.ddlMotherIdentificationType.push(m);
                            }
                            else if (m.OGPname.trim() === 'Parent Mode') {
                                this.ddlParentMode.push(m);
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
            async Save() {
                try {
                    //this.$message(this.ddlStudentNationality.id)
                    this.$message(this.ddlStudentGender)
                    //console.log(this.ddlStudentNationality.id)
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