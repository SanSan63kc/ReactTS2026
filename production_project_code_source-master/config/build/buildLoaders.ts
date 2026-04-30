import webpack from "webpack"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BuildOptions } from "./types/config"

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  let svgLoader = {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  }

  let fileLoader = {
    test: /\.(png|jpg?|gif|woff2|woff)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  }

  let babelLoader = {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript", // ОБЯЗАТЕЛЬНО
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
        plugins: [
          [
            "i18next-extract",
            {
              locales: ["ru", "en"],
              keyAsDefaultValue: true,
            },
          ],
        ],
      },
    },
  }

  let cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes(".module.")),
            localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
          },
        },
      },
      // ЗАМЕНИЛИ СТРОКУ "sass-loader" НА ОБЪЕКТ:
      {
        loader: "sass-loader",
        options: {
          api: "modern", // Это отключит предупреждения о Legacy API
          sassOptions: {
            // Это заглушит предупреждения о старых @import, пока ты их не перепишешь на @use
            silenceDeprecations: ["import"],
          },
        },
      },
    ],
  }

  let typescriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  }

  return [fileLoader, svgLoader, babelLoader, /* typescriptLoader, */ cssLoader]
}
