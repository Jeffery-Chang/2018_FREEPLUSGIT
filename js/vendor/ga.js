(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-113930835-1', 'auto');

var finder = (location.hostname === 'cell2.webgene.com.tw') ? '/freeplus_2018' : '';

function gapage(page) {
    ga('send', 'pageview', page);
    console.log('page:', page);
}
function gaclick(evt) {
    ga('send', 'event', 'click', evt);
    console.log('click:', evt);
}
function trackWaitJump(event, url) {
    setTimeout(function () {
        location.href = url;
    }, 100);
    gaclick(event);
}