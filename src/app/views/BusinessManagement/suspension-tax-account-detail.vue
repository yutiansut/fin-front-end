<template>
    <index :title="'暂扣税金账户明细'"
           :ptitle="'备付金支出'"
           :p2title="'税金管理'"
           :hname="'payment-details'"
           :h2name="'subsidy-management'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="heading">
                    <div class="heading-left">
                        <a  class="btn btn-add add-top" @click="applyPay(applyData)" data-ksa="subsidy_account_manage.with_draw">提现</a>
                    </div>

                    <div class="heading-right">
                        <form class="form-inline manage-form">
                                <select class="form-control" v-model="defaultData.dateS" @change="getTime">
                                    <option value="0">昨天</option>
                                    <option value="1">最近一周</option>
                                    <option value="2">最近一个月</option>
                                    <option value="3">最近三个月</option>
                                    <option value="4">自定义时间</option>
                                </select>

                                <div  v-show="defaultData.dateS==4" class="inline">
                                    <datepicker :value.sync="defaultData.startDate"></datepicker>
                                    <span>至</span>
                                    <datepicker :value.sync="defaultData.endDate"></datepicker>
                                </div>

                                <input type="number" class="form-control" v-model="defaultData.orderID" placeholder="订单号" v-limitnumber="defaultData.orderID">

                                <select class="form-control" v-model="defaultData.payType">
                                    <option value="">请选择付款方式</option>
                                    <option value="1">备付金</option>
                                    <option value="2">预付款</option>
                                    <option value="5">网银转账</option>

                                </select>

                                <select class="form-control" v-model="defaultData.status">
                                    <option value="">请选择状态</option>
                                    <option value="7">等待复核</option>
                                    <option value="8">复核不通过</option>
                                    <option value="5">对账成功</option>
                                    <option value="4">等待对账</option>
                                    <option value="3">转账中</option>
                                    <option value="2">等待划付</option>
                                    <option value="6">划付失败</option>
                                    <option value="0">已关闭</option>
                                </select>

                                <input type="text" class="form-control" v-model="defaultData.remarks" placeholder="备注">
                        </form>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="checkNew" data-ksa="suspension_tax_account_detail_manage.search">查询</a>
                    </div>
                </div>

                <div style="margin: 0 0 20px 20px;font-size: 18px;">
                    <span class="mr20">商户号：{{balance.backendMerchantCode}}</span>
                    <span class="mr20">商户简称：{{balance.backendMerchantName}}</span>
                    <span class="mr20">门店号：{{balance.backendStoreCode}}</span>
                    <span class="mr20">门店名称：{{balance.backendName}}</span>
                    <span>商盟ID：</span><span style="margin-right: 10px;">{{balance.merchantId}}</span>
                    <span>商盟商户名称：</span><span style="margin-right: 10px;">{{balance.merchantName}}</span>
                </div>
                <div style="margin: 0 0 20px 20px;font-size: 18px;">
                    <span>活动ID：</span><span style="margin-right: 10px;">{{balance.activityId}}</span>
                    <span>活动名：</span><span style="margin-right: 10px;">{{balance.activityName}}</span>
                    <span>退税款：</span><span style="margin-right: 10px;">{{balance.suspensionTaxAmount/100| currency '' }}元</span>
                </div>

                <div v-show="zdlists.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>订单号</th>
                                <th>收入</th>
                                <th>支出</th>
                                <th>付款方式 </th>
                                <th>状态</th>
                                <th>交易时间</th>
                                <th>操作</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.orderID }}</td>
                                <td>{{trlist.incomeAmount/100 | currency ''}}</td>
                                <td>{{trlist.payoutAmount/100 | currency ''}}</td>
                                <td>
                                    <template v-if="trlist.payType==1">备付金</template>
                                    <template v-if="trlist.payType==2">预付款</template>
                                    <template v-if="trlist.payType==5">网银转账</template>
                                </td>
                                <td>
                                    <template v-if="trlist.status==0">已关闭</template>
                                    <template v-if="trlist.status==2">等待划付 </template>
                                    <template v-if="trlist.status==3">转账中</template>
                                    <template v-if="trlist.status==4">等待对账</template>
                                    <template v-if="trlist.status==5">对账成功</template>
                                    <template v-if="trlist.status==6">划付失败</template>
                                    <template v-if="trlist.status==7">等待复核</template>
                                    <template v-if="trlist.status==8">复核不通过</template>
                                </td>
                                <td>{{trlist.tradeTime  | datetime}}</td>
                                <td>
                                    <a v-if="trlist.status==7||trlist.status==8" v-link="{'name':'pay-recheck',params:{'recheckId':trlist.payRecheckID}}">查看</a>
                                    <a v-else v-link="{name:'payment-details',params:{reserveCashOrderNumber:trlist.orderID,payType:trlist.payType}}" data-ksa="reserve_cash_order_manage.search">查看</a>
                                </td>
                                <td>{{trlist.remarks}}</td>
                            </tr>
                            <tr role="row">
                                <td>合计：</td>
                                <td>{{total.incomeAmount/100 | currency ''}}</td>
                                <td>{{total.payoutAmount/100 | currency ''}}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>


                    <div class="datatable-bottom">
                       <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" @click="excel" data-ksa="suspension_tax_account_detail_manage.export">Excel导出</a>
                       </div>

                       <div class="right">
                            <page :all="defaultData.pageTotal"
                                  :cur.sync="defaultData.pageIndex"
                                  :page_size.sync="defaultData.pageSize">
                            </page>
                       </div>
                    </div>
                </div>
                
                <div class="no-list" v-else>
                    未找到数据
                </div>

                <div data-backdrop="static"  id="modal_applyPay" class="modal fade" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">申请提现</h5>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label class="control-label">税金池余额：{{redata.suspensionTaxAmount/100 | currency ''}} 元</label>
                                    <label class="control-label">可提现金额：{{redata.withdrawCashAmount/100 | currency ''}} 元</label>
                                </div>
                                <div class="form-group" v-if="!!redata.advancePaymentMerchantModel">
                                    <span style="color:red">该门店关联了"{{redata.advancePaymentMerchantModel.accountName}}"预付款账户，余额是
                                    {{redata.advancePaymentMerchantModel.balanceAmount/100 | currency ''}}元，请先确认付款方式</span>
                                </div>
                                <div class="form-group">
                                    <label class="control-label"><i style="color:red;">*</i>付款方式：</label>
                                    <select class="form-control" v-model="applyData.payType" style="display: inline-block;width: 80%;">
                                        <option value="">请选择付款方式</option>
                                        <option value="1">备付金账户</option>
                                        <option value="2">商户预付款账户</option>
                                        <option value="5">网银转账</option>
                                    </select>
                                </div>
                                <div class="form-group" v-show="applyData.payType==1">
                                    <label class="payment-method"><i style="color:red;">*</i>付款账号：</label>
                                    <select class="form-control" v-model="applyData.bankAccountID" style="width: 30%;display: inline-block;">
                                        <option value="">请选择付款账号</option>
                                        <option v-for="n in bankAccountList" v-text="n.shortName" :value="n.id"></option>
                                    </select>

                                </div>
                                <div class="form-group" v-show="applyData.payType==1">
                                    <label style="padding-left: 13%"><input type="checkbox" v-model="applyData.mergePay"/>
                                        相同账户合并付款</label>
                                </div>
                                <div class="form-group">
                                    <label style="width: 13%"><i style="color:red;">*</i>金额：</label>
                                    <input style="width: 80%;display: inline-block" placeholder="单位：元" type="text" class="form-control" v-model="applyData.payoutAmount" v-limitprice="applyData.payoutAmount">
                                </div>
                                <div class="form-group">
                                    <label style="position: relative;top: -95px;width: 13%" class="control-label"><i style="color:red;">*</i>备注：</label>
                                    <textarea style="display: inline-block;width: 80%;"  rows="5" cols="5" class="form-control" v-model="applyData.remarks"></textarea>
                                </div>
                                <div class="form-group tc">
                                    <button  type="button" @click="applyPayTrue" class="btn btn-primary">申请提现</button>
                                </div>
                                <div class="form-group tc">
                                    <span v-show="applyText!=''" class="validation-error-label" v-text="applyText"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </index>
