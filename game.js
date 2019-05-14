const $ = function (id) {
  if ($[id]) return $[id];
  $[id] = document.getElementById(id)
  return $[id];
};

['possibilities', 'announceWinner', 'moves'].map($)

function makeButton (value, available) {
  return `<button${ available ? '' : " disabled"} onclick="newMove(${value})">${value}</button>`
}


document.addEventListener('possible-numbers-updated', () => {
  let html = possibleNumbers.map((available, n) => n > 0 ? makeButton(n, available) : '').join('')
  $.possibilities.innerHTML = html;
  
  let player = 2;
  html = moves.map(m => `
  <p><code>Player ${player = player === 1 ? 2:1}: ${m}</code></p>
  `).join('\n')
  $.moves.innerHTML = html;
})


document.addEventListener('game-end', () => {
  let winningPlayer = moves.length % 2 === 0 ? 2 : 1
  $.announceWinner.innerHTML = `Player ${winningPlayer} wins!`;
})