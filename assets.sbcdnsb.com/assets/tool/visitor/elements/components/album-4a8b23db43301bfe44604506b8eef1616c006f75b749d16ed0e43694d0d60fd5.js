var appVisitor=appVisitor||{};appVisitor.ElementAlbum=function(){function t(t){this.$html=t,this.items=[],this.albumId=this.$html.data("id"),this.init()}return t.prototype={init:function(){this._getItems(),this.events(),hash=this._parseHash(),hash.gid&&hash.gid==this.albumId&&hash.pid&&/album-\d+/.test(hash.pid)&&this.$html.find("figure").eq(parseInt(hash.pid.match(/\d+/)[0])-1).trigger("click"),this._initPlugins()},events:function(){var t=this,e=$(".pswp")[0];this.$html.on("click","figure a.album-image-link",function(i){i.preventDefault();var s=$(this);utils.require([assets.photoswipe],function(){appVisitor.headerMobile&&(appVisitor.headerMobile.disabled=!0),$("body").addClass("no-scroll");var i=s.data("pswp-index"),a={galleryUID:t.albumId,index:i,showHideOpacity:!0,shareButtons:[{id:"facebook",label:"Partager sur Facebook",url:"https://www.facebook.com/sharer/sharer.php?u={{url}}"},{id:"twitter",label:"Tweeter",url:"https://twitter.com/intent/tweet?text={{text}}&url={{url}}"},{id:"pinterest",label:"Pin it",url:"http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"}]};t.pswp=new PhotoSwipe(e,PhotoSwipeUI_Default,t.items,a),t.pswp.listen("close",function(){$("body").removeClass("no-scroll"),appVisitor.headerMobile&&(appVisitor.headerMobile.disabled=!1)}),t.pswp.init()})}).on("sb.albums.refresh",function(){t._refreshPlugins()})},_initPlugins:function(){var t=this.$html.find(".album-container"),e=function(){return t.css({opacity:1})};if(t.hasClass("flex-images"))utils.require([assets.fleximages],function(){e().flexImages({container:".item",rowHeight:220})});else if(t.hasClass("vertical-images"))utils.require([assets.imagesloaded,assets.masonry],function(){e().imagesLoaded(function(){t.masonry({itemSelector:".item",gutter:2,percentPosition:!0})})});else if(t.hasClass("slider-images")){var i={autoplay:!0,draggable:!1,centerMode:!0,infinite:!0,speed:400,centerPadding:"0",autoplaySpeed:3e3,swipe:!0,touchMove:!0,dots:!1,mobileFirst:!0,respondTo:"slider",slidesToShow:1,fade:!0,arrows:!0,prevArrow:'<button type="button" class="arrow arrow-left"><svg viewBox="0 0 1792 1792"><path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path</svg></button>',nextArrow:'<button type="button" class="arrow arrow-right"><svg viewBox="0 0 1792 1792"><path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path</svg></button>'};utils.require([assets.slick],function(){t.slick(i),e()})}else e()},_refreshPlugins:function(){var t=this.$html.find(".album-container");t.data("refreshed-plugins")||(t.data("refreshed-plugins",!0),t.hasClass("vertical-images")&&t.masonry())},_parseHash:function(){var t=window.location.hash.substring(1),e={};if(t.length<5)return e;for(var i=t.split("&"),s=0;s<i.length;s++)if(i[s]){var a=i[s].split("=");a.length<2||(e[a[0]]=a[1])}return e.gid&&(e.gid=parseInt(e.gid,10)),e},_getItems:function(){var t=this;this.$html.find("a.album-image-link").each(function(e){var i=$(this),s=i.attr("href"),a=i.data("caption"),r=i.data("size").split("x"),n=r[0],l=r[1];i.data("pswp-index",e);var o={src:s,w:n,h:l,el:i[0],title:a,pid:"album-"+(e+1)};t.items.push(o)})}},t}();