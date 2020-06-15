<template>
    <div>
        <div class="healData-model">
            <div class="healData-box blood_pressure" >
                <div class="echart-model">
                    <div class="block" style="margin-bottom: 20px;">
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
                            :echart_width="echartWidth"
                            :echart_height="echartHeight"
                            :options="preOptions"
                    ></Echart>
                </div>

            </div>
            <div>
                【基础信息】姓名：{{baseList.true_name||'无'}},性别：{{baseList.gender||'无'}},生日：{{baseList.birthday_at||"无"}}
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
                        prop="jieduan_type"
                        label="阶段">
                </el-table-column>
                <el-table-column
                        prop="xuetang"
                        label="随机血糖">
                </el-table-column>
                <el-table-column
                        prop="hongdanbai"
                        label="糖化血红蛋白">
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
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :pager-count="pagerCount"
                    @current-change="handleCurrentChange"
                    style="margin-top: 30px;float: right;right: 10px;">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import Echart from '@/components/echart'
    import { GETDATA_XT,GETDATA_XT_LIST } from '@/api'
    import { formatDate } from '@/utils/formdate.js'
    export default {
        props: {
            id:'',
            role:''
        },
        data() {
            return {
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
                        text: '血糖曲线图'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['糖化血红蛋白', '随机血糖']
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
                        name:'单位（mmol/L）',
                        splitLine: {
                            show: false
                        },


                    },
                    toolbox: {
                        right:0,
                        top:10,
                        feature: {
                            // dataZoom: {
                            //     yAxisIndex: 'none'
                            // },
                            // restore: {},
                            saveAsImage: {}
                        }
                    },
                    dataZoom: [{
                        startValue: '2014-06-01'
                    }, {
                        type: 'inside'
                    }],
                    // visualMap: {
                    //     top: 10,
                    //     right: 0,
                    //     pieces: [{
                    //         gt: 0,
                    //         lte: 3.6,
                    //         color: '#56a1d5'
                    //     }, {
                    //         gt: 3.6,
                    //         lte: 6.1,
                    //         color: '#eb7b94'
                    //     }, {
                    //         gt: 6.1,
                    //         lte: 9.4,
                    //         color: '#807be3'
                    //     }],
                    //     outOfRange: {
                    //         color: '#62c3e5'//#f2a385
                    //     }
                    // },
                    series: [{
                        name: '糖化血红蛋白',
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
                                yAxis: 4
                            }, {
                                yAxis: 6.5
                            }]
                        }
                    },{
                        name: '随机血糖',
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

                total_pill:'',
                last_pill:'',
                baseList:{
                    true_name:'',
                    gender:'',
                    birthday_at:''
                },

                echartWidth:'96%',
                echartHeight:'400px',


                total:0,
                pageSize:5,
                pageCount:0,
                pagerCount:7,
                currentPage:1,
                tableData: [],

            }
        },
        methods: {
            getData(){
                GETDATA_XT({'user_id':this.id,'start_at':this.fileDate[0],'end_at':this.fileDate[1]})
                    .then(response => {
                        console.log(response.data)
                        let res_data=response.data||{};
                        this.preOptions.dataZoom=[{
                            startValue: res_data.measure_at?res_data.measure_at[0]:''
                        }, {
                            type: 'inside'
                        }];
                        this.preOptions.xAxis.data=res_data.measure_at||[];
                        this.preOptions.series[0].data=res_data.hongdanbai||[];
                        this.preOptions.series[1].data=res_data.xuetang||[];
                        //
                        this.preOptions.series[2].markLine.data=[];
                        const changeDate=res_data.is_change||[];
                        let that=this;
                        changeDate.forEach(function(val,i){
                            that.preOptions.series[2].markLine.data.push({
                                name: '药量改变',
                                xAxis: val,
                            })
                        })


                        this.total_pill=response.total_pill||'';
                        this.last_pill=response.last_pill||'';

                        this.baseList=response.base_list;

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
            getList(){
                GETDATA_XT_LIST({'user_id':this.id,'start_at':this.fileDate[0],'end_at':this.fileDate[1],page:this.currentPage})
                    .then(response => {
                        this.tableData=response.data||[];
                        this.total=response.total||0;
                        this.pageCount=response.last_page||0;
                        this.pageSize=response.per_page||0;
                        console.log(this.pageCount)
                    })
                    .catch(error => {
                        console.log(error);
                        this.$message({
                            message: "获取列表失败！",
                            type: "error",
                            offset:'100',
                            center: true
                        });
                    });
            },
            filterXue(){//时间筛选
                this.getData();
                this.currentPage = 1;
                this.getList();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getList();

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
            this.getList();
        }
    }


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
        >.healData-box{
            box-shadow: 0 0 4px #ccc;
            padding: 20px 20px 10px;
            margin: 20px 0;
            overflow: hidden;
        }
        h5{
            color: #606266;
            margin: 10px 0;
        }

        .pill-model{
            margin-top: 20px;
            li {
                display: inline-block;
                width: 40%;
                margin: 0 4%;
                h6{
                    line-height: 30px;
                }
                > div {
                    height: 60px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    padding: 6px;
                    overflow: auto;
                }
            }

        }

    }
</style>