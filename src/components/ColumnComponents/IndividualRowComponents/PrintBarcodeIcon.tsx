import { faPrint } from "@fortawesome/free-solid-svg-icons/faPrint";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import printJS from "print-js";
import PropTypes from "prop-types";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback, useState } from "react";

import useItemName from "../../../hooks/useItemName";
import { useAppSelector } from "../../../redux/hooks";
import { selectItemSrc } from "../../../redux/selectors";

type Props = {
  header: string;
};

const startIcon = <FontAwesomeIcon icon={faPrint} />;

const title = "Print Barcode";

const PrintBarcodeIcon: FC<Props> = ({ header }) => {
  const [open, setOpen] = useState(false);
  const itemName = useItemName();
  const src = useAppSelector(selectItemSrc(itemName));

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    printJS({
      printable: src,
      type: "image",
      header,
      imageStyle: "width:80%;margin-bottom:20px;",
    });
  }, [header, src]);

  const showTooltip = useCallback(() => {
    setOpen(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      onClose={hideTooltip}
      onOpen={showTooltip}
      open={open}
      title={title}>
      <IconButton
        className="d-inline-block w-auto"
        onClick={clickHandler}
        size="small">
        {startIcon}
      </IconButton>
    </Tooltip>
  );
};

PrintBarcodeIcon.propTypes = {
  header: PropTypes.string.isRequired,
};

export default memo<Props>(PrintBarcodeIcon);
