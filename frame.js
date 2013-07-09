function init() {
	var map = L.map('map').setView(startCoordinates, 16);

	L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		zoomAnimation: true
	}).addTo(map);

	L.polygon([
		[polygon1.a.y, polygon1.a.x],
		[polygon1.b.y, polygon1.a.x],
		[polygon1.b.y, polygon1.b.x],
		[polygon1.a.y, polygon1.b.x]
	], {
		color: '#000',
		weight: 2,
		fillColor: '#000',
		fillOpacity: 0.6
	}).addTo(map);

	L.polygon([
		[polygon2.a.y, polygon2.a.x],
		[polygon2.b.y, polygon2.a.x],
		[polygon2.b.y, polygon2.b.x],
		[polygon2.a.y, polygon2.b.x]
	], {
		color: '#000',
		weight: 2,
		fillColor: '#000',
		fillOpacity: 0.6
	}).addTo(map);

	var labelStasi = new L.Label({offset:[0,5], className:'left', clickable:true, noHide:true});
	labelStasi.setContent(polygon1.title);
	labelStasi.setLatLng([polygon1.b.y, polygon1.a.x]);
	map.showLabel(labelStasi);

	labelStasi.on('click', function () {
		map.setView(startCoordinates, 16);
	})

	var labelNSA = new L.Label({offset:[0,5], className:'right', clickable:true, noHide:true});
	labelNSA.setContent(polygon2.title);
	labelNSA.setLatLng([polygon2.b.y, polygon2.a.x]);
	map.showLabel(labelNSA);

	var interval = false;
	labelNSA.on('click', function () {
		zoomStep();
		interval = setInterval(zoomStep, 1000);
	});

	var zoomStep = function () {
		if (map.getZoom() > 3) {
			map.zoomOut(1, {animate:true});
		} else {
			stopZoom();
		}
	}

	var stopZoom = function () {
		if (interval) {
			clearInterval(interval);
			interval = false;
		}
	}

	map.on('mousedown', stopZoom);

	map.on('zoomend', function () {
		if (map.getZoom() < 16) {
			labelStasi.setContent(polygon1.title2);
		}
	});
}