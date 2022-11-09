import React, { useEffect, useState } from "react";
import { useNavigate } from "@shopify/app-bridge-react";
import {
  Card,
  Icon,
  IndexTable,
  Stack,
  TextStyle,
  Thumbnail,
  UnstyledLink,
} from "@shopify/polaris";
import {
  DiamondAlertMajor,
  ImageMajor,
  DeleteMajor,
  EditMajor,
} from "@shopify/polaris-icons";

/* useMedia is used to support multiple screen sizes */
import { useMedia } from "@shopify/react-hooks";

/* dayjs is used to capture and format the date a QR code was created or modified */
import dayjs from "dayjs";
import axios from "axios";

function SmallScreenCard({
  id,
  navigate,
  shop,
  name,
  title,
  discount_type,
  start_date,
  end_date,
}) {
  return (
    <UnstyledLink onClick={() => navigate(`/bundles/${id}`)}>
      <div
        style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #E1E3E5" }}
      >
        <Stack>
          {/* <Stack.Item>
            <Thumbnail
              source={product?.images?.edges[0]?.node?.url || ImageMajor}
              alt="placeholder"
              color="base"
              size="small"
            />
          </Stack.Item> */}
          <Stack.Item fill>
            <Stack vertical={true}>
              <Stack.Item>
                <p>
                  <TextStyle variation="strong">
                    {`Shop name : ${truncate(shop, 35)}`}
                  </TextStyle>
                </p>
                <p>{`Bundle Title : ${truncate(title, 35)}`}</p>
                <p>{`Start Date : ${dayjs(start_date).format(
                  "MMMM D, YYYY"
                )}`}</p>
                <p>{`End Date : ${dayjs(end_date).format("MMMM D, YYYY")}`}</p>
              </Stack.Item>
              <div style={{ display: "flex" }}>
                <div style={{ flex: "3" }}>
                  <TextStyle variation="subdued">Discount Type</TextStyle>
                  <p>{discount_type || "-"}</p>
                </div>
                <div style={{ flex: "2" }}>
                  <TextStyle variation="subdued">Name</TextStyle>
                  <p>{name}</p>
                </div>
              </div>
            </Stack>
          </Stack.Item>
        </Stack>
      </div>
    </UnstyledLink>
  );
}

export function BundleList({ QRCodes, loading }) {
  const navigate = useNavigate();

  /* fetch bundle List start  */
  const [bundles, setBundles] = useState([]);
  const BUNDLE_API = "/api/bundles";
  console.log("bundles", bundles);

  useEffect(() => {
    loadBundlesData();
  }, []);

  const loadBundlesData = async () => {
    try {
      const response = await axios.get(BUNDLE_API);
      if (response?.status === 200) {
        setBundles(response?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  /* fetch bundle List end  */

  /* Check if screen is small */
  const isSmallScreen = useMedia("(max-width: 640px)");

  /* Map over QRCodes for small screen */
  const smallScreenMarkup = bundles?.map((bundles) => (
    <SmallScreenCard key={bundles?.id} navigate={navigate} {...bundles} />
  ));

  const resourceName = {
    singular: "Bundle",
    plural: "Bundles",
  };

  const deleteBundle = async (id) => {
    const response = await axios.delete(`/api/bundles/${id}`);
    console.log(response);
    if (response?.status === 200) {
      loadBundlesData();
    }
  };

  const rowMarkup = bundles?.map(
    (
      { id, shop, name, title, status, discount_type, start_date, end_date },
      index
    ) => {
      /* The form layout, created using Polaris components. Includes the QR code data set above. */
      return (
        <IndexTable.Row
          id={id}
          key={id}
          position={index}
          // onClick={() => {
          //   navigate(`/bundles/${id}`);
          // }}
        >
          {/* <IndexTable.Cell>
            <Thumbnail
              source={product?.images?.edges[0]?.node?.url || ImageMajor}
              alt="placeholder"
              color="base"
              size="small"
            />
          </IndexTable.Cell> */}
          <IndexTable.Cell>{truncate(shop, 25)}</IndexTable.Cell>
          <IndexTable.Cell>{truncate(name, 25)}</IndexTable.Cell>
          <IndexTable.Cell>{truncate(title, 25)}</IndexTable.Cell>
          <IndexTable.Cell>{truncate(status, 25)}</IndexTable.Cell>
          <IndexTable.Cell>{truncate(discount_type, 25)}</IndexTable.Cell>
          <IndexTable.Cell>
            {dayjs(start_date).format("MMMM D, YYYY")}
          </IndexTable.Cell>
          <IndexTable.Cell>
            {dayjs(end_date).format("MMMM D, YYYY")}
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Stack>
              <UnstyledLink data-primary-link url={`/bundles/${id}`}>
                <div className="d-flex justify-content-between">
                  <Icon source={EditMajor} color="primary" />
                  <TextStyle
                    style={{ marginLeft: "20px" }}
                    variation={"positive"}
                  >
                    {"Edit Bundle"}
                  </TextStyle>
                </div>
              </UnstyledLink>
            </Stack>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <span
              onClick={() => {
                deleteBundle(id);
              }}
              className="d-flex"
            >
              <Icon source={DeleteMajor} color="critical" />
              <TextStyle variation={"negative"}>{"Delete Bundle"}</TextStyle>
            </span>
          </IndexTable.Cell>
        </IndexTable.Row>
      );
    }
  );

  return (
    <>
      <Card>
        {isSmallScreen ? (
          smallScreenMarkup
        ) : (
          <IndexTable
            resourceName={resourceName}
            itemCount={QRCodes?.length}
            headings={[
              // { title: "Thumbnail", hidden: true },
              { title: "Shop" },
              { title: "Name" },
              { title: "Title" },
              { title: "Status" },
              { title: "Discount Type" },
              { title: "Start Date" },
              { title: "End Date" },
              { title: "Action" },
            ]}
            selectable={false}
            loading={loading}
          >
            {rowMarkup}
          </IndexTable>
        )}
      </Card>
    </>
  );
}

/* A function to truncate long strings */
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "…" : str;
}
