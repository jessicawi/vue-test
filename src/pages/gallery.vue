<template>
    <div class="container-fluid">
        <!--<div class="row">
            <div class="col-12">
                <h1>Placeholder</h1>
            </div>
            &lt;!&ndash;<div class="col-12 text-left">
                <ul>
                    <li>Right click within bordered area to open menu</li>
                    <li>To view, select an item, right click and select <i class="fa fa-eye"></i>View</li>
                </ul>
            </div>
            <div style="width: 100%">
                <b-btn v-b-toggle.collapse3 class="m-1">Toggle Collapse</b-btn>
                <b-collapse id="collapse3">
                    <b-card>
                        I should start open!
                    </b-card>
                </b-collapse>
            </div>&ndash;&gt;
        </div>-->
        <div class="row">
            <div class="col-12">
                <div class="row" style="float:right">
                    <div class="col-">
                        <button type="button" @click="selectAllItem" id="btn_SelectAll"
                                class="custom-btn btn btn-primary">Select All
                        </button>
                    </div>
                    <div class="col-">
                        <button type="button" @click="unselectAllItem" id="btn_UnselectAll"
                                class="custom-btn btn btn-secondary">Unselect All
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 bg-white div_ItemContainer" @contextmenu="showContextMenu">
                <div class="row border-bottom">
                    <div class="col- div_Folder">
                        <button class="btn btn-light" @click="goBack"
                                id="btn_Previous">
                            <i class="fa fa-folder" aria-hidden="true"></i>
                            Go back
                        </button>
                    </div>
                    <div class="col- div_Folder" v-for="item in Folders" :key="item.GalID">
                        <button class="btn btn-light" @click="initFolder(item.GalID)"
                                :id="item.GalID">
                            <i class="fa fa-folder" aria-hidden="true"></i>
                            {{item.GalFolder}}
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col- div_Files" v-for="item in Files" :key="item.GalID">
                        <div v-if="isImage(item)">
                            <label :for="item.GalID">
                                <img :src="getLowSource(item)" :alt="item.GalFileName" draggable="false"/>
                            </label>
                            <input type="checkbox" :id="item.GalID" :value="item" v-model="selectedItem"
                                   @change="isCheck"/>
                        </div>
                        <div v-else class="div_Download">
                            <label :for="item.GalID">
                                <i class="fa fa-file-text-o" aria-hidden="true"></i>
                            </label>
                            <input type="checkbox" :id="item.GalID" :value="item" v-model="selectedItem"
                                   @change="isCheck"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="div_ContextMenu" class="border border-secondary bg-white rounded-right rounded-bottom text-left">
            <ul id="ul_ContextMenuOptions">
                <li class="li_MenuOption" @click="showFolderModal"><i class="fa fa-folder-open-o"></i><span
                        class="menu-text">Create New folder</span>
                </li>
                <li class="li_MenuOption" v-if="contextTargetID !== ''" @click="showRenameModal"><i
                        class="fa fa-pencil-square-o"></i><span
                        class="menu-text">Rename folder</span></li>
                <li class="li_MenuOption" v-if="selectedItem.length > 0" @click="download"><i
                        class="fa fa-download"></i><span class="menu-text">Download</span>
                </li>
                <li class="li_MenuOption" v-if="selectedItem.length > 0" @click="showViewModal"><i
                        class="fa fa-eye"></i><span
                        class="menu-text">View</span></li>
                <li class="li_MenuOption" v-if="selectedItem.length > 0" @click="showMoveModal"><i
                        class="fa fa-arrows"></i><span
                        class="menu-text">Move</span>
                </li>
                <li class="li_MenuOption" v-if="contextTargetID !== '' || selectedItem.length > 0"
                    @click="showRemoveModal"><i class="fa fa-trash-o"></i><span
                        class="menu-text">Remove</span>
                </li>
            </ul>
        </div>
        <div class="menu bottom-right">
            <div class="menu-item">
                <button @click="showFolderModal" class="custom-tooltip btn btn-secondary rounded-circle"
                        title="Create new folder"><i
                        class="fa fa-folder-open-o"></i>
                    <span class="custom-tooltiptext">Create new folder</span>
                </button>
                <input type="file" multiple/>
            </div>
            <div class="menu-item">
                <button class="upload-button custom-tooltip btn btn-secondary rounded-circle" title="Upload"><i
                        class="fa fa-upload"></i>
                    <span class="custom-tooltiptext">Upload</span>
                </button>
                <input type="file" id="fileUpload" multiple/>
            </div>
            <div class="menu-item" v-if="selectedItem.length > 0">
                <button @click="download" class="custom-tooltip btn btn-secondary rounded-circle"
                        title="Download"><i
                        class="fa fa-download"></i>
                    <span class="custom-tooltiptext">Download</span>
                </button>
            </div>
            <div class="menu-item" v-if="selectedItem.length > 0">
                <button @click="showViewModal" class="custom-tooltip btn btn-secondary rounded-circle"
                        title="View"><i
                        class="fa fa-eye"></i>
                    <span class="custom-tooltiptext">View</span>
                </button>
            </div>
            <div class="menu-item" v-if="selectedItem.length > 0">
                <button @click="showMoveModal" class="custom-tooltip btn btn-secondary rounded-circle"
                        title="Move"><i
                        class="fa fa-arrows"></i>
                    <span class="custom-tooltiptext">Move</span>
                </button>
            </div>
            <div class="menu-item" v-if="contextTargetID !== '' || selectedItem.length > 0">
                <button @click="showRemoveModal" class="custom-tooltip btn btn-secondary rounded-circle"
                        title="Remove"><i
                        class="fa fa-trash-o"></i>
                    <span class="custom-tooltiptext">Remove</span>
                </button>
            </div>
            <div class="menu-item show-menu">
                <button class="custom-tooltip btn btn-secondary rounded-circle" title="Show Menu"><i
                        class="fa fa-bars"></i>
                    <span class="custom-tooltiptext">Show Menu</span>
                </button>
            </div>
        </div>
        <b-modal id="modal_ViewItem" title="View" ref="modal_ViewItem" centered ok-only ok-title="Close">
            <div>
                <b-carousel id="carousel1"
                            style="text-shadow: 1px 1px 2px #333;"
                            controls
                            indicators
                            background="#ababab"
                            :interval="4000"
                            v-model="slide"
                            @sliding-start="onSlideStart"
                            @sliding-end="onSlideEnd"
                >
                    <div v-for="s in filteredSelectedItem" :key="s.FileID">
                        <b-carousel-slide>
                            <img slot="img" class="d-block img-fluid w-100" :src="getMidSource(s)"
                                 :alt="s.GalFileName"/>
                        </b-carousel-slide>
                    </div>
                </b-carousel>
            </div>
        </b-modal>
        <b-modal id="modal_NewFolder" title="New Folder" ref="modal_NewFolder" centered ok-title="Create"
                 @ok="createFolder" @keyup.enter.native="createFolder">
            <div class="form-group">
                <input type="text" ref="tb_FolderName" class="form-control" id="tb_FolderName"
                       v-model="newFolderName"
                       placeholder="Folder Name" autocomplete="off" autofocus/>
            </div>
        </b-modal>
        <b-modal id="modal_RenameFolder" title="Rename Folder" ref="modal_RenameFolder" centered ok-title="Rename"
                 @ok="renameFolder" @keyup.enter.native="renameFolder">
            <div class="form-group">
                <input type="text" ref="tb_RenameFolder" class="form-control" id="tb_RenameFolder"
                       v-model="newFolderName"
                       placeholder="New Folder Name" autocomplete="off" autofocus/>
            </div>
        </b-modal>
        <b-modal id="modal_RemoveItem" title="Remove Item" ref="modal_RemoveItem" centered ok-title="Confirm"
                 @ok="removeItems">
            <div class="form-group">
                <div v-if="contextTargetID !=='' && selectedItem.length > 0">
                    Are you sure you want to delete the folder and the selected image(s)?
                </div>
                <div v-else-if="contextTargetID ==='' && selectedItem.length > 0">
                    Are you sure you want to delete the selected image(s)?
                </div>
                <div v-if="contextTargetID !=='' && selectedItem.length === 0">
                    Are you sure you want to remove the folder?
                </div>
            </div>
        </b-modal>
        <b-modal id="modal_MoveItem" hide-footer title="Move item(s) to?" ref="modal_MoveItem" centered>
            <div class="row">
                <b-carousel id="carousel2"
                            style="text-shadow: 1px 1px 2px #333;"
                            controls
                            indicators
                            background="#ababab"
                            :interval="0"
                >
                    <div v-for="s in filteredSelectedItem" :key="s.FileID">
                        <b-carousel-slide>
                            <img slot="img" :src="getLowSource(s)"
                                 :alt="s.GalFileName"/>
                        </b-carousel-slide>
                    </div>
                </b-carousel>
            </div>
            <div class="row">
                <div class="col- div_Folder" v-if="(filteredFolderList.length > 1)">
                    <button class="btn btn-light"
                            @click="moveItems(filteredFolderList[filteredFolderList.length - 2])">
                        <i class="fa fa-folder" aria-hidden="true"></i>
                        Previous Folder
                    </button>
                </div>
                <div class="col- div_Folder" v-for="item in Folders" :key="item.GalID">
                    <button class="btn btn-light" :id="item.GalID" @click="moveItems(item.GalID)">
                        <i class="fa fa-folder" aria-hidden="true"></i>
                        {{item.GalFolder}}
                    </button>
                </div>
            </div>
        </b-modal>
        <div id="div_DropZone" class="hideDropZone">
            <h1>Drop file(s) here to upload</h1>
        </div>
    </div>

