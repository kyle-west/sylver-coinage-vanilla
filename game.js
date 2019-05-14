const $ = function (id) {
  if ($[id]) return $[id];
  $[id] = document.getElementById(id)
  return $[id];
};

['possibilities', 'game-board', 'moves'].map($)

function makeButton (value, available) {
  return `<button${ available ? '' : " disabled"} onclick="newMove(${value})">${value}</button>`
}

document.addEventListener('possible-numbers-updated', () => {
  let html = possibleNumbers.map((available, n) => makeButton(n, available)).join('')
  $.possibilities.innerHTML = html;
})