import type { Config } from "jest"

const config: Config = {
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testEnvironment: "jsdom",
}
export default config
