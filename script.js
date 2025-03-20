let currentPokemonId = 1;

async function fetchPokemonData(pokemonId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

function updateSlide(pokemonData) {
    const pokemonImage = document.getElementById('pokemon-image');
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonInfo = document.getElementById('pokemon-info');

    pokemonImage.src = pokemonData.sprites.front_default;
    pokemonName.textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    pokemonInfo.textContent = `Height: ${pokemonData.height / 10}m, Weight: ${pokemonData.weight / 10}kg`;
}

async function showPokemon(pokemonId) {
    const pokemonData = await fetchPokemonData(pokemonId);
    if (pokemonData) {
        updateSlide(pokemonData);
    }
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentPokemonId = (currentPokemonId % 898) + 1; // There are 898 Pokémon in the API
    showPokemon(currentPokemonId);
});

document.getElementById('prev-btn').addEventListener('click', () => {
    currentPokemonId = currentPokemonId === 1 ? 898 : currentPokemonId - 1;
    showPokemon(currentPokemonId);
});

// Initial load
showPokemon(currentPokemonId);

async function fetchPokemonData(pokemonId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();
        console.log('API Response:', data); // Log the API response
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

function updateSlide(pokemonData) {
    const pokemonImage = document.getElementById('pokemon-image');
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonInfo = document.getElementById('pokemon-info');

    console.log('Image URL:', pokemonData.sprites.front_default); // Log the image URL

    pokemonImage.src = pokemonData.sprites.front_default;
    pokemonName.textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    pokemonInfo.textContent = `Height: ${pokemonData.height / 10}m, Weight: ${pokemonData.weight / 10}kg`;
}