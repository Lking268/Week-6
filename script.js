// Define the ranks and suits of the cards
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['♠', '♥', '♦', '♣'];

// Create a deck of cards
const deck = [];
for (let suit of suits) {
  for (let rank of ranks) {
    deck.push(rank + suit);
  }
}

// Shuffle the deck
for (let i = deck.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [deck[i], deck[j]] = [deck[j], deck[i]];
}

// Split the deck between two players
const player1Deck = deck.slice(0, 26);
const player2Deck = deck.slice(26);

// Play the game
while (player1Deck.length > 0 && player2Deck.length > 0) {
  const player1Card = player1Deck.shift();
  const player2Card = player2Deck.shift();

  console.log('Player 1 plays:', player1Card);
  console.log('Player 2 plays:', player2Card);

  const player1Rank = ranks.indexOf(player1Card.slice(0, -1));
  const player2Rank = ranks.indexOf(player2Card.slice(0, -1));

  if (player1Rank > player2Rank) {
    player1Deck.push(player1Card, player2Card);
    console.log('Player 1 wins the round!');
  } else if (player2Rank > player1Rank) {
    player2Deck.push(player2Card, player1Card);
    console.log('Player 2 wins the round!');
  } else {
    console.log('War!');
    const warCards = [player1Card, player2Card];

    while (player1Rank === player2Rank) {
      if (player1Deck.length < 4 || player2Deck.length < 4) {
        console.log('Not enough cards to continue the war!');
        break;
      }

      for (let i = 0; i < 4; i++) {
        warCards.push(player1Deck.shift(), player2Deck.shift());
      }

      player1Card = player1Deck.shift();
      player2Card = player2Deck.shift();

      console.log('Player 1 plays:', player1Card);
      console.log('Player 2 plays:', player2Card);

      player1Rank = ranks.indexOf(player1Card.slice(0, -1));
      player2Rank = ranks.indexOf(player2Card.slice(0, -1));
    }

    if (player1Rank > player2Rank) {
      player1Deck.push(...warCards);
      console.log('Player 1 wins the war!');
    } else if (player2Rank > player1Rank) {
      player2Deck.push(...warCards);
      console.log('Player 2 wins the war!');
    }
  }

  console.log('Player 1 deck:', player1Deck.join(', '));
  console.log('Player 2 deck:', player2Deck.join(', '));
  console.log('------------------------');
}

// Determine the winner
if (player1Deck.length === 0) {
  console.log('Player 2 wins the game!');
} else {
  console.log('Player 1 wins the game!');
}
