<template>
    <div id="" class="mt-3 container">
        <b-row>
            <b-col class="block" cols="6">
                <span class="demonstration">Default: </span>
                <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="Pick a day">
                </el-date-picker>
            </b-col>
            <b-col class="block" cols="6">
                <span class="demonstration">Picker with quick options: </span>
                <el-date-picker
                        v-model="value2"
                        type="date"
                        placeholder="Pick a day"
                        :picker-options="pickerOptions1">
                </el-date-picker>
            </b-col>
        </b-row>
        <br/>
        <br/>
        <br/>
        {{value1}} / {{value2}} {{value1}} / {{value2}} {{value1}} / {{value2}}
    </div>

</template>

<script>

    export default {
        data() {
            return {
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: 'Today',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: 'Yesterday',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: 'A week ago',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value1: '',
                value2: '',
            };
        }
    };
</script>

<style scoped>
</style>