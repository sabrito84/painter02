var appVisitor=appVisitor||{};appVisitor.ElementMapItinerary=function(e){function t(){return e.apply(this,arguments)}return utils.extend(t,e),$.extend(t.prototype,{_setItinerary:function(){if(2==this.markers.length){var e=new google.maps.DirectionsService,t=new google.maps.DirectionsRenderer;t.setMap(this.map),this.$html.hasClass("with-itinerary-textual-directions")&&t.setPanel(this.$html.siblings(".map-textual-directions")[0]),e.route({origin:this.markers[0].getPosition(),destination:this.markers[1].getPosition(),travelMode:google.maps.TravelMode.DRIVING},function(e,i){i===google.maps.DirectionsStatus.OK?t.setDirections(e):window.alert("Impossible d'afficher les directions \xe0 cause de l'erreur "+i)})}}}),t}(appVisitor.ElementMap);