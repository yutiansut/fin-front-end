<template>
    <index :title="'合同管理'"
           :ptitle="'银行管理'"
           :hname="'third-party'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <ul class="tab-bor">
                    <li data-ksa="third_party_account_manage"><a v-link="{name:'pay-report'}">划付报表</a></li>
                    <li data-ksa="third_party_account_manage"><a v-link="{name:'third-party'}">银行管理</a></li>
                    <li data-ksa="contract" class="active"><a v-link="{name:'contract-management-info'}">合同管理</a></li>
                    <li data-ksa="activity_income_cost_manage"><a v-link="{name:'activity-cost-management'}">活动收入成本管理</a></li>
                    <li data-ksa="tax_rate"><a v-link="{name:'taxRate'}">税率管理</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" v-link="{name:'contract-add'}" data-ksa="contract.add">添加合同</a>
                    </div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="defaultData.subCompanyID">
                                <option value="">全部分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                            <input type="text" class="form-control" v-model="defaultData.thirdPartyAccountName" placeholder="银行名称">
                            <input type="text" class="form-control" v-model="defaultData.contractNumber" placeholder="合同编号">
                            <getmonth :value.sync="defaultData.startDate"></getmonth>
                        </form>
                    </div>
                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="initList" data-ksa="contract.search" style="margin-left: -21px;">查询</a>
                    </div>
                </div>
                <!--<div style="padding: 0 20px;font-size: 18px;">-->
                    <!--<span>三方名称：{{contractName}}</span>-->
                    <!--<span>分公司：{{contractCompanyName}}</span>-->
                    <!--<span>城市：{{contractCity}}</span>-->
                <!--</div>-->
                <div v-show="zdlists.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                                <tr role="row">
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th colspan="5" style="background:#f1f1f1">合同情况</th>
                                    <th colspan="3" style="background:#e1e1e1">回款情况</th>
                                    <th></th>
                                    <th colspan="4" style="background:#d1d1d1">划付情况</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr role="row">
                                    <td>序号</td>
                                    <td>分公司</td>
                                    <td>银行名称</td>
                                    <td>合同编号</td>
                                    <td>合同结算金额</td>
                                    <td>操作</td>
                                    <td>待结算金额</td>
                                    <td>开票/回款</td>
                                    <td>已开票金额</td>
                                    <td>已回款</td>
                                    <td>应收账款</td>
                                    <td>成本</td>
                                    <td>已划付</td>
                                    <td>待划付</td>
                                    <td>税金账户</td>
                                    <td>欠发票账户</td>
                                    <td>毛利</td>
                                    <td>毛利率</td>
                                    <td>结算确认</td>
                                    <td>备注</td>
                                </tr>
                                <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{index+1}}</td>
                                    <td>{{trlist.subCompanyName}}</td>
                                    <td>{{trlist.thirdPartyAccountName}}</td>
                                    <td>
                                        <span v-if="!trlist.contractFileID" style="color:red">{{trlist.contractNumber}}</span>
                                        <span v-else>{{trlist.contractNumber}}</span>
                                    </td>
                                    <td>{{trlist.contractSettlementAmount/100 | currency ''}}</td>
                                    <td>
                                        <a data-ksa="contract.edit" v-link="{name:'contract-add',params:{'contractAddId':trlist.contractID}}">编辑</a>
                                        <a v-if="!!trlist.contractFileID" href="{{origin}}/file/download/{{trlist.contractFileID}}">附件</a>
                                        <!--<a data-ksa="contract.associate" @click="associateShow(trlist.contractNumber,trlist.id,trlist.activityOperationID)">关联</a>-->
                                        <a data-ksa="contract.delete" @click="deletecontract(trlist.contractID)">删除</a>
                                    </td>
                                    <td>
                                        <a data-ksa="activity_income_cost_manage.search" v-link="{name:'activity-cost-management',params:{'activityCostNumber':trlist.contractNumber,'activityCostName':trlist.thirdPartyAccountName}}">{{trlist.unSettlementAmount/100 | currency ''}}</a>
                                    </td>
                                    <td>
                                        <a data-ksa="contract.invoice" @click="associateShow(trlist,'开票')">开票</a>
                                        <a data-ksa="contract.collection" @click="associateShow(trlist,'回款')">回款</a>
                                    </td>
                                    <td>
                                        <a data-ksa="contract.search" v-link="{name:'invoice-collection',params:
                                        {'invoiceCollectionId':trlist.contractID,
                                        'invoiceCollectionName':trlist.thirdPartyAccountName,
                                        'invoiceCollectionsubCompanyID':trlist.subCompanyID,
                                        'invoiceCollectionContract':trlist.contractNumber
                                         }}">{{trlist.billingAmount/100 | currency ''}}</a>
                                    </td>
                                    <td>
                                        <a data-ksa="contract.search" v-link="{name:'invoice-collection',params:
                                        {'invoiceCollectionId':trlist.contractID,
                                        'invoiceCollectionName':trlist.thirdPartyAccountName,
                                        'invoiceCollectionsubCompanyID':trlist.subCompanyID,
                                        'invoiceCollectionContract':trlist.contractNumber
                                         }}">{{trlist.collectionAmount/100 | currency ''}}</a>
                                    </td>
                                    <td>{{trlist.accountsReceivable/100 | currency ''}}</td>
                                    <td>
                                        <a data-ksa="activity_income_cost_manage.search" v-link="{name:'activity-cost-management',params:{'activityCostNumber':trlist.contractNumber,'activityCostName':trlist.thirdPartyAccountName}}">{{trlist.cost/100 | currency ''}}</a>
                                    </td>
                                    <td>{{trlist.paidAmount/100 | currency ''}}</td>
                                    <td>{{trlist.unpaidAmount/100 | currency ''}}</td>
                                    <td>{{trlist.suspensionTaxAmount/100 | currency ''}}</td>
                                    <td>{{trlist.invoiceAmount/100 | currency ''}}</td>
                                    <td>{{trlist.grossProfit/100 | currency ''}}</td>
                                    <td>{{trlist.grossMargin}} <span v-if="!!trlist.grossMargin">%</span></td>
                                    <td>
                                        <template v-if="!trlist.status"><a data-ksa="contract.settlementInfo" @click="settlementShow(trlist)">确认</a></template>
                                        <template v-else>已确认</template>
                                    </td>
                                    <td>{{trlist.remarks}}</td>
                                </tr>
                                <tr role="row">
                                    <td></td><td>合计：</td><td></td><td></td>
                                    <td>{{total.contractSettlementAmount/100 | currency ''}}</td><td></td>
                                    <td>{{total.unSettlementAmount/100 | currency ''}}</td><td></td>
                                    <td>{{total.billingAmount/100 | currency ''}}</td>
                                    <td>{{total.collectionAmount/100 | currency ''}}</td>
                                    <td>{{total.accountsReceivable/100 | currency ''}}</td>
                                    <td>{{total.cost/100 | currency ''}}</td>
                                    <td>{{total.paidAmount/100 | currency ''}}</td>
                                    <td>{{total.unpaidAmount/100 | currency ''}}</td>
                                    <td>{{total.suspensionTaxAmount/100 | currency ''}}</td>
                                    <td>{{total.invoiceAmount/100 | currency ''}}</td>
                                    <td>{{total.grossProfit/100 | currency ''}}</td>
                                    <td>{{total.grossMargin}} <span v-if="!!total.grossMargin">%</span></td><td></td><td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-bottom">
                        <!--<div class="left">-->
                            <!--<a class="icon-file-excel" style="line-height: 30px;" >Excel导出</a>-->
                        <!--</div>-->
                        <div class="left">
                            <a class="icon-file-excel" data-ksa="contract.export" style="line-height: 30px;" v-on:click="contractExcel">Excel导出</a>
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
            </div>

            <content-dialog
                    :show.sync="modal_settlement" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="'结算确认'" @kok="settlement" @kcancel="modal_settlement = false"
            >
                <div class="form-group">
                    <label class="control-label">分公司：</label>
                    <span>{{relist.subCompanyName}}</span>
                </div>
                <div class="form-group">
                    <label class="control-label">银行名称：</label>
                    <span>{{relist.thirdPartyAccountName}}</span>
                </div>
                <div class="form-group">
                    <label class="control-label">合同编号：</label>
                    <span>{{relist.contractNumber}}</span>
                </div>
                <div class="form-group">
                    <label class="control-label">合同结算金额：</label>
                    <span>{{relist.contractSettlementAmount/100 | currency ''}}</span>
                </div>
                <div class="form-group">
                    <label class="control-label">待结算金额：</label>
                    <span>{{relist.unSettlementAmount/100 | currency ''}}</span>
                </div>
                <div class="form-group">
                    <label class="control-label">已开票金额：</label>
                    <span>{{relist.invoiceAmount/100 | currency ''}}</span>
                </div>
                <div class="form-group">
                    <label class="control-label">已回款：</label>
                    <span>{{relist.collectionAmount/100 | currency ''}}</span>
                </div>
                <div class="form-group">
                    <label class="control-label">应收账款：</label>
                    <span>{{relist.accountsReceivable/100 | currency ''}}</span>
                </div>
                <div class="form-group">
                    <label style="position: relative;top: -95px;" class="control-label"><i>*</i>结算备注：</label>
                    <textarea style="display: inline-block;" rows="5" cols="5" class="form-control" v-model="relist.confirmRemarks" placeholder="50字以内"></textarea>
                </div>
            </content-dialog>

            <content-dialog
                    :show.sync="modal_associate" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="dialogTitle" @kok="associateTrue" @kcancel="modal_associate = false"
            >
                <div class="form-group">
                    <label class="control-label">分公司：</label>
                    <span>{{relist.subCompanyName}}</span>
                </div>
                <div class="form-group">
                    <label class="control-label">银行名称：</label>
                    <span>{{relist.thirdPartyAccountName}}</span>
                </div>
                <div class="form-group">
                    <label class="control-label">合同编号：</label>
                    <span>{{relist.contractNumber}}</span>
                </div>
                <div class="form-group" v-if="dialogTitle==='开票'">
                    <label class="control-label">待结算金额：</label>
                    <span>{{relist.unSettlementAmount/100 | currency ''}}</span>
                </div>
                <div class="form-group" v-if="dialogTitle==='开票'">
                    <label class="control-label">已开票金额：</label>
                    <span>{{relist.invoiceAmount/100 | currency ''}}</span>
                </div>
                <div class="form-group" v-if="dialogTitle==='回款'">
                    <label class="control-label">应收账款：</label>
                    <span>{{relist.accountsReceivable/100 | currency ''}}</span>
                </div>
                <div class="form-group">
                    <label class="control-label"><i>*</i>金   额：</label>
                    <input class="form-control" v-if="dialogTitle==='开票'" v-limitprice="relist.invoiceAmount2" v-model="relist.invoiceAmount2">
                    <input class="form-control" v-if="dialogTitle==='回款'" v-limitprice="relist.collectionAmount2" v-model="relist.collectionAmount2">
                </div>
                <div class="form-group">
                    <label style="position: relative;top: -95px;" class="control-label"><i>*</i>备   注：</label>
                    <textarea style="display: inline-block;" rows="5" cols="5" class="form-control" v-model="relist.contractMemo" placeholder="50字以内"></textarea>
                </div>
            </content-dialog>
            <content-dialog
                    :show.sync="deleteShow" :is-cancel="true" :type.sync="'infos'"
                    :title.sync="'确认删除？'" @kok="deleteTrue" @kcancel="deleteShow = false"
            >
            </content-dialog>
        </div>
    </index>
