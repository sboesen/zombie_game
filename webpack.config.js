const path = require('path');

module.exports = {
    entry: './src/main.ts', // Adjust the entry point as needed
    output: {
        filename: 'merged.js',
        path: path.resolve(__dirname, 'dist'),
        sourceMapFilename: 'merged.js.map'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};