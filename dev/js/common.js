var check_upload=((names)=>{
    var FileName=new String(names);
    var extension=new String (FileName.substring(FileName.lastIndexOf(".")+1,FileName.length));
    if(extension=='rar'||extension=='zip'){
        return true;
    }
    else{
        swal({
            title: "请上传正确的文件格式(rar,zip)！",
            type:"error",
            confirmButtonColor: "#EF5350"
        });
        return false;
    }
})
var dialog=((types,mes)=>{
    switch (types){
        case 'error':
            swal({
                title: mes,
                type: "error",
                confirmButtonColor:"#EF5350"
            })
            break;
        case 'success':
            swal({
                title: mes,
                type:"success",
                confirmButtonColor:"#4CAF50"
            })
            break;
        case 'info':
            swal({
                title: mes,
                type:"info",
                confirmButtonColor:"#00BCD4"
            })
            break;
        default:
            swal({
                title: '保存成功',
                type:"success",
                confirmButtonColor:"#4CAF50"
            })
            break;
    }
})

var getTwo=((num)=>{
    if(num.toString().length>=2) return num;
    var str="";
    for(var i=num.toString().length;i<2;i++)
        str +="0";
    return str + num.toString();
})
var getLastDay=(( year, month)=>{
    var  day = new Date(year,month,0);
    var lastdate =day.getDate();//获取当月最后一天日期
    return lastdate;
})
var init_date=((type)=>{
    let d=new Date()
    let day=d.getDate()
    let month=d.getMonth()+1;
    let year=d.getFullYear()
    let startT;
    switch (type){
        case '0':
            day=day-1;
            var nmonth=month;
            var nday=day;
            if(nday==0){
                day=nday=getLastDay(year,month-1)
                month=nmonth=month-1
            }
            startT=year + "-" + getTwo(nmonth) + "-" + getTwo(nday);
            break;
        case '1':
            var nmonth=month;
            var nday=day-7;
            day=day-1;
            if(nday==-6){
                nday=getLastDay(year,month-1)-6
                nmonth=month-1
            }else if(nday==-5){
                nday=getLastDay(year,month-1)-5
                nmonth=month-1
            }else if(nday==-4){
                nday=getLastDay(year,month-1)-4
                nmonth=month-1
            }else if(nday==-3){
                nday=getLastDay(year,month-1)-3
                nmonth=month-1
            }else if(nday==-2){
                nday=getLastDay(year,month-1)-2
                nmonth=month-1
            }else if(nday==-1){
                nday=getLastDay(year,month-1)-1
                nmonth=month-1
            }else if(nday==0){
                nday=1
                nmonth=month
            }
            startT=year + "-" + getTwo(nmonth) + "-" + getTwo(nday);
            break;
        case '2':
            var nmonth=month-1;
            var nyear=year;
            if(nmonth==0){
                nmonth=12;
                nyear=year-1;
            }
            startT=nyear + "-" + getTwo(nmonth) + "-" + getTwo(day);
            break;
        case '3':
            var nmonth,nyear;
            if(month-3==0){
                nmonth=12;
                nyear=year-1;
            }else if(month-3==-1){
                nmonth=11
                nyear=year-1;
            }else if(month-3==-2){
                nmonth=10
                nyear=year-1;
            }else{
                nmonth=month-3;
                nyear=year;
            }
            startT=nyear + "-" + getTwo(nmonth) + "-" + getTwo(day);
            break;
        case '4':
            startT=year + "-" + getTwo(month) + "-" + getTwo(day);
            break;
    }
    let endT=year + "-" + getTwo(month) + "-" + getTwo(day);
    return [startT,endT];
})
module.exports = {
    check_upload:check_upload,
    dialogs:dialog,
    geturl:geturl,
    init_date:init_date
}