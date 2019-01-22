<template>
    <div id="staff-post" class="container">
        <div class="row">
            <!--<b>result:</b> {{staffPostResults}}-->
            <vs-col vs-justify="center" vs-w="4" class="right-sideBar">
                <div class="dashboard-logo mt-4 mb-3"><img src="../assets/kagami-long.png"/></div>
                <div class="sideBarSection__wrapper">
                    <div class="sideBarSection__item">
                        <div class="subtitle">
                            <h6>Communities</h6>
                        </div>
                        <div class="desc flex">
                            <ul>
                                <li><span class="sideBarSection__img"><img src="../assets/boy.png"></span> N2 Inquirers
                                    Class
                                </li>
                                <li><span class="sideBarSection__img"><img src="../assets/boy.png"></span> K2 Explorers
                                    Class
                                </li>
                                <li><span class="sideBarSection__img"><img src="../assets/boy.png"></span> PSA Group
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="sideBarSection__item">
                        <div class="subtitle">
                            <h6>Upcoming Events</h6>
                        </div>
                        <div class="desc">
                            <ul>
                                <li>22 DEC Christmas Party</li>
                                <li>24 DEC Half Day Closure</li>
                                <li>25 DEC Full Day Closure</li>
                                <li>30 DEC Celebration of learning</li>
                                <li>31 DEC Full Day Closure</li>
                                <li>01 JAN Full Day Closure</li>
                                <li>07 JAN Start of Term 1</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </vs-col>
            <div class="col-md-8 mt-4">
                <div class="notification ">
                    <h4 class="text-left mb-3">Important Notification</h4>
                    <div class="row">
                        <div class=" col-md-4">
                            <div class="notification__item">
                                <div class="subtitle">
                                    <h6>Parent Teacher Conference 2018</h6>
                                </div>
                                <div class="desc">
                                    <span>Please sign up for a slot for the Parent Teachers Conference by 30 Nov 2018.</span>
                                </div>
                                <div class="notification-item__footer ">
                                    <div class="notification__footer-item">
                                        Ms Lisa<br/>
                                        23 February at 19:36
                                    </div>
                                    <div class="notification__footer-item">
                                        <button class="btn text-center">Mark as read</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class=" col-md-4">
                            <div class="notification__item">
                                <div class="subtitle">
                                    <h6>Parent Teacher Conference 2018</h6>
                                </div>
                                <div class="desc">
                                    <span>Please sign up for a slot for the Parent Teachers Conference by 30 Nov 2018.</span>
                                </div>
                                <div class="notification-item__footer ">
                                    <div class="notification__footer-item">
                                        Ms Lisa<br/>
                                        23 February at 19:36
                                    </div>
                                    <div class="notification__footer-item">
                                        <button class="btn text-center">Mark as read</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=" col-md-4">
                            <div class="notification__item">
                                <div class="subtitle">
                                    <h6>Parent Teacher Conference 2018</h6>
                                </div>
                                <div class="desc">
                                    <span>Please sign up for a slot for the Parent Teachers Conference by 30 Nov 2018.</span>
                                </div>
                                <div class="notification-item__footer ">
                                    <div class="notification__footer-item">
                                        Ms Lisa<br/>
                                        23 February at 19:36
                                    </div>
                                    <div class="notification__footer-item">
                                        <button class="btn text-center">Mark as read</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="feed-header">
                    <h4 class="text-left">Activity</h4>
                    <div class="addPost">
                        <b-btn v-b-modal.modal1 @click="showModal">ADD NOTE</b-btn>
                    </div>
                </div>
                <div class="success">{{success}}</div>
                <div v-if="isLoading">Loading...</div>

                <div class="" v-for="object in list" :key="object.PostID">
                    <div class="feed-box" v-bind:class="[object.PostID]">
                        <div class="author">
                            <div class="profile"><img src="../assets/boy.png"/></div>
                            <div class="feed-heading">
                                <span>{{object.PostCreatedBy}}</span>
                                <small class="date"><i class="fa fa-clock-o" aria-hidden="true"></i>
                                    {{object.PostCreatedDate}}
                                </small>
                            </div>
                        </div>
                        <div class="content">
                            <p>
                                <!--<strong class="feed-subtitle"> ADD A NOTE</strong>-->
                                {{object.PostContent}}
                            </p>
                        </div>
                        <div class="image-wrapper" v-if="object.postFiles">
                            <ul>
                                <li class="postFile__item" v-for="postFile in object.postFiles" :key="postFile.ID">
                                    <img :src="postFile.PostItemPath"
                                         :class="{'post-disabled':postFile.PostItemStatus !=='Active'}"
                                         v-if="checkIfImage(postFile.PostItemPath)"/>
                                </li>
                            </ul>
                        </div>

                        <div class="postFile" v-if="object.postFiles">
                            <div class="postFile__item" v-for="postFile in object.postFiles" :key="postFile.ID">
                                <!--<img :src="postFile.PostItemPath" :class="{'post-disabled':postFile.PostItemStatus !=='Active'}"/>-->


                                <a v-if="!checkIfImage(postFile.PostItemPath)" v-bind:href="[postFile.PostItemPath]"
                                   :class="{'post-disabled':postFile.PostItemStatus !=='Active'}">
                                    <i class="fa fa-file" aria-hidden="true"></i>
                                    {{postFile.PostItemPostID}}
                                </a>
                                <!--{{postFile.PostItemCreatedDate}}-->
                            </div>
                        </div>
                        <!--<div slot="footer">-->
                        <!--<vs-row vs-justify="flex-end">-->
                        <!--<vs-button color="primary" type="gradient" >View</vs-button>-->
                        <!--<vs-button color="danger" type="gradient">Delete</vs-button>-->
                        <!--</vs-row>-->
                        <!--</div>-->
                    </div>
                </div>

            </div>

        </div>

        <div class="" v-for="object in academicYearTable" :key="object.PK_Class_ID">
            {{object.PK_Semester_ID}} -- {{object.CLS_ClassName}}
        </div>

        <b-modal id="modal1" hide-footer title="ADD NOTE" v-model="isModalOpen">
            <form class="needs-validation form-style" novalidate @submit.prevent="onSubmit">
                <div class="form-group">
                    <at :members="studentAt">
                        <div class="editor" contenteditable v-html="html" @click="handleTagClick"></div>
                    </at>
                    <!--{{studentAt}}-->
                </div>
                <div class="mb-3 form-group" :class="{ 'form-group--error': $v.content.$error }">
                    <!--<label for="username">Username</label>-->
                    <textarea type="text" class="form-control" id="postContent" v-model="postContent"
                              placeholder="CONTENT"
                              required v-model.trim="$v.content.$model"></textarea>
                    <!--<RichTextEditor @inputChange="inputChange"/>-->
                    <!--<div>-->
                    <!--<p>Output:</p>-->
                    <!--{{postContent}}-->
                    <!--</div>-->
                </div>

                <div class="error" v-if="!$v.content.required">Field is required</div>
                <div class="error" v-if="!$v.content.minLength">Name must have at least
                    {{$v.content.$params.minLength.min}} letters.
                </div>

                <div class="mb-2">
                    <input type="checkbox" name="profolio" id="profolio" value="1" true-value="Yes" false-value="No"
                           v-model="profolio">
                    <label for="profolio" class="toggle"><strong>PROFOLIO</strong><span></span></label>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <label for="tagAcademicYearID">Academic Year</label>
                        <select class="form-control" id="tagAcademicYearID" v-model="tagAcademicYearID">
                            <option v-for="object in academicYearTable" :key="object.PK_Class_ID"
                                    :value="object.PK_Semester_ID">{{object.SMT_Code}}
                            </option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-2">
                        <label for="tagUserID">Student</label>
                        <input type="text" class="form-control" id="tagUserID" v-model="tagUserID"
                               placeholder="Tag User ID"
                               required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <label for="tagClassID">Class</label>
                        <select class="form-control" id="tagClassID" v-model="tagClassID">
                            <option v-for="object in classesTable" :key="object.PK_Class_ID"
                                    :value="object.PK_Class_ID">{{object.CLS_ClassName}}
                            </option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-2">
                        <label for="tagLevelID">Level</label>
                        <select class="form-control" id="tagLevelID" v-model="tagLevelID">
                            <option v-for="object in levelsTable" :key="object.PK_Class_ID"
                                    :value="object.SC_FK_CourseID">{{object.CRS_Course_Name}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="row inputFile-box">
                    <div class="col-md-12">
                        <input type="file" multiple @change="onFileChanged" ref="fileupload" class="inputfile"
                               id="inputfile"
                               data-multiple-caption="{count} files selected">
                        <label for="inputfile" @click="inputFile()">Choose a file</label>
                        <!--<button @click.prevent="onUpload">Upload!</button>-->

                        <div class="btn btn-primary" v-if="selectedFile" @click="clearPreview()"><strong>X</strong>
                            REMOVE ALL
                        </div>
                        <div class="uploadFile-image">
                            <div v-for="(file, key) in selectedFile" class="col-md-3 file-listing">
                                <!--{{ file.name }}-->
                                <img class="preview" v-bind:ref="'image'+parseInt( key )"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-2">

                </div>
                <div class="system-msg" v-bind:class="{'bg-danger': systemmsgError===true}">{{results}}
                    <p v-if="error" style="color: red">{{error}}</p></div>
                <div class="row d-flex submit-wrap">
                    <div class="col-md-6">
                        <b-btn class="float-left" @click="hideModal">Cancel</b-btn>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-primary login-btn" type="submit">Submit
                        </button>
                    </div>
                </div>
            </form>
        </b-modal>


    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    // import vue2Dropzone from 'vue2-dropzone';
    // import 'vue2-dropzone/dist/vue2Dropzone.min.css';
    // import '@websanova/vue-upload';
    import {required, minLength} from 'vuelidate/lib/validators';
    import isImage from "is-image";
    import At from 'vue-at';
    // import RichTextEditor from "../components/RichTextEditor/RichTextEditor";

    export default {
        name: 'staffPost',
        // components: {RichTextEditor},
        data() {
            return {
                html: '',
                members: ['Roxie Miles', 'grace.carroll', '小浩'],
                files: [],
                systemmsgError: false,
                isModalOpen: false,
                token: null,
                userType: null,
                list: [],
                error: "",
                staffPostResults: "",
                results: "",
                postContent: "",
                tagAcademicYearID: "",
                profolio: "No",
                tagUserID: "",
                tagClassID: "",
                tagLevelID: "",
                // files: [],
                content: '',
                selectedFile: null,
                success: null,
                dropzoneOptions: {
                    url: 'http://local.emsv2/controller/Upload_File.asmx/uploadFile',
                },
                isLoading: true,
                saveResponse: "",
                PostItemPath: "",
                tagResponseText: "123",

                academicYearTable: [],
                classesTable: [],
                levelsTable: [],
                studentTable: [],
                studentAt: [],
            };
        },
        components: {At},
        // components: {Step},
        async mounted() {
            // this.showSession()
            // user menu
            try {
                let response = await DataSource.shared.getStaffPost();
                if (response.Table) {
                    for (let item of response.Table) {
                        const fileRes = await DataSource.shared.getPostFile(item.PostID);
                        if (fileRes.Table) {
                            item.postFiles = fileRes.Table;
                        }
                    }
                    this.list = response.Table;
                }

                let tagResponse = await DataSource.shared.getPostDropdown();

                if (tagResponse.AcademicYearTable && tagResponse.AcademicYearTable.Table) {
                    let uniqueYears = [];
                    tagResponse.AcademicYearTable.Table.forEach(object => {
                        const isExist = uniqueYears.find(year => year.SMT_Code === object.SMT_Code);
                        if (!isExist) {
                            uniqueYears.push(object);
                        }
                    });
                    this.academicYearTable = uniqueYears;
                }
                if (tagResponse.ClassesTable && tagResponse.ClassesTable.Table) {
                    let uniqueClass = [];
                    tagResponse.ClassesTable.Table.forEach(object => {
                        const isExist = uniqueClass.find(year => year.PK_Class_ID === object.PK_Class_ID);
                        if (!isExist) {
                            uniqueClass.push(object);
                        }
                    });
                    this.classesTable = uniqueClass;
                }
                if (tagResponse.LevelsTable && tagResponse.LevelsTable.Table) {

                    let uniqueLevel = [];
                    tagResponse.LevelsTable.Table.forEach(object => {
                        const isExist = uniqueLevel.find(level => level.SC_FK_CourseID === object.SC_FK_CourseID);
                        if (!isExist) {
                            uniqueLevel.push(object);
                        }
                    });

                    this.levelsTable = uniqueLevel;
                }
                if (tagResponse.StudentTable && tagResponse.StudentTable.Table) {
                    // this.studentTableList = tagResponse.StudentTable.Table.PK_Class_ID;

                    const studentTableList = tagResponse.StudentTable.Table.map(object => {
                        return object.Full_Name;
                    });
                    this.studentAt = studentTableList;
                    console.log(this.studentAt);

                    this.studentTable = tagResponse.StudentTable.Table;
                }
                if (response.Table) {
                    for (let item of response.Table) {
                        const fileRes = await DataSource.shared.getPostFile(item.PostID);
                        if (fileRes.Table) {
                            item.postFiles = fileRes.Table;
                        }
                    }
                    this.list = response.Table;
                }


            } catch (e) {
                console.log(e, '  errrr');
            }
            this.isLoading = false;
        },
        methods: {
            handleTagClick(e) {
                console.log(e);
            },

            inputChange(input) {
                this.postContent = input;
            },
            checkIfImage(file) {
                return isImage(file);
            },
            showModal() {
                this.isModalOpen = true;
            },
            hideModal() {
                this.isModalOpen = false;
            },
            onFileChanged(event) {
                this.selectedFile = event.target.files;
                this.getImagePreviews();
            },
            async onUpload() {
                // const formData = new FormData();
                // console.log(this.selectedFile);
                // formData.append('myFile', this.selectedFile, this.selectedFile.name);
                // this.formData = formData;
                // await DataSource.shared.uploadFile(this.selectedFile);
            },
            async onSubmit() {
                this.error = "";
                //this.results = "<< Requesting.. >>";
                try {
                    const saveResponse = await DataSource.shared.savePost(this.selectedFile, this.postContent, this.tagAcademicYearID, this.profolio, this.tagUserID, this.tagClassID, this.tagLevelID);

                    if (saveResponse) {
                        switch (saveResponse.code) {
                            case "1":
                                this.isModalOpen = false;
                                console.log('success');
                                // reset all input filed to blank
                                this.selectedFile = null;
                                this.$refs.fileupload.value = "";
                                this.postContent = null;
                                this.tagAcademicYearID = null;
                                this.profolio = null;
                                this.tagUserID = null;
                                this.tagClassID = null;
                                this.results = `Post Submitted`;
                                this.success = 'Post Submitted, activity will be active in a while';
                                break;
                            case "88":
                                this.results = `Please Login to submit post`;
                                this.systemmsgError = true;
                                break;
                            case "99":
                                this.results = `Please fill in content`;
                                this.systemmsgError = true;
                                break;
                            // default:
                            //     alert("Please try again later");
                            //     this.results = JSON.stringify(response);
                        }
                    }
                } catch (e) {
                    console.log(e);
                    this.error = e;
                }

            },
            getImagePreviews() {
                /*
                  Iterate over all of the files and generate an image preview for each one.
                */
                for (let i = 0; i < this.selectedFile.length; i++) {
                    /*
                      Ensure the file is an image file
                    */
                    if (/\.(jpe?g|png|gif)$/i.test(this.selectedFile[i].name)) {
                        /*
                          Create a new FileReader object
                        */
                        let reader = new FileReader();

                        /*
                          Add an event listener for when the file has been loaded
                          to update the src on the file preview.
                        */
                        reader.addEventListener("load", function () {
                            this.$refs['image' + parseInt(i)][0].src = reader.result;
                        }.bind(this), false);

                        /*
                          Read the data for the file in through the reader. When it has
                          been loaded, we listen to the event propagated and set the image
                          src to what was loaded from the reader.
                        */
                        reader.readAsDataURL(this.selectedFile[i]);
                    }
                }
            },
            clearPreview() {
                this.selectedFile = null;
            }
        },
        validations: {
            content: {
                required,
                minLength: minLength(4)
            }
        },
    };
</script>

<style scoped>

</style>

<style>

</style>