<template>
    <div class="form pt-6">
        <div class="summary text-red" v-if="$v.$error">
            Form has errors
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <label>name</label>
            <input type="text" class="form-control"  v-model="name">
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <button v-on:click="TestVali">Test</button>
        </div>
    </div>

    <!--<div id="" class="mt-3 container">-->
        <!--<b-row>-->
            <!--<b-col class="block" cols="6">-->
                <!--<span class="demonstration">Default: </span>-->
                <!--<el-date-picker-->
                        <!--v-model="value1"-->
                        <!--type="date"-->
                        <!--placeholder="Pick a day">-->
                <!--</el-date-picker>-->
            <!--</b-col>-->
            <!--<b-col class="block" cols="6">-->
                <!--<span class="demonstration">Picker with quick options: </span>-->
                <!--<el-date-picker-->
                        <!--v-model="value2"-->
                        <!--type="date"-->
                        <!--placeholder="Pick a day"-->
                        <!--:picker-options="pickerOptions1">-->
                <!--</el-date-picker>-->
            <!--</b-col>-->
        <!--</b-row>-->
        <!--<br/>-->
        <!--<br/>-->
        <!--<br/>-->
        <!--{{value1}} / {{value2}} {{value1}} / {{value2}} {{value1}} / {{value2}}-->
    <!--</div>-->
</template>

<script>
    import DataSource from "../data/datasource";
    import { required } from "vuelidate/lib/validators";
    import { helpers } from 'vuelidate/lib/validators';

    export default {
        data() {
            return {
                name: '',

                // pickerOptions1: {
                //     disabledDate(time) {
                //         return time.getTime() > Date.now();
                //     },
                //     shortcuts: [{
                //         text: 'Today',
                //         onClick(picker) {
                //             picker.$emit('pick', new Date());
                //         }
                //     }, {
                //         text: 'Yesterday',
                //         onClick(picker) {
                //             const date = new Date();
                //             date.setTime(date.getTime() - 3600 * 1000 * 24);
                //             picker.$emit('pick', date);
                //         }
                //     }, {
                //         text: 'A week ago',
                //         onClick(picker) {
                //             const date = new Date();
                //             date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                //             picker.$emit('pick', date);
                //         }
                //     }]
                // },
                // value1: '',
                // value2: '',
            };
        },
        validations: {

                name: { required },

        },
        methods: {
            TestVali() {
                this.$v.$touch();
                if(this.$v.$error) return
                // to form submit after this
                alert('Form submitted')
            }
        },
    };
</script>

<style scoped>
</style>