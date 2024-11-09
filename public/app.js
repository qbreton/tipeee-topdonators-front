const donatorWrapper = document.getElementById("donator-wrapper");
const maxDonators = 10;
export let topDonators = [];

const wssUrl = "wss://tipeee-api.fly.io:8080"
const socket = io(wssUrl);

socket.on('connect', () => {
  console.log('Connexion WebSocket établie.');
});

socket.on('error', (error) => {
  console.error('Erreur WebSocket :', error);
});

socket.on('donators', (event) => {
  console.log('Données reçues :', event);
  // Extract the JSON string
  try {
    topDonators = event.data;
    renderDonators();
  } catch (error) {
    console.error('Erreur lors du parsing des données WebSocket :', error);
  }
});

// Render the top donators list
function renderDonators() {
  donatorWrapper.innerHTML = '';
  donatorWrapper.style.animation = `scrollDonators ${Math.min(maxDonators, topDonators.length) * 2}s linear infinite`;
  // Get only the 10 top donators
  for (let i = 0; i < Math.min(maxDonators, topDonators.length); i++) {
    const donator = topDonators[i];
    const item = document.createElement('span');
    item.className = 'donator-item';

    const username = document.createElement('span');
    username.className = 'donator-username';
    username.textContent = `${donator.username} `;
    item.appendChild(username);

    const amount = document.createElement('span');
    amount.className = 'donator-amount';
    amount.textContent = `${donator.amount} €`;
    item.appendChild(amount);

    if (i < Math.min(maxDonators, topDonators.length) - 1) {
      const separator = document.createElement('span');
      separator.className = 'donator-separator';
      separator.textContent = ' • ';
      item.appendChild(separator);
    }

    donatorWrapper.appendChild(item);
  }
}

document.querySelector('#donator-wrapper').addEventListener('animationiteration', () => {
  renderDonators();
});

export { renderDonators };
