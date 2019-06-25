function horizontalLegs(x , y){
  return (y == 99 && ( x > 57 && x < 145)); 
}


function NotHorizontalLegs(x , y){
  return (x == 100 && ( y > 57 && y < 145)); 
}


function sample(x , y){
  return (( x > 36 && x < 68) && ( y > 132 && y < 164)) || ( x > 32 && x < 40) && ( y > 127 && y < 135); 
}

function Legs(x,y){
  return (horizontalLegs(x,y) || NotHorizontalLegs(x,y));  
}


function IsWall(x,y){
  return Legs(x,y) || sample(x,y);  
}




function Node(x_,y_){
	this.i = x_;
	this.j = y_;
	this.pos = createVector(this.i,this.j);
	this.neighbors = [];
	this.serched = false;
	this.perent = null;
	this.block = false;

	this.show = function(isPath){
		if(isPath){
			fill(20,245,100,150);
		}else{
			noFill();
		}
		if(this.block){
			fill(0);
		}
		noStroke();
		rect(this.i*w,this.j*h,w,h);	
	}
	this.showNeighbors = function(){
		fill(20,245,100);
		stroke(0);
		for(var n = 0; n < this.neighbors.length;n++){
			rect(this.neighbors[n].i*w,this.neighbors[n].j*h,w,h);	
		}
	}
	this.AddNeighbor = function() {
    var i = this.i;
    var j = this.j;
    if (i < cols - 1) {
    	if(!grid[i + 1][j].block){
      	this.neighbors.push(grid[i + 1][j]);
    	}
    }
    if (i > 0) {
    	if(!grid[i - 1][j].block){
      	this.neighbors.push(grid[i - 1][j]);
    	}
    }
    if (j < rows - 1) {
    	if(!grid[i][j + 1].block){
      	this.neighbors.push(grid[i][j + 1]);
    	}
    }
    if (j > 0) {
      if(!grid[i][j - 1].block){
      	this.neighbors.push(grid[i][j - 1]);
    	}
    }
    if (i > 0 && j > 0) {
      if(!grid[i - 1][j - 1].block){
      	this.neighbors.push(grid[i - 1][j - 1]);
    	}
    }
    if (i < cols - 1 && j > 0) {
      if(!grid[i + 1][j - 1].block){
      	this.neighbors.push(grid[i + 1][j - 1]);
    	}
    }
    if (i > 0 && j < rows - 1) {
      if(!grid[i - 1][j + 1].block){
      	this.neighbors.push(grid[i - 1][j + 1]);
    	}
    }
    if (i < cols - 1 && j < rows - 1) {
      if(!grid[i + 1][j + 1].block){
      	this.neighbors.push(grid[i + 1][j + 1]);
    	}
    }
  }
}