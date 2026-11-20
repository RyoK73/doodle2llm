// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://669c3a2c5b3f8524f60bca41b62d3bd1@o4512456706818048.ingest.de.sentry.io/4512464471851088",
  integrations: [Sentry.serveTunnelIntegration({ path: "/monitoring" })],

  enabled: process.env.NODE_ENV === "production",
  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 0,

  // Turns off collection of data that could identify users. Adjust per category:
  // https://docs.sentry.io/platforms/javascript/configuration/options/#dataCollection
  dataCollection: {
    userInfo: false,
    graphQL: { document: false, variables: false },
    genAI: { inputs: false, outputs: false },
    databaseQueryData: false,
    queues: false,
    httpBodies: [],
    httpHeaders: { deny: ["forwarded", "-ip", "remote-", "via", "-user"] },
    cookies: {
      deny: ["forwarded", "-ip", "remote-", "via", "-user"],
    },
    urlQueryParams: {
      deny: ["forwarded", "-ip", "remote-", "via", "-user"],
    },
  },
});
