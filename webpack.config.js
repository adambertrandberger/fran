const path = require("path");
const webpack = require('webpack');
const InjectPlugin = require('webpack-inject-plugin').default;
const fs = require('fs');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "fran.js",
    },
    plugins: [
        new InjectPlugin(function() {
            return 'require = undefined;' + fs.readFileSync('./deps/arrows.es5.js', 'utf8');
        })
    ],

    plugins: [
        new webpack.ProvidePlugin({
            LiftedArrow: './deps/arrows.es5.js',
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["babel-preset-env"]
                    }
                }
            },
        ]
    }
};
