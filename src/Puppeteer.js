'use strict';

const puppeteer = require('puppeteer-core');
const { WebSocketTransport } = require('./extendedWsTransport');

module.exports = class Puppeteer {
    static async create({ browserWSEndpoint, customWSProtocol = true }) {
        const options = customWSProtocol
            ? {
                  transport: await WebSocketTransport.create(browserWSEndpoint),
              }
            : {
                  browserWSEndpoint,
              };

        const browser = await puppeteer.connect({
            defaultViewport: null,
            ignoreHTTPSErrors: true,
            ...options,
        });

        return browser;
    }
};
