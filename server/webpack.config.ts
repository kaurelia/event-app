import { join } from "path";
import nodeExternals from "webpack-node-externals";
import packageJson from "./package.json";

const setUpConfig = () => {
  return {
    target: "node",
    externals: [
      nodeExternals({
        allowlist: [
          ...Object.keys(packageJson.dependencies).filter((name) => {
            return name !== "@prisma/client";
          }),
        ],
      }),
    ],
    entry: join(__dirname, "src", "index.ts"),
    mode: "production",
    module: {
      rules: [
        {
          test: /\.(ts)$/,
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
                ],
              },
            },
          ],
        },
      ],
    },
    output: { path: join(__dirname, "dist") },
    resolve: {
      extensions: [".js", ".ts", ".json"],
      alias: {
        "~root": join(__dirname, "src"),
      },
    },
  };
};
export default setUpConfig;
