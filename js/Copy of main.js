var jsonData = [ {
	city : "Gurgaon",
	location : [ 28.4809855, 77.1082332 ],
	data : [ [ 'loan 1', 33.890542, 151.274856, 'address 1' ],
			[ 'loan 2', 33.923036, 151.259052, 'address 2' ],
			[ 'loan 3', 34.028249, 151.157507, 'address 3' ],
			[ 'loan 4', 33.80010128657071, 151.28747820854187, 'address 4' ],
			[ 'loan 5', 33.950198, 151.259302, 'address 5' ] ]
} ];

function olx() {
	
};

olx.prototype.init = function() {
	var myOptions = {
		center : new google.maps.LatLng(jsonData.location[0][0],
				jsonData.location[0][1]),
		zoom : 8,
		mapTypeId : google.maps.MapTypeId.ROADMAP

	};
	var map = new google.maps.Map(document.getElementById("default"), myOptions);
	setMarkers(map, jsonData.data)
}

olx.prototype.setMarkers = function(map, locations) {
	var marker, i

	for (i = 0; i < locations.length; i++) {

		var loan = locations[i][0]
		var lat = locations[i][1]
		var long = locations[i][2]
		var add = locations[i][3]

		latlngset = new google.maps.LatLng(lat, long);

		var marker = new google.maps.Marker({
			map : map,
			title : loan,
			position : latlngset
		});
		map.setCenter(marker.getPosition())

		var content = "Loan Number: " + loan + '</h3>' + "Address: " + add

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
olx.prototype.init = function() {

}

var myApp = angular.module("olx", [ "ngRoute" ]);

var myCenter = new google.maps.LatLng(28.4809855, 77.1082332);

function initialize() {
	var mapProp = {
		center : myCenter,
		zoom : 14,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

	var marker = new google.maps.Marker({
		position : myCenter,
		icon : "images/olx.jpg",
		title : 'I am here'
	});

	marker.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);

myApp.service('listService', function() {
	var list = [];

	this.add = function(d) {
		list.push(d);
	}

	this.get = function(d) {
		return list;
	}
});

myApp.config(function($routeProvider) {
	$routeProvider

	.when("/", {
		templateUrl : "pages/search.html",
		controller : 'searchController'
	}).when("/add", {
		templateUrl : "pages/add.html",
		controller : 'addController'
	})

});

myApp.controller('searchController', function() {
	$("#search").addClass("active");
	$("#add").removeClass("active");
	// alert("first...");
});
myApp.controller('addController', function() {
	$("#search").removeClass("active");
	$("#add").addClass("active");
	// alert("Second...")
});
