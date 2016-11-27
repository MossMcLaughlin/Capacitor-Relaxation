// Capacitor Potential Relaxation, Moss McLaughlin, Nov. 2016
/*
var usrinput = document.getElementById("frm1"); 
var capt = usrinput[0];
var capw = usrinput[1];
var gap = usrinput[2];
var iterations = usrinput[3];
*/

var capt = 1;
var capw = 1;
var d = 1;
var iterations= 500;
/*
const grid_size = 20;
const plate_thickness = (0.05*grid_size)+(0.15*capt*grid_size);
const plate_width = (0.15*grid_size)+(0.5*capw*grid_size);
const gap = 0.05*grid_size + (.2*grid_size*d);
*/
const grid_size = 100;
const plate_thickness = 20;
const plate_width = 40;
const gap = 20;

const plate_startx = Math.round((grid_size - plate_width)*0.5);
const plate_endx = Math.round((grid_size + plate_width)*0.5);
const plate1_endy = Math.round((grid_size-gap)*0.5);
const plate1_starty = Math.round((plate1_endy-plate_thickness));
const plate2_starty = Math.round((grid_size+gap)*0.5);
const plate2_endy = Math.round((plate2_starty+plate_thickness));

console.log(plate1_starty);
console.log(plate1_endy);
console.log(plate2_starty);
console.log(plate2_endy);
console.log(plate_startx);
console.log(plate_endx);


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
	console.log("iterating");
	for (i=1;i<grid_size-1;i++) { 
		for (j=1;j<grid_size-1;j++) {
			if (((j<plate_startx) || (j>plate_endx)) || 
(((i<plate1_starty)||(i>plate2_endy))||((i>plate1_endy)&&(i<plate2_starty)))) { 
				temp_array[i][j] = 0.25 * (array0[i-1][j]+array0[i+1][j]+array0[i][j-1]+array0[i][j+1]);	
			}
		}
	}
}


var array0 = mkarray(grid_size);
var temp_array = mkarray(grid_size);
console.log("iterations equals ",iterations);

var runit = function(iterations) {
	for (k=0;k<iterations;k++) {
		iterate(grid_size);
		array0 = temp_array;
	}
}		
	
array0 = setpotential(array0);
temp_array = setpotential(temp_array);

runit(iterations);
console.log(array0);

//console.log(array0);



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
			ctx.fillStyle = "rgb("+red_color+",50,"+blue_color+")";
//			console.log("Drawing",color,"At",(Math.round(j*canvas_width/grid_size)),Math.round((i*canvas_height/grid_size)));
			ctx.fillRect((Math.round(j*canvas_width/grid_size)),Math.round((i*canvas_height/grid_size)),pixel_size,pixel_size);
		}
	}
}




draw(grid_size,canvas_width,canvas_height);

/*
for (var i=0;i<(grid_size);i++) {      
	for (var j=0;j<grid_size;j++) {
		var ctx=document.getElementById('myCanvas').getContext('2d');
		var red_color = Math.round((125+125*array0[j][i]));
		var blue_color = Math.round(125-125*array0[j][i]);
		var color = "rgb("+red_color+",0,"+blue_color+")";
                ctx.fillStyle = "rgb("+Math.floor((125+125*array0[j][i]))+",0,"+Math.floor(125-125*array0[j][i])+")";
                console.log("Drawing",color,"At",(Math.round(j*canvas_width/grid_size)),Math.round((i*canvas_height/grid_size)));
//                      ctx.fillStle=color;
                ctx.fillRect((Math.round(j*canvas_width/grid_size)),Math.round((i*canvas_height/grid_size)),pixel_size,pixel_size);
        }
}


*/	
