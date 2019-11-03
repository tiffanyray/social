const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  fs = require('fs');
  useTypeScript = fs.existsSync(path.appTsConfig);

module.exports = {
  entry: {
    app: ['./src/index.tsx'],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  devtool: 'soure-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader"
      },
      {
        enforce: "pre",
        test: /\.jsx?$/,
        loader: "source-map-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ttf|woff|woff2|eot)$/i,
        use: [
          {
            loader: "file-loader",
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true,
              singleton: true
            }
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]"
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public/index.html") }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    // TypeScript type checking
    useTypeScript &&
    new ForkTsCheckerWebpackPlugin({
      typescript: resolve.sync('typescript', {
        basedir: path.appNodeModules,
      }),
      async: isEnvDevelopment,
      useTypescriptIncrementalApi: true,
      checkSyntacticErrors: true,
      resolveModuleNameModule: process.versions.pnp
        ? `${__dirname}/pnpTs.js`
        : undefined,
      resolveTypeReferenceDirectiveModule: process.versions.pnp
        ? `${__dirname}/pnpTs.js`
        : undefined,
      tsconfig: path.appTsConfig,
      reportFiles: [
        '**',
        '!**/__tests__/**',
        '!**/?(*.)(spec|test).*',
        '!**/src/setupProxy.*',
        '!**/src/setupTests.*',
      ],
      silent: true,
      // The formatter is invoked directly in WebpackDevServerUtils during development
      formatter: isEnvProduction ? typescriptFormatter : undefined,
    }),
  ].filter(Boolean),
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
}