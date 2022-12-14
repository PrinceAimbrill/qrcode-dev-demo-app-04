import { useNavigate, TitleBar, Loading } from "@shopify/app-bridge-react";
import {
  Button,
  Card,
  EmptyState,
  Layout,
  Page,
  SkeletonBodyText,
} from "@shopify/polaris";
import { BundleList, QRCodeIndex } from "../components";
import { useAppQuery } from "../hooks";

export default function HomePage() {
  /*
    Add an App Bridge useNavigate hook to set up the navigate function.
    This function modifies the top-level browser URL so that you can
    navigate within the embedded app and keep the browser in sync on reload.
  */
  const navigate = useNavigate();

  /* useAppQuery wraps react-query and the App Bridge authenticatedFetch function */
  const {
    data: QRCodes,
    isLoading,

    /*
      react-query provides stale-while-revalidate caching.
      By passing isRefetching to Index Tables we can show stale data and a loading state.
      Once the query refetches, IndexTable updates and the loading state is removed.
      This ensures a performant UX.
    */
    isRefetching,
  } = useAppQuery({
    url: "/api/qrcodes",
  });

  /* Set the QR codes to use in the list */
  const qrCodesMarkup = QRCodes?.length ? (
    <QRCodeIndex QRCodes={QRCodes} loading={isRefetching} />
  ) : null;

  /* loadingMarkup uses the loading component from AppBridge and components from Polaris  */
  const loadingMarkup = isLoading ? (
    <Card sectioned>
      <Loading />
      <SkeletonBodyText />
    </Card>
  ) : null;

  /* Use Polaris Card and EmptyState components to define the contents of the empty state */
  const emptyStateMarkup =
    !isLoading && !QRCodes?.length ? (
      <Card sectioned>
        <EmptyState
          heading="Create product bundles"
          action={{
            content: "Create Bundle",
            onAction: () => navigate("/bundles/new"),
          }}
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
          <p>
            Allow customers to scan codes and buy products using their phones.
          </p>
        </EmptyState>
      </Card>
    ) : null;

  const bundleSetting = () => {
    navigate("/bundles/settings");
  };

  /*
    Use Polaris Page and TitleBar components to create the page layout,
    and include the empty state contents set above.
  */
  return (
    <Page fullWidth={!!qrCodesMarkup}>
      {/* <TitleBar
        title="QR codes"
        primaryAction={{
          content: "Create QR code",
          onAction: () => navigate("/qrcodes/new"),
        }}
      /> */}
      <TitleBar
        title="Product Bundles"
        primaryAction={{
          content: "Create Bundle",
          onAction: () => navigate("/bundles/new"),
        }}
      />
      <Layout>
        <Layout.Section>
          <Button onClick={() => bundleSetting()}>Bundle Settings</Button>
          <div>
            {loadingMarkup}
            {/* {qrCodesMarkup} */}
            {emptyStateMarkup}
            <BundleList QRCodes={QRCodes} loading={isRefetching} />
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
