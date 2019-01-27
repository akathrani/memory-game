import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const element = (
  <h2 className='sil' id='cd'>Diamond Sweeper</h2>
);
ReactDOM.render(element, document.getElementById('pt'));

/*setInterval(tick, 1000);*/

/*var diamondArray = Array.from({length: 8}, () => Math.floor(Math.random() * 64));*/

function shuffle(arra1) {
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

var elementsArray = Array.from({length: 64}, (v, i) => i);
var diamondArray = shuffle(elementsArray).slice(0,8);

var listItems = (
	elementsArray.map((value, index) => 
	<li
		key={index.toString()}
	    type={(diamondArray.indexOf(index) > -1) ? 'diamond' : ''}
	  ></li>
	)
);

/* gccm - grid--cards-container--multirow  */
ReactDOM.render(
  <ul className='gccm' aria-labelledby='cd'>{listItems}</ul>,
  document.getElementById('deck')
);