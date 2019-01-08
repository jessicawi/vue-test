<template>
    <div id="parent" class="mt-3 container">
        <label style="display:none !important;">{{lblParentID}}</label>

        <b-tabs class="parentPageBTabs">
            <b-tab title="Father" active>
                <div class="row">
                    <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 fatherAreaDiv">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h2>Father's Personal Information</h2>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>First Name</label>
                            <input type="text" class="form-control" ref="inputFatherFirstName" >
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Middle Name</label>
                            <input type="text" class="form-control" ref="inputFatherMiddleName">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Last Name</label>
                            <input type="text" class="form-control" ref="inputFatherLastName">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Date of Birth</label>
                            <div class="date">
                                <el-date-picker v-model="inputFatherDateofBirth" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date" placeholder="Pick a date"></el-date-picker>
                            </div>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Employment Status</label>
                            <select v-model="ddlFatherEmploymentStatus" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in ddlFatherEmploymentStatusList" v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Occupation</label>
                            <input type="text" class="form-control" ref="inputFatherOccupation">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Designation</label>
                            <input type="text" class="form-control" ref="inputFatherDesignation">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Home Tel No</label>
                            <input type="text" class="form-control" ref="inputFatherHomeTelNo">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Office Tel No</label>
                            <input type="text" class="form-control" ref="inputFatherOfficeTelNo">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Fax</label>
                            <input type="text" class="form-control" ref="inputFatherFax">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Mobile No</label>
                            <input type="text" class="form-control" ref="inputFatherMobileNo">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Email</label>
                            <input type="text" class="form-control" ref="inputFatherEmail">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Nationality</label>
                            <select ref="ddlFatherNationality" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in countryList" v-bind:value="item.CNYnationality.trim()">{{ item.CNYname.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Religion</label>
                            <select v-model="ddlFatherReligion" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in ddlFatherReligionList" v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Remarks</label>
                            <input type="text" class="form-control" ref="inputFatherRemarks">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Identification Type</label>
                            <select v-model="ddlFatherIdentificationType" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in ddlFatherIdentificationTypeList" v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Identification No</label>
                            <input type="text" class="form-control" ref="inputFatherIdentificationNo">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Identification No Expiry Date</label>
                            <div class="date">
                                <el-date-picker v-model="inputFatherIdentificationNoExpiryDate" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date" placeholder="Pick a date"></el-date-picker>
                            </div>
                        </div>
                    </div>

                    <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 fatherAreaDiv">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h2>Father's Local Residential Address</h2>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Address 1</label>
                            <input type="text" class="form-control" ref="inputFatherAddress1">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Address 2</label>
                            <input type="text" class="form-control" ref="inputFatherAddress2">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Address 3</label>
                            <input type="text" class="form-control" ref="inputFatherAddress3">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>City</label>
                            <input type="text" class="form-control" ref="inputFatherCity">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Country</label>
                            <select ref="ddlFatherCountry" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">{{ item.CNYname.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Postal Code</label>
                            <input type="text" class="form-control" ref="inputFatherPostalCode">
                        </div>
                    </div>

                    <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 fatherAreaDiv">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h2>Father's Company Address</h2>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Name</label>
                            <input type="text" class="form-control" ref="inputFatherCompanyName">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Addressee Name</label>
                            <input type="text" class="form-control" ref="inputFatherCompanyAddresseeName">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Address 1</label>
                            <input type="text" class="form-control" ref="inputFatherCompanyAddress1">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Address 2</label>
                            <input type="text" class="form-control" ref="inputFatherCompanyAddress2">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Address 3</label>
                            <input type="text" class="form-control" ref="inputFatherCompanyAddress3">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company City</label>
                            <input type="text" class="form-control" ref="inputFatherCompanyCity">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Country</label>
                            <select ref="ddlFatherCompanyCountry" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">{{ item.CNYname.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Postal Code</label>
                            <input type="text" class="form-control" ref="inputFatherCompanyPostalCode">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Email</label>
                            <input type="text" class="form-control" ref="inputFatherCompanyEmail">
                        </div>
                    </div>
                </div>
            </b-tab>
            <b-tab title="Mother" >
                <div class="row">
                    <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 motherAreaDiv">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h2>Mother's Personal Information</h2>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>First Name</label>
                            <input type="text" class="form-control" ref="inputMotherFirstName">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Middle Name</label>
                            <input type="text" class="form-control" ref="inputMotherMiddleName">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Last Name</label>
                            <input type="text" class="form-control" ref="inputMotherLastName">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Date of Birth</label>
                            <div class="date">
                                <el-date-picker v-model="inputMotherDateofBirth" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date" placeholder="Pick a date"></el-date-picker>
                            </div>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Employment Status</label>
                            <select v-model="ddlMotherEmploymentStatus" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in ddlMotherEmploymentStatusList" v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Occupation</label>
                            <input type="text" class="form-control" ref="inputMotherOccupation">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Designation</label>
                            <input type="text" class="form-control" ref="inputMotherDesignation">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Home Tel No</label>
                            <input type="text" class="form-control" ref="inputMotherHomeTelNo">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Office Tel No</label>
                            <input type="text" class="form-control" ref="inputMotherOfficeTelNo">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Fax</label>
                            <input type="text" class="form-control" ref="inputMotherFax">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Mobile No</label>
                            <input type="text" class="form-control" ref="inputMotherMobileNo">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Email</label>
                            <input type="text" class="form-control" ref="inputMotherEmail">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Nationality</label>
                            <select ref="ddlMotherNationality" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in countryList" v-bind:value="item.CNYnationality.trim()">{{ item.CNYname.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Religion</label>
                            <select v-model="ddlMotherReligion" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in ddlMotherReligionList" v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Remarks</label>
                            <input type="text" class="form-control" ref="inputMotherRemarks">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Identification Type</label>
                            <select v-model="ddlMotherIdentificationType" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in ddlMotherIdentificationTypeList" v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Identification No</label>
                            <input type="text" class="form-control" ref="inputMotherIdentificationNo">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Identification No Expiry Date</label>
                            <div class="date">
                                <el-date-picker v-model="inputMotherIdentificationNoExpiryDate" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date" placeholder="Pick a date"></el-date-picker>
                            </div>
                        </div>
                    </div>

                    <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 motherAreaDiv">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h2>Mother's Local Residential Address</h2>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Address 1</label>
                            <input type="text" class="form-control" ref="inputMotherAddress1">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Address 2</label>
                            <input type="text" class="form-control" ref="inputMotherAddress2">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Address 3</label>
                            <input type="text" class="form-control" ref="inputMotherAddress3">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>City</label>
                            <input type="text" class="form-control" ref="inputMotherCity">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Country</label>
                            <select ref="ddlMotherCountry" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">{{ item.CNYname.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Postal Code</label>
                            <input type="text" class="form-control" ref="inputMotherPostalCode">
                        </div>
                    </div>

                    <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 motherAreaDiv">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h2>Mother's Company Address</h2>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Name</label>
                            <input type="text" class="form-control" ref="inputMotherCompanyName">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Addressee Name</label>
                            <input type="text" class="form-control" ref="inputMotherCompanyAddresseeName">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Address 1</label>
                            <input type="text" class="form-control" ref="inputMotherCompanyAddress1">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Address 2</label>
                            <input type="text" class="form-control" ref="inputMotherCompanyAddress2">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Address 3</label>
                            <input type="text" class="form-control" ref="inputMotherCompanyAddress3">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company City</label>
                            <input type="text" class="form-control" ref="inputMotherCompanyCity">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Country</label>
                            <select ref="ddlMotherCompanyCountry" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">{{ item.CNYname.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Postal Code</label>
                            <input type="text" class="form-control" ref="inputMotherCompanyPostalCode">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Email</label>
                            <input type="text" class="form-control" ref="inputMotherCompanyEmail">
                        </div>
                    </div>
                </div>
            </b-tab>
            <b-tab title="Guardian">
                <div class="row">
                    <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 guardianAreaDiv">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h2>Guardian's Personal Information</h2>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>First Name</label>
                            <input type="text" class="form-control" ref="inputGuardianFirstName">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Middle Name</label>
                            <input type="text" class="form-control" ref="inputGuardianMiddleName">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Last Name</label>
                            <input type="text" class="form-control" ref="inputGuardianLastName">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Date of Birth</label>
                            <div class="date">
                                <el-date-picker v-model="inputGuardianDateofBirth" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date" placeholder="Pick a date"></el-date-picker>
                            </div>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Employment Status</label>
                            <select v-model="ddlGuardianEmploymentStatus" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in ddlGuardianEmploymentStatusList" v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Occupation</label>
                            <input type="text" class="form-control" ref="inputGuardianOccupation">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Designation</label>
                            <input type="text" class="form-control" ref="inputGuardianDesignation">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Home Tel No</label>
                            <input type="text" class="form-control" ref="inputGuardianHomeTelNo">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Office Tel No</label>
                            <input type="text" class="form-control" ref="inputGuardianOfficeTelNo">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Fax</label>
                            <input type="text" class="form-control" ref="inputGuardianFax">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Mobile No</label>
                            <input type="text" class="form-control" ref="inputGuardianMobileNo">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Email</label>
                            <input type="text" class="form-control" ref="inputGuardianEmail">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Nationality</label>
                            <select ref="ddlGuardianNationality" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in countryList" v-bind:value="item.CNYnationality.trim()">{{ item.CNYname.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Religion</label>
                            <select v-model="ddlGuardianReligion" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in ddlGuardianReligionList" v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Remarks</label>
                            <input type="text" class="form-control" ref="inputGuardianRemarks">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Identification Type</label>
                            <select v-model="ddlGuardianIdentificationType" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in ddlGuardianIdentificationTypeList" v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Identification No</label>
                            <input type="text" class="form-control" ref="inputGuardianIdentificationNo">
                        </div>
                    </div>

                    <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 guardianAreaDiv">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h2>Guardian's Local Residential Address</h2>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Address 1</label>
                            <input type="text" class="form-control" ref="inputGuardianAddress1">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Address 2</label>
                            <input type="text" class="form-control" ref="inputGuardianAddress2">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Address 3</label>
                            <input type="text" class="form-control" ref="inputGuardianAddress3">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>City</label>
                            <input type="text" class="form-control" ref="inputGuardianCity">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Country</label>
                            <select ref="ddlGuardianCountry" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">{{ item.CNYname.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Postal Code</label>
                            <input type="text" class="form-control" ref="inputGuardianPostalCode">
                        </div>
                    </div>

                    <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 guardianAreaDiv">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h2>Guardian's Company Address</h2>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Name</label>
                            <input type="text" class="form-control" ref="inputGuardianCompanyName">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Addressee Name</label>
                            <input type="text" class="form-control" ref="inputGuardianCompanyAddresseeName">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Address 1</label>
                            <input type="text" class="form-control" ref="inputGuardianCompanyAddress1">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Address 2</label>
                            <input type="text" class="form-control" ref="inputGuardianCompanyAddress2">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Address 3</label>
                            <input type="text" class="form-control" ref="inputGuardianCompanyAddress3">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company City</label>
                            <input type="text" class="form-control" ref="inputGuardianCompanyCity">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Country</label>
                            <select ref="ddlGuardianCompanyCountry" class="form-control pro-edt-select form-control-primary">
                                <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">{{ item.CNYname.trim() }}</option>
                            </select>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Postal Code</label>
                            <input type="text" class="form-control" ref="inputGuardianCompanyPostalCode">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Email</label>
                            <input type="text" class="form-control" ref="inputGuardianCompanyEmail">
                        </div>
                    </div>
                </div>
            </b-tab>
            <b-tab title="Thrid Party">
                <div class="row" >
                    <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 thirdpartyAreaDiv">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h2>Third Party's Details</h2>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Name</label>
                            <input type="text" class="form-control" ref="inputThirdPartyCompanyName">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Addressee Name</label>
                            <input type="text" class="form-control" ref="inputThirdPartyAddresseeName">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Address 1</label>
                            <input type="text" class="form-control" ref="inputThirdPartyAddress1">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Address 2</label>
                            <input type="text" class="form-control" ref="inputThirdPartyAddress2">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Address 3</label>
                            <input type="text" class="form-control" ref="inputThirdPartyAddress3">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>City</label>
                            <input type="text" class="form-control" ref="inputThirdPartyCity">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Country</label>
                            <input type="text" class="form-control" ref="inputThirdPartyCountry">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Postal Code</label>
                            <input type="text" class="form-control" ref="inputThirdPartyPostalCode">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Company Email</label>
                            <input type="text" class="form-control" ref="inputThirdPartyCompanyEmail">
                        </div>
                    </div>
                </div>
            </b-tab>
            <b-tab title="Other">
                <div class="row">
                    <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 otherAreaDiv">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h2>Other Details</h2>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Share My Email</label>
                            <input type="checkbox" class="form-control" ref="cbFatherShareMyEmail">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Share My Mobile Number</label>
                            <input type="checkbox" class="form-control" ref="cbFatherShareMyMobileNumber">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Eton Staff</label>
                            <input type="checkbox" class="form-control" ref="cbFatherEtonStaff">
                        </div>

                    </div>
                </div>
            </b-tab>
        </b-tabs>

        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="text-center mg-b-pro-edt custom-pro-edt-ds">
                    <button v-on:click="Save" type="button" class="btn btn-primary waves-effect waves-light m-r-10" >Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: "Parent",
        data(){
            return{
                countryList: [],
                ddlFatherReligionList: [],
                ddlMotherReligionList: [],
                ddlGuardianReligionList: [],
                ddlFatherIdentificationTypeList: [],
                ddlMotherIdentificationTypeList: [],
                ddlGuardianIdentificationTypeList: [],
                ddlFatherEmploymentStatusList: [],
                ddlMotherEmploymentStatusList: [],
                ddlGuardianEmploymentStatusList: [],

                inputFatherDateofBirth: '',
                inputFatherIdentificationNoExpiryDate: '',
                inputMotherDateofBirth: '',
                inputMotherIdentificationNoExpiryDate: '',
                inputGuardianDateofBirth: '',
                ddlFatherReligion: '',
                ddlMotherReligion: '',
                ddlGuardianReligion: '',
                ddlFatherIdentificationType: '',
                ddlMotherIdentificationType: '',
                ddlGuardianIdentificationType: '',
                ddlFatherEmploymentStatus: '',
                ddlMotherEmploymentStatus: '',
                ddlGuardianEmploymentStatus: '',

                lblParentID: '',
            };
        },
        async created() {
            await this.BindCountryList();
            await this.BindParentDropdown();
        },
        async mounted() {
            await this.LoadParentInfo();
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
            async BindParentDropdown() {
                try {
                    let jsonString = '"Religion":"Religion"';
                    jsonString = jsonString + ',"ParentID":"ParentID"';
                    jsonString = jsonString + ',"EmpStatus":"EmpStatus"';
                    jsonString = "{" + jsonString + "}";

                    const response = await DataSource.shared.getStudentDropDownList(jsonString);
                    if (response) {
                        this.studentDropDownListResponse = response.Table;
                        this.studentDropDownListResponse.forEach(m => {
                            if (m.OGPname.trim() === "Religion") {
                                this.ddlFatherReligionList.push(m);
                                this.ddlMotherReligionList.push(m);
                                this.ddlGuardianReligionList.push(m);
                            }
                            else if (m.OGPname.trim() === 'ParentID') {
                                this.ddlFatherIdentificationTypeList.push(m);
                                this.ddlMotherIdentificationTypeList.push(m);
                                this.ddlGuardianIdentificationTypeList.push(m);
                            }
                            else if (m.OGPname.trim() === 'EmpStatus') {
                                this.ddlFatherEmploymentStatusList.push(m);
                                this.ddlMotherEmploymentStatusList.push(m);
                                this.ddlGuardianEmploymentStatusList.push(m);
                            }
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async LoadParentInfo() {
                try {
                    if (this.$route.query.id != null || this.$route.query.id != undefined)
                    {
                        this.lblParentID = this.$route.query.id;

                        const response = await DataSource.shared.getParent(this.$route.query.id, "");
                        if (response)
                        {
                            if (response.code == "2")
                            {
                                alert('No record found');
                            }
                            else if (response.code == "99")
                            {
                                alert('Please try again later');
                            }
                            else
                            {
                                this.BindParentFields(response.Table);
                            }
                        }
                    }
                    else
                    {
                        alert('Error! Please search again.');
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindParentFields(resultTable) {
                try {
                    resultTable.forEach(m => {
                        //father
                        this.$refs.inputFatherFirstName.value = m.PAR_Father_FirstName;
                        this.$refs.inputFatherMiddleName.value = m.PAR_Father_MiddleName;
                        this.$refs.inputFatherLastName.value = m.PAR_Father_LastName;
                        this.inputFatherDateofBirth = m.PAR_Father_DOB_convert;
                        this.ddlFatherEmploymentStatus = m.PAR_Fat_Emp_Status;
                        this.$refs.inputFatherOccupation.value = m.PAR_Father_Occupation;
                        this.$refs.inputFatherDesignation.value = m.PAR_Father_Designation;
                        this.$refs.inputFatherHomeTelNo.value = m.PAR_FatResContact;
                        this.$refs.inputFatherOfficeTelNo.value = m.PAR_FatOffContact;
                        this.$refs.inputFatherFax.value = m.PAR_Father_Fax;
                        this.$refs.inputFatherMobileNo.value = m.PAR_Father_Phone;
                        this.$refs.inputFatherEmail.value = m.PAR_Father_Email;
                        this.$refs.ddlFatherNationality.value = m.PAR_Fat_Nationality;
                        this.ddlFatherReligion = m.PAR_FatReligion;
                        this.$refs.inputFatherRemarks.value = m.PAR_FatRemarks;
                        this.ddlFatherIdentificationType = m.PAR_Father_IDType;
                        this.$refs.inputFatherIdentificationNo.value = m.PAR_Father_UID;
                        this.inputFatherIdentificationNoExpiryDate = m.PAR_Father_IDExpDate_convert;
                        if (m.PAR_ShareMyContact == 'Yes') { this.$refs.cbFatherShareMyEmail.checked = true; } else { this.$refs.cbFatherShareMyEmail.checked = false; }
                        if (m.PAR_ShareMyMobile == 'Yes') { this.$refs.cbFatherShareMyMobileNumber.checked = true; } else { this.$refs.cbFatherShareMyMobileNumber.checked = false; }
                        if (m.PAR_Father_IsStaff == 'True') { this.$refs.cbFatherEtonStaff.checked = true; } else { this.$refs.cbFatherEtonStaff.checked = false; }
                        this.$refs.inputFatherAddress1.value = m.PAR_Father_Loc_Residence_No;
                        this.$refs.inputFatherAddress2.value = m.PAR_Father_Loc_Address1;
                        this.$refs.inputFatherAddress3.value = m.PAR_Father_Loc_Address2;
                        this.$refs.inputFatherCity.value = m.PAR_Father_Loc_City;
                        this.$refs.ddlFatherCountry.value = m.PAR_Father_Loc_Country;
                        this.$refs.inputFatherPostalCode.value = m.PAR_Father_Loc_Postalcode;
                        this.$refs.inputFatherCompanyName.value = m.PAR_Father_CompanyName;
                        this.$refs.inputFatherCompanyAddresseeName.value = m.PAR_Fat_Comp_Addressee;
                        this.$refs.inputFatherCompanyAddress1.value = m.PAR_Father_Residence_No;
                        this.$refs.inputFatherCompanyAddress2.value = m.PAR_Father_Address1;
                        this.$refs.inputFatherCompanyAddress3.value = m.PAR_Father_Address2;
                        this.$refs.inputFatherCompanyCity.value = m.PAR_Father_City;
                        this.$refs.ddlFatherCompanyCountry .value = m.PAR_Father_Country;
                        this.$refs.inputFatherCompanyPostalCode.value = m.PAR_Father_PostalCode;
                        this.$refs.inputFatherCompanyEmail.value = m.PAR_FComp_Email;
                        //father

                        //mother
                        this.$refs.inputMotherFirstName.value = m.PAR_Mother_FirstName;
                        this.$refs.inputMotherMiddleName.value = m.PAR_Mother_MiddleName;
                        this.$refs.inputMotherLastName.value = m.PAR_Mother_LastName;

                        this.inputMotherDateofBirth = m.PAR_Mother_DOB_convert;

                        this.ddlMotherEmploymentStatus = m.PAR_Mot_Emp_Status;
                        this.$refs.inputMotherOccupation.value = m.PAR_Mother_Occupation;
                        this.$refs.inputMotherDesignation.value = m.PAR_Mother_Designation;
                        this.$refs.inputMotherHomeTelNo.value = m.PAR_MotResContact;
                        this.$refs.inputMotherOfficeTelNo.value = m.PAR_MotOffContact;
                        this.$refs.inputMotherFax.value = m.PAR_Mother_Fax;
                        this.$refs.inputMotherMobileNo.value = m.PAR_Mother_Phone;
                        this.$refs.inputMotherEmail.value = m.PAR_Mother_Email;
                        this.$refs.ddlMotherNationality.value = m.PAR_Mot_Nationality;
                        this.$refs.ddlMotherReligion = m.PAR_MotReligion;
                        this.$refs.inputMotherRemarks.value = m.PAR_MotRemarks;
                        this.$refs.ddlMotherIdentificationType = m.PAR_Mother_IDType;
                        this.$refs.inputMotherIdentificationNo.value = m.PAR_Mother_UID;
                        this.inputMotherIdentificationNoExpiryDate = m.PAR_Mother_IDExpDate_convert;
                        this.$refs.inputMotherAddress1.value = m.PAR_Mother_Loc_Residence_No;
                        this.$refs.inputMotherAddress2.value = m.PAR_Mother_Loc_Address1;
                        this.$refs.inputMotherAddress3.value = m.PAR_Mother_Loc_Address2;
                        this.$refs.inputMotherCity.value = m.PAR_Mother_Loc_City;
                        this.$refs.ddlMotherCountry.value = m.PAR_Mother_Loc_Country;
                        this.$refs.inputMotherPostalCode.value = m.PAR_Mother_Loc_Postalcode;
                        this.$refs.inputMotherCompanyName.value = m.PAR_Mother_CompanyName;
                        this.$refs.inputMotherCompanyAddresseeName.value = m.PAR_Mot_Comp_Addressee;
                        this.$refs.inputMotherCompanyAddress1.value = m.PAR_Mother_Residence_No;
                        this.$refs.inputMotherCompanyAddress2.value = m.PAR_Mother_Address1;
                        this.$refs.inputMotherCompanyAddress3.value = m.PAR_Mother_Address2;
                        this.$refs.inputMotherCompanyCity.value = m.PAR_Mother_City;
                        this.$refs.ddlMotherCompanyCountry.value = m.PAR_Mother_Country;
                        this.$refs.inputMotherCompanyPostalCode.value = m.PAR_Mother_PostalCode;
                        this.$refs.inputMotherCompanyEmail.value = m.PAR_MComp_Email;
                        //mother

                        //guardian
                        this.$refs.inputGuardianFirstName.value = m.PAR_Guardian_FirstName;
                        this.$refs.inputGuardianMiddleName.value = m.PAR_Guardian_MiddleName;
                        this.$refs.inputGuardianLastName.value = m.PAR_Guardian_LastName;
                        this.inputGuardianDateofBirth = m.PAR_Guardian_DOB_convert;
                        this.ddlGuardianEmploymentStatus = m.PAR_Gar_Emp_Status;
                        this.$refs.inputGuardianOccupation.value = m.PAR_Guardian_Occupation;
                        this.$refs.inputGuardianDesignation.value = m.PAR_Guardian_Designation;
                        this.$refs.inputGuardianHomeTelNo.value = m.PAR_GarResContact;
                        this.$refs.inputGuardianOfficeTelNo.value = m.PAR_GarOffContact;
                        this.$refs.inputGuardianFax.value = m.PAR_Guardian_Fax;
                        this.$refs.inputGuardianMobileNo.value = m.PAR_Guardian_Phone;
                        this.$refs.inputGuardianEmail.value = m.PAR_Guardian_Email;
                        this.$refs.ddlGuardianNationality.value = m.PAR_Gar_Nationality;
                        this.ddlGuardianReligion = m.PAR_GarReligion;
                        this.$refs.inputGuardianRemarks.value = m.PAR_GarRemarks;
                        this.ddlGuardianIdentificationType = m.PAR_Guardian_IDType;
                        this.$refs.inputGuardianIdentificationNo.value = m.PAR_Guardian_UID;
                        this.$refs.inputGuardianAddress1.value = m.PAR_Guardian_Loc_Residence_No;
                        this.$refs.inputGuardianAddress2.value = m.PAR_Guardian_Loc_Address1;
                        this.$refs.inputGuardianAddress3.value = m.PAR_Guardian_Loc_Address2;
                        this.$refs.inputGuardianCity.value = m.PAR_Guardian_Loc_City;
                        this.$refs.ddlGuardianCountry.value = m.PAR_Guardian_Loc_Country;
                        this.$refs.inputGuardianPostalCode.value = m.PAR_Guardian_Loc_PostalCode;
                        this.$refs.inputGuardianCompanyName.value = m.PAR_Guardian_CompanyName;
                        this.$refs.inputGuardianCompanyAddresseeName.value = m.PAR_Gar_Comp_Addressee;
                        this.$refs.inputGuardianCompanyAddress1.value = m.PAR_Guardian_Residence_No;
                        this.$refs.inputGuardianCompanyAddress2.value = m.PAR_Guardian_Address1;
                        this.$refs.inputGuardianCompanyAddress3.value = m.PAR_Guardian_Address2;
                        this.$refs.inputGuardianCompanyCity.value = m.PAR_Guardian_City;
                        this.$refs.ddlGuardianCompanyCountry.value = m.PAR_Guardian_Country;
                        this.$refs.inputGuardianCompanyPostalCode.value = m.PAR_Guardian_Postalcode;
                        this.$refs.inputGuardianCompanyEmail.value = m.PAR_GComp_Email;
                        //guardian

                        //third party
                        this.$refs.inputThirdPartyCompanyName.value = m.PAR_TPComp;
                        this.$refs.inputThirdPartyAddresseeName.value = m.PAR_Fat_TP_Addressee;
                        this.$refs.inputThirdPartyAddress1.value = m.PAR_TPAddr1;
                        this.$refs.inputThirdPartyAddress2.value = m.PAR_TPAddr2;
                        this.$refs.inputThirdPartyAddress3.value = m.PAR_TPAddr3;
                        this.$refs.inputThirdPartyCity.value = m.PAR_TPCity;
                        this.$refs.inputThirdPartyCountry.value = m.PAR_TPCountry;
                        this.$refs.inputThirdPartyPostalCode.value = m.PAR_TPPin;
                        this.$refs.inputThirdPartyCompanyEmail.value = m.PAR_TPComp_Email;
                        //third party
                    });
                } catch (e) {
                    this.results = e;
                }
            },
            async Save() {
                try {
                    this.lblParentID
                    if (this.lblParentID != '')
                    {
                        let jsonString = '"PAR_Father_FirstName":"' + this.$refs.inputFatherFirstName.value + '"';
                        jsonString = jsonString + ',"PAR_Father_MiddleName":"' + this.$refs.inputFatherMiddleName.value + '"';
                        jsonString = jsonString + ',"PAR_Father_LastName":"' + this.$refs.inputFatherLastName.value + '"';
                        jsonString = jsonString + ',"PAR_Father_DOB":"' + this.inputFatherDateofBirth + '"';
                        jsonString = jsonString + ',"PAR_Fat_Emp_Status":"' + this.ddlFatherEmploymentStatus + '"';
                        jsonString = jsonString + ',"PAR_Father_Occupation":"' + this.$refs.inputFatherOccupation.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Designation":"' + this.$refs.inputFatherDesignation.value + '"';
                        jsonString = jsonString + ',"PAR_FatResContact":"' + this.$refs.inputFatherHomeTelNo.value + '"';
                        jsonString = jsonString + ',"PAR_FatOffContact":"' + this.$refs.inputFatherOfficeTelNo.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Fax":"' + this.$refs.inputFatherFax.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Phone":"' + this.$refs.inputFatherMobileNo.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Email":"' + this.$refs.inputFatherEmail.value + '"';
                        jsonString = jsonString + ',"PAR_Fat_Nationality":"' + this.$refs.ddlFatherNationality.value + '"';
                        jsonString = jsonString + ',"PAR_FatReligion":"' + this.ddlFatherReligion + '"';
                        jsonString = jsonString + ',"PAR_FatRemarks":"' + this.$refs.inputFatherRemarks.value + '"';
                        jsonString = jsonString + ',"PAR_Father_IDType":"' + this.ddlFatherIdentificationType + '"';
                        jsonString = jsonString + ',"PAR_Father_UID":"' + this.$refs.inputFatherIdentificationNo.value + '"';
                        jsonString = jsonString + ',"PAR_Father_IDExpDate":"' + this.inputFatherIdentificationNoExpiryDate + '"';
                        if (this.$refs.cbFatherShareMyEmail.checked == true) { jsonString = jsonString + ',"PAR_ShareMyContact":"Yes"'; } else { jsonString = jsonString + ',"PAR_ShareMyContact":"No"'; }
                        if (this.$refs.cbFatherShareMyMobileNumber.checked == true) { jsonString = jsonString + ',"PAR_ShareMyMobile":"Yes"'; } else { jsonString = jsonString + ',"PAR_ShareMyMobile":"No"'; }
                        if (this.$refs.cbFatherEtonStaff.checked == true) { jsonString = jsonString + ',"PAR_Father_IsStaff":"True"'; } else { jsonString = jsonString + ',"PAR_Father_IsStaff":"False"'; }
                        jsonString = jsonString + ',"PAR_Father_Loc_Residence_No":"' + this.$refs.inputFatherAddress1.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Loc_Address1":"' + this.$refs.inputFatherAddress2.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Loc_Address2":"' + this.$refs.inputFatherAddress3.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Loc_City":"' + this.$refs.inputFatherCity.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Loc_Country":"' + this.$refs.ddlFatherCountry.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Loc_Postalcode":"' + this.$refs.inputFatherPostalCode.value + '"';
                        jsonString = jsonString + ',"PAR_Father_CompanyName":"' + this.$refs.inputFatherCompanyName.value + '"';
                        jsonString = jsonString + ',"PAR_Fat_Comp_Addressee":"' + this.$refs.inputFatherCompanyAddresseeName.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Residence_No":"' + this.$refs.inputFatherCompanyAddress1.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Address1":"' + this.$refs.inputFatherCompanyAddress2.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Address2":"' + this.$refs.inputFatherCompanyAddress3.value + '"';
                        jsonString = jsonString + ',"PAR_Father_City":"' + this.$refs.inputFatherCompanyCity.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Country":"' + this.$refs.ddlFatherCompanyCountry.value + '"';
                        jsonString = jsonString + ',"PAR_Father_PostalCode":"' + this.$refs.inputFatherCompanyPostalCode.value + '"';
                        jsonString = jsonString + ',"PAR_FComp_Email":"' + this.$refs.inputFatherCompanyEmail.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_FirstName":"' + this.$refs.inputMotherFirstName.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_MiddleName":"' + this.$refs.inputMotherMiddleName.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_LastName":"' + this.$refs.inputMotherLastName.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_DOB":"' + this.inputMotherDateofBirth + '"';
                        jsonString = jsonString + ',"PAR_Mot_Emp_Status":"' + this.ddlMotherEmploymentStatus + '"';
                        jsonString = jsonString + ',"PAR_Mother_Occupation":"' + this.$refs.inputMotherOccupation.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Designation":"' + this.$refs.inputMotherDesignation.value + '"';
                        jsonString = jsonString + ',"PAR_MotResContact":"' + this.$refs.inputMotherHomeTelNo.value + '"';
                        jsonString = jsonString + ',"PAR_MotOffContact":"' + this.$refs.inputMotherOfficeTelNo.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Fax":"' + this.$refs.inputMotherFax.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Phone":"' + this.$refs.inputMotherMobileNo.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Email":"' + this.$refs.inputMotherEmail.value + '"';
                        jsonString = jsonString + ',"PAR_Mot_Nationality":"' + this.$refs.ddlMotherNationality.value + '"';
                        jsonString = jsonString + ',"PAR_MotReligion":"' + this.ddlMotherReligion + '"';
                        jsonString = jsonString + ',"PAR_MotRemarks":"' + this.$refs.inputMotherRemarks.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_IDType":"' + this.ddlMotherIdentificationType + '"';
                        jsonString = jsonString + ',"PAR_Mother_UID":"' + this.$refs.inputMotherIdentificationNo.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_IDExpDate":"' + this.inputMotherIdentificationNoExpiryDate + '"';
                        jsonString = jsonString + ',"PAR_Mother_Loc_Residence_No":"' + this.$refs.inputMotherAddress1.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Loc_Address1":"' + this.$refs.inputMotherAddress2.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Loc_Address2":"' + this.$refs.inputMotherAddress3.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Loc_City":"' + this.$refs.inputMotherCity.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Loc_Country":"' + this.$refs.ddlMotherCountry.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Loc_Postalcode":"' + this.$refs.inputMotherPostalCode.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_CompanyName":"' + this.$refs.inputMotherCompanyName.value + '"';
                        jsonString = jsonString + ',"PAR_Mot_Comp_Addressee":"' + this.$refs.inputMotherCompanyAddresseeName.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Residence_No":"' + this.$refs.inputMotherCompanyAddress1.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Address1":"' + this.$refs.inputMotherCompanyAddress2.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Address2":"' + this.$refs.inputMotherCompanyAddress3.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_City":"' + this.$refs.inputMotherCompanyCity.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Country":"' + this.$refs.ddlMotherCompanyCountry.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_PostalCode":"' + this.$refs.inputMotherCompanyPostalCode.value + '"';
                        jsonString = jsonString + ',"PAR_MComp_Email":"' + this.$refs.inputMotherCompanyEmail.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_FirstName":"' + this.$refs.inputGuardianFirstName.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_MiddleName":"' + this.$refs.inputGuardianMiddleName.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_LastName":"' + this.$refs.inputGuardianLastName.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_DOB":"' + this.inputGuardianDateofBirth + '"';
                        jsonString = jsonString + ',"PAR_Gar_Emp_Status":"' + this.ddlGuardianEmploymentStatus + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Occupation":"' + this.$refs.inputGuardianOccupation.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Designation":"' + this.$refs.inputGuardianDesignation.value + '"';
                        jsonString = jsonString + ',"PAR_GarResContact":"' + this.$refs.inputGuardianHomeTelNo.value + '"';
                        jsonString = jsonString + ',"PAR_GarOffContact":"' + this.$refs.inputGuardianOfficeTelNo.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Fax":"' + this.$refs.inputGuardianFax.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Phone":"' + this.$refs.inputGuardianMobileNo.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Email":"' + this.$refs.inputGuardianEmail.value + '"';
                        jsonString = jsonString + ',"PAR_Gar_Nationality":"' + this.$refs.ddlGuardianNationality.value + '"';
                        jsonString = jsonString + ',"PAR_GarReligion":"' + this.ddlGuardianReligion + '"';
                        jsonString = jsonString + ',"PAR_GarRemarks":"' + this.$refs.inputGuardianRemarks.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_IDType":"' + this.ddlGuardianIdentificationType + '"';
                        jsonString = jsonString + ',"PAR_Guardian_UID":"' + this.$refs.inputGuardianIdentificationNo.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Loc_Residence_No":"' + this.$refs.inputGuardianAddress1.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Loc_Address1":"' + this.$refs.inputGuardianAddress2.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Loc_Address2":"' + this.$refs.inputGuardianAddress3.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Loc_City":"' + this.$refs.inputGuardianCity.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Loc_Country":"' + this.$refs.ddlGuardianCountry.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Loc_PostalCode":"' + this.$refs.inputGuardianPostalCode.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_CompanyName":"' + this.$refs.inputGuardianCompanyName.value + '"';
                        jsonString = jsonString + ',"PAR_Gar_Comp_Addressee":"' + this.$refs.inputGuardianCompanyAddresseeName.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Residence_No":"' + this.$refs.inputGuardianCompanyAddress1.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Address1":"' + this.$refs.inputGuardianCompanyAddress2.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Address2":"' + this.$refs.inputGuardianCompanyAddress3.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_City":"' + this.$refs.inputGuardianCompanyCity.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Country":"' + this.$refs.ddlGuardianCompanyCountry.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Postalcode":"' + this.$refs.inputGuardianCompanyPostalCode.value + '"';
                        jsonString = jsonString + ',"PAR_GComp_Email":"' + this.$refs.inputGuardianCompanyEmail.value + '"';
                        jsonString = jsonString + ',"PAR_TPComp":"' + this.$refs.inputThirdPartyCompanyName.value + '"';
                        jsonString = jsonString + ',"PAR_Fat_TP_Addressee":"' + this.$refs.inputThirdPartyAddresseeName.value + '"';
                        jsonString = jsonString + ',"PAR_TPAddr1":"' + this.$refs.inputThirdPartyAddress1.value + '"';
                        jsonString = jsonString + ',"PAR_TPAddr2":"' + this.$refs.inputThirdPartyAddress2.value + '"';
                        jsonString = jsonString + ',"PAR_TPAddr3":"' + this.$refs.inputThirdPartyAddress3.value + '"';
                        jsonString = jsonString + ',"PAR_TPCity":"' + this.$refs.inputThirdPartyCity.value + '"';
                        jsonString = jsonString + ',"PAR_TPCountry":"' + this.$refs.inputThirdPartyCountry.value + '"';
                        jsonString = jsonString + ',"PAR_TPPin":"' + this.$refs.inputThirdPartyPostalCode.value + '"';
                        jsonString = jsonString + ',"PAR_TPComp_Email":"' + this.$refs.inputThirdPartyCompanyEmail.value + '"';

                        jsonString = '{ ' + jsonString + ' }'

                        const response = await DataSource.shared.updateParent(this.lblParentID, jsonString);
                        if (response) {
                            if (response.code == "1")
                            {
                                alert('Records Successfully Edited');
                                window.location.replace('/parent?id=' + this.lblParentID);
                            }
                            else
                            {
                                alert('Update Parent Error - Please try again later');
                            }
                        }
                    }
                    else
                    {
                        alert('Error! Please search again.');
                    }
                } catch (e) {
                    this.results = e;
                }
            },
        },
    }
</script>

<style scoped>
    .fatherAreaDiv, .motherAreaDiv, .guardianAreaDiv, .thirdpartyAreaDiv, .otherAreaDiv
    {
        margin-bottom:50px;
    }
    .el-date-editor, .el-input
    {
        width:100% !important;
    }
</style>

<style>
    .parentPageBTabs .tab-content
    {
        margin-top:30px;
    }
    .parentPageBTabs .nav-link
    {
        font-weight:bold;
    }
    .parentPageBTabs .nav-tabs .nav-link.active
    {
        background-color:#413f56;
        color:white;
        border:5px solid #dee2e6;
    }
    .parentPageBTabs .nav-tabs
    {
        border-bottom:5px solid #dee2e6;
    }
</style>