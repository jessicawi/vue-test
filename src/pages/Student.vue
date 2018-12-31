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
                        <option v-for="item in countryList" v-bind:value="{ id: item.CNYnationality, text: item.CNYname }">{{ item.CNYname }}</option>
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
                        <option v-for="item in countryList" v-bind:value="{ id: item.CNYnationality, text: item.CNYname }">{{ item.CNYname }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Identification Type</label>
                    <select v-model="ddlStudentIdentificationType" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentIdentificationType" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
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
                        <option v-for="item in ddlStudentReligion" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Additional Language</label>
                    <select v-model="ddlStudentAdditionalLanguage" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentAdditionalLanguage" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
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
                        <option v-for="item in ddlStudentMealPreferences" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
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
                        <option v-for="item in ddlStudentMembership" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
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
                        <option v-for="item in ddlStudentResidencyStatus" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
                    </select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Payer</label>
                    <select v-model="ddlStudentPayer" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in ddlStudentPayer" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
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
                        <option v-for="item in countryList" v-bind:value="{ id: item.CNYnationality, text: item.CNYname }">{{ item.CNYname }}</option>
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
                        <option v-for="item in countryList" v-bind:value="{ id: item.CNYnationality, text: item.CNYname }">{{ item.CNYname }}</option>
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
                        <button type="button" class="btn btn-primary waves-effect waves-light m-r-10" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#myModal" style="display:block;" id="btnSearchFamilyID">Search</button>
                    </div>
                </div>

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 parentAreaDiv">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h2>Father's Details</h2>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Parent Mode</label>
                        <select v-model="ddlParentMode" class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in ddlParentMode" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
                        </select>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>First Name</label>
                        <input type="text" class="form-control"  v-model="inputFatherFirstName">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Middle Name</label>
                        <input type="text" class="form-control"  v-model="inputFatherMiddleName">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Last Name</label>
                        <input type="text" class="form-control"  v-model="inputFatherLastName">
                        <label id = "lblFatherNameDuplicated" style="display:none;">Father name is duplicated, please double confirm</label>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Date of Birth</label>
                        <div class="date">
                            <el-date-picker v-model="inputFatherDateofBirth" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"></el-date-picker>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Occupation</label>
                        <input type="text" class="form-control"  v-model="inputFatherOccupation">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification Type</label>
                        <select v-model="ddlFatherIdentificationType" class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in ddlFatherIdentificationType" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
                        </select>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification No</label>
                        <input type="text" class="form-control"  v-model="inputFatherIdentificationNo">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification No Expiry Date</label>
                        <div class="date">
                            <el-date-picker v-model="inputFatherIdentificationNoExpiryDate" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"></el-date-picker>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Mobile No</label>
                        <input type="text" class="form-control"  v-model="inputFatherMobileNo">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Email</label>
                        <input type="text" class="form-control"  v-model="inputFatherEmail">
                    </div>
                </div>

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 parentAreaDiv">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h2>Mother's Details</h2>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>First Name</label>
                        <input type="text" class="form-control"  v-model="inputMotherFirstName">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Middle Name</label>
                        <input type="text" class="form-control"  v-model="inputMotherMiddleName">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Last Name</label>
                        <input type="text" class="form-control"  v-model="inputMotherLastName">
                        <label id = "lblMotherNameDuplicated" style="display:none;">Mother name is duplicated, please double confirm</label>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Date of Birth</label>
                        <div class="date">
                            <el-date-picker v-model="inputMotherDateofBirth" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"></el-date-picker>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Occupation</label>
                        <input type="text" class="form-control"  v-model="inputMotherOccupation">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification Type</label>
                        <select v-model="ddlMotherIdentificationType" class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in ddlMotherIdentificationType" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>
                        </select>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification No</label>
                        <input type="text" class="form-control" v-model="inputMotherIdentificationNo">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Identification No Expiry Date</label>
                        <div class="date">
                            <el-date-picker v-model="inputMotherIdentificationNoExpiryDate" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"></el-date-picker>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Mobile No</label>
                        <input type="text" class="form-control"  v-model="inputMotherMobileNo">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Email</label>
                        <input type="text" class="form-control"  v-model="inputMotherEmail">
                    </div>
                </div>

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 parentAreaDiv">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h2>Residential/Billing Address</h2>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Address 1</label>
                        <input type="text" class="form-control"  v-model="inputParentAddress1">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Address 2</label>
                        <input type="text" class="form-control"  v-model="inputParentAddress2">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Address 3</label>
                        <input type="text" class="form-control"  v-model="inputParentAddress3">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>City</label>
                        <input type="text" class="form-control"  v-model="inputParentCity">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Landline No</label>
                        <input type="text" class="form-control"  v-model="inputParentLandlineNo">
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Country</label>
                        <select v-model="ddlParentCountry" class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in countryList" v-bind:value="{ id: item.CNYnationality, text: item.CNYname }">{{ item.CNYname }}</option>
                        </select>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Postal Code</label>
                        <input type="text" class="form-control"  v-model="inputParentPostalCode">
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
                    //students
                    let jsonString = '"Full_Name":"' + this.inputStudentFirstName + '"';
                    jsonString = jsonString + ',"Middle_name":"' + this.inputStudentMiddleName + '"';
                    jsonString = jsonString + ',"Last_name":"' + this.inputStudentLastName + '"';
                    jsonString = jsonString + ',"Sex":"' + this.ddlStudentGender + '"';
                    // jsonString = jsonString + ',"st_corr_add_flrNo":"' + $("#inputStudentCorrespondanceAddress1").val() + '"';
                    // jsonString = jsonString + ',"st_corr_add_blkNo":"' + $("#inputStudentCorrespondanceAddress2").val() + '"';
                    // jsonString = jsonString + ',"st_corr_add_stName":"' + $("#inputStudentCorrespondanceCity").val() + '"';
                    // jsonString = jsonString + ',"st_corr_add_pstcode":"' + $("#inputStudentCorrespondancePostalCode").val() + '"';
                    // jsonString = jsonString + ',"st_prm_add_pstcode":"' + $("#inputStudentPostalCode").val() + '"';
                    // jsonString = jsonString + ',"st_prm_add_blkNo":"' + $("#inputStudentAddress1").val() + '"';
                    // jsonString = jsonString + ',"st_prm_add_flrNo":"' + $("#inputStudentAddress2").val() + '"';
                    // jsonString = jsonString + ',"st_prm_add_BlgName":"' + $("#inputStudentAddress3").val() + '"';
                    // jsonString = jsonString + ',"DOB":"' + $("#inputStudentDateOfBirth").val() + '"';
                    // jsonString = jsonString + ',"St_Religion":"' + $("#ddlStudentReligion").val() + '"';
                    // jsonString = jsonString + ',"Nationality":"' + $("#ddlStudentNationality").val() + '"';
                    // jsonString = jsonString + ',"Regst_date":"' + $("#inputFirstCommencementDate").val() + '"';
                    // jsonString = jsonString + ',"st_prm_add_country":"' + $("#ddlStudentAddressCountry").val() + '"';
                    // jsonString = jsonString + ',"Handphone":"' + $("#inputStudentMobileNo").val() + '"';
                    // jsonString = jsonString + ',"st_corr_add_BlgName":"' + $("#inputStudentCorrespondanceAddress3").val() + '"';
                    // jsonString = jsonString + ',"student_type":"' + $("#ddlStudentResidencyStatus").val() + '"';
                    // jsonString = jsonString + ',"sponsor_type":"' + $("#ddlStudentPayer").val() + '"';
                    // jsonString = jsonString + ',"ID_Type":"' + $("#ddlStudentIdentificationType").val() + '"';
                    // jsonString = jsonString + ',"ID_Number":"' + $("#inputStudentIdentificationNo").val() + '"';
                    // jsonString = jsonString + ',"st_prm_add_stName":"' + $("#inputStudentCity").val() + '"';
                    // jsonString = jsonString + ',"st_corr_add_country":"' + $("#ddlStudentAddressCorrespondanceCountry").val() + '"';
                    // jsonString = jsonString + ',"Fax":"' + $("#inputStudent2ndEmergencyContactNo").val() + '"';
                    // jsonString = jsonString + ',"email":"' + $("#inputStudentEmail").val() + '"';
                    // jsonString = jsonString + ',"Telephone":"' + $("#inputStudent1stEmergencyContactNo").val() + '"';
                    // jsonString = jsonString + ',"Offphone":"' + $("#inputStudentOfficeTelNo").val() + '"';
                    // jsonString = jsonString + ',"Course_Type":"' + $("#ddlStudentSelectLevel").val() + '"';
                    // jsonString = jsonString + ',"Family_Doctor":"' + $("#inputNameofFamilyDoctor").val() + '"';
                    // jsonString = jsonString + ',"Ailments":"' + $("#taMajorAilmentsList").val() + '"';
                    // jsonString = jsonString + ',"medication_allergic_to":"' + $("#taMedicationAllergiesList").val() + '"';
                    // jsonString = jsonString + ',"BLD_grp":"' + $("#inputBloodGroup").val() + '"';
                    // jsonString = jsonString + ',"BLD_donor_no":"' + $("#inputBloodDonorNo").val() + '"';
                    // jsonString = jsonString + ',"clinic_add":"' + $("#inputClinicAddress").val() + '"';
                    // jsonString = jsonString + ',"clinic_ph_no":"' + $("#inputClinicPhoneNo").val() + '"';
                    // jsonString = jsonString + ',"Semester":"' + $("#ddlStudentFirstAcademicYear").val() + '"';
                    // jsonString = jsonString + ',"St_Preferred_Name":"' + $("#inputStudentPreferredName").val() + '"';
                    // jsonString = jsonString + ',"St_Mother_Tongue":"' + $("#ddlStudentAdditionalLanguage").val() + '"';
                    // jsonString = jsonString + ',"St_Meal_Preferences":"' + $("#ddlStudentMealPreferences").val() + '"';
                    // jsonString = jsonString + ',"St_Birth_Place":"' + $("#ddlStudentBirthPlace").val() + '"';
                    // jsonString = jsonString + ',"St_AdditionalLanguage":"' + $("#inputStudentFirstLanguageSpoken").val() + '"';
                    // jsonString = jsonString + ',"St_SecondLanguageSpoken":"' + $("#inputSecondLanguageSpoken").val() + '"';
                    // jsonString = jsonString + ',"ST_StudentMemership":"' + $("#ddlStudentMembership").val() + '"';
                    // jsonString = jsonString + ',"ID_ExpDate":"' + $("#inputStudentIdentificationExpiryDate").val() + '"';
                    // //students
                    //
                    // //parent
                    // var jsonString2 = '"PAR_Mode":"' + $("#ddlParentMode").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_FirstName":"' + $("#inputFatherFirstName").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_MiddleName":"' + $("#inputFatherMiddleName").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_LastName":"' + $("#inputFatherLastName").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_DOB":"' + $("#inputFatherDateofBirth").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_Occupation":"' + $("#inputFatherOccupation").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_FatResContact":"' + $("#inputParentLandlineNo ").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_Phone":"' + $("#inputFatherMobileNo").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_Email":"' + $("#inputFatherEmail").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_IDType":"' + $("#ddlFatherIdentificationType").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_UID":"' + $("#inputFatherIdentificationNo").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_Loc_Residence_No":"' + $("#inputParentAddress1").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_Loc_Address1":"' + $("#inputParentAddress2").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_Loc_Address2":"' + $("#inputParentAddress3").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_Loc_Postalcode":"' + $("#inputParentPostalCode").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_Loc_City":"' + $("#inputParentCity").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_Loc_Country":"' + $("#ddlParentCountry").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_City":"' + $("#inputParentCity").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_Country":"' + $("#ddlParentCountry").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_PostalCode":"' + $("#inputParentPostalCode").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_FirstName":"' + $("#inputMotherFirstName").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_MiddleName":"' + $("#inputMotherMiddleName").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_LastName":"' + $("#inputMotherLastName").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_DOB":"' + $("#inputMotherDateofBirth").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_Occupation":"' + $("#inputMotherOccupation").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_MotResContact":"' + $("#inputParentLandlineNo ").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_Phone":"' + $("#inputMotherMobileNo").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_Email":"' + $("#inputMotherEmail").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_IDType":"' + $("#ddlMotherIdentificationType").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_UID":"' + $("#inputMotherIdentificationNo").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Residence_No":"' + $("#inputParentAddress1").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Address1":"' + $("#inputParentAddress2").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Address2":"' + $("#inputParentAddress3").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_Loc_City":"' + $("#inputParentCity").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Country":"' + $("#ddlParentCountry").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Postalcode":"' + $("#inputParentPostalCode").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_City":"' + $("#inputParentCity").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_Country":"' + $("#ddlParentCountry").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_PostalCode":"' + $("#inputParentPostalCode").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_GarResContact":"' + $("#inputParentLandlineNo ").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Guardian_Loc_Residence_No":"' + $("#inputParentAddress1").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Guardian_Loc_City":"' + $("#inputParentAddress1").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Guardian_Loc_Country":"' + $("#inputParentAddress2").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Guardian_Loc_PostalCode":"' + $("#inputParentAddress3").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Guardian_Residence_No":"' + $("#inputParentAddress1").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Guardian_Address1":"' + $("#inputParentAddress2").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Guardian_Address2":"' + $("#inputParentAddress3").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Guardian_City":"' + $("#inputParentCity").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Guardian_Country":"' + $("#ddlParentCountry").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Guardian_Postalcode":"' + $("#inputParentPostalCode").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Father_IDExpDate":"' + $("#inputFatherIdentificationNoExpiryDate").val() + '"';
                    // jsonString2 = jsonString2 + ',"PAR_Mother_IDExpDate":"' + $("#inputMotherIdentificationNoExpiryDate").val() + '"';
                    // //parent

                    //this.$message(this.ddlStudentNationality.id)
                    //this.$message(this.ddlStudentGender)
                    console.log(jsonString)
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