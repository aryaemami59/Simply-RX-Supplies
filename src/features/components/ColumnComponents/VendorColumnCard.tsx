import { Card } from "@mui/material";
import { FC, KeyboardEvent, memo } from "react";
import {
  ItemName,
  OfficialVendorNameType,
  VendorNameType,
} from "../../../customTypes/types";
import ColumnTopCardBody from "./ColumnTopCardBody";
import EmptyColumn from "./EmptyColumn";

type Props = {
  handleKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  addedItems: ItemName[];
  vendorName: VendorNameType;
  officialVendorName: OfficialVendorNameType;
};

const VendorColumnCard: FC<Props> = ({
  addedItems,
  handleKeyDown,
  officialVendorName,
  vendorName,
}) => (
  <Card
    tabIndex={0}
    onKeyDown={handleKeyDown}>
    {addedItems.length ? (
      <ColumnTopCardBody
        addedItems={addedItems}
        vendorName={vendorName}
        officialVendorName={officialVendorName}
      />
    ) : (
      <EmptyColumn />
    )}
  </Card>
);

export default memo<Props>(VendorColumnCard);
