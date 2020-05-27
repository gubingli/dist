<template>
    <el-upload
            ref="upload"
            action="string"
            accept="type"
            :list-type="listType"
            :before-upload="onBeforeUploadImage"
            :on-change="fileChange"
            :http-request="UploadImage"
            :file-list="fileList"
            :on-remove="handleRemove">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传{{this.type}}文件，且不超过{{this.size}}kb</div>
    </el-upload>
</template>
<script>
    import { UPLOAD } from '@/api'
    export default{
        name:'myUpload',
        data(){
            return {

            }
        },
        props: {
            listType:{
                type:String,
                default:''
            },
            type: {
                type: String,
                default: "image/jpeg,image/png,image/jpg",
            },
            size: {
                type: Number,
                default: 1*1024
            },
            fileList:{
                type: Array,
                default:[],
            },
            options: {}
        },
        methods:{
            onBeforeUploadImage(file) {
                let type_arr=this.type.split(",");
                const isType = (type_arr.indexOf(file.type)>-1)?true:false;
                const isSize = (file.size / (this.size*1024))<1?true:false;

                if (!isType||!isSize) {
                    this.$message.error((!isType?'上传文件只能是'+this.type+'格式!':'')+(!isSize?'上传文件大小不能超过 '+this.size+'KB!':''))
                }
                return isType && isSize
            },
            UploadImage(param){
                let formData = new FormData()
                formData.append('file', param.file)
                UPLOAD(formData).then(response => {
                    console.log('上传图片成功')
                    this.onSuccess(response);
                    param.onSuccess(response)  // 上传成功的图片会显示绿色的对勾
                    // 但是我们上传成功了图片， fileList 里面的值却没有改变，还好有on-change指令可以使用
                }).catch(response => {
                    this.$message({
                        message: "图片上传失败！",
                        type: "error",
                        offset:'100',
                        center: true
                    });
                    console.log('图片上传失败')
                    param.onError();
                })
            },
            fileChange(file){
                this.$refs.upload.clearFiles() //清除文件对象
                this.logo = file.raw // 取出上传文件的对象，在其它地方也可以使用
                this.$emit('setFileList', [{name: file.name, url: file.url}]);
//                this.fileList.push({name: file.name, url: file.url});
//                this.fileList = [{name: file.name, url: file.url}] // 重新手动赋值filstList， 免得自定义上传成功了, 而fileList并没有动态改变， 这样每次都是上传一个对象
            },

            onSuccess(file){
                this.$emit('uploaded', file.url);
            },
            handleRemove() {
                this.$emit('uploaded', '');
                this.$emit('setFileList', []);
            }
        }
    }
</script>