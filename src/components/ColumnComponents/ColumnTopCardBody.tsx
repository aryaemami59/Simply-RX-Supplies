import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import type { FC } from "react";
import { memo } from "react";
import { shallowEqual } from "react-redux";
import ItemNameProvider from "../../contexts/ItemNameProvider";
import useVendorName from "../../hooks/useVendorName";
import { useAppSelector } from "../../redux/hooks";
import { selectAddedItemsByVendor } from "../../redux/selectors";
import RowSingleContainer from "./IndividualRowComponents/RowSingleContainer";
import QRCodeImageContainer from "./QRCodeComponents/QRCodeImageContainer";
import VendorLink from "./VendorLink";

const ColumnTopCardBody: FC = () => {
  const vendorName = useVendorName();
  const addedItems = useAppSelector(
    selectAddedItemsByVendor(vendorName),
    shallowEqual
  );

  return (
    <CardContent className="p-2">
      <QRCodeImageContainer />
      <VendorLink />
      <List>
        {addedItems.map(itemName => (
          <ItemNameProvider
            key={`${itemName}-${vendorName}`}
            itemName={itemName}>
            <RowSingleContainer
              key={`${itemName}-${vendorName}-SingleVendorColumnListItem`}
            />
          </ItemNameProvider>
        ))}
      </List>
    </CardContent>
  );
};

export default memo(ColumnTopCardBody);
