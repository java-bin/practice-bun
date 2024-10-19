import type { ServerWebSocket } from "bun";

Bun.serve({
    fetch(req, server) {
        const { pathname } = new URL(req.url);
        if (pathname === "/chat") {
            if (server.upgrade(req)) {
                return
            }
            return new Response("Upgrade failed", {status: 500});
        }
        return new Response("Hello Bun Fetch!");
    },
    websocket: {
        open(ws) {
            console.log("WebSocket opened");
        },
        message(ws, message) {
            console.log("WebSocket message", message);
        },
        close(ws, code, message) {
            console.log("WebSocket closed", code, message);
        }
    }
});