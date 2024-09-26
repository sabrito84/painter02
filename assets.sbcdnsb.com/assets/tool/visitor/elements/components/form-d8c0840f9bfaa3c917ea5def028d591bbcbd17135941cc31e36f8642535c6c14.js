var appVisitor=appVisitor||{};appVisitor.ElementForm=function(){function i(i){this.$html=i,this.$form=i.find("form").first(),this.loader=new appVisitor.LoadingLoader(this.$html),this.uploaders=[],this.hasAttachments=!1}return utils.include(i,appVisitor.modules.AnalyticsEventTrackable),utils.include(i,appVisitor.modules.ConversionActionable),i.initObject=function(i){return i.hasClass("element-lead-generation-form")?new appVisitor.ElementSbLeadGenerationForm(i):new appVisitor.ElementForm(i)},$.extend(i.prototype,{init:function(){var i=this;this.initUploaders(),this.setAnalyticsEvent(this.$form.data("analytics-events-params"),function(){i.$form.one("focus","input, textarea",function(){i.sendAnalyticsEvent({action:"Focus"})})}),this.$form.submit(function(){return i.submit(),!1}),this.$html.on("sb.uploaders.uploadInProgress",function(){i.$form.find("button[type=submit]").prop("disabled",!0)}).on("sb.uploaders.uploadFinished",function(){var e=!0;$.each(i.uploaders,function(){if(this.uploadInProgress||this.uploadErrors)return e=!1,!1}),e&&i.$form.find("button[type=submit]").prop("disabled",!1)}).on("sb.uploaders.uploadFailed",function(){i.$form.find("button[type=submit]").prop("disabled",!0)}),this.$html.on("click",".refresh-element-form-btn",function(){i.loader.loading();var e=$(this).data("url");$.ajax({method:"GET",url:e,success:function(e){1==e.response?window.location.reload():i.loader.finish()}})})},submitSuccess:function(){var i=this,e=i.$html.find(".sb-vi-ajax-callback.success");i.formSubmissionId=null,i.loader.finish(function(){e.fadeIn("fast")})},submitError:function(i){var e=this,t=e.$html.find(".sb-vi-ajax-callback.server-error");i?e.loader.finish(function(){t.fadeIn("fast",function(){setTimeout(function(){t.fadeOut("fast")},2e3)})}):e.loader.finish()},clearForm:function(){this.$html.find(".sb-vi-input-text, .sb-vi-input-textarea, .sb-vi-input-email, .sb-vi-input-tel, .sb-vi-input-date, .sb-vi-input-time").val("").removeClass("invalid").end().find(".error").remove(),this.initUploaders()},addUploader:function(i){var e=".upload-file-container",t=i.find(e).find("a"),r=this;return i.data("uploader-initialized",!0),new Uploader(i,{data:{input_name:i.data("input-name")},containers:{button:e},plupload:{browse_button:t[0],filters:{mime_types:[{title:"Fichiers",extensions:i.data("extensions")}]},multi_selection:!1,url:appVisitor.apiRoutePrefixPath+"/api-website-feature/form-submission-files",max_file_size:"20mb"},progress:{progressbar:".form-input-file-progressbar"},callbacks:{filesAdded:function(e,t){if($.isArray(t)){var r=t[0];this.uploadErrors=!1,this.$preview&&this.$preview.hide().find(this.config.removeFile).click(),this.uploader.files.length>1&&this.uploader.splice(0,1),this.$preview=$(this.view.find(".file-template").html().trim()).clone(),this.$preview.attr("id",r.id).find(this.config.progress.progressbar).css("width",0).end().find(".form-input-file-name span").text(r.name).end().find("input[name*="+i.data("input-name")+"]").val(r.name).end().show().appendTo(i.find(".form-input-file-preview-wrapper"))}},uploadProgress:function(i,e){var t=e.percent+"%";this.$preview.find(this.config.progress.progressbar).css("width",t),this.uploadInProgress||(this.uploadInProgress=!0,r.$html.trigger("sb.uploaders.uploadInProgress"))},fileUploaded:function(i,e,t){var s=this,o=s.$preview.closest(".form-one-object");this.uploadInProgress=!1,o.find(".error").remove(),t.response?(s.$preview.find(this.config.removeFile).data("form-submission-file-id",t.form_submission_file_id).end().find("input[name*=form_submission_file_ids]").val(t.form_submission_file_id),r.$html.trigger("sb.uploaders.uploadFinished")):t.errors&&(this.uploadErrors=!0,r.submitError(),$.each(t.errors,function(i,e){$('<span class="error">'+e[0]+"</span>").appendTo(o.find("label"))}),r.$html.trigger("sb.uploaders.uploadFailed"))},removingFile:function(i,e){var t=this,s=e.closest(".form-input-file-preview"),o=function(){i.removeFile(s.attr("id")),s.remove(),t.uploadErrors=!1,t.uploadInProgress=!1,r.$html.trigger("sb.uploaders.uploadFinished")};e.length&&e.data("form-submission-file-id")?$.post(appVisitor.apiRoutePrefixPath+"/api-website-feature/form-submission-files/"+e.data("form-submission-file-id"),{_method:"DELETE"},function(){o()}).error(function(){alert("Error")}):o()},error:function(e,t){if(t.code==plupload.FILE_SIZE_ERROR){t={};var s="fr-FR"==navigator.language?"La taille du fichier ne doit pas d\xe9passer "+this.config.plupload.max_file_size.replace(/(\d+)(mb)/,"$1Mo"):"The file size cannot exceed "+this.config.plupload.max_file_size;t[i.data("input-name")]=[s],r.showErrors(t)}}}})},initUploaders:function(){var i=this;this.$html.find(".form-input-file").each(function(){var e=$(this);e.find(".form-input-file-preview").hide().find(".form-input-file-name span").text("").end().find(".form-input-file-progressbar").css("width",0),e.data("uploader-initialized")||i.uploaders.push(i.addUploader(e))})},submit:function(){$("body").trigger("sb.forms.submitting"),this.sendAnalyticsEvent({action:"Soumission en cours"});var i=this,e=this.$form.serialize(),t=this.$form.attr("action"),r=!0;if($.each(this.uploaders,function(){if(this.uploadErrors)return r=!1,!1}),!r)return!1;this.loader.loading(),$.ajax({method:"POST",url:t,data:e,dataType:"JSON",success:function(e){e.response?(i.submitSuccess(),i.clearForm(),$("body").trigger("sb.forms.submitted"),i.sendAnalyticsEvent({action:"Soumission r\xe9ussie"}),i.reportConversion(),e.popup_path&&appVisitor.Popup.initFromPath(e.popup_path,i.$form.find("button[type=submit]")),e.redirect_url&&(window.location=e.redirect_url)):(e.errors&&(i.sendAnalyticsEvent({action:"Soumission \xe9chou\xe9e"}),i.showErrors(e.errors)),i.submitError())},error:function(){i.submitError(!0)}})},showErrors:function(i){var e=this,t=null;this.$html.find(".error").remove().end().find(".invalid").removeClass("invalid"),$.each(i,function(i,r){var s=e.$html.find("*[name*="+i+"]:first, *[data-input-name="+i+"]:first"),o=$('<span class="error"><small>'+r[0]+"</small></span>");if(s.length){var n=s.closest(".form-one-object"),a=n.find("label:first");!t&&n.length&&(t=n),s.addClass("invalid"),a.length?o.appendTo(a):n.length?o.prependTo(n):s.is(":checkbox")?o.insertBefore(s.closest("label")):o.addClass("global-error").prependTo(e.$form)}}),t&&$("html, body").animate({scrollTop:t.offset().top},500)}}),i}();