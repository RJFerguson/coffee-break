import { GlobalRegistrator } from "@happy-dom/global-registrator";

const oldConsole = console;
GlobalRegistrator.register();
window.console = oldConsole;

import * as matchers from "@testing-library/jest-dom/matchers";

// Extend the expect object with custom matchers
expect.extend(matchers);