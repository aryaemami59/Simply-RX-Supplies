import Button from "@mui/material/Button";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback } from "react";

import useItemId from "../../hooks/useItemId";
import useVendorId from "../../hooks/useVendorId";
import { addItemToCarts } from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  checkIfItemAddedToOneVendor,
  selectItemName,
} from "../../redux/selectors";

const SingleOffcanvasVendorItem: FC = () => {
  const vendorId = useVendorId();
  const itemId = useItemId();
  const dispatch = useAppDispatch();
  const itemName = useAppSelector(state => selectItemName(state, itemId));

  const ifAddedToVendor = useAppSelector(state =>
    checkIfItemAddedToOneVendor(state, vendorId, itemId)
  );

  const clickHandler = useCallback<MouseEventHandler<HTMLElement>>(() => {
    if (!ifAddedToVendor) {
      dispatch(addItemToCarts({ itemId, checkedVendorIds: [vendorId] }));
    }
  }, [ifAddedToVendor, dispatch, itemId, vendorId]);

  return (
    <div>
      <Button
        className="fw-bold w-100 my-1 fw-bold shadow-sm rounded-pill text-none"
        disabled={ifAddedToVendor}
        onClick={clickHandler}
        size="large"
        variant="contained">
        {itemName}
      </Button>
    </div>
  );
};

export default memo(SingleOffcanvasVendorItem);
