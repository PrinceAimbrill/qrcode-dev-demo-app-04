import { Page } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { BundleForm } from "../../components";

export default function ManageCode() {
  const breadcrumbs = [{ content: "Product Bundles", url: "/" }];

  return (
    <Page>
      <TitleBar
        title="Create new Product Bundle"
        breadcrumbs={breadcrumbs}
        primaryAction={null}
      />
      <BundleForm />
    </Page>
  );
}
