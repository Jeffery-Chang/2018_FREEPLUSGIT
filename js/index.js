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
            menuFG: false,
            actFG: false,
            doneFG: false,
            goGameFG: true,
            pageStep: 0
        },
        computed:{
            isOverflow(){
                return this.menuFG;
            }  
        },
        created: function () {
            window.addEventListener('scroll', this.ctrlScroll);
        },
        beforeMount: function(){

        },
        mounted: function(){
            document.addEventListener("DOMContentLoaded", () => {
                this.initSR();
            });
        },
        methods: {
            ctrlScroll: function(){
                var winTop = window.scrollY || document.documentElement.scrollTop;
                var intro = document.querySelector('.intro').offsetTop - document.querySelector('header').offsetHeight;
                var game = document.querySelector('.game').offsetTop - document.querySelector('header').offsetHeight;
                var about = document.querySelector('.about').offsetTop - document.querySelector('header').offsetHeight;
                var productBox = document.querySelector('.productBox').offsetTop - document.querySelector('header').offsetHeight;

                if(winTop >= productBox){
                    this.pageStep = 4;
                }else if(winTop >= about){
                    this.pageStep = 3;
                }else if(winTop >= game){
                    this.pageStep = 2;
                }else if(winTop >= intro){
                    this.pageStep = 1;
                }else{
                    this.pageStep = 0;
                }
                
                this.goGameFG = (winTop >= game && winTop <= about) ? false : true;
            },
            scrollMenu(target, gaName){
                var target = target || null;
                if(target) target = document.querySelector('.'+target).offsetTop - document.querySelector('header').offsetHeight;

                this.menuFG = false;
                this.$nextTick(function(){
                    this.scrollToY(target);
                });
            },
            initSR(){
                var kvObj = '.kv h1';
                var introObj = '.intro .txt-fir, .intro .txt-sec, .intro .txt-thir';
                var gameObj = '.game .game-tt';
                var formObj = '.form h2, .form .sub, .form .main';
                var fadeInDownStr = kvObj + ', ' + introObj + ', ' + gameObj + ', ' + formObj;
                sr.reveal(fadeInDownStr, {
                    origin: 'top',
                    delay: 250
                });
                sr.reveal('.kv .kv-product', {
                    distance: '0',
                    delay: 250
                });
                sr.reveal('.kv .mainBox .poabs.bubbleWord, .kv .mainBox .poabs .bubbleImg', {
                    duration: 1000,
                    origin: 'bottom',
                    distance: '200px',
                    scale: 0.7,
                    delay: 500
                });
            },
            setOverFlow: function(){
                document.body.style.cssText = (this.isOverflow == true) ? 'overflow-y: hidden' : '';
            },
            scrollToY: function(scrollTargetY, speed, easing, callback){
                var scrollY = window.scrollY || document.documentElement.scrollTop,
                    scrollTargetY = scrollTargetY || 0,
                    speed = speed || 2000,
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
        watch:{
            isOverflow: 'setOverFlow'
        }
    });
})();