class PokeFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <footer>
                <div class="footerLink">
                    <span style="width: 100%; font-size: 1.5rem;">Pokemon Official Link : </span>
                    <a href="https://www.pokemon.com/us/" style="min-width: 50%; margin: 30px 0px;">Pokemon</a>
                    <a href="https://25.pokemon.com/en-us/" style="min-width: 50%; margin: 30px 0px;">25 Pokemon</a>
                    <a href="https://unite.pokemon.com/en-us/" style="min-width: 50%; margin: 30px 0px;">Pokemon Unite</a>
                    <a href="https://newpokemonsnap.pokemon.com/en-us/" style="min-width: 50%; margin: 30px 0px;">Pokemon Snap</a>
                </div>
                <div class="footerDescription">
                    <span style="width: 100%; font-size: 1.5rem;">My pokemon dex</span>
                    <p style="width: 50%; margin: 20px 0px;">Catch you favourite pokemon, collect it and give it a nickname.<br>Connect with us on github.</p>
                    <p style="width: 50%;">
                        <a href="https://github.com/igihcksn/mypocketmonsters" style="color: #fcba03; margin: 10px 0px;">MY POKEMON DEX</a>
                    </p>
                </div>
                <div class="footerAuthor">
                    <br>
                    <div> @ 2021 By igihcksn </div>
                </div>
            </footer>
        `;
    }
}

customElements.define("poke-footer", PokeFooter);

export default PokeFooter;