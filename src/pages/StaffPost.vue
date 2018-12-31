<template>
    <div id="staff-post" class="mt-3 container">
        <div class="row">
            <!--<b>result:</b> {{staffPostResults}}-->
            <div class="col-md-8">
                <div class="feed-header">
                    <h4 class="text-left">Activity</h4>
                    <div class="addPost">
                        <b-btn v-b-modal.modal1>ADD NOTE</b-btn>
                    </div>
                </div>
                <div class="" v-for="object in list" :key="object.PostID">
                    <div class="feed-box">
                        <div class="author">
                            <div class="profile"><img src="../assets/boy.png"/></div>
                            <span>{{object.PostCreatedBy}}</span>
                        </div>
                        <div class="content">
                            <div class="content-icon">
                                <i class="fa fa-pencil" aria-hidden="true"></i>
                            </div>
                            <p>
                                <strong class="feed-subtitle"> ADD A NOTE</strong>
                                {{object.PostContent}}
                            </p>
                        </div>
                        <small class="date">{{object.PostCreatedDate}}</small>
                        <!--<div slot="footer">-->
                        <!--<vs-row vs-justify="flex-end">-->
                        <!--<vs-button color="primary" type="gradient" >View</vs-button>-->
                        <!--<vs-button color="danger" type="gradient">Delete</vs-button>-->
                        <!--</vs-row>-->
                        <!--</div>-->
                    </div>
                </div>

            </div>
            <vs-col vs-justify="center" vs-w="4">
                profile here
            </vs-col>
        </div>

        <b-modal id="modal1" hide-footer title="ADD NOTE">
            <form class="needs-validation form-style" novalidate @submit.prevent="onSubmit">

                <div class="mb-3">
                    <!--<label for="username">Username</label>-->
                    <textarea type="text" class="form-control" id="postContent" v-model="postContent"
                              placeholder="CONTENT"
                              required></textarea>
                    <quill-editor ref="myTextEditor"
                                  v-model="content"
                                  :config="editorOption">
                    </quill-editor>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your content is required.
                    </div>
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
                <input type="file" @change="onFileChanged">
                <button @click.prevent="onUpload">Upload!</button>

                <div class="mb-2">

                </div>
                <div class="system-msg"><p>{{results}}</p>
                    <p v-if="error" style="color: red">{{error}}</p></div>
                <div class="row d-flex mt-5 mb-2">
                    <div class="col-md-6">
                        <b-btn class="btn-lg" variant="outline-danger" block @click="hideModal">Cancel</b-btn>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-primary btn-lg btn-block login-btn" type="submit">Submit
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
    import vue2Dropzone from 'vue2-dropzone';
    import 'vue2-dropzone/dist/vue2Dropzone.min.css';
    import '@websanova/vue-upload';

    export default {
        name: 'staffPost',
        data() {
            return {
                token: null,
                userType: null,
                list: [],
                error: "",
                staffPostResults: "",
                results: "",
                postContent: "",
                tagAcademicYearID: "",
                profolio: "",
                tagUserID: "",
                tagClassID: "",
                tagLevelID: "",
                // files: [],
                content: '<h2>Example</h2>',
                editorOption: {},
                selectedFile: null,

                dropzoneOptions: {
                    url: 'http://local.emsv2/controller/Upload_File.asmx/uploadFile',
                }
            };
        },
        components: {
            // FileUpload: VueUploadComponent
            quillEditor,
            vueDropzone: vue2Dropzone
        },
        // components: {Step},
        async mounted() {
            // this.showSession()
            // user menu
            this.staffPostResults = response;
            let response = await DataSource.shared.getStaffPost();
            this.list = response.Table;
            console.log(response);
            if (response) {
                switch (response.code) {
                    case "2":
                        this.staffPostResults = `No Record Found`;
                        //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                        break;
                    case "88":
                        this.staffPostResults = `Please login`;
                        //this.results = `Invalid password - sample 2: code: ${response.code}`;
                        break;
                    case "99":
                        this.staffPostResults = `Please try again later`;
                        //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
                        break;
                }
            }
        },
        methods: {
            onFileChanged(event) {
                this.selectedFile = event.target.files;
            },
            async onUpload() {
                const formData = new FormData();
                console.log(this.selectedFile);
                formData.append('myFile', this.selectedFile, this.selectedFile.name);
                this.formData = formData;

                await DataSource.shared.uploadFile(this.selectedFile);
            },
            async onSubmit() {
                this.error = "";
                //this.results = "<< Requesting.. >>";
                try {
                    const saveResponse = await DataSource.shared.savePost(this.postContent, this.tagAcademicYearID, this.profolio, this.tagUserID, this.tagClassID, this.tagLevelID, this.formData);
                    console.log('response ', saveResponse);
                    if (saveResponse) {
                        switch (saveResponse.code) {
                            case "1":
                                this.results = `Post Submitted`;
                                break;
                            case "88":
                                this.results = `Please Login to submit post`;
                                break;
                            case "99":
                                this.results = `Please try again later`;
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

            }
        }
    };
</script>

<style scoped>

    .author {
        text-align: left;
        font-weight: bold;
    }

    .content {
        padding: 10px 0px;
        text-align: left;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin: 0px 0px 10px 77px;
        background: #ffffff;
        padding: 20px;
        border-radius: 4px;
        border-bottom: 2px solid #efefef;
    }

    .feed-box {
        padding: 20px 20px;
        margin: 0px 0px 0px 20px;
        position: relative;
    }

    .feed-box:before {
        content: "";
        width: 1px;
        height: 92%;
        background: #3333331c;
        display: block;
        position: absolute;
        left: 26px;
        top: 34px;
    }

    .profile {
        width: 52px;
        position: relative;
        left: -19px;
        display: inline-block;
    }

    .profile img {
        max-width: 100%;
        background: #ccc;
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
        text-align: right;
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
        background: #947ADA;
    }

    #profolio:checked + .toggle span {
        background: #4F2EDC;
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
        float: left;
        margin-right: 20px;
    }

    .addPost {
        float: left;
    }

    .feed-header {
        display: table;
    }

    .addPost button {
        background: #413f56;
        border: 0px;
        color: #8f8bbd;
        font-weight: bold;
        border-radius: 21px;
        position: relative;
        top: -2px;
        font-size: 13px;
    }
    strong.feed-subtitle {
        border-bottom: 1px solid #413f5617;
        padding-bottom: 10px;
        margin-bottom: 10px;
        display: block;
    }
</style>

<style>
    div#modal1 header {
        background: url("../assets/modal-bg.png");
    }

    #modal1 .form-control {
        background: #ebebeb80;
        border: 0px;
        padding: 10px;
    }

    #modal1 .btn {
        border-radius: 52px !important;
    }

</style>