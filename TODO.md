## In progress

- After buying the card on trading phase, change player turn
  - After all the players have bought cards, change round
  - Show status for player (DRAW/BUY/CONTINUE)
  - If player has bought a card, they cannot draw more cards this round
  - If the following player has no coins, skip their turn

## General

- Number of face-down cards (displayImage=false) equals the number of coins the player has
- Each player has UUID identifier, which is used to identify the current player in turn, and to prevent other players from modifying the game state concurrently.

## Players

- Show cards in player's hand
- Players layout improvements
- Add color for each player
- Show player turn order
- Add new player

## Game Logic

- Score is not calculated correctly when player has both character and research cards in hand
- Handle tax collection logic
- Swords can be used to remove ships from table pile
- Handle round end logic
  - When all players have bought cards it should clear the table and deal new cards

## UI

- Display round number
- Display round status
- Show snackbar notifications for game actions (card drawn, card bought, errors, etc.)
- Replace window.confirm with confirmDialog popup for buying cards
- Show error message if backend server cannot be reached (GET http://localhost:3000/api/game/status)
- mobile friendly: Improve UI layout for smaller screens
- Dark mode toggle
- Research pile badge showing number of research cards on table

## API

- Make API endpoints return full game state after each action
- Implement missing API endpoints
  - POST /api/game/start
  - POST /api/game/nextRound

## Ideas

- Leaderboard showing top players
- Time limit for each round (like 60 seconds)
- Chatting between players
- Sound effects for actions (buying cards, drawing cards, etc.)
- Animations for card dealing and buying

## Changelog

2025-12-07

- Highlight current player with border or background color

2025-12-04

- AppBar, sidebar menu for navigation between table pile, research pile, and players list
- Move research card to research pile if drawn

2025-12-03

- Buy research cards
- Buy normal cards (character + ship)
- Constant variables in constants.ts
- Update UI state after handleDraw
- Remove legacy Java server code
- Handle snackbar notifications

2025-11-20

- Add Redux store (game state, notifications)
- Add GameService class to handle API calls
- Add prettier import sort plugin

Earlier

- Draw card from a pile, and check if game state updates
- If duplicate colored ship is drawn, move cards to discard pile and change player turn
