!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var i=t();for(var o in i)("object"==typeof exports?exports:e)[o]=i[o]}}(this,function(){return function(e){function t(o){if(i[o])return i[o].exports;var s=i[o]={exports:{},id:o,loaded:!1};return e[o].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var i={};return t.m=e,t.c=i,t.p="./dist/",t(0)}([function(e,t,i){e.exports=i(4)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{list:{type:Array},sid:{type:Array},typeMate:{type:String,default:"id"},nameMate:{type:String,default:"name"}},methods:{choosestore:function(e){var t=this;this.list[e].ischecked=!this.list[e].ischecked;var i=[];this.list.forEach(function(e){e.ischecked&&i.push(e[t.typeMate])}),this.sid=i,this.$emit("change",i)}},watch:{list:function(e){var t=this;this.sid&&e.forEach(function(e){t.sid.forEach(function(i){e[t.typeMate]==i&&(e.ischecked=!0)})})}},ready:function(){}}},function(e,t){},function(e,t){e.exports=' <div class=KsList> <ul> <li v-for="i in list" :class="i.ischecked && \'check\'" @click=choosestore($index)> <span>{{i[nameMate]}}</span> <i></i> </li> </ul> </div> '},function(e,t,i){var o,s;i(2),o=i(1),s=i(3),e.exports=o||{},e.exports.__esModule&&(e.exports=e.exports.default),s&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=s)}])});