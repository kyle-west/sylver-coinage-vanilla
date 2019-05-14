// A fun math game: https://en.wikipedia.org/wiki/Sylver_coinage

// =========================================================================
// Adapted from https://gist.github.com/Arieg419/cdca8d2b8c17e68de2a6bd2e1a8b664f#file-makechangerecursivefinal-js
function waysToReturnChange(denominations, numOfCoins, amount) {
  if (numOfCoins < 0) return 0;
  if (amount === 0) return 1; // Perfect!
  if (amount < 0) return 0; // No solution exists for negative amount
  if (numOfCoins < 0 && amount > 0) return 0; // We don't have coins left!
  return (
    waysToReturnChange(denominations, numOfCoins, amount - denominations[numOfCoins]) + 
    waysToReturnChange(denominations, numOfCoins - 1, amount)
  ) 
}
// =========================================================================



let MAX_NUMBER_AVAILABLE = 500;
let possibleNumbers = new Array(MAX_NUMBER_AVAILABLE+1).fill(true);

const moves = [ ]
const sumsOfMoves = new Set();

// INIT
setTimeout(() => {
  calculateSumsOfMoves()
  removeBadOptions()
}, 100)


function newMove (move) {
  if (move === 1) document.dispatchEvent(new CustomEvent('game-end', {}))
  moves.push(move);
  calculateSumsOfMoves()
  removeBadOptions()
}

function calculateSumsOfMoves () {
  moves.forEach(x => moves.forEach(n => {
    if (n !== x) {
      sumsOfMoves.add(x + n)
    }
  }))
}

function getCoins () {
  let allCoins = [...new Set([...moves, ...sumsOfMoves])].sort((a,b) => a - b);
  let reducedCoins = new Set(allCoins);
  allCoins.forEach((x, i) => {
    allCoins.forEach((y, j) => {
      if (x !== y && x % y === 0) {
        reducedCoins.delete(x)
      }
    })
  })
  return [...reducedCoins];
}

function removeBadOptions () {
  let sums = [...sumsOfMoves];
  let coins = getCoins() // named after the "Coin Problem"
  possibleNumbers = possibleNumbers.map((available, n) => {
    // no need to check an already invalidated option
    if (available !== true) return false;

    return waysToReturnChange(coins, coins.length - 1, n) === 0
  })

  document.dispatchEvent(new CustomEvent('possible-numbers-updated', {}))
}