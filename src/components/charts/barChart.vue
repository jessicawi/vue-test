<script>
    import {Bar} from 'vue-chartjs';

    export default {
        extends: Bar,
        data: () => ({
            option: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: 40
                        }
                    }]
                },
                responsive: true, maintainAspectRatio: false
            },
        }),
        props: {
            chartdata: {
                type: Object,
                default: null
            },
            // options: {
            //     type: Object,
            //     default: null
            // }
        },
        mounted() {
            this.renderChart(this.chartdata, this.option);
        }
    };
</script>