## Players

- Highlight current player with border or background color
- Players layout improvements
  - Remove debug info
- Show player colors
- Show player turn order
- Add new player

## Game Mechanics

- Score is not calculated correctly when player has both character and research cards in hand
- Handle tax collection logic
- Handle round end logic
  - When all players have bought cards it should clear the table and deal new cards

## UI

- Show error message if backend server cannot be reached (GET http://localhost:3000/api/game/status)
- Improve UI layout for smaller screens (mobile responsiveness)
- Replace window.confirm with confirmDialog popup for buying cards

## Changelog

2025-12-03

- Buy research cards
- Constant variables in constants.ts
- Update UI state after handleDraw
- Remove legacy Java server code
- Handle snackbar notifications

2025-11-20

- Add Redux store (game state, notifications)
- Add GameService class to handle API calls
- Add prettier import sort plugin
