- Get working game state
- Initialize real starting data to game state object
- Number of face-down cards (displayImage=false) equals the number of coins the player has
- Draw card from a pile, and check if game state updates
- Each player has uuid identifier, which is used to identify the current player in turn, and to prevent other players from modifying the game state concurrently.

