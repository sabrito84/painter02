var appVisitor=appVisitor||{};appVisitor.ElementReviewForm=function(){function t(t,i){this.$html=t,this.$form=this.$html.find("form"),this.id=this.$html.data("id"),this.config=$.extend({},e,i),this.stars=this.$html.find(this.config.stars),this.loader=new appVisitor.LoadingLoader(this.$html),this.$label=this.$html.find(this.config.label),this.initLabel=this.$label.text(),this.selected=null,this.choiceTimeout=null,this.init()}utils.include(t,appVisitor.modules.AnalyticsEventTrackable);var e={stars:"span[data-rate]",label:".rate-label",rate:'input[name="cms_review[score]"]',errors:"error"};return $.extend(t.prototype,{init:function(){this.events(),this.$form.hasClass("with-image-upload")&&this._initUploader()},events:function(){var t=this;this.setAnalyticsEvent(this.$form.data("analytics-events-params"),function(){t.$form.one("focus","input, textarea",function(){t.sendAnalyticsEvent({action:"Focus"})})}),this.stars.on({mouseenter:function(){var e=$(this);clearTimeout(t.choiceTimeout),t._changeState(e),t._updateLabel(e.data("label"))},mouseleave:function(){t.choiceTimeout=setTimeout(function(){t.selected?t.selected.trigger("mouseenter"):t.stars.each(function(){t._updateLabel(t.initLabel),t._updateStateClass($(this))})},100)},click:function(){t.selected=$(this),t.$html.find(t.config.rate).val(t.selected.data("rate"))}}),this.$html.on("submit",function(e){e.preventDefault();var i=$(this);return t.$form=i.find("form"),t.loader.loading(),t.sendAnalyticsEvent({action:"Soumission en cours"}),$.post(t.$form.attr("action"),t.$form.serialize()+"&element_review_form="+t.id,function(e){var i=function(){t.loader.finish(),t.sendAnalyticsEvent({action:"Soumission r\xe9ussie"}),t.$html.find(".sb-vi-ajax-callback.success").fadeIn(200)};1==e.response?t.hasImage?(t.uploader.setData({review_id:e.id}),t.uploader.upload(function(){i()})):i():(t.loader.finish(),t.sendAnalyticsEvent({action:"Soumission \xe9chou\xe9e"}),t._showErrors(e.errors))}).fail(function(){t.loader.finish()}),!1})},_initUploader:function(){var t=this.$html,e=".upload-image-container",i=t.find(e).find("a"),s=this;this.uploader=new Uploader(t,{containers:{button:e},plupload:{browse_button:i[0],multi_selection:!1,url:appVisitor.apiRoutePrefixPath+"/api-website-feature/cms-reviews/upload-image"},progress:{progressbar:".form-input-image-progressbar"},callbacks:{filesAdded:function(t,e){if($.isArray(e)){var i=e[0],a=this.view.find(".form-input-image-preview");s.hasImage=!0,a.find(this.config.progress.progressbar).css("width",0).end().find(".form-input-image-name span").text(i.name).end().show()}},uploadProgress:function(t,e){var i=this.view.find(".form-input-image-preview"),s=e.percent+"%";i.find(this.config.progress.progressbar).css("width",s)},fileUploaded:function(t,e,i){if(i.errors)this.view.find(".form-input-image-preview")}},autoUpload:!1})},_changeState:function(t){var e=this;t.prevAll(this.config.stars).add(t).each(function(){e._updateStateClass($(this),!0)}),t.nextAll(this.config.stars).each(function(){e._updateStateClass($(this))})},_updateStateClass:function(t,e){e?t.addClass("active"):t.removeClass("active")},_updateLabel:function(t){this.$label.text(t)},_showErrors:function(t){var e=this;this.$html.find("."+this.config.errors).remove(),$.each(t,function(t,i){var s=e.$html.find("[name*="+t+"]:first, *[data-input-name="+t+"]:first"),a=s.closest(".sb-vi-form-group"),n=$('<p class="'+e.config.errors+'">'+i[0]+"</p>");s.addClass("invalid"),a.length?a.find("label").append(n):s.is(":checkbox")?s.closest("label").before(n):(e.$form.closest(".element-review-form").addClass("has-bottom-error"),n.addClass("error-mobile-bottom"),n.prependTo(e.$form))})}}),t}();