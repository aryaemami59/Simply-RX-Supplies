import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import printjs from "print-js";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import { VendorNameType } from "../../../../customTypes/types";
import { selectQRCodeContent } from "../../../../Redux/addedSlice";
import { useAppSelector } from "../../../../Redux/hooks";

type Props = {
  vendorName: VendorNameType;
};

const header =
  "You can scan this image on the vendor's website to pull up all the items at once.";

const PrintIconQRCode: FC<Props> = ({ vendorName }) => {
  const src = useAppSelector(selectQRCodeContent(vendorName));
  // const [show, setShow] = useState(false);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    printjs({
      printable: src,
      type: "image",
      header,
      imageStyle: "width:80%;margin-bottom:20px;",
    });
  }, [src]);

  // const openTooltip: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
  //   setShow(true);
  // }, []);

  // const closeTooltip: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
  //   setShow(false);
  // }, []);

  return (
    <>
      {/* <Tooltip
        title={text}
        open={show}> */}
      <Button
        className="w-auto"
        variant="contained"
        startIcon={<FontAwesomeIcon icon={faPrint} />}
        onClick={clickHandler}
        // onMouseEnter={openTooltip}
        // onMouseLeave={closeTooltip}
      >
        Print QRCode
      </Button>
      {/* </Tooltip> */}
    </>
  );
};

export default memo<Props>(PrintIconQRCode);
