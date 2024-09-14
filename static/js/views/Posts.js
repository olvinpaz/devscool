import AstractView from "./AstractView.js";

export default class extends AstractView {
    constructor() {
        super(); // Recordar llamar al super constructor
        this.setTitle("Posts");
    }

    async getHtml() {
        return `
            <h1>Posts</h1>
            <p>
                You are viewing the posts
            </p>
            <p>
                <a href="/settings" data-link>View Settings</a>
            </p>
        `;
    }
}
