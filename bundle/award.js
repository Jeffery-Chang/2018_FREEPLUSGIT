"use strict";!function(){var e=new Vue({el:"#awardPage",data:{loadFG:!1,awardList:[{name:"李Ｘ燕",phone:"0929XXX409",type:"A"},{name:"李Ｘ燕",phone:"0929XXX215",type:"A"},{name:"李Ｘ燕",phone:"0929XXX588",type:"A"},{name:"李Ｘ燕",phone:"0929XXX412",type:"A"},{name:"李Ｘ燕",phone:"0929XXX409",type:"A"},{name:"李Ｘ燕",phone:"0929XXX358",type:"B"},{name:"李Ｘ燕",phone:"0929XXX739",type:"B"},{name:"李Ｘ燕",phone:"0929XXX873",type:"B"},{name:"李Ｘ燕",phone:"0929XXX665",type:"B"},{name:"李Ｘ燕",phone:"0929XXX431",type:"B"},{name:"李Ｘ燕",phone:"0929XXX447",type:"B"},{name:"李Ｘ燕",phone:"0929XXX999",type:"B"},{name:"李Ｘ燕",phone:"0929XXX299",type:"B"},{name:"李Ｘ燕",phone:"0929XXX989",type:"B"},{name:"李Ｘ燕",phone:"0929XXX399",type:"B"},{name:"李Ｘ燕",phone:"0929XXX589",type:"B"},{name:"李Ｘ燕",phone:"0929XXX559",type:"B"},{name:"李Ｘ燕",phone:"0929XXX768",type:"B"},{name:"李Ｘ燕",phone:"0929XXX768",type:"B"},{name:"李Ｘ燕",phone:"0929XXX675",type:"B"},{name:"李Ｘ燕",phone:"0929XXX409",type:"B"}],phoneKey:""},computed:{allList:function(){return""===this.phoneKey?this.awardList:this.awardList.filter(function(n){return n.phone.slice(7,10).indexOf(e.$data.phoneKey)>-1})},firstList:function(){return this.allList.filter(function(e){return"A"===e.type})},secList:function(){return this.allList.filter(function(e){return"B"===e.type})}},created:function(){window.addEventListener("orientationchange",this.avoidAnriod)},mounted:function(){var e=this;document.addEventListener("DOMContentLoaded",function(){e.loadFG=!0,e.avoidAnriod(),document.querySelector(".bur.active").addEventListener("click",function(n){n.preventDefault(),e.chkWebview()?location.href="index.html":window.close()}),gapage("award")})},methods:{chkWebview:function(){var e=window.navigator.userAgent.toLowerCase(),n=window.navigator.standalone,t=/safari/.test(e),o=/fbid|fbios|fblc|fb_iab|fb4a|fbav/.test(e),a=/line/i.test(e),i=(/iphone|ipod|ipad/.test(e),!1);return!n&&t||n&&!t||n||t||(i=!0),i||o||a},avoidAnriod:function(){(function(){var e=navigator.userAgent||navigator.vendor||window.opera;return!!/android/i.test(e)})()&&(document.querySelector(".trans_bg").classList.add("input_focus"),screen.orientation.onchange=function(){"landscape"==screen.orientation.type.match(/\w+/)[0]&&document.querySelector(".trans_bg").classList.remove("input_focus")})}}})}();