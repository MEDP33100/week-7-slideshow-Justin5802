let currentPokemonId = 1;

async function fetchPokemonData(pokemonId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
            throw new Error(`Pokémon with ID ${pokemonId} not found`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return null; // Return null to handle errors gracefully
    }
}

function updateSlide(pokemonData) {
    const pokemonImage = document.getElementById('pokemon-image');
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonInfo = document.getElementById('pokemon-info');
    const slide = document.querySelector('.slide');

    if (!pokemonData) {
        pokemonImage.src = '';
        pokemonImage.alt = 'Image not found';
        pokemonName.textContent = 'Pokémon not found';
        pokemonInfo.textContent = '';
        return;
    }

    // Use the official artwork if available, else fallback to front sprite
    let imageUrl = pokemonData.sprites.other?.['official-artwork']?.front_default || 
                   pokemonData.sprites.front_default || 
                   'https://via.placeholder.com/200';

    console.log('Displaying Image URL:', imageUrl);

    // Clear and reset the image to force a refresh
    pokemonImage.src = '';
    setTimeout(() => {
        pokemonImage.src = imageUrl;
        pokemonImage.alt = pokemonData.name;
    }, 50);

    pokemonName.textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    pokemonInfo.textContent = `Height: ${pokemonData.height / 10}m, Weight: ${pokemonData.weight / 10}kg`;

    // Ensure slide is visible
    slide.classList.add('active');

    // Ensure image is actually loading
    pokemonImage.onload = () => console.log('Image loaded successfully');
    pokemonImage.onerror = () => console.error('Error loading image:', imageUrl);
}

async function showPokemon(pokemonId) {
    const pokemonData = await fetchPokemonData(pokemonId);
    updateSlide(pokemonData);
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentPokemonId = (currentPokemonId % 898) + 1; // Loop back to 1 after 898
    showPokemon(currentPokemonId);
});

document.getElementById('prev-btn').addEventListener('click', () => {
    currentPokemonId = currentPokemonId === 1 ? 898 : currentPokemonId - 1;
    showPokemon(currentPokemonId);
});

// Initial load when page is fully ready
window.onload = () => {
    showPokemon(currentPokemonId);
};