</template>
<style lang="sass" scoped>
    .heading{
        span{
            font-size:16px; display: inline-block; padding: 23px 20px 0;
        }
    }
    .kdialog{
        .form-group{
            label,input,textarea{
                display: inline-block
            }
            label{
                width: 23%;
                text-align: right;
                i{color:red}
            }
            .tlabel{
                position: relative;
                top:-40px
            }
            input,textarea{
                width: 75%;
            }
        }
    }
</style>
<script>
    import model from '../../ajax/ThreeParty/contract_model'
    export default{
        data(){
            this.model =model(this)
            return{
                pageall:1,
                deleteShow:false,
                origin:window.origin,
                modal_associate: false,
                modal_settlement: false,
                dialogTitle:'',
                companylists:[],
                defaultData:{
                    thirdPartyAccountID: '',
                    year:'',
                    month:'',
                    startDate:getNowMonth(),
                    thirdPartyAccountName:'',
                    contractNumber:'',
                    subCompanyID:'',
                    pageIndex: 1,
                    pageSize: 10
                },
                zdlists:[],
                total:{},
                contractNumbers:'',
                relist:{},
                activityOperationIDs:'',
                id:'',
                contractName:'',
                contractCity:'',
                contractCompanyName:'',
                activityOperationID:''
            }
        },
        methods:{
            // *** 请求账户列表数据
            getZlists(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                var startDate = data.startDate.split('-');
                var year = parseInt(startDate[0]);
                var month = parseInt(startDate[1]);
                data.year = year;
                data.month = month;
                this.model.contract_list(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                            (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                        });
                this.model.contract_sum(data)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('total', response.data.data) : null;
                    });
            },
            getClist(){
                // *** 请求公司数据
                this.$common_model.getcompany().then((response)=>{
                    // *** 判断请求是否成功如若成功则填充数据到模型
                    if(response.data.code==0){
                        this.$set('companylists', response.data.data)
                    }
                });
            },
            initList(){
                this.modal_associate=false;
                this.modal_settlement=false;
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            },
            associateShow(list,title){
                this.dialogTitle=title;
                this.relist=_.cloneDeep(list);
                let data={
                    id:list.contractID
                }
                this.model.contractInvoiceInfo(data).then((res)=>{
                    if(res.data.code===0){
                        this.relist.invoiceAmount=res.data.data.invoiceAmount;
                        this.relist.accountsReceivable=res.data.data.accountsReceivable;
                        this.relist.collectionAmount=res.data.data.collectionAmount;
                        this.relist.unSettlementAmount=res.data.data.unSettlementAmount;
                        this.relist.invoiceAmount2='';
                        this.relist.collectionAmount2='';
                        this.modal_associate=true;
                    }
                })
            },
            settlementShow(list){
                this.relist=_.cloneDeep(list);
                this.modal_settlement=true;
            },
            settlement(){
                let data={
                    id:this.relist.contractID,
                    thirdPartyAccountID:this.relist.thirdPartyAccountID,
                    confirmRemarks:this.relist.confirmRemarks
                }
                this.model.contractSettlement(data)
                    .then((response)=>{
                        if(response.data.code == 0){
                            dialogs('success',response.data.message);
                            this.initList();
                        }
                    })
            }
            ,contractExcel() {
                if(!this.total>0)return;
                //初始化
                this.defaultData.mid=JSON.parse(sessionStorage.getItem('userData')).authToken;
                window.open(window.origin+this.$API.contractExport+ $.param(this.defaultData));
            },
            associateTrue(){
                if(this.dialogTitle==='开票'){
                    if(!this.relist.invoiceAmount2 || !this.relist.contractMemo){
                        dialogs('info','金额与备注为必填项');
                        return;
                    }
                    let data={
                        id:this.relist.contractID,
                        invoiceAmount2:accMul(this.relist.invoiceAmount2,100),
                        thirdPartyAccountID:this.relist.thirdPartyAccountID,
                        contractMemo:this.relist.contractMemo
                    }
                    this.model.contract_invoice(data)
                        .then((response)=>{
                            if(response.data.code == 0){
                                dialogs('success',response.data.message);
                                this.initList();
                            }
                        })
                }else{
                    if(!this.relist.collectionAmount2 || !this.relist.contractMemo){
                        dialogs('info','金额与备注为必填项');
                        return;
                    }
                    let data={
                        id:this.relist.contractID,
                        collectionAmount2:accMul(this.relist.collectionAmount2,100),
                        thirdPartyAccountID:this.relist.thirdPartyAccountID,
                        contractMemo:this.relist.contractMemo
                    }
                    this.model.contract_collection(data)
                        .then((response)=>{
                            if(response.data.code == 0){
                                dialogs('success',response.data.message);
                                this.initList();
                            }
                        })
                }
            },
            deletecontract(_id){
                this.id=_id;
                this.deleteShow=true;
            },
            deleteTrue(){
                this.model.contract_delete(this.id)
                    .then((response)=>{
                        if(response.data.code == 0){
                            dialogs('success',response.data.message);
                            this.deleteShow=false;
                            this.initList();
                        }
                    })
            }
        },
        ready() {
            var vm=this;
            if(this.$route.params.contractName!==':contractName'){
                this.defaultData.thirdPartyAccountName=this.$route.params.contractName;
                this.defaultData.subCompanyID=this.$route.params.contractCompanyId;
            }
            this.getClist();
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.initList();
        },
        watch:{
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.initList();
            }
        }
    }
</script>