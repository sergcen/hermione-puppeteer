'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const NodeWebSocket = require('ws');
class WebSocketTransport {
    constructor(ws) {
        let parts = [];

        this._ws = ws;
        this._ws.addEventListener('message', (event) => {
            const data =
                parts.length > 0 ? [...parts, event.data].join('') : event.data;

            // sometimes event.data to large
            // incoming data split to few parts and brakes JSON
            // trying fix that problem
            try {
                JSON.parse(data);

                if (this.onmessage) {
                    this.onmessage.call(null, data);
                }

                if (parts.length) parts = [];
            } catch (e) {
                // if broken JSON - save part
                parts.push(event.data);
            }
        });
        this._ws.addEventListener('close', () => {
            if (this.onclose) this.onclose.call(null);
        });

        this._ws.addEventListener('error', () => {});
        this.onmessage = null;
        this.onclose = null;
    }
    static create(url) {
        return new Promise((resolve, reject) => {
            const ws = new NodeWebSocket(url, [], {
                perMessageDeflate: false,
                maxPayload: 256 * 1024 * 1024,
            });
            ws.addEventListener('open', () =>
                resolve(new WebSocketTransport(ws))
            );
            ws.addEventListener('error', reject);
        });
    }
    send(message) {
        this._ws.send(message);
    }
    close() {
        this._ws.close();
    }
}
exports.WebSocketTransport = WebSocketTransport;
