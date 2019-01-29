# Memory Game - Diamond Sweeper

There are 8 diamonds hidden on the board, each diamond behind one of the squares.
The game ends when all diamonds are found. The user's score is the number of squares still left unturned.

<ul>
	<li>Make sure you have a recent version of <code>Node.js</code> installed.</li>
	<li>Create React App to make a new project: <code>npx create-react-app diamond-sweeper</code></li>
	<li>Delete all files in the src/ folder of the new project.</li>
	
```bash
cd diamond-sweeper
cd src

# If you're using a Mac or Linux:
rm -f *

# Or, if you're on Windows:
del *

# Then, switch back to the project folder
cd ..
```	
<li>Now, copy folders src and public from memory-game-master.</li>

Since now you are done with a set up, run <code>npm start</code> in the project folder and open <code>http://localhost:3000</code> in the browser, you should see Diamond Sweeper.

![Diamond Sweeper](https://github.com/akathrani/memory-game/blob/master/src/game.png)

# About Game

<p>This is a 8x8 Game Board which contains 8 hidden diamonds in it.</p>
<p>It showcases scoring system along with the total diamonds a player has to find.</p>
<p>Since the game has 64 boxes, of which 8 are diamonds, the highest a player can score is 56.</p>
<p>As you progress in the game, you will see hints in the form of arrows pointing towards the next nearest diamond.</p>