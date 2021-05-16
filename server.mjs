import { resolve, join } from "path";
import fastify from "fastify";
import fastifyStatic from "fastify-static";
import fastifyCompression from "fastify-compress";

const app = fastify({ logger: false });
const port = process.env.PORT || 3000;

app.register(fastifyCompression, {
  global: true,
  encodings: ["gzip", "deflate"],
});

app.register(fastifyStatic, {
  root: join(resolve(), "build"),
});

app.listen(port, "0.0.0.0");
console.log(`Now serving on localhost: ${port}`);
