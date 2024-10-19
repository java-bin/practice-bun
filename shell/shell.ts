import { $ } from "bun"

await $ `ls`;

// save
const result = await $ `echo "shell-file`.text();
console.log(result); // Hello, Bun!

// 경로 변경
await $ `pwd`;
$.cwd("/tmp");
await $`pwd`;
await $.cwd("/etc");
await $`pwd`;