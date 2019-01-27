<template>
    <div class="aaaa">
        <div class="feed-box" v-bind:class="[post.PostID]">
            <div class="author">
                <div class="profile"><img src="../assets/boy.png"/></div>
                <div class="feed-heading">
                    <span>{{post.PostCreatedBy}}</span>
                    <small class="date"><i class="fa fa-clock-o" aria-hidden="true"></i>
                        {{post.PostCreatedDate}}
                    </small>
                </div>
            </div>
            <div class="content">
                <p>
                    <!--<strong class="feed-subtitle"> ADD A NOTE</strong>-->
                    {{post.PostContent}}
                </p>
            </div>
            <div class="image-wrapper" v-if="post.postFiles">
                <ul>
                    <li class="postFile__item" v-for="postFile in post.postFiles" :key="postFile.ID">
                        <img :src="postFile.PostItemPath"
                             :class="{'post-disabled':postFile.PostItemStatus !=='Active'}"
                             v-if="checkIfImage(postFile.PostItemPath)"/>
                    </li>
                </ul>
            </div>

            <div class="postFile" v-if="post.postFiles">
                <div class="postFile__item" v-for="postFile in post.postFiles" :key="postFile.ID">
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

        <div class="comment_wrapper">
            <form class="form-style">
                <input type="text" class="form-control d-none" id="commentPostID" v-model="commentPostID">
                <vs-input label-placeholder="Write a comment" v-model="commentPostContent"
                          class="addComment"/>
                <div class="btn btn-primary" @click="submitComment(post.commentPostID)"><i
                        class="fa fa-paper-plane"
                        aria-hidden="true"></i></div>
            </form>

            <div class="commentWrap" v-if="post.commentItems"
                 :class="{'is-collapsed' : post.collapsed }">
                <div class="comment__item" v-for="commentItem in post.commentItems"
                     :key="commentItem.PoCmID" v-if="">
                    <div class="commentItem__header">
                        <div class="comment__name">{{commentItem.CONname}}</div>
                        <div class="comment__date">{{commentItem.CONcreationdate}}</div>
                    </div>
                    <div class="commentPostContent_show"
                         v-if="readonly === true || checkidcomment !== commentItem.PoCmID">
                        {{commentItem.PoCmContent}}
                    </div>
                    <textarea v-if="readonly === false && checkidcomment === commentItem.PoCmID" type="text"
                              class="comment__content" id="commentPostContent"
                              v-model="commentItem.PoCmContent" v-bind:readonly="readonly"
                              :class="{'editable' : readonly === false && checkidcomment === commentItem.PoCmID }"></textarea>
                    <!--{{checkidcomment}} ==== {{commentItem.PoCmID}} === {{readonly}}<br/>-->
                    <span class="edit" @click="disableReadonly(commentItem.PoCmID)"
                          :class="{'d-none' : readonly === false && checkidcomment === commentItem.PoCmID}">Edit . </span>
                    <span class="save" @click="editComment(commentItem.PoCmID, commentItem.PoCmContent)"
                          :class="{'d-none' : readonly === true || checkidcomment !== commentItem.PoCmID}">Save . </span>
                    <!--<span class="delete"-->
                    <!--@click="deleteComment(commentItem.PoCmID, commentItem.PoCmContent, post.PostID)">Delete</span>-->
                    <span class="delete"
                          @click="showDeleteModal">Delete</span>
                    <AlertComponent :showModal="deleteModalShow" @cancelClick="closeDeleteModal"
                                    @okClick="deleteComment(commentItem.PoCmID, commentItem.PoCmContent, post.PostID)"/>
                </div>

                <button v-on:click=" post.collapsed = !post.collapsed "
                        :class="{'d-none' : !post.collapsed }" v-if="post.commentItems.length !== 1">Display more comments
                </button>


            </div>
        </div>
    </div>
</template>

