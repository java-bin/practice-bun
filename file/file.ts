import { TestContext } from "node:test";

const file = Bun.file("./package.json");

(async () => {
    console.log({
        size: file.size,
        type: file.type,
        name: file.name,
        lastModified: file.lastModified,
    });

    console.log(await file.text());
    console.log(await file.json());
    console.log(await file.arrayBuffer());
   
})();