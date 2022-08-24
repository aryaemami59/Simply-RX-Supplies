import { Card, Row, Col } from "react-bootstrap";
import { memo, useContext } from "react";
import SearchResultsBarcodeImageComponent from "./SearchResultsBarcodeImageComponent";
import SearchResultsItemNameComponent from "./SearchResultsItemNameComponent";
import SearchResultsItemNumberComponent from "./SearchResultsItemNumberComponent";
import SwitchComponent from "./SwitchComponent";
import AddItemButtonComponent from "./AddItemButtonComponent";
import { DarkMode } from "../../../App";
import { useAppSelector } from "../../../data/store";
const SingleInputListItems = ({ itemObj }) => {
    const { darkTheme } = useContext(DarkMode);
    const ifCompact = useAppSelector((state) => state.added.compact);
    return (<Card bg={darkTheme ? "dark" : "light"} border="info" text={darkTheme ? "white" : "dark"} key={`Card-SingleInputListItems`}>
      <Card.Body key={`Card.Body-SingleInputListItems`} className="row gy-2 justify-content-center">
        <Col xs={!ifCompact ? 12 : 6}>
          <Row className="m-0">
            <SearchResultsItemNameComponent itemObj={itemObj} key={`SearchResultsItemNameComponent-SingleInputListItems`}/>
          </Row>
        </Col>
        {!ifCompact ? (<Col xs={!ifCompact ? 12 : 6}>
            <Row className="mx-0">
              <SearchResultsItemNumberComponent itemObj={itemObj} key={`SearchResultsItemNumberComponent-${itemObj.name}-${itemObj.itemNumber}`}/>
            </Row>
          </Col>) : ("")}
        <Col xs={!ifCompact ? 12 : 6}>
          <Row className="justify-content-center justify-content-sm-center align-items-center m-0 ">
            <Col xs={7} md={12} lg={8} className="pe-0">
              <Row md={"auto"} className="m-0">
                {itemObj.vendors.map((e) => (<SwitchComponent 
        // disabled={false}
        key={`SwitchComponent-${itemObj.name}${e}`} itemObj={itemObj} 
        // clickHandler={null}
        vendorName={e}/>))}
              </Row>
            </Col>
            {!ifCompact ? (<Col xs={5} lg={4}>
                <Row className="justify-content-center">
                  <SearchResultsBarcodeImageComponent itemObj={itemObj} key={`SearchResultsBarcodeImageComponent-SingleInputListItems`}/>
                </Row>
              </Col>) : ("")}
          </Row>
        </Col>
        <Col xs={12}>
          <Row className="m-0">
            <AddItemButtonComponent itemObj={itemObj} key={`AddItemButtonComponent-SingleInputListItems`}/>
          </Row>
        </Col>
      </Card.Body>
    </Card>);
};
export default memo(SingleInputListItems);
