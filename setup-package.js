"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const sourceDirectory = __dirname + "/..";
const destinationDirectory = __dirname;
function main() {
    const source = fs_1.default.readFileSync(__dirname + "/../package.json").toString("utf-8");
    const sourceObj = JSON.parse(source);
    sourceObj.scripts = {};
    sourceObj.devDependencies = {};
    fs_1.default.writeFileSync(`${destinationDirectory}/package.json`, Buffer.from(JSON.stringify(sourceObj, null, 2), "utf-8"));
    const filesToCopy = ["README.md", "LICENSE.md", ".npmignore"];
    filesToCopy.forEach(file => fs_1.default.copyFileSync(`${sourceDirectory}/${file}`, `${destinationDirectory}/${file}`));
}
main();
//# sourceMappingURL=setup-package.js.map