<template>
    <div>
        <ul class="xuaya-tab xuaya_tab">
            <li v-bind:class="{ active: showModule==1}" @click="changeModule(1)">血压折线图</li>
            <li v-bind:class="{ active: showModule==2}" @click="changeModule(2)">心率折线图</li>
            <li v-bind:class="{ active: showModule==3}" @click="changeModule(3)">体重折线图</li>
        </ul>
        <div class="healData-model">
            <div class="healData-box blood_pressure" >
                <div class="echart-model">
                    <div class="block">
                        <el-date-picker
                                v-model="fileDate"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                        <el-button type="primary" @click="filterXue">筛选</el-button>
                    </div>
                    <Echart
                            v-if="showModule==1"
                            :echart_width="echartWidth"
                            :echart_height="echartHeight"
                            :options="preOptions"
                    ></Echart>
                    <Echart
                            v-if="showModule==2"
                            :echart_width="echartWidth"
                            :echart_height="echartHeight"
                            :options="preOptions2"
                    ></Echart>
                    <Echart
                            v-if="showModule==3"
                            :echart_width="echartWidth"
                            :echart_height="echartHeight"
                            :options="preOptions3"
                    ></Echart>
                </div>
                <ul class="pill-model">
                    <li>
                        <h6>基本用药</h6>
                        <div>{{total_pill}}</div>
                    </li>
                    <li>
                        <h6>药量变化</h6>
                        <div>{{last_pill}}</div>
                    </li>
                </ul>
            </div>
            <!--<div class="healData-box blood_sugar" v-if="showModule==2">-->
                <!--<h5>今日血糖</h5>-->
            <!--</div>-->
            <!--<div class="healData-box blood_lipids" v-if="showModule==3">-->
                <!--<h5>今日血脂</h5>-->
            <!--</div>-->
        </div>
        <el-table
                :data="tableData"
                style="width: 100%;margin-top:20px;">
            <el-table-column
                    prop="id"
                    label="id">
            </el-table-column>
            <el-table-column
                    prop="measure_at"
                    label="测量时间"
                    min-width="60">
            </el-table-column>
            <el-table-column
                    prop="shuzhangya"
                    label="舒张压">
            </el-table-column>
            <el-table-column
                    prop="shousuoya"
                    label="伸缩压">
            </el-table-column>
            <el-table-column
                    prop="xinlv"
                    label="心率">
            </el-table-column>
            <el-table-column
                    prop="tizhong"
                    label="体重">
            </el-table-column>
            <el-table-column
                    prop="operator"
                    label="操作人">
            </el-table-column>
            <el-table-column
                    prop="yiqi_model"
                    label="测量仪器">
            </el-table-column>
            <el-table-column
                    prop="change_pills_name"
                    label="药品变化">
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :pager-count="pageCount"
                @current-change="handleCurrentChange"
                style="margin-top: 30px;float: right;right: 10px;">
        </el-pagination>
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
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                fileDate:[],

                preOptions: {
                    title: {
                        text: '血压曲线图'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        data: [],
                        boundaryGap: false
//                        nameLocation:'end',//坐标轴名称显示位置。
//                        axisLabel : {//坐标轴刻度标签的相关设置。
//                            interval:0,
//                            rotate:"45"
//                        }
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
                        right: 0,
                        pieces: [{
                            gt: 0,
                            lte: 80,
                            color: '#096'
                        }, {
                            gt: 50,
                            lte: 100,
                            color: '#ffde33'
                        }, {
                            gt: 100,
                            lte: 120,
                            color: '#ff9933'
                        }],
                        outOfRange: {
                            color: '#999'
                        }
                    },
                    series: [{
                        name: '舒张压',
                        type: 'line',
                        data: [],
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        markLine: {
                            silent: true,
                            data: [{
                                yAxis: 80
                            }, {
                                yAxis: 100
                            }, {
                                yAxis: 120
                            }]
                        }
                    },{
                        name: '收缩压',
                        type: 'line',
                        data: [],
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                    },{
                        name: '药量改变',
                        type: 'line',
                        data: [],
                        markLine: {
                            symbol: ['none', 'none'],//去掉箭头
                            itemStyle: {
                                normal: { lineStyle: { type: 'solid', color:'#000'}
                                    ,label: { show: false, position:'left' } }
                            },
                            data: [{
                                name: '药量改变',
                                xAxis: '2020-06-03 22:50:23',
                                // valueDim: 'close'
                            }]
                        }
                    }],
                },
                preOptions2: {
                    title: {
                        text: '心率曲线图'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        data: [],
                        boundaryGap: false
//                        nameLocation:'end',//坐标轴名称显示位置。
//                        axisLabel : {//坐标轴刻度标签的相关设置。
//                            interval:0,
//                            rotate:"45"
//                        }
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
                            lte: 60,
                            color: '#096'
                        },  {
                            gt: 60,
                            lte: 100,
                            color: '#ff9933'
                        }],
                        outOfRange: {
                            color: '#999'
                        }
                    },
                    series: [{
                        name: '心率',
                        type: 'line',
                        data: [],
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        markLine: {
                            silent: true,
                            data: [{
                                yAxis: 60
                            }, {
                                yAxis: 100
                            }]
                        }
                    }],
                },
                preOptions3: {
                    title: {
                        text: '体重曲线图'
                    },
//                    tooltip: {
//                        trigger: 'axis'
//                    },
                    xAxis: {
                        data: [],
                        boundaryGap: false
//                        nameLocation:'end',//坐标轴名称显示位置。
//                        axisLabel : {//坐标轴刻度标签的相关设置。
//                            interval:0,
//                            rotate:"45"
//                        }
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
                        right: 0,
                        pieces: [{
                            gt: 0,
                            lte: 100,
                            color: '#096'
                        }]
                    },
                    series: [{
                        name: '体重',
                        type: 'line',
                        data: [],
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        }
                    }],
                },
                total_pill:'',
                last_pill:'',
                echartWidth:'90%',
                echartHeight:'400px',


                total:0,
                pageSize:5,
                pageCount:7,
                currentPage:1,
                tableData: []
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
                GETDATA_BP({'user_id':this.UserId,'start_at':this.fileDate[0],'end_at':this.fileDate[1]})
                    .then(response => {
                        let res_data=response.data||{};
                        this.preOptions.dataZoom=[{
                            startValue: res_data.measure_at[0]
                        }, {
                            type: 'inside'
                        }],
                        this.preOptions.xAxis.data=res_data.measure_at||[];
                        this.preOptions.series[0].data=res_data.shuzhangya||[];
                        this.preOptions.series[1].data=res_data.shousuoya||[];
                        this.preOptions.series[2].markLine.data=[];
                        const changeDate=res_data.is_change||[];
                        let that=this;
                        changeDate.forEach(function(val,i){
                            that.preOptions.series[2].markLine.data.push({
                                name: '药量改变',
                                xAxis: val,
                            })
                        })

                        this.preOptions2.xAxis.data=res_data.measure_at||[];
                        this.preOptions2.series[0].data=res_data.xinlv||[];

                        this.preOptions3.xAxis.data=res_data.measure_at||[];
                        this.preOptions3.series[0].data=res_data.tizhong||[];

                        this.total_pill=response.total_pill||'';
                        this.last_pill=response.last_pill||'';

                        this.tableData=response.list||[];
                        this.total=response.list?response.list.length:0;
                        this.pageSize=5;

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
            },
            filterXue(){//时间筛选
                this.getData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            },
        },
        components: {
            Echart
        },
        created(){
            console.log(this.$route.params.id)
        },
        mounted(){
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            this.fileDate=[formatDate(start),formatDate(end)];
            this.getData();
        }
    }

    function formatDate(date) {
        var year=date.getFullYear();  //取得4位数的年份
        var month=(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);  //取得日期中的月份，其中0表示1月，11表示12月
        var data=(date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());      //返回日期月份中的天数（1到31）
//        var hour=now.getHours();     //返回日期中的小时数（0到23）
//        var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
//        var second=now.getSeconds(); //返回日期中的秒数（0到59）
        return year+"-"+month+"-"+data;
//        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
    };
</script>
<style lang="scss">
    .xuaya-tab{
        li{
            display: inline-block;
            padding: 0 10px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-right: 6px;
            cursor:pointer;
        }
        li.active{
            background: rgb(77, 188, 255);
            color: #fff;
        }
    }
    .healData-model{
        overflow: hidden;
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
        .echart-model{
            display: inline-block;
            width: 70%;
            float: left;
        }
        .pill-model{
            display: inline-block;
            width: 25%;
            margin-top: 20px;
            float: left;
            li {
                margin: 0 4%;
                h6{
                    line-height: 30px;
                }
                > div {

                    height: 100px;

                    border: 1px solid #ccc;
                    border-radius: 4px;
                    padding: 6px;
                    overflow: auto;
                }
            }
            li:nth-child(2){
                margin-top: 20px;
            }
        }

    }
</style>