var locations = [
		[ 'Nokia', 28.4809855, 77.1082332, 'address 1', "olx.jpg" ],
		[ 'Samsung S6', 28.660849821183742, 77.10823320000004, 'address 2',
				"olx.jpg" ],
		[ 'Sony', 28.498971932118373, 77.10823320004004, 'address 3', "olx.jpg" ],
		[ 'LG', 28.552931228473494, 77.10823320005004, 'address 3', "olx.jpg" ],
		[ 'MI', 28.52595158029594, 77.10828320006004, 'address 3', "olx.jpg" ],
		[ 'Samsung', 28.53494479635512, 77.10826320009004, 'address 3',
				"olx.jpg" ],
		[ 'LAVA', 28.543938012414312, 77.10823320000334, 'address 3', "olx.jpg" ]

];
var current = [ 28.4809855, 77.1082332 ]
var map;
function myChange(o) {
	var r = o.value;
	console.log(r)
	var nelocation = [];
	for ( var i in locations) {
		var d = getDistance(current[0], current[1], locations[i][1],
				locations[i][2])
		console.log(d);
		if (d <= r) {
			nelocation.push(locations[i]);
		}
	}
	var myOptions = {
		center : new google.maps.LatLng(current[0], current[1]),
		zoom : 13,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		title : "I am Here!",

	};
	map = new google.maps.Map(document.getElementById("default"), myOptions);

	setMarkers(map, nelocation)
}

function myItem(items) {
	var item = items.value;
	var position = {};
	position.coords = {
		latitude : 28.4809855
	};
	position.coords = {
		longitude : 77.1082332
	};
	if (item == "Mobile") {

		initialize(position);
	} else {
		var myOptions = {
			center : new google.maps.LatLng(position.coords.latitude,
					position.coords.longitude),
			zoom : 13,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			title : "I am Here!",

		};
		map = new google.maps.Map(document.getElementById("default"), myOptions);
		var n = [[ 'I am here', 28.4809855, 77.1082332, 'Gurgaon', "olx.jpg"]]
		setMarkers(map, n)
	}
}
function init() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(initialize);
	} else {
		var position = {};
		position.coords = {
			latitude : 28.4809855
		};
		position.coords = {
			longitude : 77.1082332
		};
		initialize(position);
	}
}

function initialize(position) {

	var myOptions = {
		center : new google.maps.LatLng(position.coords.latitude,
				position.coords.longitude),
		zoom : 13,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		title : "I am Here!",

	};
	map = new google.maps.Map(document.getElementById("default"), myOptions);

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

var getDistance = function(lat1, lng1, lat2, lng2) {
	var R = 6378137; // Earth’s mean radius in meter
	var dLat = rad(lat1 - lat2);
	var dLong = rad(lng1 - lng2);
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1))
			* Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	return d; // returns the distance in meter
};

function createJSON() {
	var max = 100, min = 2;
	var d = Math.random() * (max - min) + min;
	var mobile = [ "Nokia", "Samsung", "MI", "APPLE", "SONY", "LG", "LAVA" ]
	for (var i = 1; i < 50; i++) {
		setDistance(28.4809855, 77.1082332, getRandom(1, 50), mobile[getRandom(
				0, 6)], i)
	}
	console.log(locations);
}

function getRandom(max, min) {
	return Math.random() * (max - min) + min;
}
/*
 * setDistance(28.4809855, 77.1082332, 8); setDistance(28.4809855, 77.1082332,
 * 5); setDistance(28.4809855, 77.1082332, 6); setDistance(28.4809855,
 * 77.1082332, 7);
 * 
 * function setDistance(lat1, lon1, d) { var R = 6371; var brng = 0; var LatMax;
 * brng = toRad(brng); var lat1 = toRad(lat1), lon1 = toRad(lon1); var lat2 =
 * Math.asin(Math.sin(lat1) * Math.cos(d / R) + Math.cos(lat1) Math.sin(d / R) *
 * Math.cos(brng));
 * 
 * var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(d / R) *
 * Math.cos(lat1), Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2)); lon2 =
 * (lon2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI; lat2 = toDeg(lat2); lon2 =
 * toDeg(lon2);
 * 
 * console.log(lat2 + "," + lon2); // alert(lat2); // alert(lon2); }
 */
function toRad(Value) {
	/** Converts numeric degrees to radians */
	return Value * Math.PI / 180;
}
function toDeg(Value) {
	return Value * 180 / Math.PI;
}