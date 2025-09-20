import { Link as RemixLink } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  List,
  Link,
  InlineStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  return (
    <Page>
      <TitleBar title="boxMeter" />
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Welcome to boxMeter
                  </Text>
                  <Text variant="bodyMd" as="p">
                    Use the Theme setup page to open the Theme Editor on a
                    product template and add the Box Meter section to your
                    theme.
                  </Text>
                </BlockStack>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Get started
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Go to the Theme setup page and follow the instructions to
                    add Box Meter to your product pages.
                  </Text>
                </BlockStack>
                <InlineStack gap="300">
                  <Link url="/app/setup" removeUnderline>
                    Open Theme setup
                  </Link>
                </InlineStack>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="300">
                <Text as="h2" variant="headingMd">Product metafields</Text>
                <Text as="p" variant="bodyMd">
                  Box Meter reads package dimensions and weight from Product or
                  Variant metafields. Create and populate the following
                  definitions (units in millimeters and grams):
                </Text>
                <List>
                  <List.Item>
                    <code>packaging.length_mm</code> — Number (integer), length in mm
                  </List.Item>
                  <List.Item>
                    <code>packaging.width_mm</code> — Number (integer), width in mm
                  </List.Item>
                  <List.Item>
                    <code>packaging.height_mm</code> — Number (integer), height in mm
                  </List.Item>
                  <List.Item>
                    <code>packaging.weight_g</code> — Number (integer), weight in grams
                  </List.Item>
                </List>
                <Text as="p" variant="bodyMd">
                  Where to add: Admin → Settings → Custom data → Products →
                  Add definition (repeat under Variants if you need
                  variant‑specific values). Then open a product (or variant) and
                  fill the values in the Metafields section.
                </Text>
                <Text as="p" variant="bodyMd">
                  Precedence: In the app block settings you can choose
                  “Prefer product metafields over variant”. When enabled, Box
                  Meter will use product metafields when available, otherwise it
                  falls back to variant; when disabled, the order is reversed.
                </Text>
                <Text as="p" variant="bodySm">
                  Learn more about metafield types: {" "}
                  <Link
                    url="https://shopify.dev/docs/apps/custom-data/metafields/types"
                    target="_blank"
                    removeUnderline
                  >
                    Shopify docs
                  </Link>
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    App template specs
                  </Text>
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Framework
                      </Text>
                      <Link
                        url="https://remix.run"
                        target="_blank"
                        removeUnderline
                      >
                        Remix
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Database
                      </Text>
                      <Link
                        url="https://www.prisma.io/"
                        target="_blank"
                        removeUnderline
                      >
                        Prisma
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Interface
                      </Text>
                      <span>
                        <Link
                          url="https://polaris.shopify.com"
                          target="_blank"
                          removeUnderline
                        >
                          Polaris
                        </Link>
                        {", "}
                        <Link
                          url="https://shopify.dev/docs/apps/tools/app-bridge"
                          target="_blank"
                          removeUnderline
                        >
                          App Bridge
                        </Link>
                      </span>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        API
                      </Text>
                      <Link
                        url="https://shopify.dev/docs/api/admin-graphql"
                        target="_blank"
                        removeUnderline
                      >
                        GraphQL API
                      </Link>
                    </InlineStack>
                  </BlockStack>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Next steps
                  </Text>
                  <List>
                    <List.Item>
                      Open the {" "}
                      <Link url="/app/setup" removeUnderline>
                        Theme setup
                      </Link>{" "}
                      page to add Box Meter to your theme
                    </List.Item>
                    <List.Item>
                      Explore Shopify’s API with{" "}
                      <Link
                        url="https://shopify.dev/docs/apps/tools/graphiql-admin-api"
                        target="_blank"
                        removeUnderline
                      >
                        GraphiQL
                      </Link>
                    </List.Item>
                  </List>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
