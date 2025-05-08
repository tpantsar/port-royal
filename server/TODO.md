- Draw card from a pile, and check if game state updates
  - if duplicate colored ship is drawn, move cards to discard pile and change player turn
- Buy cards
- Number of face-down cards (displayImage=false) equals the number of coins the player has
- Each player has uuid identifier, which is used to identify the current player in turn, and to prevent other players from modifying the game state concurrently.
- Move research card to research pile if drawn
- add client TS types to single file

- Get working game state
- Initialize real starting data to game state object
