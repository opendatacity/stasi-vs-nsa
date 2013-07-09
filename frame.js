function init() {
	var map = L.map('map');
	var cleanText = function (text) {
		return text.replace(/<br><br>/gi, '#').replace(/<br>/gi, ' ').replace(/#/g, '<br><br>');
	}

	var width = map.getSize().x;
	if (width < 740) {
		polygon1.title  = cleanText(polygon1.title);
		polygon1.title2 = cleanText(polygon1.title2);
		polygon2.title  = cleanText(polygon2.title);
		startCoordinates[0] -= 5e-4;
		startCoordinates[1] -= (polygon1.b.x-polygon1.a.x)/2;
	}

	map.setView(startCoordinates, 16)

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

	var label1 = new L.Label({offset:[0,5], className:'left', clickable:true, noHide:true});
	label1.setContent(polygon1.title);
	label1.setLatLng([polygon1.b.y, polygon1.a.x]);
	map.showLabel(label1);

	label1.on('click', function () {
		map.setView(startCoordinates, 16);
	})

	var label2 = new L.Label({offset:[0,5], className:'right', clickable:true, noHide:true});
	label2.setContent(polygon2.title);
	label2.setLatLng([polygon2.b.y, polygon2.a.x]);
	map.showLabel(label2);

	if (width < 740) {
		w = Math.floor(width/2-100);
		label1._container.style.width = w+'px';
		label2._container.style.width = w+'px';

		label1._container.style.whiteSpace = 'normal';
		label2._container.style.whiteSpace = 'normal';
	}

	var interval = false;
	label2.on('click', function () {
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
			label1.setContent(polygon1.title2);
		}
	});
}