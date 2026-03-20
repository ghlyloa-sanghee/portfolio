const fs = require("fs");
const tokens = require("./tokens.json");

let css = ":root {\n";

function walk(obj, path = []) {
  for (const key in obj) {
    const value = obj[key];

    if (value && typeof value === "object") {
      if (value.$value) {
        const name =
          "--" +
          [...path, key]
            .join("-")
            .replace(/[^a-zA-Z0-9]/g, "-")
            .toLowerCase();

        css += `  ${name}: ${value.$value};\n`;
      } else {
        walk(value, [...path, key]);
      }
    }
  }
}

walk(tokens);

css += "}";

fs.writeFileSync("tokens.css", css);

console.log("tokens.css 생성 완료");
