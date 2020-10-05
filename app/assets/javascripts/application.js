/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()

// var theRegion = req.session.data['region'];
// $('input[name="region"][value=' + theRegion + ']').attr('checked', true);


var source = new ol.source.Vector({wrapX: false});
var vector = new ol.layer.Vector({
  source: source
});

var baseMapLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});
var map = new ol.Map({
  target: 'map',
  layers: [ baseMapLayer, vector],
  view: new ol.View({
          center: ol.proj.fromLonLat([-1.4870429, 52.5684617]),
          zoom: 7 //Initial Zoom Level
        })
});


//Adding a marker on the map
var marker = new ol.Feature({
  geometry: new ol.geom.Point(
    ol.proj.fromLonLat([-1.4870429, 52.5684617]) // postcode CO5 7QG
  ),
});

marker.setStyle(new ol.style.Style({
        image: new ol.style.Icon(({
            crossOrigin: 'anonymous',
            src: '/public/images/iconfinder_marker.png'
        }))
    }));

var vectorSource = new ol.source.Vector({
  features: [marker]
});
var markerVectorLayer = new ol.layer.Vector({
  source: vectorSource,
});
map.addLayer(markerVectorLayer);

var draw; // global so we can remove it later

function addInteraction() {

    draw = new ol.interaction.Draw({
      source: source,
      type: 'Polygon'
    });
    map.addInteraction(draw);

}



// DRAGGABLE MARKER
var translate1 = new ol.interaction.Translate({
  features: new ol.Collection([marker])
});
map.addInteraction(translate1);
var coordMarker1;

map.on('pointermove', function(e) {
  if (e.dragging) return;
  var hit = map.hasFeatureAtPixel(map.getEventPixel(e.originalEvent));
  map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});
//////////////////////

});
