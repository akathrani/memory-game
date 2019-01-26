import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const element = (
  <h2 className='sil' id='cd'>Diamond Sweeper</h2>
);
ReactDOM.render(element, document.getElementById('root'));

/*setInterval(tick, 1000);*/

var listItems = (
	Array.from(Array(8)).map((n, number) => 
	<li
		className='card'
		type="diamond"
	  >{number}</li>
	)
);

/* gccm - grid--cards-container--multirow  */
ReactDOM.render(
  <ul class='gccm' aria-labelledby='cd'>{listItems}</ul>,
  document.getElementById('deck')
);