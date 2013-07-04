


$(document).ready(function(){
	
	/* embed overlay code */
	
	$('body').append($($embed_overlay));

	$('.embed-button').click(function(evt){
		if ($('#embed-overlay:visible').length === 0) {
			$('#embed-overlay').fadeIn('fast');
		}
	});

	var $clickIn = false;
	$('#embed-overlay').click(function(evt){
		if (!$clickIn) {
			$('#embed-overlay').fadeOut('fast');
		}
		$clickIn = false;
	});
	$('#embed-form').click(function(evt){
		$clickIn = true;
	});

	/* embed code*/
	if ($('#embed-form').length) {
		var $f = $('#embed-form');
		var $url = 'http://apps.opendatacity.de/stasi-vs-nsa/frame.html';
		var embedCode = function(){
			var $code = '<iframe src="'+$url+'" width="950" height="580" scrolling="no" frameborder="0" style="margin:0"><a href="'+$url+'">Stasi versus NSA - Wieviel Platz brauchen die Aktenschr&auml;nke?</a></iframe><br>';
			$code += '<small>Gehe zu <a href="http://apps.opendatacity.de/stasi-vs-nsa/">Stasi versus NSA</a>. ';
			$code += 'Realisiert von <a rel="license" href="http://creativecommons.org/licenses/by/3.0/de/">CC-BY 3.0</a> <a href="http://www.opendatacity.de/">OpenDataCity</a>.</small>';
			$('#embed-code', $f).text($code);
		};
		embedCode();
		$(":input", $f).change(function(){
			embedCode();
		});
	}

});
