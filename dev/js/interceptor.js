/**
 * 拦截器
 * @author zdzDesigner
 */
import config from './config'
import Cookie from './utils/Cookie'
import md5 from 'blueimp-md5'
export default function install(Vue,router_proto) {
	var conut;
	window.origin && (Vue.http.options.root = window.origin );
	Vue.http.options.emulateJSON = false;
	Vue.http.options.xhr = { withCredentials: true };
	Vue.http.interceptors.push({
		request (request) {
			if(request.url.indexOf('subCompany/list')<=0&&request.url.indexOf('city/list')<=0&&request.url.indexOf('/total')<=0&&request.url.indexOf('/sum')<=0){
				Message.show('loading','loading...');
				sessionStorage.setItem('isHttpin',1);
				if(request.url.indexOf('pageIndex=')>0&&request.url.indexOf('pageSize=')>0){
					document.querySelector('.no-list').style.display='none';
				}
			}
			conut=0;
			let _appkey = 'p0obc8spr3ou8h35y1goejfod4ndngom83xzl90v'
			let _secretkey = 'vc9iwg6550dzznfxrwv8rupl0z8prqmxir6wogr4'
			let _now=Date.now();
			let token=(!!sessionStorage.getItem('userData')) ? JSON.parse(sessionStorage.getItem('userData')).authToken : md5(_appkey+_now+_secretkey);
			request.headers['X-AUTH-TIME']=_now;
			request.headers['X-AUTH-APPKEY']=_appkey;
			request.headers['X-AUTH-TOKEN']=token;
			config.mock_get(Vue,request)
			return request;
		},
		response (response) {
			sessionStorage.setItem('isHttpin',0);
			if(response.request.url.indexOf('subCompany/list')<=0&&response.request.url.indexOf('city/list')<=0&&response.request.url.indexOf('/total')<=0&&response.request.url.indexOf('/sum')<=0){
				Message.hide();
				if((response.data.data==''||response.data.data==null||typeof response.data.data=='undefined')&&response.request.url.indexOf('pageIndex=')>0&&response.request.url.indexOf('pageSize=')>0){
					document.querySelector('.no-list').style.display='block';
				}
			}
			// *** 拦截session过期
			if(response.data.code === 50000){
			  setTimeout(()=>{
				  router_proto.replace({name:'login'});
			  })
			}
			else if(response.status===403){
				dialogs('error',response.data.message);
				conut++;
			}
			else if(response.status===504){
				dialogs('error','网络拥堵，请求超时，请稍后再试！');
				conut++;
			}
			else if(!response.ok&&conut===0){
				dialogs('error','系统错误,请及时联系开发人员解决！');
				conut++;
			}
			else if(response.data.code !== 0&&response.data.code !== 10000){
				dialogs('error',response.data.message);
				conut++;
			}
			return response;
		}
	});

}