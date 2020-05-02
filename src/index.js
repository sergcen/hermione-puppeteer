'use strict';

const parseConfig = require('./config');
const Puppeteer = require('./Puppeteer');
const debug = require('debug')('hermione-puppeter');

module.exports = (hermione, opts) => {
    const config = parseConfig(opts);
    if (!config.enabled) {
        return;
    }

    hermione.on(hermione.events.NEW_BROWSER, function(browser, { browserId }) {
        const sessions = {};

        browser.addCommand('puppeteer', async function () {
            const sessionId = this.requestHandler.sessionID;

            let puppeteerConnection = sessions[sessionId];

            if (!puppeteerConnection) {
                const browserWSEndpoint = config.browserWSEndpoint({
                    sessionId,
                    gridUrl: hermione.config.forBrowser(browserId).gridUrl,
                });
                debug(
                    `connecting devtools via endpoint ${browserWSEndpoint}`
                );

                puppeteerConnection = await Puppeteer.create({
                    browserWSEndpoint,
                    customWSProtocol: config.customWSProtocol,
                });
                sessions[sessionId] = puppeteerConnection;
            }

            return puppeteerConnection;
        })
    });
};
