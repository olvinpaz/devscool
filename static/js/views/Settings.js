import AstractView from "./AstractView.js";

export default class extends AstractView {
    constructor() {
        super(); // Recordar llamar al super constructor
        this.setTitle("Settings");
    }

    async getHtml() {
        return `
            <h1>Settings</h1>
            <p>
                Manage your privacy and configuration
            </p>
            <p>
                <a href="/posts" data-link>View Posts</a>
            </p>
        `;
    }
}