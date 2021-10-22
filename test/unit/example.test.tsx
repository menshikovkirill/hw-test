/**
 * @jest-environment jsdom
 */

import {render, within} from '@testing-library/react'
import {ExampleApi, CartApi} from '../../src/client/api'
import {initStore} from '../../src/client/store'
import { BrowserRouter } from 'react-router-dom';
import { Application } from '../../src/client/Application';
import { Provider } from 'react-redux';
import {it, expect} from "@jest/globals"
import events from '@testing-library/user-event'
import React from 'react';
import {Catalog} from '../../src/client/pages/Catalog'

const basename = '/hw/store';
const api = new ExampleApi(basename);
const cart = new CartApi();
const store = initStore(api, cart);

describe("Router", () => {
    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Application />
            </Provider>
        </BrowserRouter>
    );
    it("to Catalog", () => {
        const {container} = render(application);
        const linkToCatalog = container.querySelector(".navbar-nav a");
        events.click(linkToCatalog);

        expect(container.querySelector('h1').textContent).toBe('Catalog');
    });
    it("to Delivery", () => {
        const {container} = render(application);
        const linkToCatalog = container.querySelector(".navbar-nav a:nth-child(2)");
        events.click(linkToCatalog);

        expect(container.querySelector('h1').textContent).toBe('Delivery');
    });
    it("to Contacts", () => {
        const {container} = render(application);
        const linkToCatalog = container.querySelector(".navbar-nav a:nth-child(3)");
        events.click(linkToCatalog);

        expect(container.querySelector('h1').textContent).toBe('Contacts');
    });
    it("to Cart", () => {
        const {container} = render(application);
        const linkToCatalog = container.querySelector(".navbar-nav a:nth-child(4)");
        events.click(linkToCatalog);

        expect(container.querySelector('h1').textContent).toBe('Shopping cart');
    });
});

describe('Catalog', () => {
    it('h1 is Catalog', () => {
        const catalog = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        );

        const {container} = render(catalog);
        expect(container.querySelector("h1").textContent).toBe("Catalog");
    });
});