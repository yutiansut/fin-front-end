/**
 * @description 合同管理列表接口
 * @author 赵俊涵
 * @date 2016.11.29
 */
function model(_this){
    return {
        /**
         * @description 查询合同数据
         * @params {data}
         * @returns {*}
         * */
        contract_list(data){
            return _this.$http.get(_this.$API.contract_list+ $.param(data))
        },
        /**
         * @description 添加合同
         * @params {data}
         * @returns {*}
         * */
        contract_add(data){
            return _this.$http.post(_this.$API.contract_add,data)
        },
        /**
         * @description 关联合同
         * @params {data}
         * @returns {*}
         * */
        contract_invoice(data){
            return _this.$http.post(_this.$API.contract_invoice,data)
        },
        /**
         * @description 关联合同
         * @params {data}
         * @returns {*}
         * */
        contract_collection(data){
            return _this.$http.post(_this.$API.contract_collection,data)
        },
    }
}
module.exports=model;