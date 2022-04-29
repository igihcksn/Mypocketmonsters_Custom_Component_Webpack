import DataSource from "./utilities";

const main = () => {
    const loadMoreElement = document.querySelector("load-more");
    const pokeCardElement = document.querySelector("poke-card");
    const pokeNotFoundElement = document.querySelector("poke-not-found");
    
    const pokemons = JSON.parse(localStorage.getItem('pokemonDetails'));
    pokeCardElement.pokemons = pokemons;

    const loadMorePokemon = async () => {
        const offset = JSON.parse(localStorage.getItem('offset')) + 10;
        const pokeDetail = JSON.parse(localStorage.getItem('pokemonDetails'));

        try {
            loadMoreElement.isLoading = true;
            await DataSource.getPokemon({ pokeDetail: pokeDetail, offset: offset });
            const newPokemons = JSON.parse(localStorage.getItem('pokemonDetails'));

            pokeCardElement.pokemons = newPokemons;
        } catch (error) {
            pokeNotFoundElement.isFound = false;
        }
    }

    loadMoreElement.clickEvent = loadMorePokemon;
};

export default main;