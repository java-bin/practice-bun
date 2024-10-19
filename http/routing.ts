Bun.serve({
    fetch(req, server) {
        const { pathname } = new URL(req.url);
        if (pathname === "/") return new Response("Hello Bun Fetch!");
        if (pathname === "/about") return new Response("My Bun Page!");
        return new Response("Not Found", { status: 404 }); 
    },
})