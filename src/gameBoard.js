import React, { Component } from 'react';
import { BOARD_SIZE } from './constants.js'

class GameBoard extends Component {
	constructor(props) {
      super(props);
      /* Create sequential array from 0 to 63 to make a Game Board of 8x8 */
      this.elementsArray = Array.from({length: BOARD_SIZE * BOARD_SIZE}, (v, i) => i);

      /* Create random locations for 8 diamonds by shuffling the array and then slicing it to pick 8 values */
      this.diamondArray = this.shuffle(this.elementsArray).slice(0,BOARD_SIZE);

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

	turnCard(e) {
		var curElem = e.target;

		console.log(curElem.offsetTop + '---' + curElem.offsetLeft);

		/* Add diamond class */		
		if(curElem.getAttribute('type') === 'diamond') {
			if(!curElem.classList.contains('diamond'))
			{
				/* Decrement */				
				this.setState({diamondsLeft: this.decrement(this.state.diamondsLeft)});
				
				curElem.classList.add('diamond');
			}
		}
		/* For non-diamond ones, add empty class */
		else if(!curElem.classList.contains('empty')){
			curElem.classList.add('empty');
			this.setState({score: this.decrement(this.state.score)});
		}
	}

	/* Function to decrement a value.
	 * Default decrement by 1
	 */
	decrement(val, by = 1) {
		return val - by;
	}

	/* Initial Game Board */
	gameStart() {
		return (
			<div id="deck">
				<div className='score'>
					<ul>
						<li>Your score <span>{this.state.score}</span></li>
						<li>Diamond left<span>{this.state.diamondsLeft}</span></li>
					</ul>
				</div>
				{/* gccm - grid--cards-container--multirow */}
			  	<ul className='gccm' aria-labelledby='cd'>
				  	{
				  		this.elementsArray.map((value, index) => 
						<li
							key={index.toString()}
							tabIndex={(index+2).toString()}
						    type={(this.diamondArray.indexOf(index) > -1) ? 'diamond' : null}
						    onClick={this.turnCard}
						  ></li>
						)
					}
			  	</ul>
		  	</div>
		);
	}
	
	/* Called when the game is over */
	gameOver() {
		return (
			<div id="gameOver" className="sir">
				<span className="message">Game Over</span>
				<span className="score">{this.state.score}</span>
				<a href="/">Once More</a>
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