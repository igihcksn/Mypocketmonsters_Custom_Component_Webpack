import DataSource from "../helpers/utilities";

class PokeNav extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <nav>
                <a href="#blog">Region</a>
                <a href="#playlist">Items</a>
                <a href="#join">Generation</a>
                <a href="#join">My Pokemon</a>

                <form>
                    <input type="text" id="pokeName" placeholder="Pokemon Name" />
                    <button type="submit">Find</button>
                </form>

                <span class="backNav">
                    <--- Back to Home
                </span>
            </nav>
        `;

        const formElement = document.querySelector("form");
        const pokeCardElement = document.querySelector("poke-card");
        const loadMoreElement = document.querySelector("load-more");
        const pokeHeaderElement = document.querySelector("poke-header");
        const pokeDetailsElement = document.querySelector("poke-details");
        const pokeNotFoundElement = document.querySelector("poke-not-found");
        const backNavElement = document.querySelector("poke-nav nav .backNav");

        const hideDetails = () => {
            pokeCardElement.style.display = "grid";
            loadMoreElement.style.display = "block";
            pokeDetailsElement.style.display = "none";
            backNavElement.style.display = "none";
            formElement.classList.remove("hideOnMobile");
            pokeHeaderElement.classList.remove("hideOnMobile");
        };

        const hideListCard = () => {
            pokeCardElement.style.display = "none";
            loadMoreElement.style.display = "none";
        }
        
        backNavElement.addEventListener("click", () => hideDetails());

        const getDetailPokemon = async ({ pokeName = "" }) => {
            pokeCardElement.style.display = "none";
            loadMoreElement.style.display = "none";

            try {
                const result = await DataSource.getDetailPokemon({ pokeName })
                pokeDetailsElement.pokemons = result;
                pokeDetailsElement.isFrom = "search";
                pokeDetailsElement.style.display = "flex";
                pokeNotFoundElement.isFound = true;
                pokeNotFoundElement.style.display = "none";
            } catch (error) {
                pokeNotFoundElement.isFound = false;
            }
        };

        formElement.addEventListener("submit", (e) => {
            e.preventDefault();

            const searchPokemon = document.getElementById("pokeName").value;
            getDetailPokemon({ pokeName: searchPokemon });
            pokeNotFoundElement.style.display = "block";
            hideDetails();
            hideListCard();
        });
    }
}

customElements.define("poke-nav", PokeNav);

export default PokeNav;