'use strict';

const { root, section, option } = require('gemini-configparser');

const getParser = () => {
    return root(
        section({
            enabled: option({
                defaultValue: true,
                parseEnv: JSON.parse,
                parseCli: JSON.parse,
                validate: (value) => {
                    if (typeof value !== 'boolean') {
                        throw new Error(
                            `'enabled' must be boolean but got '${value}'`
                        );
                    }
                },
            }),
            customWSProtocol: option({
                defaultValue: true,
                validate: (value) => {
                    if (typeof value !== 'boolean') {
                        throw new Error(
                            `'customWSProtocol' must be boolean but got '${value}'`
                        );
                    }
                },
            }),
            browsers: option({
                defaultValue: [],
                validate: (value) => {
                    if (
                        !(value instanceof Array) ||
                        value.some((v) => typeof v !== 'string')
                    ) {
                        throw new Error(
                            `'browsers' must be an array of strings`
                        );
                    }
                },
            }),
            browserWSEndpoint: option({
                validate: (value) => {
                    if (typeof value !== 'function') {
                        throw new Error(
                            `'browserWSEndpoint' must be function, but got '${value}'`
                        );
                    }
                },
            }),
        }),
        {}
    );
};

module.exports = (options) => {
    const { env, argv } = process;

    return getParser()({ options, env, argv });
};
