

## Description
This is a 5×5 grid of lights. Some of them start turned on (bright white), some are off (dark). When I click a light, it doesn’t just toggle that one – it also flips its neighbours up, down, left, and right. The goal is simple to say but surprisingly tricky to do: turn every single light off.

As I play, the game keeps track of how many moves I have made and tells me when I have won. There’s a New Game button to get a fresh random puzzle, and an Undo button if I regret a move and want to step back in time. The whole thing runs in the browser, with a clean, glowing look and smooth, snappy interactions, so it feels fun to poke at even while I am thinking through the puzzle.

## Discussion Questions
### 1. Why is ”lifting state up” (from Grid to Game) a necessary pattern for implementing
the ”undo” feature?
In this game, the undo button needs to know what the whole board looked like at each step, not just one light. If every Light kept its own state, each one would only know about itself, and there’d be no easy way to say “go back to move 3” for the whole grid.
By putting the state in the top-level Game component instead, we have one place that knows everything:
-	the full board for the current move
-	the history of all previous boards
-	how many moves we’ve made
The grid and lights just receive that data as props and tell Game when something was clicked. That makes it possible to store each version of the board in a history array and simply move backwards in that history when we hit undo. So lifting state up isn’t just a style choice here, it’s what makes the undo/time-travel feature possible and manageable.


### 2. Explain the importance of immutability when you update the lights state array. What bug might occur if you mutated the array directly?
For this project, treating the lights array as immutable (not changing it directly) is really important.
If we changed the existing array in place and then called setLights with the same array reference, React might not realize anything changed and might not re-render. That’s one problem.
But the bigger issue shows up with history:
-	We keep a history array where each entry is supposed to be a “snapshot” of the board at a specific time.
-	If we mutate the same lights array over and over, all those history entries end up pointing to the same underlying array.
-	That means when we change the current board, all the “past” boards silently change too.
The result: undo basically stops working, because going back to an earlier step still shows the latest board state

### 3. How did you structure your components? Discuss the flow of props and state in your application (e.g., what state lives where, and what props are passed).
I structured the app into four  components:
#### 1.	Game
-	It stores all the important state: the history, the current stepNumber, and from those it figures out currentLights, whether the player has won, and how many moves they’ve made.
-	It also defines the event handlers: what happens when you click a light, press undo, or start a new game.
#### 2.	Grid
-	This component is in charge of laying out the 5×5 board.
-	It receives the lights array and a callback onLightClick from Game.
-	It loops over the lights array and renders a Light for each cell, wiring the onClick handler so Game knows exactly which index was clicked.
#### 3.	Light
-	This is a small, presentational component.
-	It just gets two props: isLit and onClick.
-	Based on isLit, it chooses the right CSS class (white for on, dark for off) and calls onClick when the user presses the button.
#### 4.	Control
-	Here, I added New Game button where I can reset or start new game.
-	Also I added Undo button. Undo needs to know what the whole board looked like at each step. If each light stored its own state, I’d have no single place that tracks full board history. Keeping state in Game gives one source of truth and makes it easy to store past boards and step back.

#### 4.	Goal
-	This is a goal paragraph where it is only witten that Goal is Turn all the lights off. Clicking a light toggles it and its neighbours.

So the data and control flow looks like this:
-	State flows down from Game → Grid → Light as props.
-	Events flow up from Light → Grid → Game via callback functions.

### 4. What was the most challenging part of implementing the click logic (toggling the light and its neighbors)? If you had more time, what feature would you add?
the most challenging part was correctly toggling the clicked cell and its neighbours using index math, while keeping updates immutable. With more time, I’d add difficulty levels, animations, and maybe a move counter with best scores.
If I had more time, there are a few things I’d like to add:
-	Different difficulties (for example, more random moves when generating a board, or larger/smaller grids).
-	Better visual feedback, like little animations when a light flips or a win animation when all lights go off.
-	Maybe a move limit or best-score tracking, so players can challenge themselves to solve it in fewer clicks.

Overall, the most challenging part was keeping the logic correct while still writing code that’s easy to read and extend later.

- Github Link: https://github.com/orobaidullah/light-out-puzzle
- Live Link: https://light-out-puzzle.netlify.app/


