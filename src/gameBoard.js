import React, { Component } from 'react';

class GameBoard extends Component {
	constructor(props) {
      super(props);
      /* Create sequential array from 0 to 63 to make a Game Board of 8x8 */
      this.elementsArray = Array.from({length: 64}, (v, i) => i);

      /* Create random locations for 8 diamonds by shuffling the array and then slicing it to pick 8 values */
      this.diamondArray = this.shuffle(this.elementsArray).slice(0,8);

      this.state = {
      	totalDiamondFound: 0
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
		/* Add diamond class */		
		if(curElem.getAttribute('type') === 'diamond') {
			if(!curElem.classList.contains('diamond'))
			{
				this.state.totalDiamondFound++;
				//alert(this.state.totalDiamondFound);
				console.log(this);
				curElem.classList.add('diamond');
			}
		}
		/* For non-diamond ones, add empty class */
		else {
			curElem.classList.add('empty');			
		}
	}

	render() {
		return (
			/* gccm - grid--cards-container--multirow */
		  	<ul className='gccm'>
			  	{
			  		this.elementsArray.map((value, index) => 
					<li
						key={index.toString()}	
						tabindex={(index+2).toString()} 
					    type={(this.diamondArray.indexOf(index) > -1) ? 'diamond' : ''}
					    onClick = {this.turnCard}
					  ></li>
					)
				}
		  	</ul>
		);
	}
}

export default GameBoard;