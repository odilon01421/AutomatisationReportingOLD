"use strict";!function(n){var a={en:{day:"day",hour:"hour",minute:"minute",second:"second",days:"days",hours:"hours",minutes:"minutes",seconds:"seconds"}};n.fn.durationPicker=function(s){var d={lang:"en",formatter:function(n){return n},showSeconds:!1},e=n.extend({},d,s);this.each(function(s,d){function t(n,a){return'<div class="bdp-block '+(a?"hidden":"")+'">\n                            <span id="bdp-'+n+'"></span><br>\n                            <span class="bdp-label" id="bdp-'+n+'-label"></span>\n                        </div>'}function o(){var n=y+60*m+60*f*60+24*h*60*60;d.val(n),d.change()}function i(n,s,d){var t=1===s?d:d+"s";b.find(n).text(a[e.lang][t])}function r(n,a){b.find(n).text(e.formatter(a))}function l(){r("#bdp-days",h),r("#bdp-hours",f),r("#bdp-minutes",m),r("#bdp-seconds",y),i("#bdp-days-label",h,"day"),i("#bdp-hours-label",f,"hour"),i("#bdp-minutes-label",m,"minute"),i("#bdp-seconds-label",y,"second")}function u(){I||(g.days.val(h),g.hours.val(f),g.minutes.val(m),g.seconds.val(y))}function c(){""===d.val()&&d.val(0);var n=parseInt(d.val(),10);y=n%60,n=Math.floor(n/60),m=n%60,n=Math.floor(n/60),f=n%24,h=Math.floor(n/24),l(),u()}function p(){h=parseInt(g.days.val(),10)||0,f=parseInt(g.hours.val(),10)||0,m=parseInt(g.minutes.val(),10)||0,y=parseInt(g.seconds.val(),10)||0,o(),l()}function v(s,d,t){var o=n('<input class="form-control input-sm" type="number" min="0" value="0">').change(p);t&&o.attr("max",t),g[s]=o;var i=n("<div> "+a[e.lang][s]+"</div>");return d&&i.addClass("hidden"),i.prepend(o)}if(d=n(d),"1"!==d.data("bdp")){var b=n('<div class="bdp-input">'+t("days")+t("hours")+t("minutes")+t("seconds",!e.showSeconds)+"</div>");d.after(b).hide().data("bdp","1");var h=0,f=0,m=0,y=0,g=[],I=!1;if((d.hasClass("disabled")||"disabled"===d.attr("disabled"))&&(I=!0,b.addClass("disabled")),!I){var x=n('<div class="bdp-popover"></div>');v("days",!1).appendTo(x),v("hours",!1,23).appendTo(x),v("minutes",!1,59).appendTo(x),v("seconds",!e.showSeconds,59).appendTo(x),b.popover({placement:"bottom",trigger:"click",html:!0,content:x})}c(),d.change(c)}})}}(jQuery);