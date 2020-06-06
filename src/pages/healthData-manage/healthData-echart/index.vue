<template>
    <div>
<!--        <div>-->
<!--            <el-button @click="changeModule(1)">血压折线图</el-button>-->
<!--            <el-button @click="changeModule(2)">血糖折线图</el-button>-->
<!--            <el-button @click="changeModule(3)">血脂折线图</el-button>-->
<!--        </div>-->
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
<!--            <div class="healData-box blood_sugar" v-if="showModule==2">-->
<!--                <h5>今日血糖</h5>-->
<!--            </div>-->
<!--            <div class="healData-box blood_lipids" v-if="showModule==3">-->
<!--                <h5>今日血脂</h5>-->
<!--            </div>-->
        </div>
    </div>

</template>

<script>
    import Echart from '@/components/echart'
    import { mapState } from 'vuex'
    import { GETDATA_BP } from '@/api'
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

                preOptions: {
                    title: {
                        text: '血压曲线图'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        data: [],
                    },
                    yAxis: {
                        splitLine: {
                            show: false
                        }
                    },
                    toolbox: {
                        left: 'center',
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    dataZoom: [{
                        startValue: '2014-06-01'
                    }, {
                        type: 'inside'
                    }],
                    visualMap: {
                        top: 10,
                        right: 10,
                        pieces: [{
                            gt: 0,
                            lte: 50,
                            color: '#096'
                        }, {
                            gt: 50,
                            lte: 100,
                            color: '#ffde33'
                        }, {
                            gt: 100,
                            lte: 150,
                            color: '#ff9933'
                        }, {
                            gt: 150,
                            lte: 200,
                            color: '#cc0033'
                        }, {
                            gt: 200,
                            lte: 300,
                            color: '#660099'
                        }, {
                            gt: 300,
                            color: '#7e0023'
                        }],
                        outOfRange: {
                            color: '#999'
                        }
                    },
                    series: {
                        name: '血压曲线图',
                        type: 'line',
                        data: [],
                        markLine: {
                            silent: true,
                            data: [{
                                yAxis: 50
                            }, {
                                yAxis: 100
                            }, {
                                yAxis: 150
                            }, {
                                yAxis: 200
                            }, {
                                yAxis: 300
                            }]
                        }
                    }
                },
                echartWidth:'80%',
                echartHeight:'400px',
            }
        },
        computed: {
            ...mapState([
                'Role',
                'UserId'
            ])
        },
        methods: {
            getData(){
                GETDATA_BP({'user_id':1})
                    .then(response => {
                        this.preOptions.dataZoom=[{
                            startValue: response.measure_at[0]
                        }, {
                            type: 'inside'
                        }],
                        this.preOptions.xAxis.data=response.measure_at;
                        this.series.xAxis.data=response.shuzhangya;
                    })
                    .catch(error => {
                        console.log(error);
                        this.$message({
                            message: "获取数据失败！",
                            type: "error",
                            offset:'100',
                            center: true
                        });
                    });
            },
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
        },
        mounted(){
            this.getData();
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