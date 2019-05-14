// A fun math game: https://en.wikipedia.org/wiki/Sylver_coinage

let MAX_NUMBER_SHOWN = 1000;
let possibleNumbers = new Array(MAX_NUMBER_SHOWN+1).fill(true);

const moves = []

setTimeout(() => {
  removeBadOptions()
}, 100)


function newMove(move) {
  moves.push(move);
  removeBadOptions()
}

function removeBadOptions () {
  possibleNumbers = possibleNumbers.map((available, n) => {
    // no need to check an already invalidated option
    if (available !== true) return false;

    for (let i = 0; i < moves.length; ++i) {
      if (n % moves[i] === 0) return false;
    }

    return true
  })

  document.dispatchEvent(new CustomEvent('possible-numbers-updated', {}))
}