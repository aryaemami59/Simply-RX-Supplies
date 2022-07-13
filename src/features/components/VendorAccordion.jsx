import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

function VendorAccordion(props) {
  return (
    <>
      <AccordionItem>
        <AccordionHeader
          targetId={props.targetId}
          onClick={() => props.onToggle(props.targetId)}>
          {props.vendorName}
        </AccordionHeader>
        <AccordionBody accordionId={props.targetId}>
          <ListGroup>
            {props.items
              .filter(e => e[props.vendorName])
              .map(e => (
                <ListGroupItem
                  onClick={() => props.onAdd(e)}
                  key={`${e.name}-${props.vendorName}`}>
                  {e.name}
                </ListGroupItem>
              ))}
          </ListGroup>
        </AccordionBody>
      </AccordionItem>
    </>
  );
}

export default VendorAccordion;
