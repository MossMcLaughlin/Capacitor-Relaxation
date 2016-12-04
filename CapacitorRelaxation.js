// Capacitor Potential Relaxation, Moss McLaughlin, Dec. 2016


const grid_size = 100;
var capw = 0;
var caph = 0;
var dist = 0;
var iterations = 0;
var plate_thickness = 0;
var plate_width = 0;
var gap = 0;
var plate_startx = 0;
var plate_endx = 0;
var plate1_endy =0;
var plate1_starty = 0;
var plate2_starty = 0;
var plate2_endy = 0;


var setvalues = function() {
	capw = document.getElementById("width").value / 100; 
	caph = document.getElementById("height").value / 100;
	dist = document.getElementById("gap").value / 100;
	iterations = document.getElementById("it").value;

	plate_thickness = Math.round(caph*grid_size);
	plate_width = Math.round(capw*grid_size);
	gap = Math.round(dist*grid_size);

	plate_startx = Math.round((grid_size - plate_width)*0.5);
	plate_endx = Math.round((grid_size + plate_width)*0.5);
	plate1_endy = Math.round((grid_size-gap)*0.5);
	plate1_starty = Math.round((plate1_endy-plate_thickness));
	plate2_starty = Math.round((grid_size+gap)*0.5);
	plate2_endy = Math.round((plate2_starty+plate_thickness));

}
/*
console.log(plate1_starty);
console.log(plate1_endy);
console.log(plate2_starty);
console.log(plate2_endy);
console.log(plate_startx);
console.log(plate_endx);
*/

var mkarray = function(size) {
        let a1= [];
        for (i=0;i<size+1;i++) {
		let a0 = [];
		for (j=0;j<size+1;j++) {
                	a0.push(0);
		}
		a1[i]=a0;
	}
	return a1;
}



// Set potential of top plate to 1, bottom plate to -1
var setpotential = function() {
	let a = mkarray(grid_size);
	for (i=plate1_starty;i<=plate1_endy;i++) {
		let a0 = [];
        	for (k=0;k<grid_size;k++) {
                	a0.push(0);
		}
		for (j=plate_startx;j<=plate_endx;j++) {
			a0[j] = 1;		
		}
	a[i]=a0;
	}

        for (i=plate2_starty;i<=plate2_endy;i++) {
                let a1 = [];
                for (k=0;k<grid_size;k++) {
                        a1.push(0);
                }
                for (j=plate_startx;j<=plate_endx;j++) {
                        a1[j] = -1;
                }
        a[i]=a1;
        }
	return(a);
}

// Note the edges are grounded. Leave edge values as zeros.
var iterate = function(grid_size) {
	for (i=1;i<grid_size-1;i++) { 
		for (j=1;j<grid_size-1;j++) {
			if (((j<plate_startx) || (j>plate_endx)) || 
(((i<plate1_starty)||(i>plate2_endy))||((i>plate1_endy)&&(i<plate2_starty)))) { 
				temp_array[i][j] = 0.25 * (array0[i-1][j]+array0[i+1][j]+array0[i][j-1]+array0[i][j+1]);	
			}
		}
	}
}

var calc = function(iterations) {
	array0 = mkarray(grid_size);
	temp_array = mkarray(grid_size);
	array0 = setpotential(array0);
	temp_array = setpotential(temp_array);
	for (k=0;k<iterations;k++) {
		iterate(grid_size);
		array0 = temp_array;
	}
}		
	
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var canvas_width = canvas.width;
var canvas_height = canvas.height;
var pixel_size = Math.round(1/grid_size*canvas_width);
var draw = function(grid_size,canvas_width,canvas_height) {
	for (i=0;i<(grid_size);i++) {		
		for (j=0;j<grid_size;j++) {
			var red_color = Math.round((125+125*array0[i][j]));
			var blue_color = Math.round(125-125*array0[i][j]);
			ctx.fillStyle = "rgb("+red_color+","+Math.round(250-(Math.abs(red_color-blue_color)))+","+blue_color+")";
//			console.log("Drawing",color,"At",(Math.round(j*canvas_width/grid_size)),Math.round((i*canvas_height/grid_size)));
			ctx.fillRect((Math.round(j*canvas_width/grid_size)),Math.round((i*canvas_height/grid_size)),pixel_size,pixel_size);
		}
	}
}



function __runit__() {
	setvalues();	
	calc(iterations);
	document.getElementById("numit").innerHTML = "Number of iterations = "+iterations;
	draw(grid_size,canvas_width,canvas_height);
		
}


var array0 =mkarray(grid_size);
var temp_array = mkarray(grid_size);

