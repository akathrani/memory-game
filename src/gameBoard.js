import React, { Component } from 'react';
import { BOARD_SIZE } from './constants.js'

class GameBoard extends Component {
	constructor(props) {
      super(props);
      /* Create sequential array from 0 to 63 to make a Game Board of 8x8 */
      this.elementsArray = Array.from({length: BOARD_SIZE * BOARD_SIZE}, (v, i) => i);

      /* Create random locations for 8 diamonds by shuffling the array and then slicing it to pick 8 values */
      this.diamondArray = this.shuffle(this.elementsArray).slice(0, BOARD_SIZE);

      this.diamondPosition = [];

      this.diamondDirection = '';

      this.state = {
      	diamondsLeft: BOARD_SIZE,      	
      	score: (BOARD_SIZE * BOARD_SIZE) - BOARD_SIZE
      };

      this.turnCard = this.turnCard.bind(this);
 	}

 	/* Shuffle a given array */
	shuffle(arra1) {
	    var ctr = arra1.length, temp, index;

		// While there are elements in the array
	    while (ctr > 0) {
			// Pick a random index
		    index = Math.floor(Math.random() * ctr);
			// Decrease ctr by 1
		    ctr--;
			// And swap the last element with it
		    temp = arra1[ctr];
		    arra1[ctr] = arra1[index];
		    arra1[index] = temp;
	    }
    	return arra1;
	}

	/* Function to decrement a value.
	 * Default decrement by 1
	 */
	decrement(val, by = 1) {
		return val - by;
	}
	
	/* Calculate Row-Column Postion for each block */
	calcRowColPosition(index) {
		var row = Math.ceil(index/BOARD_SIZE);
		var col = index - ((row - 1) * BOARD_SIZE);

		return {
			'row': row,
			'col': col
		}
	}

	/* Functions to Calculate nearest distance
	   Reference: https://www.sitepoint.com/community/t/find-record-with-closest-latitude-longitude-from-stringifyed-data-in-localstorage/23845
	 */

	vectorDistance(dx, dy) {
        return Math.sqrt(dx * dx + dy * dy);
    }

    locationDistance(location1, location2) {
        var dx = location1.x - location2.x,
            dy = location1.y - location2.y;

        return this.vectorDistance(dx, dy);
    }

	closestLocation(locationData, targetLocation) {

		/* Store object of this class to be used inside a function */
		var _thisClass = this;
	    return locationData.reduce(function(prev, curr) {
	        var prevDistance = _thisClass.locationDistance(targetLocation , prev),
	            currDistance = _thisClass.locationDistance(targetLocation , curr);
	        return (prevDistance < currDistance) ? prev : curr;
	    });
	}

	/**** Distance Functions End ****/

	/* Remove matched element from an array */
	removeArrayElement(arr, needle) {
		var index = this.diamondPosition.findIndex(function(dp) {
			return dp.x === needle.x && dp.y === needle.y;
		});

		/* Remove element from array by index */
		arr.splice(index, 1);

		return arr;
	}

	/* Get all elements of diamonds and store their row col to find nearest Diamond */
	createDiamondPositionList() {
		if(this.diamondPosition.length === 0){
			var diamondElements = document.querySelectorAll('[data-type=diamond]');			
			for(var i=0; i<diamondElements.length; i++)
			{
				this.diamondPosition.push({
					'x': diamondElements[i].getAttribute('data-row'),
					'y': diamondElements[i].getAttribute('data-col')
				});
			}
		}
	}

	/* Find Direction to nearest Diamond */
	findDirection(currentLocation, targetLocation) {
		var direction = '';
		if(currentLocation.x === targetLocation.x) {
			direction = (currentLocation.y > targetLocation.y) ? 'left' : 'right';
		}
		else {
			direction = (currentLocation.x > targetLocation.x) ? 'up' : 'down';
		}

		return direction;
	}

	/* Triggered when a card is clicked */
	turnCard(e) {
		var curElem = e.target;
		var curPosArr = {
				'x': curElem.getAttribute('data-row'),
				'y': curElem.getAttribute('data-col')
			};

		/* Create an array with positions of all diamonds */
		this.createDiamondPositionList();

		/* Remove previous direction */
		if(this.diamondDirection !== '') {
			var directionElem = document.querySelector('.gccm li.' + this.diamondDirection);
			if(directionElem)
			{
				directionElem.classList.remove(this.diamondDirection);
			}
		}

		/* Add diamond class */
		if(curElem.getAttribute('data-type') === 'diamond') {
			if(!curElem.classList.contains('diamond'))
			{
				/* Decrement */				
				this.setState({diamondsLeft: this.decrement(this.state.diamondsLeft)});
				
				curElem.classList.add('diamond');

				/* Remove Found Diamond from the list for nearest diamond detection */
				this.diamondPosition = this.removeArrayElement(this.diamondPosition, curPosArr);

				this.diamondDirection = '';
			}
		}
		/* For non-diamond ones, add empty class */
		else if(!curElem.classList.contains('empty')){
			curElem.classList.add('empty');
			this.setState({score: this.decrement(this.state.score)});
		
			/* Nearest Diamond Detection */
			var nearestDiamond = this.closestLocation(this.diamondPosition, curPosArr);
			this.diamondDirection = this.findDirection(curPosArr, nearestDiamond)

			/* Add Direction class to current clicked element */
			curElem.classList.add(this.diamondDirection);
		}
	}	

	/* Initial Game Board */
	gameStart() {
		return (
			<div id="deck">				
				<div className='score'>
					<ul>
						<li>Your Score: <span>{this.state.score}</span></li>
						<li>Diamonds Left: <span>{this.state.diamondsLeft}</span></li>
					</ul>
				</div>
				{/* gccm - grid--cards-container--multirow */}
			  	<ul className='gccm' aria-labelledby='cd'>
				  	{
				  		this.elementsArray.map((value, index) => {
				  			
				  			var rowColPos = this.calcRowColPosition(index + 1);

				  			return (
								<li
									key={index.toString()}
									tabIndex={(index+2).toString()}
								    data-type={this.diamondArray.indexOf(index) > -1 ? 'diamond' : null}
								    data-row={rowColPos.row}
								    data-col={rowColPos.col}
								    onClick={this.turnCard}
								></li>
							)
						})
					}
			  	</ul>
		  	</div>
		);
	}
	
	/* Called when the game is over */
	gameOver() {
		return (
			<div id="gameOver" className="sir">
				<span className="message" tabIndex="1">Game Over</span>
				<span className="score" tabIndex="2">Your Score is {this.state.score}</span>
				<a href="/" tabIndex="3">Play Again</a>
			</div>
		);
	}

	render() {
		return (
			<div>
				{
					this.state.diamondsLeft === 0 ? this.gameOver() : this.gameStart()
				}
			</div>
		);
	}
}

export default GameBoard;