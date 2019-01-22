<template>
    <div id="Gallery" class="container">

        <div class="row ">
            <div class="addPost">
                <b-btn v-b-modal.saveModal @click="showModal">ADD IMAGE</b-btn>
            </div>
        </div>
        <b-modal id="saveModal" hide-footer title="ADD NOTE" v-model="isModalOpen">
            <form class="needs-validation form-style" novalidate @submit.prevent="onSubmit">

                <div class="mb-3 form-group" >
                    <textarea type="text" class="form-control" id="postContent" v-model="postContent"
                              placeholder="CONTENT"
                              required></textarea>
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
    /* eslint-disable */
    import DataSource from "../data/datasource";

    export default {
        name: 'gallery',
        data() {
            return {
                files: [],
                selectedFile: null,
                fileType: "",
                galFolderID: "",
                folderName: "",
                isModalOpen: false,
                dropzoneOptions: {
                    url: 'http://local.emsv2/controller/Upload_File.asmx/uploadFile',
                },
            };
        },
        mounted() {
        },
        methods: {
            showModal() {
                this.isModalOpen = true;
            },
            hideModal() {
                this.isModalOpen = false;
            },
            async onSubmit() {
                this.error = "";
                //this.results = "<< Requesting.. >>";
                try {
                    const response = await DataSource.shared.saveGallery(this.files, this.fileType, this.galFolderID, this.folderName);

                    if (response) {
                        switch (response.code) {
                            case "1":
                                this.isModalOpen = false;
                                console.log('success');
                                // reset all input filed to blank
                                this.selectedFile = null;
                                this.$refs.fileupload.value = "";
                                this.fileType = null;
                                this.galFolderID = null;
                                this.folderName = null;
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
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
