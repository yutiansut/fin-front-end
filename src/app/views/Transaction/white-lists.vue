<template>
    <index :title="'异常白名单'"
           :ptitle="'交易管理'"
           :hname="'trade-info'"  
           :isshow="'isshow'">
        <div class="content white-lists" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa="trade_detail_manage"><a v-link="{name:'trade-info'}">交易明细</a></li>
                    <li data-ksa="adjust_trade_detail_pre_manage"><a v-link="{name:'adjust-trade-detailpre'}">调账管理</a></li>
                    <li data-ksa="manual_trade_detail"><a v-link="{name:'manual-trade-detail'}">手工单管理</a></li>
                    <li data-ksa="manually_settlement"><a v-link="{name:'manually-settlement'}">手工结算</a></li>
                    <li data-ksa="exception_trade_manage"><a v-link="{name:'Abnormal-transaction'}">异常交易</a></li>
                    <li class="active" data-ksa="exception_trade_white_list_manage"><a v-link="{name:'white-lists'}">异常白名单</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add" @click="addWhite" data-ksa="exception_trade_white_list_manage.add">添加</a>
                    </div>
                    <div class="heading-right">
                        <select class="form-control" v-model="defaultData.subCompanyID">
                            <option value="">全部分公司</option>
                            <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                        </select> 
                        <select class="form-control" v-model="defaultData.type">
                            <option value="">请选择类型</option>
                            <option value="2">活动</option>
                            <option value="1">商户</option>
                            <option value="3">门店</option>
                        </select>
                        <select class="form-control" v-model="defaultData.status">
                            <option value="">请选择状态</option>
                            <option value="true">正常</option>
                            <option value="false">已失效</option>
                        </select>

                        <input type="number" class="form-control" v-model="defaultData.operationID" placeholder="活动ID/商盟ID/门店号" v-limitnumber="defaultData.operationID">
                        
                        <input type="text" class="form-control" v-model="defaultData.name" placeholder="活动名称">
                        <input type="text" class="form-control" v-model="defaultData.backendMerchantCode" placeholder="商户号">
                        <input type="text" class="form-control" v-model="defaultData.backendMerchantName" placeholder="商户简称">
                        <input type="text" class="form-control" v-model="defaultData.backendStoreCode" placeholder="门店号">
                        <input type="text" class="form-control" v-model="defaultData.backendStoreName" placeholder="门店名称">

                        <a class="btn btn-info" @click="checkNew" data-ksa="exception_trade_white_list_manage.search">查询</a>
                    </div>
                </div>


                <div v-show="zdlists.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>商户号</th>
                                <th>商户简称</th>
                                <th>门店号</th>
                                <th>门店名称</th>
                                <th>商盟ID</th>
                                <th>商盟商户名称</th>
                                <th>活动ID</th>
                                <th>活动名称</th>
                                <th>分公司</th>
                                <th>有效期 </th>
                                <th>状态</th>
                                <th>备注</th>
                                <th>操作</th>
                                <th>申请人</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.backendMerchantCode}}</td>
                                <td>{{trlist.backendMerchantName}}</td>
                                <td>{{trlist.backendStoreCode}}</td>
                                <td>{{trlist.backendStoreName}}</td>
                                <td>{{trlist.operationID}}</td>
                                <td>
                                    <span v-if="!trlist.existInBackend">{{trlist.merchantName}}</span>
                                </td>
                                <td>{{trlist.activityId}}</td>
                                <td>{{trlist.activityName}}</td>
                                <td>{{trlist.subCompanyName }}</td>
                                <td>
                                    {{trlist.startDate | datetimes }}--{{trlist.endDate | datetimes  }}
                                </td>
                                <td>
                                    <template v-if="trlist.status==0">已失效</template>
                                    <template v-if="trlist.status==1">正常</template>
                                </td>
                                <td>{{trlist.remarks }}</td>
                                <td>
                                    <a v-if="trlist.status==1" @click="whiteexpired(trlist.id)" data-ksa="exception_trade_white_list_manage.expired">失效</a>
                                    <a href="{{origin}}/file/download/{{trlist.certificateID}}">下载</a>
                                </td>
                                <td>{{trlist.createUserName }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="datatable-bottom">
                       <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" @click="abnormalWhiteexcel" data-ksa="exception_trade_white_list_manage.export">Excel导出</a>
                       </div>

                       <div class="right">
                            <page :all="pageall"
                                  :cur.sync="defaultData.pageIndex"
                                  :page_size.sync="defaultData.pageSize">
                            </page>
                       </div>
                    </div>
                </div>
                
                <div class="no-list" v-else>
                    未找到数据
                </div>

                <content-dialog
                        :show.sync="modal_waring" :is-cancel="true" :type.sync="'infos'"
                        :title.sync="'添加白名单'" @kok="addTrue" @kcancel="modal_waring = false"
                        >
                    <validator name="vali">
                        <div class="modal-body">
                            <div class="form-group">
                                <label class="control-label"><i>*</i>类型：</label>
                                <select class="form-control"  v-model="redata.type" @change="resetwhiteData" v-validate:type="['required']">
                                    <option value="2">活动ID</option>
                                    <option value="1">商盟ID</option>
                                    <option value="3">门店号</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="control-label"><i>*</i>ID：</label>
                                <input v-if="redata.type==1" style="width: 60%;" v-validate:operationID="['required']" v-model="redata.operationID" class="form-control" type="text" placeholder="商盟ID" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
                                <input v-if="redata.type==2" style="width: 60%;" v-validate:operationID="['required']" v-model="redata.operationID" class="form-control" type="text" placeholder="活动ID" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
                                <input v-if="redata.type==3" style="width: 60%;" v-validate:operationID="['required']" v-model="redata.operationID" class="form-control" type="text" placeholder="门店号" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
                                <input style="margin-left: 10px;margin-top: -4px;"  type="button" class="btn btn-info" @click="queryId" value="查询">
                            </div>
                            <div class="form-group">
                                <label class="control-label">分公司：</label>
                                {{whiteData.subCompanyName}}
                            </div>
                            <template v-if="redata.type!=2">
                                <div class="form-group">
                                    <label class="control-label">商盟ID：</label>
                                    <span>{{whiteData.merchantOperationID}}</span>
                                    <span style="margin-left:20px">商盟商户名称：{{whiteData.merchantName}}</span>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">商户号：</label>
                                    <span>{{whiteData.backendMerchantCode}}</span>
                                    <span style="margin-left:20px">商户简称：{{whiteData.backendMerchantName}}</span>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">门店号：</label>
                                    <span>{{whiteData.backendStoreCode}}</span>
                                    <span style="margin-left:20px">门店名称：{{whiteData.backendName}}</span>
                                </div>
                            </template>
                            <template v-else>
                                <div class="form-group">
                                    <label class="control-label">活动ID：</label>
                                    <span>{{whiteData.operationID}}</span>
                                    <span style="margin-left:20px">活动名称：{{whiteData.name}}</span>
                                </div>
                            </template>
                            <div class="form-group">
                                <label class="control-label"><i>*</i>有效期：</label>
                                <input type="radio" id="one" value="2" v-model="redata.validType" v-validate:isCcb="['required']">
                                <label style="text-align: left;" for="one">永久</label>
                                <input type="radio" id="two" value="1" v-model="redata.validType" v-validate:isCcb="['required']">
                                <label style="text-align: left;" for="two">自定义</label>
                                <div v-show="redata.validType=='1'" style="padding-left: 75px;">
                                    <div style="width:215px;display:inline-block">
                                        <datepicker :value.sync="startDate"></datepicker>
                                    </div>
                                    <span>至</span>
                                    <div style="width:215px;display:inline-block">
                                        <datepicker :value.sync="redata.endDate"></datepicker>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="w28" style="width: 15%;"><i>*</i>上传凭证：</label>
                                <input style="display:none" type="file" @change="uploads($event)">
                                <a href="javascript:void(0)" class="btn btn-primary" @click="uploadClick">上传凭证</a>
                                <span v-text="uploadText" v-show="uploadText!=''"></span>
                            </div>
                            <div class="form-group">
                                <label style="position: relative;top: -95px;" class="control-label"><i>*</i>备注：</label>
                                <textarea rows="5" cols="5" class="form-control" v-model="redata.remarks" v-validate:val2="['required']"></textarea>
                            </div>
                            <div class="form-group tc">
                                <span v-show="saveerror!=''|| (!$vali.valid&&updataerror)" class="validation-error-label" v-text="saveerror"></span>
                            </div>
                        </div>
                    </validator>
                </content-dialog>



                <content-dialog
                        :show.sync="modal_expired" :is-button="false" :type.sync="'infos'"
                        :title.sync="'你确定失效该账户？'"
                >
                    <div class="modal-body">
                        <div class="form-group tc">
                            <a type="button" @click="whiteexpiredTrue" class="btn btn-primary">确认</a>
                            <a class="btn btn-default" @click="modal_expired = false">取消</a>
                        </div>
                    </div>
                </content-dialog>
            </div>
        </div>
    </index>
</template>

<script>
    import model from '../../ajax/Transaction/white_model.js'
    export default{
        data(){
            this.model =model(this)
            return{
                modal_waring: false,
                modal_expired: false,
                origin:window.origin,
                pageall:1,
                companylists:[],
                startDate:'',
                defaultData:{
                    backendMerchantCode:"",
                    backendMerchantName:"",
                    backendStoreCode:"",
                    backendStoreName:"",
                    'subCompanyID': '',
                    'type': '',
                    'status': '',
                    'operationID': '',
                    'name': '',
                    'pageIndex': 1,
                    'mid':'',
                    'pageSize': 10
                },
                zdlists:[],
                id:'',
                isEnable: 0,
                redata:{
                    id:'',
                    type:1,
                    remarks:'',
                    operationID:'',
                    certificateID:'',
                    startDate:'',
                    endDate:'',
                    validType:'2'
                },
                whiteData:{
                    operationID:'',
                    subCompanyName:'',
                    merchantName:'',
                    backendMerchantCode:'',
                    backendMerchantName:'',
                    backendStoreCode:'',
                    backendStoreName:'',
                    activityId:'',
                    activityName:''
                },
                saveerror:'',
                updataerror:false,
                uploadText:'',
                total:0
            }
        },
        methods:{
            // *** 请求账户列表数据
            getZlists(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.whitedetail(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                            (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                        });
            },
            getClist(){
                // *** 请求公司数据
                this.$common_model.getcompany()
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('companylists', response.data.data) : null;
                        });
            },
            checkNew(){
                this.defaultData.pageIndex=1;
                this.initList();
            },
            initList(){
                this.modal_waring = false;
                this.modal_expired = false;
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            },
            abnormalWhiteexcel(){
                if(!this.zdlists.length>0)return;
                this.defaultData.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.abnormalWhiteexcel+ $.param(this.defaultData));
            },
            gettoday(){
                var time = new Date();
                var y = time.getFullYear();
                var m = time.getMonth()+1;
                var d = time.getDate();
                return y+'-'+this.add0(m)+'-'+this.add0(d);
            },
            resetwhiteData(){
                this.whiteData={
                    operationID:'',
                    subCompanyName:'',
                    merchantName:'',
                    backendMerchantCode:'',
                    backendMerchantName:'',
                    backendStoreCode:'',
                    backendStoreName:'',
                    activityId:'',
                    activityName:''
                };
            },
            addWhite(){
                this.redata={
                    id:'',
                    type:1,
                    remarks:'',
                    operationID:'',
                    certificateID:'',
                    startDate:'',
                    endDate:'',
                    validType:'2'
                };
                this.resetwhiteData();
                this.saveerror='';
                this.uploadText='';
                this.updataerror=false;
                var time = new Date();
                var y = time.getFullYear();
                var m = time.getMonth()+1;
                var d = time.getDate();
                this.startDate=this.redata.startDate=this.gettoday();
                this.modal_waring = true;
            },
            add0(m){return m<10?'0'+m:m },
            startParty(_id, status){
                this._id = _id;
                this.isEnable = status;
            },
            change_status(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                let data = {
                    'id': this._id,
                    'status': this.isEnable
                }
                this.model.thirdParty_status(data)
                        .then((res) => {
                                if(res.data.code == 0&&this.isEnable==1){
                                this.initList()
                                dialogs('success','已启用！')
                            }else if(res.data.code == 0&&this.isEnable==0){
                                this.initList()
                                dialogs('success','已停用！')
                            }
                        })
            },
            uploadClick(){
                $('input[type="file"]').val('');
                $('input[type="file"]').click();
            },
            uploads(e){
                if(e.target.value==''&&this.uploadText!=''){
                    return;
                }
                let files=e.target.files[0];
                let vm=this;
                var reader = new FileReader();
                if(!check_upload(files.name)){
                    return;
                }
                if(check_upload_size(files.size)){
                    return;
                }
                reader.readAsDataURL(files);
                reader.onload = function(e){
                    let datas={
                        name:files.name,
                        data:this.result.split(',')[1]
                    }
                    vm.$common_model.upload(datas)
                            .then((response)=>{
                                    if(response.data.code == 0){
                                    vm.redata.certificateID=response.data.data;
                                    vm.uploadText=files.name;
                                    this.updataerror=false;
                                    dialogs('success','上传成功！');
                                }
                            })
                }
            },
            addTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(!this.$vali.valid){
                    this.updataerror=true;
                    this.saveerror='您的信息未填写完整！';
                    return;}
                if(this.whiteData.subCompanyName==''){
                    this.updataerror=true;
                    this.saveerror='请查询是否存在此商户/活动！';
                    return;}
                if(this.redata.certificateID==''){
                    this.updataerror=true;
                    this.saveerror='请上传凭证！';
                    return;}
                if(this.redata.validType=='1'&&this.redata.endDate==''){
                    this.updataerror=true;
                    this.saveerror='请选择有效期！';
                    return;
                }
                if(this.redata.validType=='1'&&this.redata.endDate<this.redata.startDate){
                    this.updataerror=true;
                    this.saveerror='有效期结束日期不得小于开始日期！';
                    return;
                }
                if(this.redata.validType=='2'){
                    this.redata.startDate=='';
                    this.redata.endDate=='';
                }
                this.updataerror=false;
                this.saveerror='';
                let data=_.cloneDeep(this.redata);
                if(data.type=='3'){
                    data.backendStoreCode=data.operationID;
                    data.operationID='';
                }
                this.model.whitesave(data)
                        .then((res) => {
                            if(res.data.code == 0){
                                this.initList()
                                dialogs('success','已添加！') 
                                this.modal_waring = false;
                            }
                        })
            },
            whiteexpired(_id){
                this.id=_id;
                this.modal_expired=true;
            },
            whiteexpiredTrue(){
                this.model.whiteexpired(this.id)
                        .then((res) => {
                                if(res.data.code == 0){
                                this.initList()
                                dialogs('success','已失效！')
                            }
                        })
            },
            queryId(){
                if(this.redata.operationID=='')return;
                if(this.redata.type=='2'){
                    let data={
                        operationID:this.redata.operationID
                    }
                    this.model.queryA(data)
                            .then((res) => {
                                if(res.data.code == 0){
                                    this.$set('whiteData',res.data.data)
                                }
                            })
                }else if(this.redata.type=='3'){
                    let data={
                        backendStoreCode:this.redata.operationID
                    }
                    this.model.queryC(data)
                        .then((res) => {
                            if(res.data.code == 0){
                                this.$set('whiteData',res.data.data)
                            }
                        })
                }
                else{
                    let data={
                        merchantOperationID:this.redata.operationID
                    }
                    this.model.queryC(data)
                            .then((res) => {
                                if(res.data.code == 0){
                                    this.$set('whiteData',res.data.data)
                                }
                            })
                }
            }
        },
        ready() {
            var vm=this;
            vm.getClist();
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.initList();
            $('#add_white').on('hidden.bs.modal', function () {
                $('body').css('padding-right',0);
                vm.uploadText='';
                vm.redata.certificateID='';
            })
        },
        watch:{
            startDate(){
                if(this.startDate<this.gettoday()){
                    this.startDate=this.redata.startDate=this.gettoday();
                }else{
                    this.redata.startDate=this.startDate;
                }
            },
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.initList();
            }
        }
    }
</script>