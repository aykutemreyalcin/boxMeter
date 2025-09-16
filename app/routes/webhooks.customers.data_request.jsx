import { authenticate } from "../shopify.server";

// customers/data_request — GDPR mandatory webhook
// Verify HMAC via authenticate.webhook, then acknowledge quickly.
export const action = async ({ request }) => {
  const { topic, shop, payload } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);
  // TODO: Queue a job to provide the shop with all customer data referenced in payload
  // Do not perform long-running work here; respond 200 promptly.

  return new Response();
};

