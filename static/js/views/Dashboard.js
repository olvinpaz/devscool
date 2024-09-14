import AstractView from "./AstractView.js";

export default class extends AstractView {
    constructor() {
        super(); // Recordar llamar al super constructor
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
            <h1>Dashboard</h1>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente repellendus, ipsum facere officiis provident sit eligendi reiciendis modi at praesentium similique earum quam debitis fuga laboriosam recusandae deleniti accusantium minima?
            </p>
            <p>
                <a href="/posts" data-link>View recent posts</a>
            </p>

        `;
    }
}
