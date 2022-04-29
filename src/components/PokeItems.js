import DataSource from "../helpers/utilities";

class PokeItems extends HTMLElement {

    constructor() {
        super();
    }
    
    set pokemons(pokemons) {
        this._pokemons = pokemons;
        this.render();
    }

    render() {
        const { name, sprites } = this._pokemons;
        this.innerHTML = `
            <div class="PokeCardBox" key="PokeCardBox-${name}" data-id="${name}">
                <div class="PokeCardBoxImage">
                    <img 
                        src="${sprites.other.dream_world.front_default}" 
                        alt="${name}" 
                        loading="lazy"/>
                </div>
                <p class="PokeCardBoxTitle">${name}</p>
            </div>
        `;

        const loadMoreElement = document.querySelector("load-more");
        const pokeCardElement = document.querySelector("poke-card");
        const pokeDetailsElement = document.querySelector("poke-details");
        const pokeNotFoundElement = document.querySelector("poke-not-found");
        const backNavElement = document.querySelector("poke-nav nav .backNav");

        const getDetailPokemon = async ({ pokeName = "" }) => {
            pokeCardElement.style.display = "none";
            loadMoreElement.style.display = "none";

            try {
                const result = await DataSource.getDetailPokemon({ pokeName })
                pokeDetailsElement.pokemons = result;
                pokeDetailsElement.style.display = "grid";
            } catch (error) {
                pokeNotFoundElement.isFound = false;
            }
        }

        this.box = this.querySelector(".PokeCardBox");
        this.box.addEventListener("click", () => {
            backNavElement.style.display = screen.width > 900 ? "none" : "block";
            pokeNotFoundElement.style.display = "none";
            getDetailPokemon({ pokeName: this.box.getAttribute("data-id") })
        })
    }
}

customElements.define("poke-item", PokeItems);

export default PokeItems;