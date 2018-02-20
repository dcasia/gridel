import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'

export const context = {
    root: path.resolve(__dirname, '..'),
    source: path.resolve(__dirname, '..', 'source'),
    distribution: path.resolve(__dirname, '..', 'temp')
}

export default (production: boolean) => {

    return {
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            clientLogLevel: 'warning',
            overlay: { warnings: false, errors: true },
            contentBase: [ context.distribution ],
            compress: true,
            hot: true,
            inline: true,
            historyApiFallback: true,
            open: true
        },
        context: process.cwd(),
        entry: {
            main: './development/index.ts',
            style: './source/scss/core.scss'
        },
        output: {
            path: path.resolve(__dirname, '../temp'),
            publicPath: '/',
            filename: 'scripts/[name].js'
        },
        resolve: {
            extensions: [ '.ts', '.js' ]
        },
        module: {
            rules: [
                { test: /\.gridelrc$/, loader: 'json-loader' },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            { loader: 'css-loader', options: { sourceMap: true, minimize: production } },
                            { loader: 'sass-loader', options: { sourceMap: true } }
                        ]
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({ filename: 'styles/[name].css' }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, 'index.html')
            })
        ]
    }
}
