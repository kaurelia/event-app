import { join } from "path";
const setUpConfig = () => {
  return {
    target: "node",
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
                presets: ["@babel/preset-typescript", "@babel/preset-env"],
              },
            },
          ],
        },
      ],
    },
    output: { path: join(__dirname, "dist") },
    resolve: { extensions: [".js", ".ts", ".json"] },
  };
};
export default setUpConfig;
