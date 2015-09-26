var locations = [];

function init() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(initialize);
	} else {
		var position = {};
		position.coords.latitude = 28.4809855;
		position.coords.longitude = 77.1082332;
		initialize(position);
	}
}

function initialize(position) {
	//createJSON();
	var myOptions = {
		center : new google.maps.LatLng(position.coords.latitude,
				position.coords.longitude),
		zoom : 10,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		title : "I am Here!",

	};
	var map = new google.maps.Map(document.getElementById("default"), myOptions);

	setMarkers(map, locations)

}

function setMarkers(map, locations) {

	var marker, i

	for (i = 0; i < locations.length; i++) {

		var loan = locations[i][0]
		var lat = locations[i][1]
		var long = locations[i][2]
		var add = locations[i][3]
		var icon = locations[i][4]

		latlngset = new google.maps.LatLng(lat, long);

		var marker = new google.maps.Marker({
			map : map,
			title : loan,
			position : latlngset
		});
		map.setCenter(marker.getPosition())

		var content = "<h3>Device : " + loan + '</h3>' + "Address: " + add

		var infowindow = new google.maps.InfoWindow()

		google.maps.event.addListener(marker, 'click', (function(marker,
				content, infowindow) {
			return function() {
				infowindow.setContent(content);
				infowindow.open(map, marker);
			};
		})(marker, content, infowindow));

	}
}

var rad = function(x) {
	return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
	var R = 6378137; // Earth’s mean radius in meter
	var dLat = rad(p2.lat() - p1.lat());
	var dLong = rad(p2.lng() - p1.lng());
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat()))
			* Math.cos(rad(p2.lat())) * Math.sin(dLong / 2)
			* Math.sin(dLong / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	return d; // returns the distance in meter
};



function createJSON() {
	var max = 100, min = 2;
	var d = Math.random() * (max - min) + min;
	var mobileArr = ["Nokia", "Samsung", "MI", "APPLE", "SONY", "LG", "LAVA"]
	for (var i = 1; i < 50; i++) {
		var r = getRandom(0,6);
		setDistance(28.4809855, 77.1082332, getRandom(1,1), mobileArr[r], i)
	}
	console.log(locations);
}

function getRandom(min, max) {
	return Math.floor((Math.random() * 10) + 1);;
}


function setDistance(lat1, lon1, d, band, count) {
	var R = 6371;
	var brng = 0;
	var LatMax;
	brng = toRad(brng);
	var lat1 = toRad(lat1), lon1 = toRad(lon1);
	var lat2 = Math.asin(Math.sin(lat1) * Math.cos(d / R) + Math.cos(lat1)
			* Math.sin(d / R) * Math.cos(brng));

	var lon2 = lon1
			+ Math.atan2(Math.sin(brng) * Math.sin(d / R) * Math.cos(lat1),
					Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2));
	lon2 = (lon2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
	lat2 = toDeg(lat2);
	lon2 = toDeg(lon2);
	locations.push([band, lat1, lon1, 'Address '+count, "olx.jpg"]);
	console.log(lat2 + "::" + lon2);
	// alert(lat2);
	// alert(lon2);
}

function toRad(Value) {
	/** Converts numeric degrees to radians */
	return Value * Math.PI / 180;
}
function toDeg(Value) {
	return Value * 180 / Math.PI;
}