"use strict";window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}(),window.sr=ScrollReveal({duration:750,distance:"50px",easing:"ease",opacity:0,scale:1}),function(){new Vue({el:"#indexPage",data:{ieFG:!1,menuFG:!1,checkFG:!1,doneFG:!1,goGameFG:!0,pageStep:0,gameStep:0,choosen:999,cityColor:"rgb(115, 115, 115)",disColor:"rgb(115, 115, 115)",formName:"",formPhone:"",formEmail:"",formCity:"請選擇縣市",formDistrict:"請選擇區域",formAddress:"",chkmsg:[],inputWarn:[]},computed:{isOverflow:function(){return this.menuFG||this.doneFG||this.checkFG},isNext:function(){return 999!=this.choosen&&this.choosen>=0&&this.choosen<=5},fullAddr:function(){return this.formCity+this.formDistrict+this.formAddress}},created:function(){window.addEventListener("scroll",this.ctrlScroll)},mounted:function(){var t=this;if(this.chkIE9()<=9)return this.ieFG=!0,void(location.href="index_ie.html");this.chkSafari()&&(document.querySelector("section.kv").style.height=document.querySelector("section.kv").offsetHeight-70+"px"),document.addEventListener("DOMContentLoaded",function(){t.setOverFlow(),t.ctrlScroll(),t.initTwCitySelector(),t.initSR()})},methods:{ctrlScroll:function(){var t=window.scrollY||document.documentElement.scrollTop,e=document.querySelector(".intro").offsetTop-document.querySelector("header").offsetHeight,o=document.querySelector(".game").offsetTop-document.querySelector("header").offsetHeight,i=document.querySelector(".about").offsetTop-document.querySelector("header").offsetHeight,r=document.querySelector(".productBox").offsetTop-document.querySelector("header").offsetHeight,n=document.querySelector(".btn-game .triBox");this.pageStep=t>=r?4:t>=i?3:t>=o?2:t>=e?1:0,this.goGameFG=!(t>=o&&t<=i),this.goGameFG&&t>o&&n.classList.add("rotate"),this.goGameFG&&t<=o&&n.classList.remove("rotate")},scrollMenu:function(t){(t=t||null)&&(t=document.querySelector("."+t).offsetTop-document.querySelector("header").offsetHeight),this.menuFG=!1,this.$nextTick(function(){this.scrollToY(t)})},initTwCitySelector:function(){new TwCitySelector({el:".citySelector",elCounty:".formCity",countyClassName:"formCity",elDistrict:".formDistrict",districtClassName:"formDistrict"})},initSR:function(){sr.reveal(".kv h1, .intro .txt-fir, .intro .txt-sec, .intro .txt-thir, .game .game-tt, .form h2, .form .sub, .form .main, .about h2, .about h3, .about .feature, .about .sub, .about .btn, .productBox .pro-kv, .productBox .product .bottom, .shop h2, .shop h3, .shop .w-btn, .shop .img, .shop .btn, .shop .txt",{origin:"top",delay:250}),sr.reveal(".form .img img, .productBox .product.one .top .proBox, .productBox .product.two .detail",{origin:"left",distance:"75px",delay:250}),sr.reveal(".form .detail, .productBox .product.one .detail, .productBox .product.two .top .proBox",{origin:"right",distance:"75px",delay:250}),sr.reveal(".kv .kv-product",{distance:"0",delay:250}),sr.reveal(".kv .mainBox .poabs.bubbleWord, .kv .mainBox .poabs .bubbleImg",{duration:1e3,origin:"bottom",distance:"200px",scale:.7,delay:500}),sr.reveal(".game .step1 .main",{duration:500,distance:"0",delay:500,beforeReveal:function(){document.querySelector(".game .stickerBox ul").classList.add("active"),document.querySelector(".game .game-sub").classList.add("active")}})},avoidAnriod:function(){(function(){var t=navigator.userAgent||navigator.vendor||window.opera;return!!/android/i.test(t)})()&&(screen.orientation.onchange=function(){"landscape"==screen.orientation.type.match(/\w+/)[0]&&document.querySelector(".trans_bg").classList.remove("input_focus")}),document.querySelector(".trans_bg").classList.add("input_focus")},setValue:function(t){var e=document.querySelector("."+t).value;"formCity"==t&&(this.formDistrict="請選擇區域"),this.$data[t]=e,this.$nextTick(function(){this.cityColor="請選擇縣市"!=e?"rgb(0, 0, 0)":"rgb(115, 115, 115)",this.disColor="請選擇區域"!=this.formDistrict?"rgb(0, 0, 0)":"rgb(115, 115, 115)"})},changeStep:function(t,e){1==t&&this.isNext?this.gameStep=t:0==t?(this.gameStep=t,this.choosen=999):2==t&&this.isNext,this.$nextTick(function(){this.scrollMenu(e)})},pass:function(t){return this.inputWarn.indexOf(t)>-1},checkData:function(){this.chkmsg=[],this.inputWarn=[];var t=document.querySelector(".form .radio").checked;CH.checktxt(this.formName)||(this.chkmsg.push("請輸入真實姓名"),this.inputWarn.push(1)),CH.isValidCell(this.formPhone)||(this.chkmsg.push("請輸入聯絡電話"),this.inputWarn.push(2)),CH.isValidMail(this.formEmail)||(this.chkmsg.push("請輸入E-MAIL"),this.inputWarn.push(3)),CH.checktxt(this.formCity)&&"請選擇縣市"!=this.formCity||this.inputWarn.push(4),CH.checktxt(this.formDistrict)&&"請選擇區域"!=this.formDistrict||this.inputWarn.push(5),CH.checktxt(this.formAddress)||this.inputWarn.push(6),(this.pass(4)||this.pass(5)||this.pass(6))&&this.chkmsg.push("請輸入詳細地址"),t||(this.chkmsg.push("請同意相關規定"),this.inputWarn.push(7)),this.chkmsg.length>0?this.checkFG=!0:this.sendAPI()},sendAPI:function(){var t=this,e=location.origin+finder+"/api/post_member.php",o=new FormData;o.append("name",t.formName),o.append("phone",t.formPhone),o.append("email",t.formEmail),o.append("address",t.fullAddr),t.chkmsg=[],axios({method:"post",url:e,data:o}).then(function(e){200===e.data.status?t.doneFG=!0:e.data.status>=101&&e.data.status<=105&&(t.chkmsg.push(e.data.err),t.checkFG=!0)}).catch(function(){t.chkmsg.push("系統繁忙，請稍候再試，謝謝！"),t.checkFG=!0})},chkSafari:function(){var t=!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/),e=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;return isMobile.phone&&t&&e},chkIE9:function(){var t=navigator.userAgent,e=parseFloat(RegExp.$1);return-1!=t.indexOf("MSIE 6.0")?6:7==e?7:8==e?8:9==e?9:10==e?10:t.toLowerCase().match(/rv:([\d.]+)\) like gecko/)?11:999},shareFB:function(t){var e,o=new Date,i=o.getFullYear().toString()+(o.getMonth()+1).toString()+((o.getDate()<10?"0":"")+o.getDate().toString()),r=isMobile.phone?"http://m.facebook.com/sharer.php?u=":"http://www.facebook.com/sharer.php?u=",n=t?t+"&v="+i:"?v="+i;e=location.href+n,window.open(r+encodeURIComponent(e),"sharer","toolbar=0,status=0,width=656,height=436")},setOverFlow:function(){document.body.style.cssText=1==this.isOverflow?"overflow-y: hidden":""},scrollToY:function(t,e,o,i){function r(){var e=(s+=1/60)/a,u=c[o](e);e<1?(requestAnimFrame(r),window.scrollTo(0,n+(t-n)*u)):(window.scrollTo(0,t),i&&i())}var n=window.scrollY||document.documentElement.scrollTop,t=t||0,e=e||200,o=o||"easeOutSine",i=i||null,s=0,a=Math.max(.1,Math.min(Math.abs(n-t)/e,.8)),c={easeOutSine:function(t){return Math.sin(t*(Math.PI/2))},easeInOutSine:function(t){return-.5*(Math.cos(Math.PI*t)-1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*Math.pow(t,5):.5*(Math.pow(t-2,5)+2)}};r()}},watch:{isOverflow:"setOverFlow"}})}();