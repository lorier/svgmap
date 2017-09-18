window.onload = function(){

	var atg = Snap('#map');
	console.log(atg);


	//t=relative transform, T=absolute transform, s=relative scale, S=absolute Scale
	//r=relative rotate, R=relative rotate
	//relative means it takes into account previous transforms to accumulate
	//here it doesn't make much difference, until we combine later
	
	var bg = atg.select("#bg-layer");


	var bgX = bg.getBBox().cx;
	var bgY = bg.getBBox().cy;
	var bgW = bg.getBBox().width;
	var bgH = bg.getBBox().height;

	var paths = atg.selectAll("path"); //get all gardens

	var mapx;
	var mapy;

	
	var x; //close button

	makeClose();
	enableClickhandlers();

	enableRollovers();

	function enableRollovers() {
		var suns = bg.selectAll('.sunplant');
		
		atg.select('#sun-button').hover(
			function(evt){
				suns.forEach(
					function(sun){
						sun.stop().animate({transform: 'S1.5 1.5 ' + sun.getBBox().cx + ' ' + sun.getBBox().cy}, 200, mina.easein);
					}
			)},
			function(evt){
				suns.forEach(
					function(sun){
						sun.stop().animate({transform: 'S1 1 ' + sun.getBBox().cx + ' ' + sun.getBBox().cy}, 200, mina.easein);
					}
			)}
			// bg.selectAll('.sunplant').stop().animate({transform: 's2 2 0 0'}, 200, mina.easein);
		);
	}
	
	function getScalingCenter(obj){

		var cx = obj.getBBox().cx;
		var cy = obj.getBBox().cy;

		mapx = bgX - cx;
		mapy = bgY - cy;

		return { "cx" : mapx, "cy" : mapy }

	}

	function getPathSize(obj){
		var w = obj.getBBox().width
		var h = obj.getBBox().height;

		return {
			w: w,
			h: h
		}
	}
	function calculateZoom(obj){
		var pct;
		var m = getPathSize(obj);
		
		//if the width to height ratio of the garden is greater than that of the map
		var bgRatio = bgW/bgH;
		var gRatio = obj.getBBox().width/obj.getBBox().height;

		if (gRatio <= bgRatio){
			pct = bgH/m.h;
			console.log("scale percentage based on height:" + pct);
			return pct;
		}else {
			pct = bgW/m.w;
			console.log("scale percentage based on width:" + pct);
			return pct;
		}
		return null;
	}

	//Click Handlers

	function zoomMap(evt){

		//exclude non-garden paths from zoom. 
		var className =  evt.target.getAttribute('class');
		var id = evt.target.getAttribute('id');

		var isGarden = /st[2-9]/.test(className); //contains substring st?
		var isNoClick = /no-click/g.test(id); //contains substring no-click?


		if(isGarden && !isNoClick && evt.target.id){

			var nodeName = "#"+ evt.target.id;

			var node = atg.select(nodeName);

			// // console.log(node);
			var pt = getScalingCenter(node);
			var pct = calculateZoom(node);

			x.removeClass("inactive");

			bg.animate({transform: "T"+pt.cx+" "+pt.cy+"S"+pct*.9 + " " + pct*.9 + " " + bgW/2 + " " + bgH/2}, 200, mina.easein); 
		}

	}

	function zoomMapOut(evt){
		x.addClass("inactive");
		bg.stop().animate({transform:"s1 1"}, 200, mina.easeout);
		// enableClickhandlers(true);
	}

	function makeClose(){
		x = atg.text(50, 50, "X");
		x.attr({
			fontSize: "30px",
			class: "inactive",
			id: "close"
		})
		x.click(zoomMapOut);
	}

	function enableClickhandlers(){
		bg.click(zoomMap);
	}


	//Ajax request for Sun Plant Data
	var req;
	var data;
	document.getElementById('sun-button').addEventListener('click', getPosts);

	function getPosts(){
		// http://localhost/svgmap/posts.json
		req = new XMLHttpRequest();

		if(!req){
			alert('Unable to make request');
			return false;
		}
		req.onreadystatechange = processJSON;
		req.open('GET', 'posts.json');
		//mdn note: If you do not set header Cache-Control: no-cache the browser will 
		//cache the response and never re-submit the request, making debugging challenging
		req.setRequestHeader('Cache-Control', 'no-cache'); //set after open but before send
		req.send();

	}

	function processJSON(){
		try {
			if(req.readyState === XMLHttpRequest.DONE){
				if(req.status === 200){
					data = req.responseText;
					console.log(data);
				}else{
					alert('Request failed');
				}
			}

		}catch(e){
			console.log('Caught exception: ' + e.description);
		}
	}



	// creek.click(function(evt){
	// 	getCenter(creek, "creek");
	// 	// getCenter(map, "map");
	// 	var centerMarker = map.circle(cx, cy, 20);

	// 	atg.animate({transform: "s2.1 2.1 " + cx + " " + cy}, 500, mina.bounce);
	// 	// map.animate({transform: "s2.1 2.1 " + cx + " " + cy}, 500, mina.bounce);
	// });
	// var cw = window.innerWidth/2;
	// var ch = window.innerHeight/2;
	// document.onmousedown = function(evt){
	// 	console.log("xpos: " + evt.clientX);
	// 	console.log("ypos: " + evt.clientY);
	// 	console.log("");
	// }


};