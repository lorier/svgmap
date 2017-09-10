window.onload = function(){

	var atg = Snap('#map');


	//t=relative transform, T=absolute transform, s=relative scale, S=absolute Scale
	//r=relative rotate, R=relative rotate
	//relative means it takes into account previous transforms to accumulate
	//here it doesn't make much difference, until we combine later
	
	var bg = atg.select("#bg-layer");
	var bgX = bg.getBBox().cx;
	var bgY = bg.getBBox().cy;

	var paths = atg.selectAll("path"); //get all paths

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
		return { "cx" : mapx, "cy" : mapy }

	}

	function zoomMap(evt){

		pt = getScalingCenter(this);
		console.log(this);
		
		console.log(pt);

		x.toggleClass("inactive");
		// bg.animate({transform: "s2.1 2.1" + cx + " " + cy}, 500, mina.bounce);
		bg.animate({transform: "T"+pt.cx+" "+pt.cy+"S2 2 728 470"}, 200, mina.easein); //test based on creek center
		enableClickhandlers(false);
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

	function zoomMapOut(evt){
		this.toggleClass("inactive");
		bg.stop().animate({transform:"s1 1"}, 200, mina.easeout);
		enableClickhandlers(true);
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