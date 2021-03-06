/**
 * @description 交易白名单接口
 * @author 赵俊涵
 * @date 2016.07.13
 */
function model(_this) {
    return {
        /**
         * @description 查询白名单数据列表
         * @param data
         * @returns {*}
         */
        whitedetail (data) {
            return _this.$http.get(_this.$API.whitedetail + $.param(data))
        },
        /**
         * @description 保存白名单
         * @param data
         * @returns {*}
         */
        whitesave(data){
            return _this.$http.post(_this.$API.whitesave,data);
        },
        /**
         * @description 失效白名单
         * @param data
         * @returns {*}
         */
        whiteexpired(_id){
            return _this.$http.post(_this.$API.whiteexpired+ _id);
        },
        /**
         * @description 查询活动数据
         * @param data
         * @returns {*}
         */
        queryA(data){
            return _this.$http.get(_this.$API.queryA+ $.param(data))
        },
        /**
         * @description 查询商户数据
         * @param data
         * @returns {*}
         */
        queryC(data){
            return _this.$http.get(_this.$API.queryC+ $.param(data))
        },
        abnormalWhiteexcel(data){
            return _this.$http.get(_this.$API.abnormalWhiteexcel+ $.param(data))
        }
    }
}
module.exports = model
