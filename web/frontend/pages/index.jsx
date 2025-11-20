import React from "react";
import { Page, Card, LegacyStack, Text, Button, Layout, Box, MediaCard, VideoThumbnail } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css";
import placeholder from "../assets/placeholder.svg";
import Needhelp from "../assets/12.svg";
import Descover from "../assets/descover.png";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Page>
      <Text variant="headingLg" as="h1">Home</Text>
      <br />
      <Text variant="headingMd" as="h2">Total activities</Text>
      <Card sectioned>
        <LegacyStack distribution="fillEvenly" alignment="center">
          <LegacyStack vertical spacing="tight" alignment="Left">
            <Text variant="headingMd" color="subdued">Bulk edits</Text>
            <Text variant="headingLg" fontWeight="bold">1</Text>
          </LegacyStack>
          <div style={{ borderLeft: '1px solid #dfe3e8', height: '40px' }} />
          <LegacyStack vertical spacing="tight" alignment="center">
            <Text variant="headingMd" color="subdued">Product exports</Text>
            <Text variant="headingLg" color="subdued">0</Text>
          </LegacyStack>
          <div style={{ borderLeft: '1px solid #dfe3e8', height: '40px' }} />
          <LegacyStack vertical spacing="tight" alignment="center">
            <Text variant="headingMd" color="subdued">Product imports</Text>
            <Text variant="headingLg" color="subdued">0</Text>
          </LegacyStack>
        </LegacyStack>
        <br />
        <LegacyStack distribution="center">
          <Button variant="primary">Start an in-app edit</Button>
        </LegacyStack>
      </Card>

      <br />

      <Text variant="headingMd" as="h2">Things to do next</Text>
      <br />
      <LegacyStack distribution="fillEvenly">
        <Button>Start an in-app edit</Button>
        <Button>Edit with a spreadsheet</Button>
        <Button>Export product data</Button>
      </LegacyStack>

      <br />

      <Text variant="headingMd" as="h2">Learn more about Ablestar</Text>
      <br />
      <MediaCard
        title="Your first in-app edit"
        primaryAction={{
          content: 'Watch video',
          onAction: () => { },
        }}
        description={`An in-app edit allows you to quickly make, bulk changes to your products directly within the app, such as adjusting prices, updating tags, or modifying inventory—no spreadsheets required.`}
        popoverActions={[{ content: 'Dismiss', onAction: () => { } }]}
      >
        <VideoThumbnail
          videoLength={80}
          thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
          onClick={() => console.log('clicked')}
        />
      </MediaCard>
      <br />

      <Card padding="400">
        <Layout>
          <Layout.Section>
            <Text variant="headingMd" as="h2">
              Ablestar changelog
            </Text>

            <Text>
              We're continuously updating the app to make it the fastest and safest way to update your product data. Stay up-to-date with the latest improvements by visiting our changelog.
            </Text>

            <div style={{ marginTop: "1rem" }}>
              <Button primary>Learn more</Button>
            </div>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <div style={{ textAlign: "right" }}>
              <img
                src={Needhelp}
                alt="Help placeholder"
                style={{ width: "180px", height: "auto" }}
              />
            </div>
          </Layout.Section>
        </Layout>
      </Card>
      <br />
      <Card padding="400">
        <Layout>
          <Layout.Section>
            <Text variant="headingMd" as="h2">
              Need help getting setup?
            </Text>

            <Text>
              Schedule a 30-minute call to discuss what you're aiming to achieve
              and explore how our app can help make that happen.
            </Text>

            <div style={{ marginTop: "1rem" }}>
              <Button primary>Book a call</Button>
            </div>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <div style={{ textAlign: "right" }}>
              <img
                src={placeholder}
                alt="Help placeholder"
                style={{ width: "180px", height: "auto" }}
              />
            </div>
          </Layout.Section>
        </Layout>
      </Card>

      <br />

      <Card padding="400">
        <Box
          background="bg-surface-secondary"
          paddingBlock="300"
          paddingInline="400"
        >
          <Layout>
            <Layout.Section>
              <Text variant="headingMd" as="h2">
                Discover more of Ablestar
              </Text>

              <Text>
                Browse all our apps on the Shopify App Store to grow your business
              </Text>

              <div style={{ marginTop: "1rem" }}>
                <Button primary>Explore now</Button>
              </div>
            </Layout.Section>

            <Layout.Section variant="oneThird">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <img
                  src={Descover}
                  alt="Discover"
                  style={{ width: "180px", height: "auto" }}
                />
              </div>
            </Layout.Section>
          </Layout>
        </Box>


        <div style={{ marginTop: "20px" }}>
          <LegacyStack distribution="fillEvenly" spacing="loose">
            <Box
              background="bg-surface-secondary"
              paddingBlock="300"
              paddingInline="400"
            >
              <Text variant="headingMd" as="h5" fontWeight="medium">Twitter / X</Text>
              <br />
              <Text>Connect with us on Twitter for</Text>
              <Text>the latest features and tips.</Text>
            </Box>

            <Box
              background="bg-surface-secondary"
              paddingBlock="300"
              paddingInline="400"
            >              <Text variant="headingMd" as="h5" fontWeight="medium">Worried about broken links?</Text>
              <br />
              <Text>We've got a free tool to scan</Text>
              <Text>your store for broken links.</Text>
            </Box>

            <Box
              background="bg-surface-secondary"
              paddingBlock="300"
              paddingInline="400"
            >
              <Text variant="headingMd" as="h5" fontWeight="medium">Changelog</Text>
              <br />
              <Text>Find the latest news and learn</Text>
              <Text>about new app updates.</Text>
            </Box>
          </LegacyStack>
        </div>
      </Card>
    </Page >
  );
}