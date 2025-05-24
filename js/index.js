document.addEventListener("DOMContentLoaded", () => {
  const monsterContainer = document.getElementById('monster-container');
  const createMonsterForm = document.getElementById('create-monster');
  const backButton = document.getElementById('back');
  const forwardButton = document.getElementById('forward');

  let currentPage = 1;
  const limit = 50;

  // Load monsters on initial page load
  fetchMonsters(currentPage);

  // Event listener for creating a monster
  createMonsterForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = event.target.name.value;
    const age = parseFloat(event.target.age.value);
    const description = event.target.description.value;

    const monsterData = { name, age, description };

    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(monsterData)
    })
      .then(res => res.json())
      .then(monster => {
        renderMonster(monster);
        createMonsterForm.reset();
      });
  });

  // Navigation Buttons
  forwardButton.addEventListener('click', () => {
    currentPage++;
    fetchMonsters(currentPage);
  });

  backButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchMonsters(currentPage);
    }
  });

  // Fetch monsters
  function fetchMonsters(page) {
    fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
      .then(res => res.json())
      .then(monsters => {
        monsterContainer.innerHTML = ''; // Clear existing
        monsters.forEach(monster => renderMonster(monster));
      });
  }

  // Render a single monster
  function renderMonster(monster) {
    const div = document.createElement('div');
    div.classList.add('monster');
    div.innerHTML = `
      <h2>${monster.name}</h2>
      <h4>Age: ${monster.age}</h4>
      <p>${monster.description}</p>
    `;
    monsterContainer.appendChild(div);
  }
});
