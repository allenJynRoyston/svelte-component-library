import { resolve, join } from "path";
import fastify from "fastify";
import fastifyStatic from "fastify-static";

const app = fastify({ logger: false });
app.register(fastifyStatic, { root: join(resolve(), "build") });

app.listen(3000);
console.log("Now serving on localhost:3000");
