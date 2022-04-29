import Pikachu from "../assets/images/pikachu.svg";

class PokeHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const props = {
            src: this.getAttribute("src") || null,
            alt: this.getAttribute("alt") || null,
            class: this.getAttribute("class") || null,
            title: this.getAttribute("title") || null,
            description: this.getAttribute("description") || null,
        }

        this.innerHTML = `
            <div class="pokeDescription">
                <h1>${props.title}</h1>
                <p>${props.description}</p>
            </div>
            <div class="pokeImage">
                <img 
                    src="${Pikachu}"
                    alt="${props.title}"
                    loading="lazy"
                >
            </div>
        `;
    }
}

customElements.define("poke-header", PokeHeader);

export default PokeHeader;