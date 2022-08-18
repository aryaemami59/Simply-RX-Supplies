import { Button, ButtonGroup } from "react-bootstrap";
import { memo, useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsObj,
  selectVendorsToAddTo,
} from "../../../addedSlice";
import SideBarVendorBadges from "./SideBarVendorBadges";
import PropTypes from "prop-types";

function SingleSideBarAccordionListItem({ targetId, itemObj }) {
  const dispatch = useDispatch();
  const ifAddedToAllVendors = useSelector(checkIfAddedToAllVendors(itemObj));
  const vendors = useSelector(selectVendorsToAddTo(itemObj), shallowEqual);
  const vendorsObj = useSelector(selectVendorsObj, shallowEqual);

  const clickHandler = useCallback(() => {
    ifAddedToAllVendors || dispatch(addItems({ itemObj, vendors }));
  }, [dispatch, itemObj, vendors, ifAddedToAllVendors]);

  return (
    <>
      <Button
        size="lg"
        className="fw-bold"
        variant={`${ifAddedToAllVendors ? "info text-white" : "outline-info"}`}
        onClick={clickHandler}
        key={`${itemObj.name}-${targetId}-ListGroupItem-sidebar`}>
        {itemObj.name}
      </Button>
      <ButtonGroup size="sm" vertical>
        {itemObj.vendors.map(e => (
          <SideBarVendorBadges
            key={`SideBarVendorBadges-${itemObj.name}${e}`}
            itemObj={itemObj}
            officialVendorName={vendorsObj[e].officialName}
            vendorName={e}
          />
        ))}
      </ButtonGroup>
    </>
  );
}

SingleSideBarAccordionListItem.propTypes = {
  targetId: PropTypes.string,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(SingleSideBarAccordionListItem);
