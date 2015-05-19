"use strict";

function Robot(){
	this.x = null;
	this.y = null;
	this.orientation = null;
	this.maze = null;
}


Robot.prototype.setMaze = function(maze){
	this.maze = maze;
	this.x = maze.startX;
	this.y = maze.startY;
	this.orientation = maze.startOrientation ;
}

Robot.prototype.turnRight = function(){
	if (!this.maze || !this.maze.isValidDirection(this.orientation)) return false;
	var rightTurns = {
		north: "east",
		south: "west",
		east: "south",
		west: "north"
	}
	this.orientation = rightTurns[this.orientation];
	return true;
}

Robot.prototype.turnLeft = function(){
	if (!this.maze || !this.maze.isValidDirection(this.orientation)) return false;
	var leftTurns = {
		north: "west",
		south: "east",
		east: "north",
		west: "south"
	}
	this.orientation = leftTurns[this.orientation];
	return true;
}

Robot.prototype.moveForward = function(){

	if (!this.canMoveForward()) return false;

	switch (this.orientation){
		case "north":
			this.y ++;
			break;
		case "east":
			this.x ++;
			break;
		case "south":
			this.y --;
			break;
		case "west":
			this.x --;
			break;
	}

	return true;
}

Robot.prototype.canMoveForward = function(){
	if (!this.maze) return false;
	return this.maze.canMove(this.x, this.y, this.orientation);
}

Robot.prototype.exitMaze = function(){
	var steps = 0;
	if (this.maze) {
		while(true){
			if (this.canMoveForward()){
				this.moveForward();
				this.turnLeft();
			}
			else{
				this.turnRight();
			}	
			steps++;
			if (this.x == this.maze.endX && this.y == this.maze.endY){
				console.log(steps);
				return true;
			}
		}
	}
	return false;

}