</template>
<style>

</style>
<script>
    import model from '../../ajax/BusinessManagement/suspension-tax-account-detail'
    export default{
        data(){
            this.model =model(this)
            return{
                origin:window.origin,
                defaultData:{
                    'subsidyAccountID': '',
                    'orderID': '',
                    'startDate': '',
                    'endDate': '',
                    'payType': '',
                    'status': '',
                    'remarks': '',
                    'pageTotal': 1,
                    'pageIndex': 1,
                    'pageSize': 10,
                    mid:'',
                    dateS:'4'
                },
                bankAccountList:[],
                zdlists:[],
                total:{
                    'incomeAmount': '',
                    'payoutAmount': '',
                },
                balance:{
                    activityName:'',
                    activityId:'',
                    merchantName:'',
                    merchantId:'',
                    backendMerchantCode: "",
                    backendMerchantName: "",
                    backendName: "",
                    backendStoreCode: "",
                    invoiceAmount:''
                },
                redata:{
                    suspensionTaxAmount:'',
                    withdrawCashAmount:''
                },
                applyData:{
                    remarks:'',
                    ids:[],
                    payoutAmount:'',
                    mergePay:false,
                    payType:'',
                    bankAccountID:''
                },
                applyText:''
            }
        },
        methods:{
            // *** 请求账户数据
            getZlists(){
                let data=this.defaultData
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(data.endValue<data.startValue){
                    this.defaultData.endValue=b;
                    data.startValue=a;
                    data.endValue=b;
                }
                this.model.suspensionTaxAccountDetail_list(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('zdlists', response.data.data)
                                this.defaultData.pageTotal=response.data.total
                            }
                        });
                this.model.suspensionTaxAccountDetail_total(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('total', response.data.data)
                            }
                        });
            },
            //获取付款账户数据
            getBankAccountList(_type){
                this.$common_model.getbankAccount(_type)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('bankAccountList', response.data.data)
                        }
                    });
            },
            getBlance(){
                let data={
                    id:this.$route.params.suspensionHDid
                }
                this.$common_model.suspensionTaxAccountDetail_info(data)
                        .then((response)=>{
                            if(response.data.code==0){
                                this.balance={
                                    activityName:response.data.data.activity.name,
                                    activityId:response.data.data.activity.operationId,
                                    merchantId:response.data.data.merchant.operationId,
                                    merchantName:response.data.data.merchant.name,
                                    backendMerchantCode:response.data.data.merchant.backendMerchantCode,
                                    backendMerchantName:response.data.data.merchant.backendMerchantName,
                                    backendName:response.data.data.merchant.backendName,
                                    backendStoreCode:response.data.data.merchant.backendStoreCode,
                                    suspensionTaxAmount:response.data.data.subsidyAccount.suspensionTaxAmount
                                }
                            }
                        });
            },
            checkNew(){
                this.defaultData.pageIndex=1;
                this.initList();
            },
            initList(){
                $('.modal').modal('hide');
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists();
            },
            excel(){
                if(!this.zdlists.length>0||sessionStorage.getItem('isHttpin')==1)return;
                this.defaultData.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.suspensionTaxAccountDetailexcel+ $.param(this.defaultData));
            },
            applyPay({id}){
                this.applyData.remarks='';
                this.applyData.payoutAmount='';
                this.applyData.payType='';
                this.applyData.ids=[id];
                this.applyData.mergePay=false;
                this.applyData.bankAccountID='';
                let data={
                    id:id,
                }
                this.model.subsidyAccount_info(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('redata', response.data.data);
                                $('#modal_applyPay').modal('show');
                                if(response.data.data.bankAccountID){
                                    this.applyData.bankAccountID = response.data.data.bankAccountID;
                                }
                            }
                        });
            },
            applyPayTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.applyText='';
                if(this.applyData.payoutAmount==''){
                    this.applyText='请填写提现金额！';
                    return;
                }
                if(this.applyData.remarks==''){
                    this.applyText='请填写备注！';
                    return;
                }
                if(this.applyData.payType==''){
                    this.applyText='请选择付款方式！';
                    return;
                }
                if(this.applyData.payType=='1' && this.applyData.bankAccountID==''){
                    this.applyText='请选择付款账户！';
                    return;
                }
                let data={};
                $.extend(true, data,this.applyData);
                data.payoutAmount=accMul(data.payoutAmount,100);
                this.model.subsidyAccount_applyPay(data)
                        .then((response)=>{
                            if(response.data.code == 0){
                                dialogs('success',response.data.message);
                                this.initList();
                                this.getBlance();
                            }
                        });
            },
            getTime(){
                this.defaultData.startDate=init_date(this.defaultData.dateS)[0];
                this.defaultData.endDate=init_date(this.defaultData.dateS)[1];
            },
        },
        watch:{
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.initList()
            }
        },
        ready(){
            let vm=this;
            (vm.$route.params.suspensionBTid==':suspensionBTid')? vm.defaultData.merchantID='' : vm.defaultData.merchantID=vm.$route.params.suspensionBTid;
            (vm.$route.params.suspensionHDid==':suspensionHDid')? vm.applyData.id=vm.defaultData.subsidyAccountID='' : vm.applyData.id=vm.defaultData.subsidyAccountID=vm.$route.params.suspensionHDid;
            vm.getTime();
            vm.getBankAccountList('1');
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.initList();
            vm.getBlance();
        }
    }
</script>