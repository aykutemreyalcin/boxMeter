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

// Theme Editor deep link base (no context=apps to avoid App embeds)
const DEEP_LINK_BASE = "shopify:admin/themes/current/editor";

export default function ThemeSetup() {
  const [productHandle, setProductHandle] = useState("");
  const productPreviewPath = useMemo(
    () => (productHandle ? `/products/${productHandle}` : undefined),
    [productHandle],
  );

  const openProductEditor = useMemo(() => {
    const params = new URLSearchParams();
    params.set("template", "product");
    if (productPreviewPath) params.set("previewPath", productPreviewPath);
    return `${DEEP_LINK_BASE}?${params.toString()}`;
  }, [productPreviewPath]);

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
                Use the control below to open the Theme Editor on a specific product
                page. In the left sidebar, click “Add section”, switch to the
                “Apps” tab, search/select “Box Meter”, add it to the page, then
                click Save.
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
                <Button url={openProductEditor} target="_blank" variant="primary">
                  Open Product Editor
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
                In the left sidebar, click “Add section”, go to the “Apps” tab,
                search/select “Box Meter”, and confirm to add it to the page.
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
