class LoadMore extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
        this._isLoading = false;
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }

    get isLoading() {
        return this._isLoading;
    }

    set isLoading(isLoading) {
        this._isLoading = isLoading;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
            <style>
            .LoadMore {
                width: 100%;
                font-weight: 600;
                text-transform: uppercase;
                display: flex;
                -webkit-box-pack: center;
                justify-content: center;
            }
            #loadMoreButtonElement {
                font-size: 28px;
                background-color: rgb(25, 7, 45);
                color: rgb(255, 255, 255);
                border-radius: 4px;
                padding: 0px 10px;
                margin: 10px 0px;
                transform: skewX(-10deg);
                cursor: pointer;
            }
            </style>
            <div class="LoadMore">
                <button id="loadMoreButtonElement">${this.isLoading ? "Waiting..." : "Load More"}</button>
            </div>
        `;

        this.shadowDOM.querySelector("#loadMoreButtonElement").addEventListener("click", this._clickEvent);
    }
}

customElements.define("load-more", LoadMore);

export default LoadMore;