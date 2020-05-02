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