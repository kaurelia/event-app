import { join } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const setUpConfig = () => {
  return {
    target: "web",
    entry: join(__dirname, "src", "index.tsx"),
    mode: "production",
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/,
          include: join(__dirname, "src"),
          exclude: [/(node_modules)/],
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-typescript",
                  [
                    "@babel/preset-env",
                    {
                      bugfixes: true,
                      useBuiltIns: "usage",
                      corejs: "3",
                    },
                  ],
                  [
                    "@babel/preset-react",
                    {
                      runtime: "automatic",
                    },
                  ],
                ],
              },
            },
          ],
        },
      ],
    },
    output: { path: join(__dirname, "dist") },
    resolve: {
      extensions: [".jsx", ".tsx", ".json", ".js", ".ts"],
      alias: {
        "~root": join(__dirname, "src"),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: join(__dirname, "src", "index.html"),
        filename: join(__dirname, "dist", "index.html"),
        scriptLoading: "blocking",
        inject: true,
      }),
    ],
  };
};
export default setUpConfig;
