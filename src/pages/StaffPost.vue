<template>
    <div id="staff-post" class="container">
        <div class="row">
            <!--<b>result:</b> {{staffPostResults}}-->
            <div class="col-md-8 mt-4">
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
                        <div class="image-wrapper" v-if="object.postFiles">
                            <ul>
                                <li class="postFile__item" v-for="postFile in object.postFiles" :key="postFile.ID">
                                    <img :src="postFile.PostItemPath"
                                         :class="{'post-disabled':postFile.PostItemStatus !=='Active'}"  v-if="checkIfImage(postFile.PostItemPath)"/>
                                </li>
                            </ul>
                        </div>
                        <div class="content">
                            <p>
                                <!--<strong class="feed-subtitle"> ADD A NOTE</strong>-->
                                {{object.PostContent}}
                            </p>
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
            <vs-col vs-justify="center" vs-w="4" class="right-sideBar">
                <div class="dashboard-title mt-4 mb-3"><h5 class="text-center">Announcement</h5></div>
                <div class="announcement__wrapper">
                    <div class="announcement__item">
                        <div class="subtitle">
                            <h6>Holidays</h6>
                        </div>
                        <div class="desc">
                            we offer academic, social and personal success for every student. Through opportunities to
                            learn from the best, experiences beyond the ordinary, and the encouragement to achieve more
                            than what they thought possible.
                        </div>
                    </div>
                    <div class="announcement__item">
                        <div class="subtitle">
                            <h6>Holidays</h6>
                        </div>
                        <div class="desc">
                            we offer academic, social and personal success for every student. Through opportunities to
                            learn from the best, experiences beyond the ordinary, and the encouragement to achieve more
                            than what they thought possible.
                        </div>
                    </div>
                    <div class="announcement__item">
                        <div class="subtitle">
                            <h6>Holidays</h6>
                        </div>
                        <div class="desc">
                            we offer academic, social and personal success for every student. Through opportunities to
                            learn from the best, experiences beyond the ordinary, and the encouragement to achieve more
                            than what they thought possible.
                        </div>
                    </div>
                </div>
            </vs-col>
        </div>

        <b-modal id="modal1" hide-footer title="ADD NOTE" v-model="isModalOpen">
            <form class="needs-validation form-style" novalidate @submit.prevent="onSubmit">

                <div class="mb-3 form-group" :class="{ 'form-group--error': $v.content.$error }">
                    <!--<label for="username">Username</label>-->
                    <textarea type="text" class="form-control" id="postContent" v-model="postContent"
                              placeholder="CONTENT"
                              required v-model.trim="$v.content.$model"></textarea>
                    <quill-editor ref="myTextEditor"
                                  v-model="content"
                                  :options="editorOption"
                                  @blur="onEditorBlur($event)"
                                  @focus="onEditorFocus($event)"
                                  @ready="onEditorReady($event)">
                    </quill-editor>
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
                        <!--<label for="password">Password</label>-->
                        <input type="text" class="form-control" id="tagAcademicYearID" v-model="tagAcademicYearID"
                               placeholder="Tag Academic Year ID"
                               required>
                        <div class="invalid-feedback" style="width: 100%;">
                            Your Tag Academic Year ID is required.
                        </div>
                    </div>

                    <div class="col-md-6 mb-2">
                        <!--<label for="password">Password</label>-->
                        <input type="text" class="form-control" id="tagUserID" v-model="tagUserID"
                               placeholder="Tag User ID"
                               required>
                        <small>separate ID by comma</small>
                        <div class="invalid-feedback" style="width: 100%;">
                            Your Tag User ID is required.
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <!--<label for="password">Password</label>-->
                        <input type="text" class="form-control" id="tagClassID" v-model="tagClassID"
                               placeholder="Tag Class ID"
                               required>
                        <div class="invalid-feedback" style="width: 100%;">
                            Your Tag Class ID is required.
                        </div>
                    </div>

                    <div class="col-md-6 mb-2">
                        <!--<label for="password">Password</label>-->
                        <input type="text" class="form-control" id="tagLevelID" v-model="tagLevelID"
                               placeholder="Tag Level ID"
                               required>
                        <div class="invalid-feedback" style="width: 100%;">
                            Your Tag Level ID is required.
                        </div>
                    </div>
                </div>

                <input type="file" multiple @change="onFileChanged" ref="fileupload">
                <!--<button @click.prevent="onUpload">Upload!</button>-->

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
    import quillEditor from "vue-quill-editor";
    // import vue2Dropzone from 'vue2-dropzone';
    // import 'vue2-dropzone/dist/vue2Dropzone.min.css';
    // import '@websanova/vue-upload';
    import {required, minLength} from 'vuelidate/lib/validators';
    import isImage from "is-image";

    export default {
        name: 'staffPost',
        data() {
            return {
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
                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'font': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }],
                            ['clean'],
                            ['link', 'image', 'video']
                        ],
                        syntax: {
                            highlight: text => hljs.highlightAuto(text).value
                        }
                    }
                },
                selectedFile: null,
                success: null,
                dropzoneOptions: {
                    url: 'http://local.emsv2/controller/Upload_File.asmx/uploadFile',
                },
                isLoading: true,
                saveResponse: "",
                PostItemPath: "",
            };
        },
        components: {
            // FileUpload: VueUploadComponent
            quillEditor,
        },
        // components: {Step},
        async mounted() {
            // this.showSession()
            // user menu
            try {
                let response = await DataSource.shared.getStaffPost();
                for (let item of response.Table) {
                    const fileRes = await DataSource.shared.getPostFile(item.PostID);
                    if (fileRes.Table) {
                        item.postFiles = fileRes.Table;
                    }

                    // get name
                    // const author = await DataSource.shared.getPostFile(item.PostCreatedBy);
                    // console.log(author);
                    // item.authorName = ;
                }
                this.list = response.Table;
                let saveResponse = await DataSource.shared.getPostDropdown();
                console.log(saveResponse);
            } catch (e) {
                console.log(e, '  errrr');
            }
            this.isLoading = false;
            // if (response) {
            //     switch (response.code) {
            //         case "2":
            //             this.staffPostResults = `No Record Found`;
            //             //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
            //             break;
            //         case "88":
            //             this.staffPostResults = `Please login`;
            //             //this.results = `Invalid password - sample 2: code: ${response.code}`;
            //             break;
            //         case "99":
            //             this.staffPostResults = `Please try again later`;
            //             //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
            //             break;
            //     }
            // }
        },

        methods: {
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
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            }

        },
        validations: {
            content: {
                required,
                minLength: minLength(4)
            }
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            },
            contentCode() {
                return hljs.highlightAuto(this.content).value
            }
        },
    };
