<template>
    <div id="step">
        <div class="step-bar white-box">
            <div v-on:click="stepChange(1)">
                1
            </div>
            <div v-on:click="stepChange(2)">
                2
            </div>
            <div v-on:click="stepChange(3)">
                3
            </div>
        </div>

        <div class="step-content">
            <div v-if="step===1">
                <Method/>
            </div>
            <div v-if="step===2">
                Step 2
            </div>
        </div>
    </div>
</template>

<script>
    import Method from "@/components/StepContent/Method";

    export default {
        name: 'Step',
        components: {Method},
        data() {
            return {
                step: 1,
            };
        },
        methods: {
            stepChange: function (step) {
                this.step = Step;
            }
        }
    };
</script>

<style scoped>
    #step {

    }
</style>
