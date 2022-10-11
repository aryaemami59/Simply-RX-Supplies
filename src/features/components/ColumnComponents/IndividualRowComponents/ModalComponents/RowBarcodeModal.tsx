import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import { ItemName } from "../../../../../customTypes/types";
import BarcodeImage from "../BarcodeImage";

const title = "Take a Closer Look at The Barcode";

type Props = {
  itemName: ItemName;
};

const RowBarcodeModal: FC<Props> = ({ itemName }) => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShow(true);
  }, []);

  const hideModal = useCallback(() => {
    setShow(false);
  }, []);

  const showTooltip = useCallback(() => {
    setOpen(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Tooltip
        key={`RowBarcodeModal-${itemName}`}
        onOpen={showTooltip}
        onClose={hideTooltip}
        enterDelay={1500}
        enterNextDelay={1500}
        title={title}
        open={open}>
        <Button
          variant="contained"
          startIcon={<FontAwesomeIcon icon={faMagnifyingGlassPlus} />}
          onClick={showModal}
          className="w-auto">
          Magnify
        </Button>
      </Tooltip>
      <Dialog
        keepMounted
        maxWidth="md"
        fullWidth
        open={show}
        onClose={hideModal}>
        <DialogTitle>{itemName}</DialogTitle>
        <DialogContent
          dividers
          className="justify-content-center d-flex">
          <BarcodeImage
            itemName={itemName}
            className="w-100"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={hideModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo<Props>(RowBarcodeModal);
