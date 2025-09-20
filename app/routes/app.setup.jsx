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
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

// Theme App Extension constants
// If you change the theme extension, update the UID below.
const THEME_EXTENSION_UID = "840edf4f-c833-6545-9e53-823af116f0caac300943";

// Deep links (use the shopify: protocol to open inside Admin)
const DEEP_LINK_BASE = "shopify:admin/themes/current/editor?context=apps";
const ADD_BOX_METER = `${DEEP_LINK_BASE}&addAppBlockId=${THEME_EXTENSION_UID}/box_meter`;
const ADD_STAR_RATING = `${DEEP_LINK_BASE}&addAppBlockId=${THEME_EXTENSION_UID}/star_rating`;

export default function ThemeSetup() {
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
                Use the buttons below to deep link into the Theme Editor with
                the correct app block preselected. Then add the block to the
                section you want and save.
              </Text>
              <InlineStack gap="300">
                <Button url={ADD_BOX_METER} target="_blank" variant="primary">
                  Open Theme Editor — Box Meter
                </Button>
                <Button url={ADD_STAR_RATING} target="_blank" variant="secondary">
                  Open Theme Editor — Star Rating
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
                  Click one of the deep links above to open the Theme Editor.
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
                Admin and navigate to Online Store → Themes → Customize, or use
                this generic link: {" "}
                <Link url={DEEP_LINK_BASE} target="_blank" removeUnderline>
                  open Theme Editor
                </Link>
                .
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

