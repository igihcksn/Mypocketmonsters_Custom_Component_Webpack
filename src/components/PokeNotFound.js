class PokeNotFound extends HTMLElement {
    constructor() {
        super();
        this._isFound = true;
    }

    set isFound(isFound) {
        this._isFound = isFound;
        this.render();
    }

    connectedCallback() {
        this._isFound ? this.renderLoading() : this.render();
    }

    renderLoading() {
        this.innerHTML = `<p>Loading...</p>`;
    }

    render() {
        this.innerHTML = `
            <button class="largeBackButton" ${this._isFound ? 'hidden' : ''}>X Close</button>
            <p ${this._isFound ? 'hidden' : ''}>Upsss sorry...</p>
            <p ${this._isFound ? 'hidden' : ''}>Pokemon not found</p>
        `;

        const pokeCardElement = document.querySelector("poke-card");
        const loadMoreElement = document.querySelector("load-more");
        const pokeHeaderElement = document.querySelector("poke-header");
        const pokeDetailsElement = document.querySelector("poke-details");
        const pokeNotFoundElement = document.querySelector("poke-not-found");
        const backLargeElement = document.querySelector("poke-not-found .largeBackButton");

        backLargeElement.addEventListener("click", () => {
            pokeCardElement.style.display = "grid";
            loadMoreElement.style.display = "block";
            pokeDetailsElement.style.display = "none";
            pokeHeaderElement.classList.remove("hideOnMobile");
            pokeNotFoundElement.style.display = "none";
            pokeNotFoundElement.isFound = true;
        })
    }
}

customElements.define("poke-not-found", PokeNotFound);

export default PokeNotFound;