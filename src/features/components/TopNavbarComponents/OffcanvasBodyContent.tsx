import { FC, memo, useContext } from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import SideBarAccordionList from "../SideBarComponents/SideBarAccordionList";
import { DarkMode } from "../../../App";

const OffcanvasBodyContent: FC = (): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  return (
    <>
      <Offcanvas.Title
        className="mb-4"
        key={`Offcanvas.Title-OffcanvasComponent-By Vendor`}>
        By Vendor
      </Offcanvas.Title>
      <Nav
        className={`mb-5 rounded border p-4 ${
          darkTheme ? "border-info" : "border-dark"
        }`}
        key={`Nav-OffcanvasComponent`}>
        <VendorDropDownsList key={`VendorDropDownsList-OffcanvasComponent`} />
      </Nav>
      <Offcanvas.Title
        className="mb-4"
        key={`Offcanvas.Title-OffcanvasComponent-By Category`}>
        By Category
      </Offcanvas.Title>
      <div
        key={`div-OffcanvasComponent`}
        className={`accordion rounded border ${
          darkTheme ? "border-info" : "border-dark"
        }`}>
        <SideBarAccordionList key={`SideBarAccordionList-OffcanvasComponent`} />
      </div>
    </>
  );
};

export default memo(OffcanvasBodyContent);
