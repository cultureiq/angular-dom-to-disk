angular.module('ciq.downloadable', []).
  directive('ciqDownloadable', function () {
    return {
		restrict: 'A',
		link: function(scope, element, attrs) {


			var actuallyDownload = function(canvas, filename){
				ReImg.fromCanvas(canvas).downloadPng(filename);
			};
			var downloadFromDOM = function(element, filename){
				var jqueryElement = $(element);
				html2canvas(element, {height: jqueryElement.height(), width: jqueryElement.width()}).then(function(canvas){
					document.body.appendChild(canvas);
					actuallyDownload(canvas, filename);
					$(canvas).remove();
				})
			};
			var downloadFromSVG = function(element, filename){
				var jqueryElement = $(element);
				var canvas = document.createElement('canvas');
				var jqueryCanvas = $(canvas);
				jqueryCanvas.height(jqueryElement.height());
				jqueryCanvas.width(jqueryElement.width());
				var oSerializer = new XMLSerializer();
				var sXML = oSerializer.serializeToString(jqueryElement.get(0))
				canvg(canvas, sXML, {ignoreMouse: true, ignoreAnimation: true,
					renderCallback: function(){
						actuallyDownload(canvas, filename);
						$(canvas).remove();
					}
				})
			};
			var downloadImage = function(element, filename){
				var elementType = $(element).get(0).tagName;
				if (elementType == 'svg'){
					downloadFromSVG(element, filename);
				}else{
					downloadFromDOM(element, filename);
				}
			};


			var jqueryButton = $('<div style="z-index:100;width:0;height:0;display:inline-block;opacity:0"><button style="background-color:black;border-radius:4px;border:none;padding:0;margin-left:-24px;width:24px;height:24px;">Icon</button></div>');
			$(element).before(jqueryButton);
			$(jqueryButton).position({
				my: 'right top',
				at: 'right top',
				of: $(element),
				within: $(element).parent(),
				collision: 'none'
			});
			$(jqueryButton)
				.mouseover(function(){
					$(jqueryButton).css('opacity',.83);
				})
				.mouseout(function(){
					$(jqueryButton).css('opacity',0);
				});
			$(element)
				.mouseover(function(){
					$(jqueryButton).css('opacity',.44);
				}).mouseout(function(){
					$(jqueryButton).css('opacity',0);
				});
			$(jqueryButton).click(function(){
				downloadImage(element, attrs.ciqDownloadable);
			})
		}
	}
  });
