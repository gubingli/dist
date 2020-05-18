<template>
    <div>
        <div>
            <el-button @click="changeModule(1)">血压折线图</el-button>
            <el-button @click="changeModule(2)">血糖折线图</el-button>
            <el-button @click="changeModule(3)">血脂折线图</el-button>
        </div>
        <div class="healData-model" >
            <div class="healData-box blood_pressure" v-if="showModule==1">
                <div>
                    <el-select v-model="preSelValue" placeholder="请选择" @change="preChange">
                        <el-option
                                v-for="item in preSelOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <Echart
                            :echart_width="echartWidth"
                            :echart_height="echartHeight"
                            :options="preOptions"
                    ></Echart>
                </div>
            </div>
            <div class="healData-box blood_sugar" v-if="showModule==2">
                <h5>今日血糖</h5>
            </div>
            <div class="healData-box blood_lipids" v-if="showModule==3">
                <h5>今日血脂</h5>
            </div>
        </div>
    </div>

</template>

<script>
    import Echart from '@/components/echart'
    export default {
        data() {
            return {
                showModule:1,

                preSelOptions: [{
                    value: '1',
                    label: '近一周'
                }, {
                    value: '2',
                    label: '近一月'
                }],
                preSelValue: '1',


                preOptions:{
                    title: {
                        text: '血压折线图'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '邮件营销',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '联盟广告',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '视频广告',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '直接访问',
                            type: 'line',
                            stack: '总量',
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '搜索引擎',
                            type: 'line',
                            stack: '总量',
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                },
                echartWidth:'80%',
                echartHeight:'400px',
            }
        },
        methods: {
            changeModule(type){
                this.showModule=type;
                console.log(type)
                if(type=='1'){
                    this.ruleForm= {
                        name: '',
                        datetime:''
                    };
                }else if(type=='2'){
                    console.log(2222)
                }
            },
            preChange(){
                console.log(this.preSelValue);
                if(this.preSelValue==2){
                    this.xAxis.data=['1','2','3'];
                    this.preOptions.series=[
                        {
                            name: '邮件营销',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101]
                        },
                        {
                            name: '联盟广告',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191]
                        },
                        {
                            name: '视频广告',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201]
                        },
                        {
                            name: '直接访问',
                            type: 'line',
                            stack: '总量',
                            data: [320, 332, 301]
                        },
                        {
                            name: '搜索引擎',
                            type: 'line',
                            stack: '总量',
                            data: [820, 932, 901]
                        }
                    ];
                }
            }
        },
        components: {
            Echart
        },
        created(){
            console.log(this.$route.params.id)
        }
    }
</script>
<style lang="scss">
    .healData-model{
        >div{
            box-shadow: 0 0 4px #ccc;
            padding: 20px 20px 10px;
            margin: 20px 0;
            overflow: hidden;
        }
        h5{
            color: #606266;
            margin: 10px 0;
        }
        .el-form-item{
            display: inline-block;
        }
        .el-form-item:last-child{
            display: block;
            text-align: right;
        }

    }
</style>