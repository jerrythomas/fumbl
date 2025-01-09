# fumbl

This is a collection of simple game components that can be added to any Svelte project. The components are designed to be easy to use and highly customizable. The components are data-driven and automatically update their state when the data changes. The components are also themeable and can be customized to match the look and feel of your app.

## Installation

To install Fumbl, use the following command:

```bash
bun add @fumbl/games
```

## Basic Usage

To use Fumbl in your Svelte project, simply import the desired control and use it in your template like any other Svelte component. For example, to use the TicTacToe control:

```svelte
<script>
  import { WordHuntGame } from '@fumbl/games'

  let stats = {}
</script>
<WordHuntGame target="hello" bind:stats ></WordHuntGame>
```
