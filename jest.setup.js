/* eslint-disable @typescript-eslint/no-require-imports */

require("@testing-library/jest-dom");

const React = require("react");

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => React.createElement("img", props),
}));