<script>
    import isImage from "is-image";
    import DataSource from "../data/datasource";
    import AlertComponent from "./alertComponent";


    export default {
        name: 'postComponent',
        components: {AlertComponent},
        data() {
            return {
                commentPostContent: "",
                readonly: "",
                checkidcomment: null,
                systemmsgError: null,
                commentPostID: '',
                deleteModalShow: false
            };
        },
        props: ["post", "checkIfImage", "commentitemSubmit"],
        methods: {
            // checkIfImage(file) {
            //     return isImage(file);
            // },
            submitComment(postId) {
                this.$emit('commentitemSubmit', postId, this.commentPostContent);
                this.commentPostContent = "";
            },
            editComment(PoCmID, PoCmContent) {
                this.readonly = true;
                this.$emit("commentEdit", PoCmID, PoCmContent);
            },
            showDeleteModal() {
                this.deleteModalShow = true;
            },
            closeDeleteModal() {
                this.deleteModalShow = false;
            },
            deleteComment(PoCmID, PoCmContent, postId) {
                console.log("haha, ", PoCmID, PoCmContent, postId)
                this.$emit("commentDelete", PoCmID, PoCmContent, postId);
                this.closeDeleteModal()
            },
            // async commentEdit(PoCmID, PoCmContent) {
            //     this.error = "";
            //     //this.results = "<< Requesting.. >>";
            //     try {
            //
            //         this.commentPostID = PoCmID;
            //         this.commentPostContent = PoCmContent;
            //         console.log(this.commentPostContent);
            //         this.actionMode = "Edit";
            //         const commentResponse = await DataSource.shared.editComment(this.commentPostID, this.commentPostContent, this.actionMode);
            //         if (commentResponse) {
            //             switch (commentResponse.code) {
            //                 case "1":
            //                     // reset all input filed to blank
            //                     this.commentPostID = null;
            //                     this.commentPostContent = "";
            //                     this.readonly = true;
            //                     // this.results = `Post Submitted`;
            //                     // this.success = 'Post Submitted, activity will be active in a while';
            //                     break;
            //                 case "88":
            //                     this.results = `Please Login to submit post`;
            //                     this.systemmsgError = true;
            //                     break;
            //                 case "99":
            //                     this.results = `Please fill in content`;
            //                     this.systemmsgError = true;
            //                     break;
            //                 // default:
            //                 //     alert("Please try again later");
            //                 //     this.results = JSON.stringify(response);
            //             }
            //         }
            //     } catch (e) {
            //         console.log(e);
            //         this.error = e;
            //     }
            // },

            async disableReadonly(PoCmID) {
                this.error = "";
                try {
                    this.readonly = false;
                    this.checkidcomment = PoCmID;
                } catch (e) {
                    console.log(e);
                    this.error = e;
                }
            },
            // async commentEdit(PoCmID, PoCmContent) {
            //     this.error = "";
            //     //this.results = "<< Requesting.. >>";
            //     try {
            //
            //         this.commentPostID = PoCmID;
            //         this.commentPostContent = PoCmContent;
            //         console.log(this.commentPostContent);
            //         this.actionMode = "Edit";
            //         const commentResponse = await DataSource.shared.editComment(this.commentPostID, this.commentPostContent, this.actionMode);
            //         if (commentResponse) {
            //             switch (commentResponse.code) {
            //                 case "1":
            //                     // reset all input filed to blank
            //                     this.commentPostID = null;
            //                     this.commentPostContent = "";
            //                     this.readonly = true;
            //                     // this.results = `Post Submitted`;
            //                     // this.success = 'Post Submitted, activity will be active in a while';
            //                     break;
            //                 case "88":
            //                     this.results = `Please Login to submit post`;
            //                     this.systemmsgError = true;
            //                     break;
            //                 case "99":
            //                     this.results = `Please fill in content`;
            //                     this.systemmsgError = true;
            //                     break;
            //                 // default:
            //                 //     alert("Please try again later");
            //                 //     this.results = JSON.stringify(response);
            //             }
            //         }
            //     } catch (e) {
            //         console.log(e);
            //         this.error = e;
            //     }
            // },
        }
    };
</script>