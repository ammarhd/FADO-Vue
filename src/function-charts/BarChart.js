import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
    extends: Bar,
    mixins: [reactiveProp],
    props: ["options"],
    watch: {
        'chartOptions': {
            handler: function(newChartOptions) {
                this.$data._chart.destroy()
                this.renderChart(this.chartData, newChartOptions)
            }
        }
    },

    mounted() {
        // this.chartData is created in the mixin.
        // If you want to pass options please create a local options object

        this.renderChart(this.chartData, this.options);
    },
};