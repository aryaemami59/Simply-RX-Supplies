import { Button, ButtonGroup } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import { ItemName } from "../../../customTypes/types";
import { addItems } from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import {
  checkIfAddedToAllVendors,
  selectVendorsByItemName,
} from "../../../Redux/selectors";
import SideBarVendorBadges from "./SideBarVendorBadges";

type Props = {
  itemName: ItemName;
};

const SingleSideBarAccordionListItem: FC<Props> = ({ itemName }) => {
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors = useAppSelector(
    checkIfAddedToAllVendors(itemName)
  );
  // const vendorsToAddTo = useAppSelector(
  //   selectVendorsToAddTo(itemName),
  //   shallowEqual
  // );

  const vendors = useAppSelector(selectVendorsByItemName(itemName));

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    ifAddedToAllVendors || dispatch(addItems({ itemName }));
  }, [ifAddedToAllVendors, dispatch, itemName]);

  return (
    <>
      <div>
        <Button
          size="large"
          disabled={ifAddedToAllVendors}
          className="fw-bold"
          variant="contained"
          onClick={clickHandler}>
          {itemName}
        </Button>
      </div>
      <ButtonGroup
        size="small"
        orientation="vertical">
        {vendors.map(vendorName => (
          <SideBarVendorBadges
            key={`SideBarVendorBadges-${itemName}${vendorName}`}
            {...{ itemName, vendorName }}
          />
        ))}
      </ButtonGroup>
    </>
  );
};

export default memo<Props>(SingleSideBarAccordionListItem);
