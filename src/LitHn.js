import { LitElement, html } from "lit";
import "./hn-footer/hn-footer.js";
import "./hn-header/hn-header.js";
import "./hn-topstories/hn-topstories.js";

export class LitHn extends LitElement {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <hn-header> Header </hn-header>
      <main>
        <hn-topstories></hn-topstories>
      </main>
      <hn-footer> Footer </hn-footer>
    `;
  }
}
