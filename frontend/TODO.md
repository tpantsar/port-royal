## Players

- Highlight current player with border or background color
- Players layout improvements
  - Remove debug info
- Show player colors
- Show player turn order
- Add new player

## Game Logic

- Score is not calculated correctly when player has both character and research cards in hand
- Handle tax collection logic
- Handle round end logic
  - When all players have bought cards it should clear the table and deal new cards

## UI

- Show error message if backend server cannot be reached (GET http://localhost:3000/api/game/status)
- mobile friendly: Improve UI layout for smaller screens
- Replace window.confirm with confirmDialog popup for buying cards
- Dark mode toggle
- Research pile badge showing number of research cards on table

## API

- Make API endpoints return full game state after each action
- Implement missing API endpoints
  - POST /api/game/start
  - POST /api/game/nextRound

## Ideas

- Chatting between players
- Sound effects for actions (buying cards, drawing cards, etc.)
- Animations for card dealing and buying

## Changelog

2025-12-04

- AppBar, sidebar menu for navigation between table pile, research pile, and players list

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
