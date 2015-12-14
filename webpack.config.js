/**
 * @since 2015-12-10 20:15
 * @author vivaxy
 */
'use strict';

module.exports = {
    entry: {
        'demo/index': './src/demo.js'
    },
    output: {
        filename: './[name].js'
    },
    module: {
        loaders: [
            {
                test: /src\/.+\.js?$/,
                loader: 'babel?presets[]=es2015'
            }
        ]
    }
};
