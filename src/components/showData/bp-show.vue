<template>
    <div>
        <ul class="xuaya-tab-bp xuaya_tab">
            <li v-bind:class="{ active: showModule==1}" @click="changeModule(1)">血压折线图</li>
            <li v-bind:class="{ active: showModule==2}" @click="changeModule(2)">心率折线图</li>
            <li v-bind:class="{ active: showModule==3}" @click="changeModule(3)">体重折线图</li>
        </ul>
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
                <div v-if="noData" style="margin:80px 0;text-align: center">暂无数据</div>
                <div v-else class="echart-model">
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
                    <div style="overflow: hidden">
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
            </div>


            <div>
                <h6 style="margin: 10px 0;">基础信息</h6>
                <ul class="base-ul">
                    <li>
                        <span class="name">姓名：</span>
                        <span >{{baseList.true_name||'无'}}</span>
                    </li>
                    <li>
                        <span class="name">性别：</span>
                        <span >{{baseList.gender||'无'}}</span>
                    </li>
                    <li>
                        <span class="name">生日：</span>
                        <span >{{baseList.birthday_at||"无"}}</span>
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
    import { GETDATA_BP,GETDATA_BP_LIST,UPDATA_DETAIL} from '@/api'
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
                bHealth:{},

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
                    visualMap: {
                        top: 10,
                        right: 0,
                        pieces: [{
                            gt: 0,
                            lte: 80,
                            color: '#56a1d5'
                        }, {
                            gt: 50,
                            lte: 100,
                            color: '#eb7b94'
                        }, {
                            gt: 100,
                            lte: 120,
                            color: '#807be3'
                        }],
                        outOfRange: {
                            color: '#62c3e5'//#f2a385
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
                    visualMap: {
                        top: 10,
                        right: 10,
                        pieces: [{
                            gt: 0,
                            lte: 60,
                            color: '#56a1d5'
                        },  {
                            gt: 60,
                            lte: 100,
                            color: '#eb7b94'
                        }],
                        outOfRange: {
                            color: '#62c3e5'
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
                    },{},{}],
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
                    visualMap: {
                        top: 10,
                        right: 0,
                        pieces: [{
                            gt: 0,
                            lte: 100,
                            color: '#eb7b94'
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
                    },{},{}],
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
                pageSize:2,
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
                GETDATA_BP({'user_id':this.id,'d_user_id':(this.role==2?this.user_id:''),'start_at':this.fileDate[0],'end_at':this.fileDate[1]})
                    .then(response => {
                        let res_data=response.data||{};
                        this.noData=res_data.length==0?true:false;
                        this.preOptions.dataZoom=[{
                            startValue: res_data.measure_at?res_data.measure_at[0]:''
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


                        this.preOptions2.dataZoom=[{
                            startValue: res_data.measure_at?res_data.measure_at[0]:''
                        }, {
                            type: 'inside'
                        }],
                        this.preOptions2.xAxis.data=res_data.measure_at||[];
                        this.preOptions2.series[0].data=res_data.xinlv||[];
                        this.preOptions2.series[1].data=[];
                        this.preOptions2.series[2].data=[];



                        this.preOptions3.dataZoom=[{
                            startValue: res_data.measure_at?res_data.measure_at[0]:''
                        }, {
                            type: 'inside'
                        }],
                        this.preOptions3.xAxis.data=res_data.measure_at||[];
                        this.preOptions3.series[0].data=res_data.tizhong||[];
                        this.preOptions3.series[1].data=[];
                        this.preOptions3.series[2].data=[];


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
                GETDATA_BP_LIST({'user_id':this.id,'start_at':this.fileDate[0],'end_at':this.fileDate[1],page:this.currentPage})
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
            changeModule(type){
                this.showModule=type;
            },
        },
        components: {
            Echart
        },
        created(){

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
    .xuaya-tab-bp{
        margin-top: 20px;
        li{
            display: inline-block;
            padding: 0 6px;
            height: 30px;
            line-height: 30px;
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
    .base-ul{
        width: 100%;
        color: #444;
        li{
            display: inline-block;
            width: 40%;

            .name{
                font-weight: bold;
                line-height: 30px;
            }
        }
    }
</style>