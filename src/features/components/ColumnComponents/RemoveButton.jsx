import { useDispatch } from "react-redux";
import { removeItems } from "../../../addedSlice";
import { memo, useCallback } from "react";
import { CloseButton } from "react-bootstrap";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

function RemoveButton({ vendorName, itemObj }) {
  const dispatch = useDispatch();

  const clickHandler = useCallback(() => {
    dispatch(removeItems({ itemObj, vendorName }));
  }, [dispatch, itemObj, vendorName]);

  return (
    <Button
      variant="danger"
      className="w-100 fs-5"
      key={`${vendorName}-${itemObj.name}-CloseButton`}
      onClick={clickHandler}>
      X
    </Button>
    // <CloseButton variant="danger"
    //   key={`${vendorName}-${itemObj.name}-CloseButton`}
    //   onClick={clickHandler}
    // />
  );
}

RemoveButton.propTypes = {
  vendorName: PropTypes.string,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(RemoveButton);
