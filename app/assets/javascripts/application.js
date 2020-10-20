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


map.on("singleclick", function(evt){
  var newPoint = new ol.geom.Point(evt.coordinate);
  marker.set('geometry', newPoint);
});




$.widget( "custom.catcomplete", $.ui.autocomplete, {
  _create: function() {
    this._super();
    this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
  },
  _renderMenu: function( ul, items ) {
    var that = this,
      currentCategory = "";
    $.each( items, function( index, item ) {
      var li;
      if ( item.category != currentCategory ) {
        ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
        currentCategory = item.category;
      }
      li = that._renderItemData( ul, item );
      if ( item.category ) {
        li.attr( "aria-label", item.category + " : " + item.label );
      }
    });
  }
});
var data = [
  // { label: "South West", category: "Region" },
  // { label: "South East", category: "Region" },
  // { label: "London", category: "Region" },
  // { label: "East of England", category: "Region" },
  // { label: "West Midlands", category: "Region" },
  // { label: "East Midlands", category: "Region" },
  // { label: "North West", category: "Region" },
  // { label: "North East", category: "Region" },
  // { label: "Yorkshire and the Humber", category: "Region" },

  { label: "Adur and Ouse", category: "Catchment" },
  { label: "Bristol Avon and North Somerset Streams", category: "Catchment" },
  { label: "Cherwell", category: "Catchment" },
  { label: "Colne", category: "Catchment" },
  { label: "Cotswolds", category: "Catchment" },
  { label: "Darent", category: "Catchment" },
  { label: "Eden and Esk", category: "Catchment" },
  { label: "Irwell", category: "Catchment" },
  { label: "Loddon", category: "Catchment" },
  { label: "Lune", category: "Catchment" },
  { label: "Mersey Estuary", category: "Catchment" },
  { label: "Middle Dee", category: "Catchment" },
  { label: "Ribble", category: "Catchment" },
  { label: "Rother", category: "Catchment" },
  { label: "Severn Uplands", category: "Catchment" },
  { label: "Severn Vale", category: "Catchment" },
  { label: "Shropshire Middle Severn", category: "Catchment" },
  { label: "Soar", category: "Catchment" },
  { label: "Stour", category: "Catchment" },
  { label: "Swale, Ure, Nidd and Upper Ouse", category: "Catchment" },
  { label: "Thame and South Chilterns", category: "Catchment" },
  { label: "Thames (tidal)", category: "Catchment" },
  { label: "Tyne", category: "Catchment" },
  { label: "Upper and Bedford Ouse", category: "Catchment" },
  { label: "Upper iconfinder_marker", category: "Catchment" },
  { label: "Upper Mersey", category: "Catchment" },

  { label: "Accrington", category: "Town" },
  { label: "Alnwick", category: "Town" },
  { label: "Ashton-under-Lyne", category: "Town" },
  { label: "Axminster", category: "Town" },
  { label: "Bakewell", category: "Town" },
  { label: "Banbury", category: "Town" },
  { label: "Barton-upon-Humber", category: "Town" },
  { label: "Beaconsfield", category: "Town" },
  { label: "Caistor", category: "Town" },
  { label: "Camborne", category: "Town" },
  { label: "Chilton", category: "Town" },
  { label: "Chipping Norton", category: "Town" },
  { label: "Church Stretton", category: "Town" },
  { label: "Dalton-in-Furness", category: "Town" },
  { label: "Dawley", category: "Town" },
  { label: "Diss", category: "Town" },
  { label: "Droitwich Spa", category: "Town" },
  { label: "Dursley", category: "Town" },
  { label: "Easingwold", category: "Town" },
  { label: "Eastbourne", category: "Town" },
  { label: "Eccles", category: "Town" },
  { label: "Epping", category: "Town" },
  { label: "Fakenham", category: "Town" },
  { label: "Farnham", category: "Town" },
  { label: "Filey", category: "Town" },
  { label: "Fowey", category: "Town" },
  { label: "Frome", category: "Town" },
  { label: "Garstang", category: "Town" },
  { label: "Glossop", category: "Town" },
  { label: "Glastonbury", category: "Town" },
  { label: "Grange-over-Sands", category: "Town" },
  { label: "Halesworth", category: "Town" },
  { label: "Halifax", category: "Town" },
  { label: "Halstead", category: "Town" },
  { label: "Harrogate", category: "Town" },
  { label: "Henley-on-Thames", category: "Town" },
  { label: "Ilfracombe", category: "Town" },
  { label: "Ipswich", category: "Town" },
  { label: "Ivybridge", category: "Town" },
  { label: "Jarrow", category: "Town" },
  { label: "Keighley", category: "Town" },
  { label: "Kendal", category: "Town" },
  { label: "Keswick", category: "Town" },
  { label: "Kettering", category: "Town" },
  { label: "King's Lynn", category: "Town" },
  { label: "Kirby Lonsdale", category: "Town" },
  { label: "Knutsford", category: "Town" },
  { label: "Leek", category: "Town" },
  { label: "Ledbury", category: "Town" },
  { label: "Leigh-on-Sea", category: "Town" },
  { label: "Leominster", category: "Town" },
  { label: "Liskeard", category: "Town" },
  { label: "Macclesfield", category: "Town" },
  { label: "Malmesbury", category: "Town" },
  { label: "Malvern", category: "Town" },
  { label: "Melton Mowbray", category: "Town" },
  { label: "Minster", category: "Town" },
  { label: "Nantwich", category: "Town" },
  { label: "Neston", category: "Town" },
  { label: "Newbury", category: "Town" },
  { label: "Newmarket", category: "Town" },
  { label: "Norton-on-Derwent", category: "Town" },
  { label: "Oakengates", category: "Town" },
  { label: "Oldbury", category: "Town" },
  { label: "Orford", category: "Town" },
  { label: "Ormskirk", category: "Town" },
  { label: "Oundle", category: "Town" },
  { label: "Padstow", category: "Town" },
  { label: "Pateley Bridge", category: "Town" },
  { label: "Penistone", category: "Town" },
  { label: "Penrith", category: "Town" },
  { label: "Pickering", category: "Town" },
  { label: "Pontefract", category: "Town" },
  { label: "Rawtenstall", category: "Town" },
  { label: "Reading", category: "Town" },
  { label: "Redruth", category: "Town" },
  { label: "Reigate", category: "Town" },
  { label: "Ripley", category: "Town" },
  { label: "Ross-on-Wye", category: "Town" },
  { label: "Saffron Walden", category: "Town" },
  { label: "St Neots", category: "Town" },
  { label: "Sandbach", category: "Town" },
  { label: "Sedgefield", category: "Town" },
  { label: "Sevenoaks", category: "Town" },
  { label: "Sherborne", category: "Town" },
  { label: "Taunton", category: "Town" },
  { label: "Tenbury Wells", category: "Town" },
  { label: "Tewkesbury", category: "Town" },
  { label: "Thrapston", category: "Town" },
  { label: "Tickhill", category: "Town" },
  { label: "Ulverston", category: "Town" },
  { label: "Wallingford", category: "Town" },

  { label: "Bath", category: "City" },
  { label: "Bristol", category: "City" },
  { label: "Birmingham", category: "City" },
  { label: "Brighton & Hove", category: "City" },
  { label: "Cambridge", category: "City" },
  { label: "Canterbury", category: "City" },
  { label: "Carlisle", category: "City" },
  { label: "Chester", category: "City" },
  { label: "Derby", category: "City" },
  { label: "Durham", category: "City" },
  { label: "Exeter", category: "City" },
  { label: "Gloucester", category: "City" },
  { label: "Hereford", category: "City" },
  { label: "Lancaster", category: "City" },
  { label: "Leeds", category: "City" },
  { label: "Leicester", category: "City" },
  { label: "Lincoln", category: "City" },
  { label: "Liverpool", category: "City" },
  { label: "City of London", category: "City" },
  { label: "Manchester", category: "City" },
  { label: "Newcastle upon Tyne", category: "City" },
  { label: "Norwich", category: "City" },
  { label: "Nottingham", category: "City" },
  { label: "Oxford", category: "City" },
  { label: "Peterborough", category: "City" },
  { label: "Plymouth", category: "City" },
  { label: "Portsmouth", category: "City" },
  { label: "Preston", category: "City" },
  { label: "Ripon", category: "City" },
  { label: "Salford", category: "City" },
  { label: "Salisbury", category: "City" },
  { label: "Sheffield", category: "City" },
  { label: "Southampton", category: "City" },
  { label: "Sunderland", category: "City" },
  { label: "Truro", category: "City" },
  { label: "Wakefield", category: "City" },
  { label: "Westminster", category: "City" },
  { label: "Worcester", category: "City" },
  { label: "York", category: "City" },

  { label: "Bedford", category: "County" },
  { label: "Berkshire", category: "County" },
  { label: "Bristol", category: "County" },
  { label: "Buckinghamshire", category: "County" },
  { label: "Cambridgeshire", category: "County" },
  { label: "Cheshire East", category: "County" },
  { label: "City of London", category: "County" },
  { label: "Cornwall", category: "County" },
  { label: "Bath and North East Somerset", category: "County" },
  { label: "Blackburn with Darwen", category: "County" },
  { label: "Blackpool", category: "County" },
  { label: "Bracknell Forest", category: "County" },
  { label: "Brighton and Hove", category: "County" },
  { label: "Central Bedfordshire", category: "County" },
  { label: "Cheshire West and Chester", category: "County" },
  { label: "County Durham", category: "County" },
  { label: "Darlington", category: "County" },
  { label: "Derby", category: "County" },
  { label: "Dorset", category: "County" },
  { label: "East Riding of Yorkshire", category: "County" },
  { label: "Halton", category: "County" },
  { label: "Hartlepool", category: "County" },
  { label: "Herefordshire", category: "County" },
  { label: "Isle of Wight", category: "County" },
  { label: "Kingston upon Hull", category: "County" },
  { label: "Leicester", category: "County" },
  { label: "Luton", category: "County" },
  { label: "Medway", category: "County" },
  { label: "Middlesborough", category: "County" },
  { label: "Milton Keynes", category: "County" },
  { label: "North East Lincolnshire", category: "County" },
  { label: "North Lincolnshire", category: "County" },
  { label: "North Somerset", category: "County" },
  { label: "Northumberland", category: "County" },
  { label: "Nottingham", category: "County" },
  { label: "Peterborough", category: "County" },
  { label: "Redcar and Cleveland", category: "County" },
  { label: "Rutland", category: "County" },
  { label: "Shropshire", category: "County" },
  { label: "Merseyside", category: "County" },
  { label: "Slough", category: "County" },
  { label: "Telford and Wrekin", category: "County" },
  { label: "West Berkshire", category: "County" },
  { label: "Wiltshire", category: "County" },
  { label: "Windsor and Maidenhead", category: "County" },

  { label: "Usk", category: "Catchment" }
];

$( "#search" ).catcomplete({
  delay: 0,
  source: data
});







});
