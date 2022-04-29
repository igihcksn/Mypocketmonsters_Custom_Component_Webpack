import DataSource from "../helpers/utilities";
import "./PokeItems";

class PokeCard extends HTMLElement {
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

    async connectedCallback() {
        await DataSource.getPokemon({ pokeDetail: this.data, limit: this.limit, offset: this.offset });
    }

    render() {
        this.innerHTML = "";
        const formElement = document.querySelector("form");
        const pokeHeaderElement = document.querySelector("poke-header");
        const pokeNotFoundElement = document.querySelector("poke-not-found");
        const backNavElement = document.querySelector("poke-nav nav .backNav");

        
        backNavElement.style.display = "none";
        pokeNotFoundElement.style.display = "none";
        formElement.classList.remove("hideOnMobile");
        pokeHeaderElement.classList.remove("hideOnMobile");

        this._pokemons && this._pokemons.map(pokemon => {
            const pokeCardElement = document.querySelector("poke-card");
            const pokeItemsElement = document.createElement("poke-item");
            pokeItemsElement.pokemons = pokemon;
            pokeCardElement.appendChild(pokeItemsElement);
        })
    }
}

customElements.define("poke-card", PokeCard);

export default PokeCard;