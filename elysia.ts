import { Elysia } from 'elysia';

new Elysia().get("/", () => "Hello Bun Elysia!")
.listen(3000);