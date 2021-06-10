import { css } from 'lit';

export default css`
nav {
	flex: 1 0 auto;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

ul {
	margin: 0;
	padding: 0;
	list-style: none;
	display: flex;
	gap: 0.5rem;
}

li:not(:last-child)  {
	padding-right: 0.5rem;
	border-right: 1px solid var(--primary-color-contrast);
}

a {
	color: var(--primary-color-contrast);
	text-decoration: none;
}

span {
	font-weight: bold;
}

@media screen and (min-width: 1024px) {
	nav {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
}
`;
