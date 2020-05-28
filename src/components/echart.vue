<template>
    <div class="echarts" style="width:100%">
        <div :id="counterId" :style="{width: echart_width, height: echart_height}"></div>
    </div>
</template>

<script>
    export default {
        name: "echarts",
        props: {
            echart_width: {
                type: String,
                default: "100%"
            },
            echart_height: {
                type: String,
                default: "200px"
            },
            options: {}
        },
        computed: {
            counterId() {
                return `echarts_${this._uid}`;
            }
        },
        created() {},
        data() {
            return {
                chart: ""
            };
        },
        watch: {
            //观察option的变化
            options: {
                handler(newVal, oldVal) {
                    if (this.chart) {
                        if (newVal) {
                            this.chart.setOption(newVal);
                        } else {
                            this.chart.setOption(oldVal);
                        }
                    } else {
                        this.init();
                    }
                },
                deep: true //对象内部属性的监听，关键。
            }
        },
        mounted() {
            this.init(this.options);
        },
        methods: {
            init(options) {
                this.chart = this.$echarts.init(document.getElementById(this.counterId));
                this.chart.setOption(options);
                // window.onresize = myChart.resize; // 自适应
                const self = this;
                window.addEventListener("resize", function() {
                    self.chart.resize();
                });
            }
        }
    };
</script>