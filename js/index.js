window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
        window.setTimeout(callback, 1000 / 60);
    };
})();
window.sr = ScrollReveal({
    duration: 750,
    distance: '50px',
    easing: 'ease',
    opacity: 0,
    scale: 1
});
(function(){
    var indexCtrl = new Vue({
        el: '#indexPage',
        data: {
            ieFG: false,
            loadFG: false,
            menuFG: false,
            checkFG: false,
            doneFG: false,
            goGameFG: true,
            pageStep: 0,
            gameStep: 0,
            choosen: 999,
            cityColor: 'rgb(115, 115, 115)',
            disColor: 'rgb(115, 115, 115)',
            formName: '',
            formPhone: '',
            formEmail: '',
            formCity: '請選擇縣市',
            formDistrict: '請選擇區域',
            formAddress: '',
            chkmsg: [],
            inputWarn: [],
            ga:{
                brandFG: false,
                gameFG: false,
                pdtFG: false,
                linksFG: false
            }
        },
        computed:{
            isOverflow(){
                return !this.loadFG || this.menuFG || this.doneFG || this.checkFG;
            },
            isNext(){
                return (this.choosen != 999 && this.choosen >= 0 && this.choosen <= 5);
            },
            fullAddr(){
                return this.formCity + this.formDistrict + this.formAddress;
            },
            endGame(){
                var endTime = Date.parse('2018/03/24 00:00:00').valueOf();
                var nowTime = Date.parse(new Date()).valueOf();
                var result = nowTime >= endTime;
                return result;
            },
            showList(){
                var endTime = Date.parse('2018/01/31 00:00:00').valueOf();
                var nowTime = Date.parse(new Date()).valueOf();
                var result = nowTime >= endTime;
                return result;
            }
        },
        created(){
            window.addEventListener('scroll', this.ctrlScroll);
            window.addEventListener('orientationchange', this.avoidAnriod);
        },
        mounted(){
            if(this.chkIE9() <= 9){
                this.ieFG = true;
                location.href = 'index_ie.html';
                return;
            }

            if(this.chkSafari()){
                document.querySelector('section.kv').style.height = (document.querySelector('section.kv').offsetHeight - 70) + 'px';
                //alert('adjust safari done');
            }
            
            if(this.chkWebview) document.querySelector('section.game').style.height = 'auto';
            this.setOverFlow();
            
            document.addEventListener("DOMContentLoaded", () => {
                setTimeout(() => {
                    this.loadFG = true;
                    this.$nextTick(function(){
                        setTimeout(() => {
                            this.avoidAnriod();
                            this.ctrlScroll();
                            this.initTwCitySelector();
                            this.initSR();
                        }, 250);
                    });
                }, 1500);
                gapage('index');
            });
        },
        methods: {
            ctrlScroll(){
                var winTop = window.scrollY || document.documentElement.scrollTop;
                var intro = document.querySelector('.intro').offsetTop - document.querySelector('header').offsetHeight;
                var game = document.querySelector('.game').offsetTop - document.querySelector('header').offsetHeight;
                var about = document.querySelector('.about').offsetTop - document.querySelector('header').offsetHeight;
                var productBox = document.querySelector('.productBox').offsetTop - document.querySelector('header').offsetHeight;
                var fixedBtn = document.querySelector('.btn-game .triBox');
                var btmAdj = (isMobile.phone) ? 0.95 : (isMobile.tablet) ? 0.9775 : 0.975;
                var btmDisappear = (document.querySelector('.wrap .container').offsetHeight - document.querySelector('section.kv').offsetHeight) * btmAdj;

                if(winTop >= productBox){
                    this.pageStep = 4;
                    if(!this.linksFG){
                        gapage('links');
                        this.linksFG = true;
                    }
                }else if(winTop >= about){
                    this.pageStep = 3;
                    if(!this.pdtFG){
                        gapage('products');
                        this.pdtFG = true;
                    }
                }else if(winTop >= game){
                    this.pageStep = 2;
                    if(!this.gameFG){
                        gapage('game');
                        this.gameFG= true;
                    }
                }else if(winTop >= intro){
                    this.pageStep = 1;
                    if(!this.brandFG){
                        gapage('brand');
                        this.brandFG= true;
                    }
                }else{
                    this.pageStep = 0;
                }

                this.goGameFG = ((winTop >= game && winTop <= about) || winTop > btmDisappear) ? false : true;
                if(this.goGameFG && winTop > game) fixedBtn.classList.add('rotate') 
                if(this.goGameFG && winTop <= game)fixedBtn.classList.remove('rotate');
            },
            scrollMenu(target, gaName){
                var target = target || null;
                if(target) target = document.querySelector('.'+target).offsetTop - document.querySelector('header').offsetHeight;

                this.menuFG = false;
                this.$nextTick(function(){
                    this.scrollToY(target);
                });
            },
            initTwCitySelector(){
                new TwCitySelector({
                    el: '.citySelector',
                    elCounty: '.formCity',
                    countyClassName: 'formCity',
                    elDistrict: '.formDistrict',
                    districtClassName: 'formDistrict'
                });  
            },
            initSR(){
                // 上進物件
                var kvObj = '.kv h1';
                var introObj = '.intro .txt-fir, .intro .txt-sec, .intro .txt-thir';
                var gameObj = '.game .game-tt';
                var formObj = '.form h2, .form .sub, .form .main';
                var aboutObj = '.about h2, .about h3, .about .feature, .about .sub, .about .btn';
                var pdtObj = '.productBox .pro-kv, .productBox .product .bottom';
                var shopObj = '.shop h2, .shop h3, .shop .w-btn, .shop .img, .shop .btn, .shop .txt';
                var fadeInDownStr = kvObj + ', ' + introObj + ', ' + gameObj + ', ' + formObj + ', ' + aboutObj + ', ' + pdtObj + ', ' + shopObj;

                // 左進物件
                var formLeftObj = '.form .img img';
                var pftLeftObj = '.productBox .product.one .top .proBox, .productBox .product.two .detail';
                var fadeInLeftStr = formLeftObj + ', ' + pftLeftObj;

                // 右進物件
                var formRightObj = '.form .detail';
                var pftRightObj = '.productBox .product.one .detail, .productBox .product.two .top .proBox';
                var fadeInRightStr = formRightObj + ', ' + pftRightObj;


                // 從上面掉下來的所有物件
                sr.reveal(fadeInDownStr, {
                    origin: 'top',
                    delay: 250
                });

                // 左進
                sr.reveal(fadeInLeftStr, {
                    origin: 'left',
                    distance: '75px',
                    delay: 250
                });

                // 右進
                sr.reveal(fadeInRightStr, {
                    origin: 'right',
                    distance: '75px',
                    delay: 250
                });

                // kv產品現身
                sr.reveal('.kv .kv-product', {
                    distance: '0',
                    delay: 250
                });

                // kv泡泡們
                sr.reveal('.kv .mainBox .poabs.bubbleWord, .kv .mainBox .poabs .bubbleImg', {
                    duration: 1000,
                    origin: 'bottom',
                    distance: '200px',
                    scale: 0.7,
                    delay: 500
                });

                // game底板 .game .main
                // game選項 .game .stickerBox li
                // game文案 .game .game-sub
                sr.reveal('.game .step1 .main', {
                    duration: 500,
                    distance: '0',
                    delay: 500,
                    beforeReveal: function (domEl){
                        // game 物件進場 用css做
                        document.querySelector('.game .stickerBox ul').classList.add('active');
                        document.querySelector('.game .game-sub').classList.add('active');
                    }
                });
            },
            avoidAnriod(evt){
                // 判裝安卓手機
                function getMobileOperatingSystem() {
                    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
                    if (/android/i.test(userAgent)) {
                        return true;
                    }
                    return false;
                };

                // 安卓才做處理
                if(getMobileOperatingSystem()) {
                    document.querySelector('.trans_bg').classList.add('input_focus');
                    screen.orientation.onchange = function (){
                        var way = screen.orientation.type.match(/\w+/)[0];
                        if (way == "landscape"){
                            document.querySelector('.trans_bg').classList.remove('input_focus');
                        }
                    };
                };
            },
            setValue(val){
                var thisVal = document.querySelector('.'+val).value;
                if(val == 'formCity') this.formDistrict = '請選擇區域';
                this.$data[val] = thisVal;
                this.$nextTick(function(){
                    this.cityColor = (thisVal != '請選擇縣市') ? 'rgb(0, 0, 0)' : 'rgb(115, 115, 115)';
                    this.disColor = (this.formDistrict != '請選擇區域') ? 'rgb(0, 0, 0)' : 'rgb(115, 115, 115)';
                });
            },
            changeStep(cnt, to){
                if(cnt == 1 && this.isNext){
                    this.gameStep = cnt;
                }else if(cnt == 0){
                    this.gameStep = cnt;
                    this.choosen = 999;
                }else if(cnt == 2 && this.isNext){

                }
                this.$nextTick(function(){
                    this.scrollMenu(to);
                });
            },
            pass(index){
                return this.inputWarn.indexOf(index) > -1;
            },
            checkData(){
                if(this.endGame){
                    alert('活動已結束！\n獲獎名單將於3/31公布！');
                    return;
                }

                this.chkmsg = [];
                this.inputWarn = [];
                var read = document.querySelector('.form .radio').checked;
                if(!CH.checktxt(this.formName)){
                    this.chkmsg.push('請輸入真實姓名');
                    this.inputWarn.push(1);
                }
                if(!CH.isValidCell(this.formPhone)){
                    this.chkmsg.push('請輸入手機十碼');
                    this.inputWarn.push(2);
                }
                if(!CH.isValidMail(this.formEmail)){
                    this.chkmsg.push('請輸入E-MAIL');
                    this.inputWarn.push(3);
                }
                if(!CH.checktxt(this.formCity) || this.formCity == '請選擇縣市') this.inputWarn.push(4);
                if(!CH.checktxt(this.formDistrict) || this.formDistrict == '請選擇區域') this.inputWarn.push(5);
                if(!CH.checktxt(this.formAddress))this.inputWarn.push(6);
                if(this.pass(4) || this.pass(5) || this.pass(6)) this.chkmsg.push('請輸入詳細地址');

                if(!read){
                    this.chkmsg.push('請同意相關規定');
                    this.inputWarn.push(7);
                }

                (this.chkmsg.length > 0) ? this.checkFG = true : this.sendAPI() ;
            },
            sendAPI(){
                if(this.endGame){
                    alert('活動已結束！\n獲獎名單將於3/31公布！');
                    return;
                }

                var $this = this;
                var url = location.origin + finder + '/api/post_member.php';
                var postData = new FormData();
                postData.append('name', $this.formName);
                postData.append('phone', $this.formPhone);
                postData.append('email', $this.formEmail);
                postData.append('address', $this.fullAddr);
                $this.chkmsg = [];

                axios({
                    method: 'post',
                    url: url,
                    data: postData
                }).then((response) => {
                    // console.log(response);
                    if(response.data.status === 200){
                        $this.doneFG = true;
                    }else if(response.data.status >= 101 && response.data.status <= 104){
                        $this.chkmsg.push(response.data.err);
                        $this.checkFG = true;
                        // 重複可以送，但不存資料庫
                        // PM說,還是要有訊息提示
                    }else if(response.data.status <= 105){
                        $this.chkmsg.push(response.data.err);
                        $this.checkFG = true;
                    }
                }).catch(function (error) {
                    // console.log('api err, msg is: ', error);
                    $this.chkmsg.push('系統繁忙，請稍候再試，謝謝！');
                    $this.checkFG = true;
                });;
            },
            chkSafari(){
                var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
                var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                return isMobile.phone && isSafari && iOS;
            },
            chkIE9(){
                var userAgent = navigator.userAgent;
                var fIEVersion = parseFloat(RegExp["$1"]); 

                if(userAgent.indexOf('MSIE 6.0') != -1){
                    return 6;
                }else if(fIEVersion == 7){
                    return 7;
                }else if(fIEVersion == 8){
                    return 8;
                }else if(fIEVersion == 9){
                    return 9;
                }else if(fIEVersion == 10){
                    return 10;
                }else if(userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)){ 
                    return 11;
                }else{
                    return 999;
                }
            },
            chkWebview(){
                var userAgent = window.navigator.userAgent.toLowerCase();
                var standalone = window.navigator.standalone;
                var safari = /safari/.test(userAgent);
                var fbWebView = /fbid|fbios|fblc|fb_iab|fb4a|fbav/.test(userAgent);
                var lineWebView = /line/i.test(userAgent);
                var ios = /iphone|ipod|ipad/.test(userAgent);
                var uiwebview = false;

                if (!standalone && safari) {
                    // iosType = 'ios browser';
                } else if (standalone && !safari) {
                    // iosType = 'ios standalone';
                } else if (!standalone && !safari) {
                    // iosType = 'ios uiwebview';
                    uiwebview = true;
                }

                return uiwebview || fbWebView || lineWebView;
            },
            shareFB(track){
                var date = new Date();
                var year = date.getFullYear().toString();
                var month = (date.getMonth()+1).toString();
                var day = ((date.getDate() < 10) ? '0' : '') + date.getDate().toString();
                var urlDate = year + month + day;

                var fb_url = (isMobile.phone) ? 'http://m.facebook.com/sharer.php?u=' : 'http://www.facebook.com/sharer.php?u=';
                var fbBack_url = (track) ? track + '&v=' + urlDate : '?v=' + urlDate;
                var share_u;
                share_u = location.href + fbBack_url;
                window.open(fb_url + encodeURIComponent(share_u), 'sharer', 'toolbar=0,status=0,width=656,height=436');
            },
            setOverFlow(){
                document.body.style.cssText = (this.isOverflow == true) ? 'overflow-y: hidden' : '';
            },
            scrollToY(scrollTargetY, speed, easing, callback){
                var scrollY = window.scrollY || document.documentElement.scrollTop,
                    scrollTargetY = scrollTargetY || 0,
                    speed = speed || 200,
                    easing = easing || 'easeOutSine',
                    callback = callback || null,
                    currentTime = 0;
                var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));
                var easingEquations = {
                    easeOutSine: function (pos) {
                        return Math.sin(pos * (Math.PI / 2));
                    },
                    easeInOutSine: function (pos) {
                        return (-0.5 * (Math.cos(Math.PI * pos) - 1));
                    },
                    easeInOutQuint: function (pos) {
                        if ((pos /= 0.5) < 1) {
                            return 0.5 * Math.pow(pos, 5);
                        }
                        return 0.5 * (Math.pow((pos - 2), 5) + 2);
                    }
                };
                function tick() {
                    currentTime += 1 / 60;
                    var p = currentTime / time;
                    var t = easingEquations[easing](p);

                    if (p < 1) {
                        requestAnimFrame(tick);
                        window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
                    } else {
                        window.scrollTo(0, scrollTargetY);
                        if(callback) callback();
                    }
                }
                tick();
            }
        },
        destroyed: function () {
            window.removeEventListener('scroll', this.ctrlScroll);
            window.removeEventListener('orientationchange', this.avoidAnriod);
        },
        watch:{
            isOverflow: 'setOverFlow'
        }
    });
})();