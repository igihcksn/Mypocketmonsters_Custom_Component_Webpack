import Chart from "chart.js/auto";
import { get } from "lodash";

class PokeDetails extends HTMLElement {
    constructor() {
        super();
        this.data = [];
        this.offset = 0;
        this._pokemons = [];
        this.isLoading = false;
    }

    set pokemons(pokemons) {
        this._pokemons = pokemons;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const { game_indices, moves, stats, species, sprites, types } = this._pokemons
        this.innerHTML = `
            <button class="largeBackButton">X Close</button>
            <section class="pokeProfile">
                <h2>${get(species, 'name', '-')}</h2>
                <img 
                    src="${get(sprites, 'other.dream_world.front_default', '')}" 
                    alt="${get(species, 'name', '-')}"
                    loading="lazy" />
                
                <div class="pokeTypes">
                    ${types && types.map(type => `<p class="pokeType ${get(type, 'type.name', 'unknown')}">${get(type, 'type.name')}</p>`)}
                </div>

                <div class="pokeSprites">
                    <img 
                        src="${get(sprites, 'front_default', '')}" 
                        alt="Front"
                        loading="lazy" />
                    <img 
                        src="${get(sprites, 'back_default', '')}" 
                        alt="Back"
                        loading="lazy" />
                    <img 
                        src="${get(sprites, 'front_shiny', '')}" 
                        alt="Front Shiny"
                        loading="lazy" />
                    <img 
                        src="${get(sprites, 'back_shiny', '')}" 
                        alt="Back Shiny"
                        loading="lazy" />
                </div>
            </section>
            <section class="pokeChartWrapper">
                <canvas id="pokeStats" width="200" height="200"></canvas>
            </section>
            <section class="pokeOthersInformation">
                <h2>Information</h2>
                <fieldset>
                    <legend>Moves</legend>
                    ${moves && moves.map(move => `<span>${get(move, 'move.name')}</span>`).join('')}
                </fieldset>
                <fieldset>
                    <legend>Games</legend>
                    ${game_indices && game_indices.map(game => `<span>${get(game, 'version.name')}</span>`).join('')}
                </fieldset>
            </section>
        `;

        const formElement = document.querySelector("form");
        const pokeCardElement = document.querySelector("poke-card");
        const loadMoreElement = document.querySelector("load-more");
        const pokeHeaderElement = document.querySelector("poke-header");
        const pokeDetailsElement = document.querySelector("poke-details");
        const pokeNotFoundElement = document.querySelector("poke-not-found");
        const backLargeElement = document.querySelector("poke-details .largeBackButton");

        pokeHeaderElement.classList.add("hideOnMobile");
        formElement.classList.add("hideOnMobile");

        const ctx = document.getElementById('pokeStats').getContext('2d');
        const pokemonStats = [];
        stats && stats.map(stat => {
            pokemonStats.push(stat.base_stat)
        })

        const data = {
            labels: [
              'HP',
              'Atack',
              'Defense',
              'Special Attack',
              'Special Defense',
              'Speed',
            ],
            datasets: [{
              label: 'Base Stats',
              data: pokemonStats,
              fill: true,
              backgroundColor: 'rgba(252, 186, 3, 0.3)',
              borderColor: '#fcba03',
              pointBackgroundColor: '#19072d',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
          };

        const myChart = new Chart(ctx, {
            type: 'radar',
            data: data,
            options: {
                elements: {
                    line: {
                        borderWidth: 3
                    }
                }
            },
        });

        backLargeElement.addEventListener("click", () => {
            pokeCardElement.style.display = "grid";
            loadMoreElement.style.display = "block";
            pokeDetailsElement.style.display = "none";
            formElement.classList.remove("hideOnMobile");
            pokeHeaderElement.classList.remove("hideOnMobile");
            pokeNotFoundElement.style.display = "none";
        })
    }
}

customElements.define("poke-details", PokeDetails);

export default PokeDetails;