
# fwk-22-a-components

Reusable React components for Gomoku-PL. Includes board/game UI, controls, modals, GDPR support, and Storybook stories.

## Features
- Board, Cell, MoveList, StatusBar components for Gomoku
- Sidebar, Modal, Card, Button, Login, RegisterForm, CookieBanner
- GDPRSupport and CookieBanner for compliance
- Storybook stories for all major components
- Global and reset CSS styles

## Setup
1. Install dependencies:
	```sh
	npm install
	```
2. Start Storybook:
	```sh
	npm run storybook
	```

## Usage
- Import components from `@gomoku/components` or local `src/ui/`, `src/game/`, etc.
- See Storybook for usage examples and props

## Scripts
- `npm run format:repo` — Format all code/config files with Prettier
- `npm run strip:comments` — Remove comments from all source files

## GDPR Components
- `GDPRSupport` — UI for GDPR features/info
- `CookieBanner` — Consent banner for cookies

## Development
- Source: `src/`
- Stories: `src/stories/`, `.storybook/`
- Scripts: `scripts/`

## License
ISC
