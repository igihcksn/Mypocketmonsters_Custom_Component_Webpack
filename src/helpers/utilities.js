import axios from "axios";

class DataSource {
    static async getPokemon({ pokeDetail = [], limit = 10, offset = 0 }) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const { results } = response.data;
        localStorage.setItem('offset', offset);
        results.map(pokemon => {
            axios.get(pokemon.url).then(detail => {
                pokeDetail.push({
                    id: detail.data.id,
                    name: detail.data.name,
                    sprites: detail.data.sprites,
                });
                localStorage.setItem('pokemonDetails', JSON.stringify(pokeDetail));
            });
        });
    }

    static async getDetailPokemon({ pokeName = 0 }) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
        const { data } = response;
        return data;
    }
}

export default DataSource;