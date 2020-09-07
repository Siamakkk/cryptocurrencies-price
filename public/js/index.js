const io = require('socket.io-client')
const $events = document.getElementById('events');

const newItem = (content) => {
  const item = document.querySelector('li');
  item.innerText = content;
  return item;
};

const socket = io();
// socket.on('updateInfo', (info) => {
//   console.log('hello socket client : ', info)
// })

socket.on('connect', () => {
  $events.appendChild(newItem('connect'));
});

socket.on('livePrice', (price) => {
  $events.appendChild(newItem(`LIVE PRICE IN RIALS : ${price}`));
});