<template>
    <index :title="'调账明细'"
           :ptitle="'交易管理'"
           :p2title="'调账管理'"
           :hname="'adjust-trade-detailpre'"
           :h2name="'adjust-trade-detailpre'"
           :isshow="'isshow'">
        <div class="content adjust-trade-detailpre" slot="content">
            <div class="panel panel-flat">
                <div v-cloak v-show="tradeList.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>交易ID</th>
                                <th>交易流水号</th>
                                <th>分公司</th>
                                <th>城市</th>
                                <th>商户号</th>
                                <th>商户简称</th>
                                <th>门店号</th>
                                <th>门店名称</th>
                                <th>商盟ID</th>
                                <th>商盟商户名称</th>
                                <th>额度抵扣</th>
                                <th>本金抵扣</th>
                                <th>银行应补</th>
                                <th>商户应补</th>
                                <th>补贴代扣</th>
                                <th>商户实补</th>
                                <th>暂扣税金</th>
                                <th>扣收金额</th>
                                <th>导流佣金</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(index,trlist) in tradeList" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.tradeDetailID}}</td>
                                <td>{{trlist.serialNumber}}</td>
                                <td>{{trlist.subCompanyName}}</td>
                                <td>{{trlist.cityName}}</td>
                                <td>{{trlist.backendMerchantCode}}</td>
                                <td>{{trlist.backendMerchantName}}</td>
                                <td>{{trlist.backendStoreCode}}</td>
                                <td>{{trlist.backendStoreName}}</td>
                                <td>{{trlist.merchantOperationID}}</td>
                                <td>
                                    <span v-if="!trlist.backendStoreCode">{{trlist.merchantName}}</span>
                                </td>
                                <td>{{trlist.limitDeduct/100 | currency ''}}</td>
                                <td>{{trlist.principalDeduct/100 | currency ''}}</td>
                                <td>{{trlist.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{trlist.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{trlist.subsidyWithhold/100 | currency ''}}</td>
                                <td>{{trlist.merchantSubsidyActual/100 | currency ''}}</td>
                                <td>{{trlist.suspensionTax/100 | currency ''}}</td>
                                <td>{{trlist.collectionAmount/100 | currency ''}}</td>
                                <td>{{trlist.commission33211/100 | currency ''}}</td>
                            </tr>
                            <tr>
                                <td>合计：</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{{nums.limitDeduct/100 | currency ''}}</td>
                                <td>{{nums.principalDeduct/100 | currency ''}}</td>
                                <td>{{nums.thirdPartyReceivable/100 | currency ''}}</td>
                                <td>{{nums.merchantSubsidyShould/100 | currency ''}}</td>
                                <td>{{nums.subsidyWithhold/100 | currency ''}}</td>
                                <td>{{nums.merchantSubsidyActual/100 | currency ''}}</td>
                                <td>{{nums.suspensionTax/100 | currency ''}}</td>
                                <td>{{nums.collectionAmount/100 | currency ''}}</td>
                                <td>{{nums.commission33211/100 | currency ''}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="no-list" v-else>
                    未查询到数据！
                </div>
            </div>
        </div>
    </index>
</template>

<script>
import model from '../../ajax/Transaction/adjust_tradeDetailPre_model'
export default{
    data(){
        this.model=model(this);
            return{
                id:'',
                tradeList:[],
                nums:{},
            }
        },
        methods:{
            //获取交易记录
             getTradeList(){
                 this.model.adjustTradeDetailPre_detailtotal(this.id)
                         .then((response)=>{
                             if(response.data.code==0){
                                 this.$set('nums', response.data.data)
                             }
                         });
                 this.model.adjustTradeDetailPre_detail(this.id)
                    .then((response)=>{
                         if(response.data.code==0){
                            this.$set('tradeList', response.data.data)
                        }
                    });
            },
        },
        ready() {
            (this.$route.params.adjustTradeDetailPreId!=':adjustTradeDetailPreId')?this.id=this.$route.params.adjustTradeDetailPreId:null;
            this.getTradeList();
        },
       watch:{
       }
    }
</script>