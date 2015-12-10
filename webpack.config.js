/**
 * @since 2015-12-10 20:15
 * @author vivaxy
 */
'use strict';

module.exports = {
    entry: {
        'demo': './demo/src.js'
    },
    output: {
        filename: './demo/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?presets[]=es2015'
            }
        ]
    }
};
