<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'激活收入成本分配表'"
           :ptitle="'报表管理'"
           :hname="'financial-index-total'"
           :isshow="'isshow'">
        <div class="content allopatry-distribution" slot="content">
           	<div class="panel panel-flat">
           	 	<ul class="tab-bor">
                    <li data-ksa="target_total"><a v-link="{name:'financial-index-total'}">财务指标分析表（总）</a></li>
                    <li data-ksa="target_branch"><a v-link="{name:'financial-index-branch'}">财务指标分析表（分）</a></li>
                    <li data-ksa="ranking"><a v-link="{name:'branch-financial-indicators'}">财务指标排行</a></li>
                    <li data-ksa="cost"><a v-link="{name:'expense-management'}">费用管理</a></li>
                    <li data-ksa="cost"><a v-link="{name:'departmental-expense-detail'}">部门费用明细</a></li>
                    <li data-ksa="target_manage"><a v-link="{name:'index-management'}">指标管理</a></li>
                    <li data-ksa="activation_detail" class="active"><a>激活收入成本分配表</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left"></div>
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <span>收入成本确认分公司</span>
                            <select class="form-control" v-model="defaultData.subCompanyId">
                                <option value="">收入成本确认分公司</option>
                                <option :value="n.subCompanyID" v-for="(index,n) in companylists" v-text="n.name"></option>
                            </select>
                            <select class="form-control" v-model="defaultData.businessTypeId">
                                <option value="">业务类型</option>
                                <option :value="n.id" v-for="(index,n) in commonbusinessList" v-text="n.name"></option>
                            </select>
                            <select class="form-control" v-model="defaultData.snType">
                                <option value="">sn归属合伙人</option>
                                <option :value="n.id" v-for="(index,n) in snPartnerList" v-text="n.name"></option>
                            </select>
                            <getmonth :value.sync="defaultData.dates"></getmonth>
                        </form>
                    </div>
                    <div class="heading-middle">
                            <a class="btn btn-info add-top" data-ksa="activation_detail.search"  @click="initList()">查询</a>
                    </div>
                </div>
                <div v-show="listData.length>0" class="dataTables_wrapper">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>序号</th>
                                <th>收入成本确认分公司</th>
                                <th>业务类型</th>
                                <th>SN归属合伙人</th>
                                <th>录入 </th>
                                <th>预收账款</th>
                                <th>采购数量</th>
                                <th>激活数量</th>
                                <th>收入</th>
                                <th>成本</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in listData" v-bind:class="{'odd':(index%2==0)}">
                                <!-- <tr role="row"> -->
                                    <td>{{index+1}}</td><!-- {{序号}} -->
                                    <td>{{trlist.subCompanyName}}</td><!-- {{收入成本确认分公司}} -->
                                    <td>{{trlist.businessName }}</td><!-- {{业务类型}} -->
                                    <td>{{trlist.snTypeName }}</td><!-- {{SN归属合伙人}} -->
                                    <td>
                                        <!-- <a v-link="{name:'partner-order'}" @click="typeInShow('partner')">合伙人订单</a> -->
                                        <a @click="typeInShow('partner',trlist)" data-ksa="activation_total.update">合伙人订单</a>
                                        <!-- <a v-link="{name:'shipment-quantity'}" @click="typeInShow('shipment')">发货数量</a> -->
                                        <!--<a @click="typeInShow('shipment')">发货数量</a>-->
                                    </td>
                                    <td>{{trlist.preIncome/100 | currency '' }}</td><!-- {{预收账款}} -->
                                    <td>{{trlist.purchaseNumber }}</td><!-- {{采购数量}} -->
                                    <td><a v-link="{name:'allopatry-distribution-detail'}"  data-ksa="common.search">{{trlist.number}}</a></td><!-- 激活数量 -->
                                    <td>{{trlist.income/100 | currency '' }}</td><!-- {{收入}} -->
                                    <td>{{trlist.cost/100 | currency ''}}</td><!-- {{成本}} -->
                                </tr>
                                <tr role="row">
                                    <td>合计：</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td> </td>
                                    <td>{{total.preIncome/100 | currency '' }}</td>
                                    <td>{{total.purchaseNumber }}</td>
                                    <td>{{total.number}}</td>
                                    <td>{{total.income/100 | currency '' }}</td>
                                    <td>{{total.cost/100 | currency ''}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-bottom">
                        <!-- <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" @click="">Excel导出</a>
                        </div> -->
                        <div class="right" v-if="listData.length>0">
                        <!-- v-if="zdlists.length>0"  -->
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
                        :show.sync="type_in" :is-button="true" :is-cancel="true" :type.sync="'infos'"
                        :title.sync="typeTitle" @kok="saveChange" @kcancel="type_in = false"
                        >
                    <validator name="vali2" v-if="typeTitle=='合伙人订单'">
                        <div class="form-group">
                            <label>SN归属合伙人</label>
                            <span>{{partnerOrder.snTypeName}}</span>
                        </div>
                        <div class="form-group">
                            <label><i>*</i>预收账款</label>
                            <input type="text" style="width: 69%;" v-limitprice="partnerOrder.preIncome" class="form-control" v-validate:val2="['required']" v-model="partnerOrder.preIncome" placeholder=""><span>元</span>
                        </div>
                        <div class="form-group">
                            <label><i>*</i>采购数量</label>
                            <input type="text" style="width: 69%;" v-limitids="partnerOrder.purchaseNumber" class="form-control" v-validate:val2="['required']" v-model="partnerOrder.purchaseNumber" placeholder=""><span>台</span>
                        </div>
                    </validator>
                    <validator name="vali2" v-if="typeTitle=='发货数量'">
                        <div class="form-group">
                            <label>SN归属合伙人</label>
                            <span>汉付信通</span>
                        </div>
                        <div class="form-group">
                            <label>采购数量</label>
                            <input type="text" style="width: 69%;" class="form-control" v-validate:val2="['required']" v-model="quantityNum" placeholder=""><span>台</span>
                        </div>
                    </validator>
                </content-dialog>
            </div>
        </div>
	</index>
</template>
<script>
    import model from '../../ajax/ReportForm/report_form_model.js'
	export default{
		data(){
			this.model = model(this);
			return{
                defaultData:{
                    subCompanyId:'',
                    businessTypeId:'',
                    snType:'',
                    year:'',
                    month:'',
                    pageIndex: 1,
                    pageSize: 10,
                    dates:yestodayMonth(),
                },
                partnerOrder:{
                    dataId:'',
                    preIncome:'',
                    purchaseNumber:'',
                },
                quantityNum:'',
                saveTypeIn:{},
                type_in:false,
                typeTitle:'',
                pageall:1,
                companylists:[],
                commonbusinessList:[],
                snPartnerList:[],
                listData:{},
                total:{
                    preIncome:0,
                    purchaseNumber:0,
                    number:0,
                    income:0,
                    cost:0
                }
			}
		},
		methods:{
            setTime(){
                var date =  this.defaultData.dates.split('-');
                var year = parseInt(date[0]);
                var month = parseInt(date[1]);
                this.defaultData.year = year;
                this.defaultData.month = month;
            },
            typeInShow(title,{id,snTypeName}){
                this.type_in=true;
                if(title!='partner'){
                    this.typeTitle='发货数量';
                    this.quantityNum='';
                }else{
                    this.typeTitle='合伙人订单';
                    this.partnerOrder={dataId:'',preIncome:'',purchaseNumber:'',},
                    this.partnerOrder.dataId=id;
                };
                this.partnerOrder.snTypeName=snTypeName;
            },
            saveChange(){
                if(!this.partnerOrder.preIncome&&!this.partnerOrder.purchaseNumber){
                    dialogs('info', '金额与数量都为必填项！');
                    return;
                }
                this.model.snInfoTypeIn(this.partnerOrder).then((res)=>{
                    if(res.data.code==0){
                        dialogs('success','录入成功！');
                        this.type_in=false;
                        this.partnerOrder={};
                        this.initList();
                    }
                })
            },
            initList(){
                this.setTime();
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            },
            getClist(){
                this.$common_model.getcompany()
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('companylists', response.data.data)
                        }
                    });
                this.model.getCommonActivation()
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('commonbusinessList', response.data.data)
                        }
                    });
                this.model.snPartnerList()
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('snPartnerList', response.data.data)
                        }
                    });
            },
            getZlists(data){
                this.model.getAllopatryListCount(data).then((res)=>{
                    if(res.data.code==0){
                        this.$set('listData',res.data.data);
                        this.$set('pageall',res.data.total);
                    }
                });
                this.model.getAllopatryListCountTotal(data)
                    .then((response)=>{
                        (response.data.code==0)?this.$set('total',response.data.data):null;
                    })
            },
        },
		ready(){
            this.getClist();
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.defaultData=back_json.fetchArray(this.$route.path):null;
            this.initList();
		},
        watch:{
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.initList();
            }
        }
	}
</script>