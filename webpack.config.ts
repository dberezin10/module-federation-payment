import {IEnvVariables, IPaths} from "@dberezin10/packages/webpack-config/src/types/types";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import PackageJson from './package.json'
import webpack from "webpack";

export default (env: IEnvVariables) => {

    const paths: IPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    }


    const options = {
        port: env.port ?? 5001,
        mode: env.mode ?? "production",
        paths,
        analyzer: env.analyzer,
    }

    const isDev = env.mode === "development";
    const isProd = env.mode === "production";

    return {
        mode: options.mode ?? 'development',
        entry: options.paths.entry,
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        isDev ? 'style-loader' :MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    localIdentName: isDev ? "[path][name]__[local]--[hash:base64:5]" : "[hash:base64:5]"
                                }
                            },
                        },
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader',
                    },
                },
                {
                    test: /\.(ts|tsx)$/,
                    include: [
                        path.resolve(__dirname, 'src'), // Включаем обработку файлов из текущего проекта
                        path.resolve(__dirname, 'node_modules/@dberezin10'), // Включаем обработку файлов из пакета @dberezin10
                    ],
                    use: {
                        loader: 'ts-loader',
                        options: {
                            allowTsInNodeModules: true,
                        },
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@': options.paths.src
            }
        },
        output: {
            path: options.paths.output,
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({ template: options.paths.html }),
            // new BundleAnalyzerPlugin(),
            isProd && new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8].css",
            }),
            new webpack.container.ModuleFederationPlugin({
                name: 'payment',
                filename: 'remoteEntry.js',
                exposes: {
                    './Router': './src/router/Router.tsx',
                    './App': './src/components/App.tsx'
                },
                shared: {
                    ...PackageJson.dependencies,
                    react: {
                        eager: true,
                        requiredVersion: PackageJson.dependencies['react']
                    },
                    'react-router-dom': {
                        eager: true,
                        requiredVersion: PackageJson.dependencies['react-router-dom']
                    },
                    'react-dom': {
                        eager: true,
                        requiredVersion: PackageJson.dependencies['react-dom']
                    }
                }
            })
        ],
        devtool: isDev ? "inline-source-map" : false,
        devServer: {
            port: isDev ? options.port ?? 6000 : undefined,
            open: isDev,
            historyApiFallback: true,
            hot: isDev,
        },
    }
}