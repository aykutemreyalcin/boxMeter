import { authenticate } from "../shopify.server";

// customers/redact — GDPR mandatory webhook
export const action = async ({ request }) => {
  const { topic, shop, payload } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);
  // TODO: Queue deletion/anonymization of customer data identified in payload

  return new Response();
};

