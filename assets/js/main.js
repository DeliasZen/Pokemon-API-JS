const container = document.querySelector('#poke-container');
const paginationContainer = document.querySelector('.pagination-container')
const pokemonsNumber = 324;
const pokemonOnPage = 54;
const pokemonStartWatch = 1;

let pageActive = null;

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
}

const main_types = Object.keys(colors);

const fetchPokemons = async (pokemonStartWatch, pokemonOnPage) => {
  for (let i = pokemonStartWatch; i <= pokemonOnPage; i++) await getPokemon(i)
}

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const pokemon = await fetch(url).then(url => url.json())

  createPokemonCard(pokemon)
}

function createPokemonCard(pokemon) {

  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const poke_types = pokemon.types.map(el => el.type.name);
  const type = main_types.find(type => poke_types.indexOf(type) > -1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  const pokeInnerHTML = `
  <div class="img-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
  </div>
  <div class="info">
    <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
  </div>
  `;

  pokemonEl.innerHTML = pokeInnerHTML;

  container.appendChild(pokemonEl);
}

fetchPokemons(pokemonStartWatch, pokemonOnPage)

// Pagination
const createPagination = () => {
  pagesCount = Math.ceil(pokemonsNumber / pokemonOnPage);

  for (let i = 1; i <= pagesCount; i++) {
    const page = document.createElement('li');
    page.classList.add('page');
    page.innerText = i;
    paginationContainer.appendChild(page);
    if (i === 1) {
      page.classList.add('active');
      pageActive = page;
    }
  }
}

createPagination()

const pageSwap = (e) => {
  target = e.target;
  console.log(target);

  if (target.classList.contains('page') && !target.classList.contains('active')) {
    const fin = target.innerText * pokemonOnPage;
    const start = fin - pokemonOnPage + 1;

    document.querySelectorAll('.pokemon').forEach(i => i.remove())
    fetchPokemons(start, fin)

    pageActive.classList.remove('active');
    target.classList.add('active');
    pageActive = target;
    paginationContainer.removeEventListener('click', pageSwap);

    setTimeout(() => {
      paginationContainer.addEventListener('click', pageSwap)
    }, 400)
  }



}

paginationContainer.addEventListener('click', pageSwap)