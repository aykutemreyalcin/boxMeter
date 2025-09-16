import { authenticate } from "../shopify.server";

// shop/redact — GDPR mandatory webhook
export const action = async ({ request }) => {
  const { topic, shop, payload } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);
  // TODO: Queue deletion/anonymization of all store data retained by your app

  return new Response();
};

