<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <index :title="'指标管理'"
           :ptitle="'报表管理'"
           :hname="'financial-index-total'"
           :isshow="'isshow'">
        <div class="content index-management" slot="content">
           	<div class="panel panel-flat">
           	 	<ul class="tab-bor">
                    <li data-ksa="target_total"><a v-link="{name:'financial-index-total'}">财务指标分析表（总）</a></li>
                    <li data-ksa="target_branch"><a v-link="{name:'financial-index-branch'}">财务指标分析表（分）</a></li>
                    <li data-ksa="ranking"><a v-link="{name:'branch-financial-indicators'}">财务指标排行</a></li>
                    <li data-ksa="cost"><a v-link="{name:'expense-management'}">费用管理</a></li>
                    <li data-ksa="cost"><a v-link="{name:'departmental-expense-detail'}">部门费用明细</a></li>
                    <li data-ksa="target_manage" class="active"><a>指标管理</a></li>
                    <li data-ksa="activation_detail"><a v-link="{name:'allopatry-distribution-total'}">激活收入成本分配表</a></li>
                </ul>
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add"  data-ksa="target_manage.update" @click="indexIn()">指标录入</a>
                    </div>
                </div>
                <div v-show="listData.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>序号</th>
                                <th>分公司</th>
                                <th>年份</th>
                                <th>年收入目标</th>
                                <th>年净利润目标 </th>
                                <th>1月（元）</th>
                                <th>2月（元）</th>
                                <th>3月（元）</th>
                                <th>4月（元）</th>
                                <th>5月（元）</th>
                                <th>6月（元）</th>
                                <th>7月（元）</th>
                                <th>8月（元）</th>
                                <th>9月（元）</th>
                                <th>10月（元）</th>
                                <th>11月（元）</th>
                                <th>12月（元）</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in listData" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{index+1}}</td>
                                    <td>{{trlist.subCompanyName}}</td><!-- {{分公司}} -->
                                    <td>{{trlist.year}}</td><!-- {{年份}} -->
                                    <td>{{trlist.yearTarget/100| currency ''}}</td><!-- {{年收入目标}} -->
                                    <td>{{trlist.yearProfitTarget/100| currency ''}}</td><!-- {{年净利润目标}} -->
                                    <td>{{trlist.january/100| currency ''}}</td><!-- {{1月（元）}} -->
                                    <td>{{trlist.february/100| currency ''}}</td><!-- {{2月（元）}} -->
                                    <td>{{trlist.march/100| currency ''}}</td><!-- {{3月（元）}} -->
                                    <td>{{trlist.april/100| currency ''}}</td><!-- {{4月（元）}} -->
                                    <td>{{trlist.may/100| currency ''}}</td><!-- {{5月（元）}} -->
                                    <td>{{trlist.june/100| currency ''}}</td><!-- {{6月（元）}} -->
                                    <td>{{trlist.july/100| currency ''}}</td><!-- {{7月（元）}} -->
                                    <td>{{trlist.august/100| currency ''}}</td><!-- {{8月（元）}} -->
                                    <td>{{trlist.september/100| currency ''}}</td><!-- {{9月（元）}} -->
                                    <td>{{trlist.october/100| currency ''}}</td><!-- {{10月（元）}} -->
                                    <td>{{trlist.november/100| currency ''}}</td><!-- {{11月（元）}} -->
                                    <td>{{trlist.december/100| currency ''}}</td><!-- {{12月（元）}} -->
                                </tr>
                            </tbody>
                            <tr>
                                <td colspan="3">合计：</td>
                                <td>{{total.yearTarget/100| currency ''}}</td><!-- {{年收入目标}} -->
                                <td>{{total.yearProfitTarget/100| currency ''}}</td><!-- {{年净利润目标}} -->
                                <td>{{total.january/100| currency ''}}</td><!-- {{1月（元）}} -->
                                <td>{{total.february/100| currency ''}}</td><!-- {{2月（元）}} -->
                                <td>{{total.march/100| currency ''}}</td><!-- {{3月（元）}} -->
                                <td>{{total.april/100| currency ''}}</td><!-- {{4月（元）}} -->
                                <td>{{total.may/100| currency ''}}</td><!-- {{5月（元）}} -->
                                <td>{{total.june/100| currency ''}}</td><!-- {{6月（元）}} -->
                                <td>{{total.july/100| currency ''}}</td><!-- {{7月（元）}} -->
                                <td>{{total.august/100| currency ''}}</td><!-- {{8月（元）}} -->
                                <td>{{total.september/100| currency ''}}</td><!-- {{9月（元）}} -->
                                <td>{{total.october/100| currency ''}}</td><!-- {{10月（元）}} -->
                                <td>{{total.november/100| currency ''}}</td><!-- {{11月（元）}} -->
                                <td>{{total.december/100| currency ''}}</td><!-- {{12月（元）}} -->
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="no-list" v-else>
                    未找到数据
                </div>
                <content-dialog
                        :show.sync="type_in" :is-button="true" :is-cancle="true" :type.sync="'infos'"
                        :title.sync="'指标录入'" @kok="saveChange" @kcancel="this.type_in=false"
                        >
                    <validator name="vali">
                        <div class="form-group">
                            <label><i>*</i>分公司</label>
                            <select class="form-control" v-model="typeIn.subCompanyId" @change="saveCompanyName()">
                                <option value="">请选择分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label><i>*</i>年份</label>
                            <span>{{yearShow}}年</span>
                        </div>
                        <div class="form-group">
                            <label><i>*</i>年收入目标</label>
                            <input type="text" class="form-control" v-model="typeIn.yearTarget">
                        </div>
                        <div class="form-group" v-for="(index,value) in timeList">
                            <label><i>*</i>{{yearShow}}年{{$index+1}}月</label>
                            <input type="text" class="form-control" v-model="typeIn[value]" placeholder="">
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
                type_in:false,
                checkForm:{
                    subCompanyID:'',
                    date:yestodayMonth(),
                    year:'',
                    month:'',
                },
                dateS:'3',
                typeIn:{
                    yearTarget:'',
                    subCompanyId:'',
                    subCompanyName:'',
                    january:'',
                    february:'',
                    march:'',
                    april:'',
                    may:'',
                    june:'',
                    july:'',
                    august:'',
                    september:'',
                    october:'',
                    november:'',
                    december:'',
                    year:'',
                },
                total:{
                    yearTarget:0,
                    yearProfitTarget:0,
                    january:0,
                    february:0,
                    march:0,
                    april:0,
                    may:0,
                    june:0,
                    july:0,
                    august:0,
                    september:0,
                    october:0,
                    november:0,
                    december:0
                },
                companylists:[],
                listData:{},
                // timeList:['1','2','3','4','5','6','7','8','9','10','11','12'],
                timeList:['january','february','march','april','may','june','july','august','september','october','november','december'],
                yearShow:'',
			}
		},
		methods:{
            setTime(){
                var date =  this.checkForm.date.split('-');
                var year = parseInt(date[0]);
                var month = parseInt(date[1]);
                this.checkForm.year = year;
                this.checkForm.month = month;
            },
            indexIn(){
                this.type_in=true;
                this.typeIn={
                    yearTarget:'',
                    subCompanyId:'',
                    subCompanyName:'',
                    year:'',
                    january:'',
                    february:'',
                    march:'',
                    april:'',
                    may:'',
                    june:'',
                    july:'',
                    august:'',
                    september:'',
                    october:'',
                    november:'',
                    december:''
                };
                this.typeIn.year=this.checkForm.year;
            },
            verifyField(){
                let errMapper={
                    yearTarget:'年收入',
                    subCompanyName:'',
                    subCompanyId:'分公司名称',
                    year:'年份',
                    january:'1月净利润目标',
                    february:'2月净利润目标',
                    march:'3月净利润目标',
                    april:'4月净利润目标',
                    may:'5月净利润目标',
                    june:'6月净利润目标',
                    july:'7月净利润目标',
                    august:'8月净利润目标',
                    september:'9月净利润目标',
                    october:'10月净利润目标',
                    november:'11月净利润目标',
                    december:'12月净利润目标',
                };
                // 检测是否存在未填写项
                for (let k in this.typeIn) {
                    let m = this.typeIn[k]
                    let err = errMapper[k] && new Error(`${errMapper[k]}为必填项!`)

                    /*global _*/
                    if ((!m && err) || (_.isArray(m) && !m.length && err)) {
                        throw err
                    }
                }
            },
            errHandle(err){
                dialogs('info', err)
            },
            saveCompanyName(){
                let data={"subCompanyID":this.typeIn.subCompanyId,"year":this.typeIn.year}
                this.model.financeInfo(data)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0 && response.data.data.january){
                            this.$set('typeIn', response.data.data)
                        }else{
                            this.typeIn.yearTarget='';
                            this.typeIn.january='';
                            this.typeIn.february='';
                            this.typeIn.march='';
                            this.typeIn.april='';
                            this.typeIn.may='';
                            this.typeIn.june='';
                            this.typeIn.july='';
                            this.typeIn.august='';
                            this.typeIn.september='';
                            this.typeIn.october='';
                            this.typeIn.november='';
                            this.typeIn.december='';
                        }
                    });
                _.map(this.companylists,(val)=>{
                    if(val.subCompanyID==this.typeIn.subCompanyId){
                        this.typeIn.subCompanyName=val.name;
                    }
                })

            },
            saveChange(){
                if (true) {
                    try {
                        this.verifyField()
                    } catch (e) {
                        this.errHandle(e.message)
                        return
                    }
                }
                this.saveCompanyName();
                this.model.getIndexAdd(this.typeIn).then((res)=>{
                    if(res.data.code==0){
                        dialogs('success','保存成功！');
                        this.initList();
                        this.type_in=false;
                    }
                });
            },
            initList(){
                this.setTime();
                back_json.saveArray(this.$route.path,this.checkForm);
                this.getZlists(this.checkForm);
            },
            getClist(){
                this.$common_model.getcompany()
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        if(response.data.code==0){
                            this.$set('companylists', response.data.data)
                        }
                    });
            },
            getZlists(data){
                this.model.getIndexManagement(data).then((res)=>{
                    if(res.data.code==0){
                        this.$set('listData',res.data.data);
                        // this.yearShow=res.data.data.year;
                        _.map(this.listData,(val)=>{
                            Object.keys(val).forEach((k) => {
                                this.total[k]+= parseFloat(val[k]);
                                }
                            );
                        })
                        this.yearShow=this.checkForm.year
                    }
                })
            },
        },
		ready(){
            this.getClist();
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.checkForm=back_json.fetchArray(this.$route.path):null;
            this.initList();
		}
	}
</script>