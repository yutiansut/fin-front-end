/**
 * @description 税率管理接口
 * @author 于凯乐
 * @date 2016年10月9日16:06:02
 */

function model(_this){
    return {
        /**
         * @description 查询税率管理数据
         * @params {data}
         * @returns {*}
         * */

        taxRate_list(data){
            return _this.$http.get(_this.$API.taxRate_list+ $.param(data))
        },

        /**
         * @description 查询税率管理数据详细信息
         * @params {data}
         * @returns {*}
         * */
        editDetail(data){
            return _this.$http.get(_this.$API.edit_detail + $.param(data))
        },

        /**
         * @description 根据年月查询税率信息
         * @params {data}
         * @returns {*}
         * */
        editInfo(data){
            return _this.$http.get(_this.$API.edit_info+ $.param(data))
        },
        /**
         * @description 根据年月保存税率信息
         * @params {data}
         * @returns {*}
         * */
        editSave(data){
            return _this.$http.post(_this.$API.edit_save, data)
        }

    }
}
module.exports=model;