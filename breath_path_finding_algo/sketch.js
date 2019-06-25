var cols = 200;
var rows = 200;
var grid = new Array(cols);
var h;
var w;

var q = []
var path = []
var pathX = []
var pathY = []
var start;
var end;

var current;
let bg

function setup() {
	createCanvas(600,600);
	w = width/cols;
	h = height/rows;
	for (var i = 0; i < cols; i++) {
		grid[i] = new Array(rows);
	};
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Node(i,j);	
		};				
	};
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if(IsWall(i,j)){
				grid[i][j].block = true;
				setSeroundingBlocks(i,j)
			}	
		};				
	};
	
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].AddNeighbor();;	
		};				
	};
	start = grid[81][80];
	end = grid[21][181];
  q.push(start);
  BFSreset();
  BFS();
}

function findPath(){
	path = [];
	path.push(start.pos);
	
	pathX = [];
	pathX.push(start.pos.x);

	pathY = [];
	pathY.push(start.pos.y);
	
	var prev = current;
	while(prev != start){
		path.push(prev.pos);
		
		pathX.push(prev.pos.x);
		
		pathY.push(prev.pos.y);
		prev = prev.perent;
	}
	console.log("X - " + pathX + "      lenght - " + pathX.length)
	console.log("Y - " + pathY + "      lenght - " + pathY.length)
	showPath()
}

function mousePressed(){
	var mx = int(mouseX/w);
	var my = int(mouseY/h);
	start = end;
	end = grid[mx][my];
	console.log("i - "+ mx + "j - "+ my)
	background(255);
	BFSreset();
	BFS();
}

function BFS(){
	while(q.length > 0){
		current = q.shift();
		if(current == end){
			console.log("DONE!");
			findPath();
		}
		for(var i = 0 ; i < current.neighbors.length; i++){
			if(!current.neighbors[i].serched){
				current.neighbors[i].perent = current;
				current.neighbors[i].serched = true;
				q.push(current.neighbors[i]);
			}
		}
	}
}
function BFSreset(){
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show(false);
		};				
	};
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].serched = false;
			grid[i][j].perent = null;	
		};				
	};
	q = [];
	q.push(start);
}
function showPath(){
	for(var i = 0; i < path.length; i++){
		var pc = path[i];
		grid[pc.x][pc.y].show(true);
	}
	console
}
function setSeroundingBlocks(i_,j_){
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if(dist(i,j,i_,j_) < 18.5){
				grid[i][j].block = true;
			}	
		};				
	};
}