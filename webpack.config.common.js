var webpack = require('webpack');

module.exports = {
    entry: {
        // This will be the file that bootstraps
        // angular 2 application.
        'app': './assets/app/main.ts'
    },
    resolve: {
        // This will resolve the files that are imported
        // without the below extensions.
        extensions: ['.js', '.ts']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular2-router-loader'
                ]
            },
            {
                test: /\html$/,
                loaders: 'html'
            },
            {
                test: /.css/,
                loader: 'raw'
            }
        ]
    }

};