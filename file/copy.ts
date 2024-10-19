const file = Bun.file("./package.json");

Bun.write("./package-clone.json", file);