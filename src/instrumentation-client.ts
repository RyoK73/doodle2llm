import * as Sentry from "@sentry/nextjs";
import { initBotId } from "botid/client/core";

// Attach the BotID headers to the Server Action that starts anonymous sign-in.
// A Server Action is sent as a POST to the path of the page that calls it.
// Only the landing page ("/") can reach anonymous sign-in, because `proxy.ts` redirects signed-out users away from "/sketches".
initBotId({ protect: [{ path: "/", method: "POST" }] });

// This file configures the initialization of Sentry in the browser.
// The server and the edge are configured in `sentry.server.config.ts` and `sentry.edge.config.ts`.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
Sentry.init({
  dsn: "https://6fa7eb191d5580f331f45525d5be6ba8@o4512459414437888.ingest.de.sentry.io/4512459417911376",

  // Send events only from the production build, so that errors during development are not sent.
  enabled: process.env.NODE_ENV === "production",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

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
    cookies: { deny: ["forwarded", "-ip", "remote-", "via", "-user"] },
    urlQueryParams: { deny: ["forwarded", "-ip", "remote-", "via", "-user"] },
  },
});

// Report the navigations of the App Router to Sentry.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
