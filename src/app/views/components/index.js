import loop from './loop'
import index from './otherComponent/index.vue'
import page from './otherComponent/page.vue'
import loading from './loading/LoadingMask.vue'
// import datepicker from './otherComponent/datepicker.vue'
import getmonth from './otherComponent/picker.vue'
import ContentDialog from './otherComponent/ContentDialog.vue'
import KsMask from 'KS/components/KsMask/index.js'
import KsButton from 'KS/components/KsButton/index.1.0.0.js'
import KsIcon from 'KS/components/KsIcon/index.1.0.0.js'
import KsDater from 'KS/components/KsDater/index.1.0.0.js'
import datepicker from 'KS/components/KsDatePicker/index.1.0.0.js'
var components = {
    loop,
    index,
    datepicker,
    getmonth,
    page,
    ContentDialog,
    KsButton,
    KsDater,
    loading,
    KsIcon
};

// 插件
var Plugins = {
    KsMask
};

const install = function(Vue) {
  if (install.installed) return;
  Object.keys(components).reduce((arr, k) => {
    let temp;

    if(components[k].template) {
      temp = { name: k, val: components[k] };
    } else {
      temp = Object.keys(components[k]).map((key) => {
        return { name: key, val: components[k][key] }
      });
    }

    return arr.concat(temp);
  }, []).forEach((item) => {
    Vue.component(item.name, item.val)
  });

  // install plugins.
  Object.keys(Plugins).forEach(k => {
    if (k === 'VERSION') return;
    Plugins[k].install(Vue);
  });

};

// automation register components.
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default install