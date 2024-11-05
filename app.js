const URL = 'https://rickandmortyapi.com/api/character';
const URLSearch = 'https://rickandmortyapi.com/api/character/?name='; 
const URLPage = 'https://rickandmortyapi.com/api/character/?page='; 

let currentPage = 1;

const getCharacter = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

const header = document.querySelector('header');
const filts = document.querySelector('#filters');

const input = document.createElement('input');
input.type = 'text';
input.id = 'searchInput';
input.placeholder = 'Ingresa el personaje';

const containerCheck = document.createElement('div');
containerCheck.id = 'container-check'; 

const options = [
    { value: 'Alive', text: 'Vivo' },
    { value: 'Dead', text: 'Muerto' },
    { value: 'Human', text: 'Humano' },
    { value: 'Alien', text: 'Alien' },
];

options.forEach(option => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = option.value; 
    checkbox.className = 'status-filter'; 
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(option.text));
    containerCheck.appendChild(label);
});

filts.appendChild(containerCheck);
filts.appendChild(input);

function makeCard(character) {
  const containercard = document.createElement('article');
  containercard.id = 'character_card';
  containercard.classList.add('character_card');

  const containerImage = document.createElement('div');
  containerImage.id = 'contImg';
  containerImage.classList.add('contImg');

  const image = document.createElement('img');
  image.src = character.image;

  const infoContainer = document.createElement('div');
  infoContainer.id = 'infCont';
  infoContainer.classList.add('infCont');

  const containerName = document.createElement('div');
  containerName.id = 'contName';
  containerName.classList.add('contName');

  const name = document.createElement('h2');
  name.id = 'namepj';
  name.classList.add('namepj');
  name.innerHTML = character.name;

  const containerlocation = document.createElement('div');
  containerlocation.id = 'contlocation';
  containerlocation.classList.add('contlocation');

  const locationholder = document.createElement('span');
  locationholder.innerHTML = 'Last known location';
  locationholder.id = 'locath';
  locationholder.classList.add('locath');

  const locationpersonaje = document.createElement('h3');
  locationpersonaje.innerHTML = character.location.name;
  locationpersonaje.id = 'locationpj';
  locationpersonaje.classList.add('locationpj');

  const containerstatus= document.createElement('div');
  containerstatus.id = 'contlocation';
  containerstatus.classList.add('contlocation');

  const statusholder = document.createElement('span');
  statusholder.innerHTML = 'Status';
  statusholder.id = 'locath';
  statusholder.classList.add('locath');

  const statuspersonaje = document.createElement('h3');
  statuspersonaje.innerHTML = character.status;
  statuspersonaje.id = 'locationpj';
  statuspersonaje.classList.add('locationpj');

  containercard.appendChild(containerImage);
  containerImage.appendChild(image);
  containercard.appendChild(infoContainer);
  infoContainer.appendChild(containerName);
  containerName.appendChild(name);
  infoContainer.appendChild(containerlocation);
  containerlocation.appendChild(locationholder);
  containerlocation.appendChild(locationpersonaje);
  infoContainer.appendChild(containerstatus);
  containerstatus.appendChild(statusholder)
  containerstatus.appendChild(statuspersonaje)

  const container = document.querySelector('#Container_cards');
      container.appendChild(containercard);
    
}
const displayCharacters = async (characters) => {
  const mainContainer = document.querySelector('#Container_cards');
  mainContainer.innerHTML = ''; 

  if (characters.results && characters.results.length > 0) {
    characters.results.forEach(character => makeCard(character));
    totalPages = characters.info.pages;
    setUpPagination(totalPages);
  } else {
    mainContainer.innerHTML = '<p>No se encontraron personajes.</p>';
  }
};

const searchCharacters = async (query) => {
  const searchURL = `${URLSearch}${query}`; 
  const characters = await getCharacter(searchURL);
  displayCharacters(characters); 
};

const filterCharacters = async () => {
  const selectedStatuses = Array.from(document.querySelectorAll('.status-filter:checked')).map(checkbox => checkbox.value);
 
  let filterURL = URL;

  if (selectedStatuses.length > 0) {
      const statusParams = selectedStatuses.map(status => {
          if (status === 'Alive' || status === 'Dead') {
              return `status=${status}`;
          } else {
              return `species=${status}`; 
          }
      }).join('&');
      filterURL += `?${statusParams}`;
  }

  const data = await getCharacter(filterURL);
  displayCharacters(data);
};


document.querySelectorAll('.status-filter').forEach(checkbox => {
  checkbox.addEventListener('change', filterCharacters);
});

const getCharacterByPage = async (page) => {
  const response = await fetch(`${URLPage}${page}`);
  const data = await response.json();
  displayCharacters(data);
};

const setUpPagination = (totalPages) => {
  const paginationContainer = document.querySelector('#pagination') || document.createElement('div');
  paginationContainer.id = 'pagination';
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.className = 'btn-page';

    if (i === currentPage) {
      button.classList.add('active');
    }

    button.addEventListener('click', () => {
      currentPage = i;
      getCharacterByPage(currentPage);
    });

    paginationContainer.appendChild(button);
  }


  if (!document.querySelector('#pagination')) {
    document.querySelector('main').appendChild(paginationContainer);
  }
};
document.getElementById('searchInput').addEventListener('input', (event) => {
  const query = event.target.value;
  if (query.length > 0) {
      searchCharacters(query);
  } else {
      getCharacterByPage(currentPage); 
  }
})


document.addEventListener('DOMContentLoaded', () => {
  getCharacterByPage(currentPage);
});


getCharacter(URL).then(displayCharacters);
