import express, { Express, ErrorRequestHandler } from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import typeDefs from "../graphql/schema/index";
import resolvers from "../graphql/resolvers/index";
import context from "../graphql/context";
import Log, { httpLogger } from "../utils/logger";
import { PORT } from "./Configs";
import { errorHandler, notFoundHandler } from "../utils/exception";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default async () => {
  Log.info("Express :: Initializes the express server");
  let app = express();

  Log.info("Middleware :: Booting the middleware...");
  // middleware that can be used to enable CORS
  app.use(cors());
  // Enables the request body parser
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.use(httpLogger);

  Log.info("HTTP :: Creating HTTP server...");
  const httpServer = http.createServer(app);


  Log.info("WebSocketServer :: Creating web socket server...");
  const wsServer = new WebSocketServer({
    port: 4000,
    path: '/graphql',
  });
  // Save the returned server's info so we can shut down this server later
  const serverCleanup = useServer({ schema }, wsServer);
  Log.info("WebSocketServer :: Created web socket server...");
  
  Log.info("Apollo :: Creating Apollo server...");
  const server = new ApolloServer({
    schema,
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    }],
  });

  Log.info("Apollo :: Staring Apollo server...");
  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  Log.info("Exception :: Registering Exception/Error Handlers...");
  app.use(errorHandler);
  app = notFoundHandler(app);

  app.listen(PORT, () => {
    Log.info(`🚀 GraphQL ready at http://localhost:${PORT}${server.graphqlPath}`);
    return Log.info(`Listening :: Server is running @ ${PORT}`);
  });

  return app;
};
