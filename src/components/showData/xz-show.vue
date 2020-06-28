<template>
    <div>
        <div class="healData-model">
            <div class="block" style="margin: 20px 0;">
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
            <div class="healData-box blood_pressure" >
                <div v-if="noData" style="text-align: center;margin: 80px 0;">暂无数据</div>
                <div v-else class="echart-model">
                    <Echart
                            :echart_width="echartWidth"
                            :echart_height="echartHeight"
                            :options="preOptions"
                    ></Echart>
                    <Echart
                            :echart_width="echartWidth"
                            :echart_height="echartHeight"
                            :options="preOptions2"
                    ></Echart>
                    <Echart
                            :echart_width="echartWidth"
                            :echart_height="echartHeight"
                            :options="preOptions3"
                    ></Echart>
                    <Echart
                            :echart_width="echartWidth"
                            :echart_height="echartHeight"
                            :options="preOptions4"
                    ></Echart>
                    <ul class="pill-model">
                        <li style="margin: 0;">
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
                                prop="danguchun"
                                label="胆固醇">
                        </el-table-column>
                        <el-table-column
                                prop="ganyousanzhi"
                                label="甘油三酯">
                        </el-table-column>
                        <el-table-column
                                prop="g_zhidanbai"
                                label="高密度脂蛋白">
                        </el-table-column>
                        <el-table-column
                                prop="d_zhidanbai"
                                label="低密度脂蛋白">
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
            <div>
                <h6 style="margin: 10px 0;">基础信息</h6>
                <ul class="base-ul">
                    <li>
                        <span class="name">姓名：</span>
                        <span>{{baseList.true_name||'无'}}</span>
                    </li>
                    <li>
                        <span class="name">性别：</span>
                        <span>{{baseList.gender||'无'}}</span>
                    </li>
                    <li>
                        <span class="name">生日：</span>
                        <span>{{baseList.birthday_at||"无"}}</span>
                    </li>
                </ul>
            </div>
            <div>
                <h6 style="margin: 10px 0;">健康状况</h6>
                <ul class="base-ul">
                    <li>
                        <span class="name">家族病史:</span>
                        <span>{{bHealth.bingshi||[]}}</span>
                    </li>
                    <li>
                        <span class="name">主要疾病:</span>
                        <span>{{bHealth.jibing!=[]?bHealth.jibing:[]}}</span>
                    </li>
                    <li>
                        <span class="name">药物过敏:</span>
                        <span>{{bHealth.guominyao}}</span>
                    </li>
                    <li>
                        <span class="name">高血压:</span>
                        <span>{{bHealth.gaoxueya}}</span>
                    </li>
                    <li>
                        <span class="name">糖尿病:</span>
                        <span>{{bHealth.tangniaobing}}</span>
                    </li>
                    <li>
                        <span class="name">慢性病:</span>
                        <span>{{bHealth.manxingbing}}</span>
                    </li>
                    <li>
                        <span class="name">精神病史:</span>
                        <span>{{bHealth.jingshenbing}}</span>
                    </li>
                    <li>
                        <span class="name">免疫情况:</span>
                        <span>{{bHealth.mianyi}}</span>
                    </li>
                    <li>
                        <span class="name">所需服务:</span>
                        <span>{{bHealth.fuwu}}</span>
                    </li>

                </ul>
            </div>
            <div>
                <h6 style="margin: 10px 0;">个人行为</h6>
                <ul class="base-ul">
                    <li>
                        <span class="name">性格:</span>
                        <span>{{bHealth.xingge}}</span>
                    </li>
                    <li>
                        <span class="name">吸烟史:</span>
                        <span>{{bHealth.xiyan}}</span>
                    </li>
                    <li>
                        <span class="name">饮酒史:</span>
                        <span>{{bHealth.yinjiu}}</span>
                    </li>
                    <li>
                        <span class="name">睡眠状况:</span>
                        <span>{{bHealth.shuimian}}</span>
                    </li>
                    <li>
                        <span class="name">锻炼项目:</span>
                        <span>{{bHealth.duanlian}}</span>
                    </li>
                    <li>
                        <span class="name">饮食习惯:</span>
                        <span>{{bHealth.yinshi}}</span>
                    </li>
                    <li>
                        <span class="name">兴趣爱好:</span>
                        <span>{{bHealth.xingqu}}</span>
                    </li>
                    <li>
                        <span class="name">是否残疾:</span>
                        <span>{{bHealth.shifouchanji}}</span>
                    </li>
                    <li>
                        <span class="name">身体不适处理方式:</span>
                        <span>{{bHealth.chulifangshi}}</span>
                    </li>


                </ul>

            </div>

        </div>
    </div>
