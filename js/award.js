(function(){
    var awardCtrl = new Vue({
        el: '#awardPage',
        data: {
            loadFG: false,
            awardList: [
                { name: '李Ｘ燕', phone: '0929XXX409', type: 'A' },
                { name: '李Ｘ燕', phone: '0929XXX215', type: 'A' },
                { name: '李Ｘ燕', phone: '0929XXX588', type: 'A' },
                { name: '李Ｘ燕', phone: '0929XXX412', type: 'A' },
                { name: '李Ｘ燕', phone: '0929XXX409', type: 'A' },
                { name: '李Ｘ燕', phone: '0929XXX358', type: 'B' },
                { name: '李Ｘ燕', phone: '0929XXX739', type: 'B' },
                { name: '李Ｘ燕', phone: '0929XXX873', type: 'B' },
                { name: '李Ｘ燕', phone: '0929XXX665', type: 'B' },
                { name: '李Ｘ燕', phone: '0929XXX431', type: 'B' },
                { name: '李Ｘ燕', phone: '0929XXX447', type: 'B' },
                { name: '李Ｘ燕', phone: '0929XXX999', type: 'B' },
                { name: '李Ｘ燕', phone: '0929XXX299', type: 'B' },
                { name: '李Ｘ燕', phone: '0929XXX989', type: 'B' },
                { name: '李Ｘ燕', phone: '0929XXX399', type: 'B' },
                { name: '李Ｘ燕', phone: '0929XXX589', type: 'B' },
                { name: '李Ｘ燕', phone: '0929XXX559', type: 'B' },
                { name: '李Ｘ燕', phone: '0929XXX768', type: 'B' },
                { name: '李Ｘ燕', phone: '0929XXX768', type: 'B' },
                { name: '李Ｘ燕', phone: '0929XXX675', type: 'B' },
                { name: '李Ｘ燕', phone: '0929XXX409', type: 'B' }
            ],
            phoneKey: ''
        },
        computed:{
            showList(){
                var endTime = Date.parse('2018/03/24 00:00:00').valueOf();
                var nowTime = Date.parse(new Date()).valueOf();
                var result = nowTime >= endTime;
                return result;
            },
            allList(){
                return (this.phoneKey === '') ? this.awardList : this.awardList.filter(function(item){ return item.phone.slice(7, 10).indexOf(awardCtrl.$data.phoneKey) > -1; });
            },
            firstList(){
                return this.allList.filter(function(item){ return item.type === 'A'; });
            },
            secList(){
                return this.allList.filter(function(item){ return item.type === 'B'; });
            }
        },
        created(){
            if(!this.showList){
                location.href = 'index.html';
                return;
            }
            window.addEventListener('orientationchange', this.avoidAnriod);
        },
        mounted(){
            document.addEventListener("DOMContentLoaded", () => {
                setTimeout(() => {
                    this.loadFG = true;
                    this.avoidAnriod();

                    var btn = document.querySelector('.bur.active');
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        (this.chkWebview()) ? location.href = 'index.html' : window.close();
                    });
                }, 1000);

                gapage('award');
            });
        },
        methods: {
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
            avoidAnriod(){
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
            }
        },
        destroyed: function () {
            window.removeEventListener('orientationchange', this.avoidAnriod);
        }
    });
})();