"use strict";

function Maze(width, height){
	this.width = width;
	this.height = height;
	this.startX = null;
	this.startY = null;
	this.startOrientation = null;
	this.endX = null;
	this.endY = null;
	this.directionArray =  ["north", "south", "east", "west"];
	this.spaces = []; 
	var i,j;
	for (i=0; i < width; i++){

		this.spaces[i] = [];
		for(j=0; j < height; j++){
			this.spaces[i][j] = new MazeSpace(this.directionArray);
		}
	}
}

Maze.prototype.setStart = function(x, y, orientation){
	if (this.isInsideBounds(x,y) === 1 && this.isValidDirection(orientation) !== -1){
		this.startX = x;
		this.startY = y;
		this.startOrientation = orientation;	
		return true;	
	}
	return false;
}

Maze.prototype.setExit = function(x, y){
	if (this.isInsideBounds(x,y) === 1){
		this.endX = x;
		this.endY = y;		
		return true;
	}
	return false;
}

Maze.prototype.setWall = function(x, y, direction){

	if ( this.isInsideBounds(x,y) === 1 && this.isValidDirection(direction) !== -1 ){
		this.spaces[x][y].setWall(direction);
		return true;
	}
	return false;
}

Maze.prototype.isValidDirection = function(direction){
	if (this.directionArray.indexOf(direction) !== -1){
		return 1;
	}
	return -1;
}

Maze.prototype.isInsideBounds = function(x, y){
	if ( x > 0 && x < this.width  &&  y > 0 && y < this.height){
		return 1;
	}
	return -1;
}

Maze.prototype.canMove = function(x, y, direction){
	if (this.isValidDirection(direction) == - 1) return false;
	if (this.isInsideBounds(x, y) == -1) return false;

	var forwardX, forwardY;
	switch (direction){
		case "north":
			forwardX = x;
			forwardY = y + 1;
			break;
		case "east":
			forwardX = x + 1;
			forwardY = y;
			break;
		case "south":
			forwardX = x;
			forwardY = y - 1;
			break;
		case "west":
			forwardX = x - 1;
			forwardY = y;
			break;
	}

	if (this.isInsideBounds(forwardX, forwardY) == -1) return false;
	if (this.spaces[x][y][direction]) return false;

	var oppositeDirections = {
		north: "south",
		south: "north",
		east: "west",
		west: "east"
	}

	if (this.spaces[forwardX][forwardY][oppositeDirections[direction]]) return false;

	return true;
}