</template>

<script>
    import Echart from '@/components/echart'
    import { GETDATA_XZ,GETDATA_XZ_LIST,UPDATA_DETAIL } from '@/api'
    import { formatDate } from '@/utils/formdate.js'
    export default {
        props: {
            id:'',
            role:'',
            user_id:''
        },
        data() {
            return {
                noData:true,
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
                bHealth:{},
                // ['胆固醇 CHOL', '甘油三酯 TG','高密度脂蛋白 HDL-C','低密度脂蛋白 LDL-C']
                preOptions: {
                    title: {
                        text: '胆固醇 CHOL'
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

                    series: [{
                        name: '胆固醇 CHOL',
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
                                yAxis: 2.8
                            }, {
                                yAxis: 5.13
                            }]
                        }
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
                        text: '甘油三酯 TG'
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

                    series: [ {
                        name: '甘油三酯 TG',
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
                                yAxis: 0.56
                            }, {
                                yAxis: 1.7
                            }]
                        }
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
                preOptions3: {
                    title: {
                        text: '高密度脂蛋白 HDL-C'
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

                    series: [{
                        name: '高密度脂蛋白 HDL-C',
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
                                yAxis: 1.04
                            }, {
                                yAxis: 1.68
                            }]
                        }
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
                preOptions4: {
                    title: {
                        text: '低密度脂蛋白 LDL-C'
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

                    series: [{
                        name: '低密度脂蛋白 LDL-C',
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
                                yAxis: 0
                            },{
                                yAxis: 3.36
                            }]
                        }
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
                echartHeight:'300px',


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
                UPDATA_DETAIL(this.id)
                    .then(response => {
                        this.$message({
                            message: "获取健康数据成功！",
                            type: "success",
                            offset:'160',
                            center: true
                        });
                        if(response){
                            this.bHealth=response?response:{};
                        }

                    })
                GETDATA_XZ({'user_id':this.id,'d_user_id':(this.role==2?this.user_id:''),'start_at':this.fileDate[0],'end_at':this.fileDate[1]})
                    .then(response => {
                        let res_data=response.data||{};
                        this.noData=res_data.length==0?true:false;
                        this.preOptions.dataZoom=[{
                            startValue: res_data.measure_at?res_data.measure_at[0]:''
                        }, {
                            type: 'inside'
                        }];
                        this.preOptions.xAxis.data=res_data.measure_at||[];
                        this.preOptions2.xAxis.data=res_data.measure_at||[];
                        this.preOptions3.xAxis.data=res_data.measure_at||[];
                        this.preOptions4.xAxis.data=res_data.measure_at||[];
                        this.preOptions.series[0].data=res_data.danguchun||[];
                        this.preOptions2.series[0].data=res_data.ganyousanzhi||[];
                        this.preOptions3.series[0].data=res_data.g_zhidanbai||[];
                        this.preOptions4.series[0].data=res_data.d_zhidanbai||[];

                        this.preOptions.series[1].markLine.data=[];
                        const changeDate=res_data.is_change||[];
                        let that=this;
                        changeDate.forEach(function(val,i){
                            that.preOptions.series[1].markLine.data.push({
                                name: '药量改变',
                                xAxis: val,
                            });
                            that.preOptions2.series[1].markLine.data.push({
                                name: '药量改变',
                                xAxis: val,
                            });
                            that.preOptions3.series[1].markLine.data.push({
                                name: '药量改变',
                                xAxis: val,
                            });
                            that.preOptions4.series[1].markLine.data.push({
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
                GETDATA_XZ_LIST({'user_id':this.id,'start_at':this.fileDate[0],'end_at':this.fileDate[1],page:this.currentPage})
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
            // const end = new Date();
            // const start = new Date();
            // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            // this.fileDate=[formatDate(start),formatDate(end)];
            this.getData();
            this.getList();
        }
    }


</script>
<style lang="scss">
    .xuaya-tab{
        li{
            display: inline-block;
            padding: 0 28px;
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
            /*box-shadow: 0 0 4px #ccc;*/
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