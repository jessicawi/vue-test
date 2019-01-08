<template>
    <div id="main-content">
        <navBar/>
        <slot/>
    </div>

</template>

<script>
    import navBar from "../components/Nav";
    import Header from "../components/Header";

    export default {
        name: 'MainContent',
        components: {
            navBar,
            Header,
        }
    };
</script>

<style scoped>
    #main-content {
        padding: 0px 0px 10px;
        min-height: 100vh;
        max-width: 100%;
        margin: auto;
        margin-left: 260px;
        position: relative;
        z-index: 99;
        background: #f5f6fa;
    }
    @media (max-width: 740px){
        #main-content {
            padding-top: 20px !important;
        }
    }
</style>

<style>

    body{
        background-color: #f5f6fa;
    }
    .system-msg.bg-danger {
        color: white;
        padding: 10px;
        margin: 20px 0px;
    }

    .system-msg.bg-danger p {
        margin: 0px;
    }

    .system-msg.bg-danger:empty {
        display: none;
    }

    .modal-dialog header {
        background: url("../assets/modal-bg.png");
    }

    .modal-dialog .form-control {
        background: #ebebeb80;
        border: 0px;
        padding: 10px;
    }

    .modal-dialog.modal-dialog .btn .btn {
        float: right;
    }
    label {
        font-weight: bold;
        text-align: left;
        display: block !important;
    }

    .submit-wrap {
        background: whitesmoke;
        margin-bottom: -1rem;
        padding: 10px 0px;
    }

    .submit-wrap .btn{
        float: right;
        background-color: #f44252;
        border-color: #f44252;
    }

    .data-top {
        background: white;
        margin: 20px 20px 0px !important;
        padding: 10px;
    }

    .form-group__message, .error {
        display: none;
    }

    .form-group--error + .form-group__message, .form-group--error + .error {
        display: block;
    }

    ::-webkit-scrollbar-track
    {
        /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
        /*border-radius: 10px;*/
        background-color: #413f56 ;
    }

    ::-webkit-scrollbar
    {
        width: 12px;
        background-color: #696688;
    }

    ::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
        background-color: #323142;
    }
</style>
