Bun.serve({
    port : 2424,
    fetch() {
        return new Response("Hello, Bun!");
    },
})