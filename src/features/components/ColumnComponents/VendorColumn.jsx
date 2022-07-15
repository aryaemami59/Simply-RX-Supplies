import {
  Button,
  Collapse,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Badge,
} from "reactstrap";
import { useState } from "react";
import { Container } from "reactstrap";

function VendorColumn(props) {
  const [open, setOpen] = useState(false);
  // console.log(props.itemsAdded);
  return (
    <>
      <div>
        <Button
          className="position-relative"
          color="primary"
          onClick={() => setOpen(!open)}
          key={`${props.officialVendorName}-VendorColumn-Button`}
          block>
          {props.officialVendorName}{" "}
          <Badge
            className="position-absolute top-0 start-100 translate-middle border border-light opacity-75"
            key={`${props.officialVendorName}-VendorColumn-Badge`}
            pill
            color={props.itemsAdded.length ? "success" : "secondary"}>
            {props.itemsAdded.length}
            {/* {props.itemsAdded.length ? props.itemsAdded.length : " "} */}
          </Badge>
        </Button>
        <Collapse isOpen={open}>
          <Card>
            <CardBody>
              <ListGroup>
                {props.itemsAdded.map((e, i) => (
                  <Container
                    color="danger"
                    className="bg-secondary p-4"
                    key={`${e.name}-${props.vendorName}-VendorColumn-Container-name`}>
                    <ListGroupItem
                      color="success"
                      key={`${e.name}-${props.vendorName}-VendorColumn-ListGroupItem-name`}>
                      Item Name: {e.name}
                    </ListGroupItem>
                    <ListGroupItem
                      color="primary"
                      key={`${e.itemNumber}-${props.vendorName}-VendorColumn-ListGroupItem-number`}>
                      Item Number: {e.itemNumber}
                    </ListGroupItem>
                  </Container>
                ))}
              </ListGroup>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    </>
  );
}

export default VendorColumn;
