window.onload = function(){

	var atg = Snap('#map');


	//t=relative transform, T=absolute transform, s=relative scale, S=absolute Scale
	//r=relative rotate, R=relative rotate
	//relative means it takes into account previous transforms to accumulate
	//here it doesn't make much difference, until we combine later
	
	var bg = atg.select("#bg-layer");


	var bgX = bg.getBBox().cx;
	var bgY = bg.getBBox().cy;
	var bgW = bg.getBBox().width;
	var bgH = bg.getBBox().height;

	var paths = atg.selectAll(".garden"); //get all gardens

	var mapx;
	var mapy;

	var clickedPath; //for debugging
	
	var x; //close button

	makeClose();
	enableClickhandlers(true);
	
	function getScalingCenter(obj){

		var cx = obj.getBBox().cx;
		var cy = obj.getBBox().cy;

		mapx = bgX - cx;
		mapy = bgY - cy;

		clickedPath = obj.attr("id");
		console.log(clickedPath + " center: " + cx + ", " + cy);
		console.log("bg center: " + mapx + ", " + mapy);

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

		pt = getScalingCenter(this);

		pct = calculateZoom(this);

		// console.log(this);
		
		// console.log(pt);

		x.removeClass("inactive");

		bg.animate({transform: "T"+pt.cx+" "+pt.cy+"S"+pct*.9 + " " + pct*.9 + " " + bgW/2 + " " + bgH/2}, 200, mina.easein); 
		
		console.log("bg dimensions: w=> " + bg.getBBox().width + " h=>" + bg.getBBox().height);
		console.log("Garden dimensions: w=>" + this.getBBox().width + " h=>" + this.getBBox().height);
		console.log(" ");
		// enableClickhandlers(false);
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

	function enableClickhandlers(bool){
		if(bool){
			for (var i = 0; i < paths.length; i++){
				paths[i].click(zoomMap);			
			}
		}else {
			for (var i = 0; i < paths.length; i++){
				paths[i].unclick(zoomMap);			
			}

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