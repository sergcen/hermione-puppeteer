# Hermione Puppeteer

Connect to devtools and expose Puppeteer

Example `.hermione.conf`:
```js
{
    plugins: {
        'hermione-puppeteer': {
            enabled: true,
            browsers: ['chrome'],
            browserWSEndpoint: ({ sessionId, gridUrl }) => `ws://${url.parse(gridUrl).host}/devtools/${sessionId}`
        },
    }
}
```

Usage:
```js

describe('Example', () => {
    it('open page from puppeteer', async function () {
        const puppeteer = await this.browser.puppeteer();
        const page = await puppeteer.newPage();
        await page.goto('https://.yandex.ru');
    });
});
```