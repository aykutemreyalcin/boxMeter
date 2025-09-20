import {
  Page,
  Layout,
  Card,
  Text,
  List,
  Button,
  BlockStack,
  InlineStack,
  Link,
  TextField,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { useState, useMemo } from "react";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

// Theme App Extension constants
// If you change the theme extension, update the UID below.
const THEME_EXTENSION_UID = "840edf4f-c833-6545-9e53-823af116f0caac300943";

// Deep links (use the shopify: protocol to open inside Admin)
// Note: Avoid using context=apps because it lands on App embeds.
const DEEP_LINK_BASE = "shopify:admin/themes/current/editor";

function buildBlockDeepLink({ blockHandle, template, previewPath }) {
  const params = new URLSearchParams();
  if (template) params.set("template", template);
  if (previewPath) params.set("previewPath", previewPath);
  params.set("addAppBlockId", `${THEME_EXTENSION_UID}/${blockHandle}`);
  return `shopify:admin/themes/current/editor?${params.toString()}`;
}

export default function ThemeSetup() {
  const [productHandle, setProductHandle] = useState("");
  const productPreviewPath = useMemo(
    () => (productHandle ? `/products/${productHandle}` : undefined),
    [productHandle],
  );

  const addBoxMeterOnProduct = useMemo(
    () => buildBlockDeepLink({ blockHandle: "box_meter", template: "product", previewPath: productPreviewPath }),
    [productPreviewPath],
  );
  const addStarRatingOnProduct = useMemo(
    () => buildBlockDeepLink({ blockHandle: "star_rating", template: "product", previewPath: productPreviewPath }),
    [productPreviewPath],
  );

  return (
    <Page>
      <TitleBar title="Theme setup" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Add Box Meter to your theme
              </Text>
              <Text as="p" variant="bodyMd">
                Use the controls below to deep link into the Theme Editor on a
                specific product page (recommended), with the correct app block
                preselected. Then add the block to the section you want and
                save.
              </Text>
              <InlineStack gap="300">
                <TextField
                  label="Product handle (optional)"
                  value={productHandle}
                  onChange={setProductHandle}
                  placeholder="e.g. my-awesome-product"
                  autoComplete="off"
                />
              </InlineStack>
              <InlineStack gap="300">
                <Button url={addBoxMeterOnProduct} target="_blank" variant="primary">
                  Open Product Editor — Box Meter
                </Button>
                <Button url={addStarRatingOnProduct} target="_blank" variant="secondary">
                  Open Product Editor — Star Rating
                </Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">Instructions</Text>
              <List>
                <List.Item>
                  Click one of the deep links above to open the Theme Editor on
                  a product page. If you enter a product handle, that specific
                  product will be previewed; otherwise Shopify chooses one.
                </List.Item>
                <List.Item>
                  In the left sidebar, click “Add block” in the section where
                  you want it (for example, a product section) — the app block
                  will be preselected. Confirm to add it.
                </List.Item>
                <List.Item>
                  Configure settings (boxes, rotation, product or variant
                  preference) and click Save.
                </List.Item>
                <List.Item>
                  Preview your storefront page to verify the block renders.
                </List.Item>
              </List>
              <Text as="p" variant="bodyMd">
                If a deep link doesn’t open, you can also open the editor from
                Admin and navigate to Online Store → Themes → Customize. To
                force the product template view, use this generic link: {" "}
                <Link
                  url={`${DEEP_LINK_BASE}?template=product`}
                  target="_blank"
                  removeUnderline
                >
                  open Product template in Theme Editor
                </Link>
                {productHandle ? (
                  <> — or for this product:{" "}
                    <Link
                      url={`${DEEP_LINK_BASE}?template=product&previewPath=/products/${productHandle}`}
                      target="_blank"
                      removeUnderline
                    >
                      open specific product
                    </Link>
                  </>
                ) : null}
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
