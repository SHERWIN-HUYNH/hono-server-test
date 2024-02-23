// import { Hono } from 'hono';
// import { handle } from '@hono/node-server/vercel';
// const app = new Hono().basePath('/api');
// app.get('/', (c) => {
//   return c.json('Hello from Hono!');
// });
// app.post('/', async (c) => {
//   const input = await c.req.json();
//   return c.json(input);
// });
// export default handle(app);
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { router as auth } from "./modules/auth/auth.controller";
import { errorFilter } from "./lib/error-filter";
const app = new Hono().basePath("/api");
app.use("*", logger());
app.use("*", cors({
    origin: [
        "http://localhost:5173",
        "https://gym-master-server.vercel.app",
    ],
    credentials: true,
}));
app.route("/", auth);
app.notFound((c) => {
    return c.json({
        message: "Not found",
        statusCode: 404,
    }, 404);
});
app.onError(errorFilter);
serve(app, () => {
    console.log("Server is running on http://localhost:3000");
});
