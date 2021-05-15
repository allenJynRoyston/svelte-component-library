import { resolve, join } from "path";
import fastify from "fastify";
import fastifyStatic from "fastify-static";

const app = fastify({ logger: false });
app.register(fastifyStatic, { root: join(resolve(), "build") });

const port = process.env.PORT || 3000;

console.log(`Now serving on localhost: ${port}`);
app.listen(port, "0.0.0.0");