</script>

<style scoped>

    .author {
        text-align: left;
        font-weight: bold;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 20px;
    }

    .feed-heading {
        display: inline-block;
        text-align: left;
    }

    .feed-box .content {
        padding: 10px 0px;
        text-align: left;
        margin: 10px 0px 0px;
        border-top: 1px solid #edf0f4;
        border-left: 3px solid #f44353;
    }

    .feed-box {
        margin: 20px 0px;
        position: relative;
        background: white;
        border-radius: 3px;
        box-shadow: 0px 0px 10px -7px;
    }

    .postFile {
        display: block;
        width: 100%;
    }

    .postFile__item a {
        display: inline-block;
        padding: 5px 20px 5px 46px;
        /* background: #f5f9fc; */
        border-radius: 20px;
        margin: 10px;
        float: left;
        border: 1px solid #b7d3e8;
        position: relative;
        color: #8ca0af;
        overflow: hidden;
        font-weight: normal;
    }

    .postFile__item a i {
        color: #b7d3e8;
        background: #f5f9fc;
        position: absolute;
        left: 0px;
        height: 100%;
        width: 32px;
        top: 0px;
        text-align: center;
        border-right: 1px solid #b7d3e8;
        line-height: 28px;
    }

    .postFile__item {
        border-top: 1px solid #eee;
        margin-bottom: -10px;
        display: table;
        width: 100%;
    }

    li.postFile__item img {
        max-width: 100%;
        display: initial;
        object-fit: cover;
    }

    .image-wrapper li.postFile__item {
        display: flex;
        width: 21%;
        height: 100px;
        overflow: hidden;
        margin: 0px 2%;
    }

    .image-wrapper li.postFile__item:first-child {
        width: 96%;
        height: 200px;
    }

    .image-wrapper li.postFile__item:empty{
        display:none;
    }

    .image-wrapper ul {
        padding: 0px;
        margin: 0px;
    }

    .profile {
        width: 52px;
        position: relative;
        display: inline-block;
        margin-right: 20px;
    }

    .profile img {
        max-width: 100%;
        background: #e6ecf7;
        border-radius: 100%;
    }

    .content-icon {
        background: #f4415421;
        flex: 1;
        width: 24px;
        height: 24px;
        border-radius: 23px;
        text-align: center;
        color: #e9454c;
        font-size: 12px;
        line-height: 23px;
        /* display: inline-block; */
    }

    .content p {
        margin: 0px 10px;
        flex: 20;
    }

    small.date {
        display: block;
        color: #9a9a9a;
    }

    div#modal1 {
        z-index: 99999;
    }

    .toggle {
        position: relative;
        display: block;
        width: 40px;
        height: 20px;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        transform: translate3d(0, 0, 0);
    }

    .toggle:before {
        content: "";
        position: relative;
        top: 3px;
        left: 3px;
        width: 34px;
        height: 14px;
        display: block;
        background: #9A9999;
        border-radius: 8px;
        transition: background 0.2s ease;
    }

    .toggle span {
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        display: block;
        background: white;
        border-radius: 10px;
        box-shadow: 0 3px 8px rgba(154, 153, 153, 0.5);
        transition: all 0.2s ease;
    }

    .toggle span:before {
        content: "";
        position: absolute;
        display: block;
        margin: -18px;
        width: 56px;
        height: 56px;
        background: rgba(79, 46, 220, 0.5);
        border-radius: 50%;
        transform: scale(0);
        opacity: 1;
        pointer-events: none;
    }

    #profolio:checked + .toggle:before {
        background: #b9b9b9;
    }

    #profolio:checked + .toggle span {
        background: #f44252;
        transform: translateX(20px);
        transition: all 0.2s cubic-bezier(0.8, 0.4, 0.3, 1.25), background 0.15s ease;
        box-shadow: 0 3px 8px rgba(79, 46, 220, 0.2);
    }

    #profolio:checked + .toggle span:before {
        transform: scale(1);
        opacity: 0;
        transition: all 0.4s ease;
    }

    input#profolio {
        display: none;
    }

    label.toggle strong {
        padding-left: 49px;
        top: -12px;
        position: relative;
    }

    label.toggle {
        margin: 20px 10px;
    }

    .feed-header h4 {
        margin-right: 20px;
        display: inline-block;
        float: left;
        line-height: 37px;
        margin-bottom: 0px;
        font-size: 18px;
        letter-spacing: 1px;
        text-transform: uppercase;
        padding-left: 10px;
        color: #5a6a79;
    }

    .feed-header {
        background: #f5f9fc;
        padding: 10px;
        border: 1px solid #d4e4f1;
        display: table;
        width: 100%;
    }

    .addPost {
        display: inline-block;
        float: right;
    }

    .addPost button {
        background: #3e445c;
        border: 0px;
        color: #ffffff;
        border-radius: 2px;
        position: relative;
        font-size: 13px;
        width: 100%;
        padding: 10px;
        text-align: left;
        /* margin-top: 20px; */
    }

    strong.feed-subtitle {
        border-bottom: 1px solid #413f5617;
        padding-bottom: 10px;
        margin-bottom: 10px;
        display: block;
    }

    .success {
        text-align: left;
        padding: 10px;
        background: linear-gradient(to right, #e644513b, #e6ecf7);
        margin-top: 10px;
        color: #3e445c;
    }

    .success:empty {
        display: none;
        padding: 0px;
    }

    .right-sideBar {
        padding: 0px 20px;
    }

    .announcement__item {
        background: #f5f9fc;
        padding: 20px;
        margin-bottom: 20px;
        text-align: left;
        border: 1px solid #d4e4f1;
    }

    .announcement__item img {
        max-width: 80%;
        margin: 20px 0px;
        border-radius: 4px;
    }

    .announcement__item .subtitle h6 {
        font-weight: bold;
    }



</style>

<style>

</style>