</template>

<script>
    /* eslint-disable */
    import DataSource from "../data/datasource";
    import $ from 'jquery';

    export default {
        name: "Gallery",
        data() {
            return {
                Folders: [],
                Files: [],
                folderList: [],
                selectedItem: [],
                slide: 0,
                sliding: null,
                startRowNo: 0,
                endRowNo: 0,
                newFolderName: "",
                contextTargetID: "",
                checkAll: false
            }
        },
        mounted() {
        },
        methods: {
            async initFolder(folder) {
                this.showLoading();
                if (folder !== null)
                    this.folderList.push(folder);

                this.Folders = [];
                this.Files = [];
                this.startRowNo = 1;
                this.endRowNo = 10;
                this.selectedItem = [];

                /*let response = await DataSource.shared.getFile(this.filteredFolderList[this.filteredFolderList.length - 1], this.startRowNo, this.endRowNo);

                if (response.code != 2) {
                    this.Files = response.Table.filter(x => x.GalType.toUpperCase() == 'FILE');
                    this.Folders = response.Table.filter(x => x.GalType.toUpperCase() == 'FOLDER');
                } else {
                    this.Files = response.Table;
                    this.Folders = response.Table;
                }
*/
                await this.getFolders();
                await this.getFiles();
                this.hideLoading();
                this.hideMoveModal();
                this.hideFolderModal();
                this.hideRemoveModal();
                this.hideRenameModal();
                /*console.log(response.Table);*/
            },
            async getFolders() {
                let folders = await DataSource.shared.getFolders(this.filteredFolderList[this.filteredFolderList.length - 1]);

                this.Folders = [];

                if (folders.code != 2 && folders.code != 99) {
                    for (let i = 0; i < folders.Table.length; i++) {
                        if (this.Folders.indexOf(folders.Table[i].GalID) === -1)
                            this.Folders.push(folders.Table[i]);
                    }
                }
            },
            async getFiles() {
                console.log(this.startRowNo);
                console.log(this.endRowNo);

                let files = await DataSource.shared.getFiles(this.filteredFolderList[this.filteredFolderList.length - 1], this.startRowNo, this.endRowNo);

                if (files.code != 2 && files.code != 99) {
                    for (let i = 0; i < files.Table.length; i++) {
                        if (this.Files.indexOf(files.Table[i].GalID) === -1)
                            this.Files.push(files.Table[i]);
                    }

                    this.startRowNo = this.endRowNo + 1;
                    this.endRowNo = this.startRowNo + 9;
                }

                console.log(this.startRowNo);
                console.log(this.endRowNo);

                if (files.code != 2 && window.innerHeight == document.documentElement.offsetHeight)
                    await this.getFiles();
            },
            async download() {
                this.showLoading();
                for (let i = 0; i < this.selectedItem.length; i++) {
                    let result = await DataSource.shared.downloadFile(this.selectedItem[i].GalID);
                    let file = (result.Table)[0];
                    let a = document.createElement("a");
                    let contentType = this.getContentType(file);
                    let b64Data = file.GalFile;
                    let blob = this.b64toBlob(b64Data, contentType);
                    let blobUrl = URL.createObjectURL(blob);

                    a.href = blobUrl;
                    a.download = (file.GalFileName + file.GalFileExt).toString();
                    a.style.display = "none";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();

                    /*a.href = URL.createObjectURL(this.selectedItem[0].GalFile)
                    a.download = (this.selectedItem[0].GalFileName + this.selectedItem[0].GalFileExt).toString();
                    a.style.display = "none";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();*/
                }

                this.hideLoading();
            },

            /*#region Rename Folder Functions*/
            async renameFolder() {
                this.showLoading();
                if (this.newFolderName == null)
                    return;

                let galID = this.contextTargetID,
                    folderName = this.newFolderName,
                    result;

                result = await DataSource.shared.renameFile(galID, folderName);
                this.hideLoading();

                this.initFolder(this.filteredFolderList[this.filteredFolderList - 1]);
                this.newFolderName = "";
            },
            showRenameModal() {
                this.$refs.modal_RenameFolder.show();
            },
            hideRenameModal() {
                this.$refs.modal_RenameFolder.hide();
            },/*#endregion*/

            /*#region Remove Folder Functions*/
            async removeItems() {
                //TODO: Open modal, confirm message, send to server to remove
                this.showLoading();
                if (this.newFolderName == null)
                    return;

                let itemsToRemove = [this.contextTargetID], i = 0;
                this.selectedItem.forEach(function (item) {
                    itemsToRemove.push(item.GalID);
                });

                for (i; i < itemsToRemove.length; i++) {
                    let result = await DataSource.shared.removeFile(itemsToRemove[i]);
                }

                this.hideLoading();

                if (i === itemsToRemove.length)
                    this.initFolder(this.filteredFolderList[this.filteredFolderList - 1]);
            },
            showRemoveModal() {
                this.$refs.modal_RemoveItem.show();
            },
            hideRemoveModal() {
                this.$refs.modal_RemoveItem.hide();
            },
            /*#endregion*/

            /*#region Create Folder Functions*/
            async createFolder() {
                this.showLoading();
                if (this.newFolderName == null)
                    return;

                let files = null,
                    fileType = "Folder",
                    galFolderID = this.filteredFolderList[this.filteredFolderList.length - 1],
                    folderName = this.newFolderName,
                    result;


                result = await DataSource.shared.saveFile(files, fileType, galFolderID, folderName);
                this.hideLoading();

                this.initFolder(this.filteredFolderList[this.filteredFolderList - 1]);
                this.newFolderName = "";
            },
            showFolderModal() {
                this.$refs.modal_NewFolder.show();
            },
            hideFolderModal() {
                this.$refs.modal_NewFolder.hide();
            },
            /*#endregion*/

            /*#region Move Item Function*/
            async moveItems(destination) {
                this.showLoading();

                let itemsToMove = [], i = 0;

                this.selectedItem.forEach(function (item) {

                    itemsToMove.push(item.GalID);
                });

                for (i; i < itemsToMove.length; i++) {
                    let result = await DataSource.shared.moveFile(itemsToMove[i], destination);
                }

                if (i === itemsToMove.length)
                    this.initFolder(this.filteredFolderList[this.filteredFolderList - 1]);

                this.hideMoveModal();
                this.hideLoading();
            },
            showMoveModal() {
                this.$refs.modal_MoveItem.show();
            },
            hideMoveModal() {
                this.$refs.modal_MoveItem.hide();
            },
            /*#endregion*/

            /*#region Upload Functions*/
            async uploadFiles(f) {
                this.showLoading();
                let fileType = "File",
                    galFolderID = this.filteredFolderList[this.filteredFolderList.length - 1],
                    folderName = "",
                    result;
                result = await DataSource.shared.saveFile(f, fileType, galFolderID, folderName);

                /*this.$vs.loading();
                result = await DataSource.shared.saveFile(files, fileType, galFolderID, folderName);
                this.$vs.loading.close();*/

                this.initFolder(this.filteredFolderList[this.filteredFolderList - 1]);
                this.hideLoading();
            },

            /*#region Drop Zone Upload Function*/
            showDropZone() {
                document.querySelector("#div_DropZone").style.visibility = "visible";
                document.querySelector("#div_DropZone").style.opacity = 1;
            }
            ,
            hideDropZone() {
                document.querySelector("#div_DropZone").style.visibility = "hidden";
                document.querySelector("#div_DropZone").style.opacity = 0;
            }
            ,
            /*#endregion*/
            /*#endregion*/

            /*#region Carousel Slider*/
            onSlideStart(slide) {
                this.sliding = true
            }
            ,
            onSlideEnd(slide) {
                this.sliding = false
            }
            ,
            /*endregion*/

            /*#region Loading Image*/
            showLoading() {
                this.$vs.loading();
            }
            ,
            hideLoading() {
                this.$vs.loading.close();
            }
            ,
            /*#endregion*/

            /*#region Custom Context Menu*/
            showContextMenu(e) {
                e.preventDefault();
                this.contextTargetID = "";

                document.querySelector("#div_ContextMenu").style.display = "block"
                document.querySelector("#div_ContextMenu").style.left = e.clientX + "px";
                document.querySelector("#div_ContextMenu").style.top = e.clientY + "px";

                if (e.target.closest("div").classList.contains("div_Folder") &&
                    e.target.closest("button").id !== "btn_Previous")
                    this.contextTargetID = e.target.closest("button").id;
            }
            ,
            hideContextMenu(e) {
                document.querySelector("#div_ContextMenu").style.display = "none";
                this.contextTargetID = "";
            },
            /*#endregion*/

            showViewModal() {
                /*if (this.selectedItem.length > 0)*/
                this.$refs.modal_ViewItem.show();
            },
            goBack() {
                if (this.filteredFolderList.length > 1)
                    this.filteredFolderList.pop();
                this.folderList = this.filteredFolderList;
                this.initFolder();
            },
            getLowSource(e) {
                if (this.isImage(e))
                    return "data:" + e.GalFileType + ";base64," + e.GalFileLow;
                else
                    return "";
            },
            getMidSource(e) {
                if (this.isImage(e))
                    return "data:" + e.GalFileType + ";base64," + e.GalFileMedium;
                else
                    return "";
            },
            isCheck(e) {
                if (e.target.checked) {
                    e.target.parentElement.parentElement.classList.add("check");
                    e.target.parentElement.parentElement.classList.remove("uncheck");
                } else {
                    e.target.parentElement.parentElement.classList.remove("check");
                    e.target.parentElement.parentElement.classList.add("uncheck");
                }
            },
            isImage(e) {
                let ext = String(e.GalFileExt).toUpperCase();
                let isImage = false;

                switch (ext) {
                    case ".PNG":
                    case ".JPG":
                    case ".BMP":
                    case ".GIF":
                        isImage = true;
                        break;
                }

                return isImage;
            },
            getContentType(e) {
                let contentType = "";

                switch (e.GalFileExt.toUpperCase()) {
                    case ".PDF":
                        contentType += "application/octet-stream";
                        break;
                    default:
                        contentType += e.GalFileType;
                        break;
                }

                return contentType;
            },
            getScrollPercent() {
                //Credits to Phil Ricketts @ stackoverflow
                let height = document.documentElement,
                    body = document.body,
                    scrollTop = 'scrollTop',
                    scrollHeight = 'scrollHeight';

                return (height[scrollTop] || body[scrollTop]) / ((height[scrollHeight] || body[scrollHeight]) - height.clientHeight) * 100;
            },
            b64toBlob(b64Data, contentType, sliceSize) {
                //Credit to Jeremy Banks @ stackoverflow
                contentType = contentType || '';
                sliceSize = sliceSize || 512;

                let byteCharacters = atob(b64Data);
                let byteArrays = [];

                for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    let slice = byteCharacters.slice(offset, offset + sliceSize);

                    let byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    let byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                return new Blob(byteArrays, {type: contentType});
            },
            selectAllItem() {
                if (!this.checkAll) {
                    $(".div_Files label").click();
                    this.checkAll = true;
                }
            },
            unselectAllItem() {
                if (this.checkAll) {
                    $(".div_Files label").click();
                    this.checkAll = false;
                    this.selectedItem = [];
                }
            },

            debounce(func, wait, immediate) {
                // Returns a function, that, as long as it continues to be invoked, will not
                // be triggered. The function will be called after it stops being called for
                // N milliseconds. If `immediate` is passed, trigger the function on the
                // leading edge, instead of the trailing.
                let timeout, result;
                let self = this;

                let later = function (context, args) {
                    timeout = null;
                    if (args) result = func.apply(context, args);
                };

                let debounced = self.restArguments(function (args) {
                    if (timeout) clearTimeout(timeout);
                    if (immediate) {
                        let callNow = !timeout;
                        timeout = setTimeout(later, wait);
                        if (callNow) result = func.apply(this, args);
                    } else {
                        timeout = self.delay(later, wait, this, args);
                    }

                    return result;
                });

                debounced.cancel = function () {
                    clearTimeout(timeout);
                    timeout = null;
                };

                return debounced;
            },
            delay(func, wait, ...args) {
                // Lodash Delay
                /**
                 * Invokes `func` after `wait` milliseconds. Any additional arguments are
                 * provided to `func` when it's invoked.
                 *
                 * @since 0.1.0
                 * @category Function
                 * @param {Function} func The function to delay.
                 * @param {number} wait The number of milliseconds to delay invocation.
                 * @param {...*} [args] The arguments to invoke `func` with.
                 * @returns {number} Returns the timer id.
                 * @example
                 *
                 * delay(text => console.log(text), 1000, 'later')
                 * // => Logs 'later' after one second.
                 */
                if (typeof func != 'function') {
                    throw new TypeError('Expected a function')
                }
                return setTimeout(func, +wait || 0, ...args)
            },
            restArguments(func, startIndex) {
                // Some functions take a variable number of arguments, or a few expected
                // arguments at the beginning and then a variable number of values to operate
                // on. This helper accumulates all remaining arguments past the function’s
                // argument length (or an explicit `startIndex`), into an array that becomes
                // the last argument. Similar to ES6’s "rest parameter".
                startIndex = startIndex == null ? func.length - 1 : +startIndex;
                return function () {
                    let length = Math.max(arguments.length - startIndex, 0),
                        rest = Array(length),
                        index = 0;
                    for (; index < length; index++) {
                        rest[index] = arguments[index + startIndex];
                    }
                    switch (startIndex) {
                        case 0:
                            return func.call(this, rest);
                        case 1:
                            return func.call(this, arguments[0], rest);
                        case 2:
                            return func.call(this, arguments[0], arguments[1], rest);
                    }
                    let args = Array(startIndex + 1);
                    for (index = 0; index < startIndex; index++) {
                        args[index] = arguments[index];
                    }
                    args[startIndex] = rest;
                    return func.apply(this, args);
                };
            },
        }
        ,
        mounted() {
            let self = this;
            self.initFolder("PRIMARY");

            /*#region JQuery Version*/
            $("#div_ContextMenu").contextmenu(function (e) {
                e.preventDefault();
            });

            $(window).click(function () {
                $("#div_ContextMenu").css("display", "none");
            });

            $(window).on("dragenter", function () {
                self.showDropZone();
            });

            $(window).on("dragover", function (e) {
                e.preventDefault();
                self.showDropZone();
            });

            $(window).on("dragleave", function (e) {
                self.hideDropZone();
            });

            $("#div_DropZone").on("drop", function (e) {
                e.preventDefault();
                self.showLoading();
                self.hideDropZone();

                self.uploadFiles(e.originalEvent.dataTransfer.files);
            });

            $("#fileUpload").on("change", function (e) {
                self.uploadFiles(e.target.files);
            });

            $(".upload-button").on("click", function () {
                $("#fileUpload").trigger("click");
            });

            /*#region Scroll Load*/
            $(window).scroll(self.debounce(function () {
                if (self.getScrollPercent() >= 70)
                    self.getFiles();
            }, 250));
            /*#endregion*/
            /*#endregion*/
        }
        ,
        computed: {
            filteredFolderList: function () {
                return this.folderList.filter(x => x != null);
            }
            ,
            filteredSelectedItem: function () {
                return this.selectedItem.filter(x => this.isImage(x));
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*#region Full page drop area */
    #div_DropZone {
        visibility: hidden;
        opacity: 0;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9999999999;
        /*background-color: rgba(0, 0, 0, 0.5);*/
        background: rgba(0, 0, 0, 0.45);
        transition: visibility 175ms, opacity 175ms;
        display: table;
        text-shadow: 1px 1px 2px #000;
        color: #fff;
        font: bold 42px Oswald, DejaVu Sans, Tahoma, sans-serif;
    }

    #div_DropZone h1 {
        display: table-cell;
        text-align: center;
        vertical-align: middle;
    }

    /*#endregion*/

    /*#region On checkbox check transition*/
    .check {
        -webkit-transform: scale(0.8);
        -moz-transform: scale(0.8);
        -ms-transform: scale(0.8);
        -o-transform: scale(0.8);
        transform: scale(0.8);
        opacity: 0.5;
        background-color: lightgray;
        transition: all 0.5s;
        border: 2px solid black;
    }

    .uncheck {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
        opacity: 1;
        background-color: revert;
        transition: all 0.5s;
    }

    /*#endregion*/

    .div_Folder, .div_Files label:hover {
        cursor: pointer;
    }

    input[type="file"] {
        visibility: hidden;
        position: fixed;
        display: none;
    }

    /*#region Image items*/
    .div_Files {
        overflow: hidden;
        display: flex;
        justify-content: center;
        position: relative;
        margin: 10px;
        height: 10em;

        width: 10em;
    }

    .div_Files p {
        text-align: center;
    }

    .div_Files img, #modal_MoveItem img {
        flex: none;
        height: 10em;
    }

    .div_Files input[type='checkbox'] {
        position: absolute;
        top: 10px;
        left: 10px;
        display: none;
    }

    .div_Files label {
        height: 100%;
        width: 100%;
        text-align: -webkit-match-parent;
    }

    .div_Files i {
        font-size: 60pt;
    }

    .div_Download {
        width: 100%;
    }

    /*#endregion*/

    /*#region Folder item*/
    .div_Folder {
        height: 5em;
        /*width: 5em;*/
        margin: 10px 5px;
    }

    .div_Folder button i {
        font-size: 40px;
    }

    /*#endregion*/

    /*#region Custom context menu*/
    #div_ContextMenu {
        width: 200px;
        box-shadow: 0 4px 5px 3px rgba(0, 0, 0, 0.2);
        position: fixed;
        display: none;
    }

    #div_ContextMenu #ul_ContextMenuOptions {
        padding: 5px 0;
        list-style: none;
    }

    #div_ContextMenu .li_MenuOption {
        font-weight: 500;
        font-size: 14px;
        padding: 10px 40px 10px 10px;
        cursor: pointer;
    }

    #div_ContextMenu .li_MenuOption .menu-text {
        margin-left: 10px;
    }

    #div_ContextMenu .li_MenuOption:hover {
        background: rgba(0, 0, 0, 0.2);
    }

    /*#endregion*/

    /*#region Custom Tooltip */
    .custom-tooltip {
        position: relative;
        display: inline-block;
    }

    /* Tooltip text */
    .custom-tooltip .custom-tooltiptext {
        visibility: hidden;
        /*default width:120px*/
        width: auto;
        background-color: black;
        color: #fff;
        text-align: center;
        padding: 5px 12px;
        border-radius: 6px;
        /* Position the tooltip text - see examples below! */
        position: absolute;
        z-index: 1;
        top: 6px;
        right: 115%;
        opacity: 0;
        transition: opacity 0.5s;
    }

    /* Show the tooltip text when you mouse over the tooltip container */
    .custom-tooltip:hover .custom-tooltiptext {
        visibility: visible;
        opacity: 1;
        cursor: default;
    }

    .custom-tooltip .custom-tooltiptext::after {
        content: " ";
        position: absolute;
        top: 50%;
        left: 100%; /* To the right of the tooltip */
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent transparent black;
    }

    /*#endregion*/

    /*#region Position*/
    .bottom-left {
        position: absolute;
        bottom: 10px;
        left: 10px;
    }

    .bottom-right {
        position: fixed;
        bottom: 10px;
        right: 10px;
    }

    @media (max-width: 769px){
        .bottom-right{
            position: fixed;
            bottom: 80px;
            right: 10px;
        }
    }

    /*#endregion*/

    /*#region Menu*/
    .menu:hover .menu-item:not(.show-menu), .show-menu {
        margin-top: 10px;
        max-height: 232px;
        overflow: visible;
        opacity: 1;
        transition: max-height 1s, opacity 1s;
    }

    .menu .menu-item:not(.show-menu) {
        margin-top: 0px;
        max-height: 0px;
        overflow: hidden;
        opacity: 0;
        transition: max-height 1s, opacity 0.5s, margin-top 2.0s;
    }

    .menu button {
        width: 50px;
        height: 50px;
        display: block;
    }

    .menu i {
        font-size: 20px;
    }

    /*#endregion*/

    .row #carousel2 {
        margin: 0 auto !important;
        width: 100%;
    }

    .div_ItemContainer {
        padding: 0 15px;
    }

    /*#region Custom Checkbox*/
    .checkbox label:after,
    .radio label:after {
        content: '';
        display: table;
        clear: both;
    }

    .checkbox .cr,
    .radio .cr {
        position: relative;
        display: inline-block;
        border: 1px solid #a9a9a9;
        border-radius: .25em;
        width: 1.3em;
        height: 1.3em;
        float: left;
        margin-right: .5em;
    }

    .radio .cr {
        border-radius: 50%;
    }

    .checkbox .cr .cr-icon,
    .radio .cr .cr-icon {
        position: absolute;
        font-size: .8em;
        line-height: 0;
        top: 50%;
        left: 20%;
    }

    .radio .cr .cr-icon {
        margin-left: 0.04em;
    }

    .checkbox label input[type="checkbox"],
    .radio label input[type="radio"] {
        display: none;
    }

    .checkbox label input[type="checkbox"] + .cr > .cr-icon,
    .radio label input[type="radio"] + .cr > .cr-icon {
        transform: scale(3) rotateZ(-20deg);
        opacity: 0;
        transition: all .3s ease-in;
    }

    .checkbox label input[type="checkbox"]:checked + .cr > .cr-icon,
    .radio label input[type="radio"]:checked + .cr > .cr-icon {
        transform: scale(1) rotateZ(0deg);
        opacity: 1;
    }

    .checkbox label input[type="checkbox"]:disabled + .cr,
    .radio label input[type="radio"]:disabled + .cr {
        opacity: .5;
    }

    /*#endregion*/

    /*#region SelectAll and UnselectAll Button*/
    .custom-btn {
        margin: 10px;
    }

    /*#endregion*/
</style>