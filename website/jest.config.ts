import { join } from "path";
import { pathsToModuleNameMapper } from "ts-jest/utils";
import { compilerOptions } from "./tsconfig.json";

const config = {
  preset: "ts-jest",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: join(__dirname, "src"),
  }),
  testEnvironment: "jsdom",
  snapshotSerializers: ["@emotion/jest/serializer"],
  setupFilesAfterEnv: [join(__dirname, "src", "setupTests.ts")],
};

export default config;
