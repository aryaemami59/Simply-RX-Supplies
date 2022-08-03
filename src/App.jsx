import "./App.css";
import { Col, Row, Container } from "reactstrap";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  memo,
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import items from "./data/items.json";
import VendorColumnList from "./features/components/ColumnComponents/VendorColumnList";
import InputGroupComponent from "./features/components/InputComponents/InputGroupComponent";
import NavbarComponent from "./features/components/NavbarComponents/NavbarComponent";
import AddedContext from "./features/components/ContextComponents/AddedContext";
// export const AddedContext = createContext();
const myURL =
  "https://api.github.com/repos/aryaemami59/simplysuppliesAPI/contents/items.json";
// let items = [];
function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const myItems = fetch(myURL, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3.raw",
        Authorization: "Bearer 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",
      },
    })
      .then(res => res.json())
      .then(data => data.items)
      .then(e => setItems(e));
  }, []);

  // myItems.then(e => items.push(e));
  // console.log(items);
  // const [itemsAdded, setItemsAdded] = useState([]);
  // const addItems = useCallback(ev => {
  //   return setItemsAdded(prev => [...prev, ev]);
  // }, []);

  // const [classes, setClasses] = useState(() => "");
  // const isInitialMount = useRef(() => true);

  // function addItems(ev) {
  //   setItemsAdded(prev => [...prev, ev]);
  // }

  // const itemNames = useMemo(() => items.map(({ name }) => name), []);

  console.log("app render");

  // useEffect(() => {
  //   console.log(itemsAdded);
  // }, [itemsAdded]);

  // useEffect(() => {
  //   console.log("item names");
  // }, [itemNames]);
  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     setClasses("text-decoration-line-through");
  //     console.log(itemsAdded);
  //   }
  // }, [itemsAdded]);

  return (
    <div className="App">
      <AddedContext>
        <NavbarComponent
        items={items}
        // itemsAdded={itemsAdded}
        // onAdd={addItems}
        />
        <Container>
          <Row className="my-5">
            <Col md="6">
              <InputGroupComponent
                // onAdd={addItems}
                // itemsAdded={itemsAdded}
                // itemNames={itemNames}
                items={items}
                key={`InputGroupComponent`}
              />
            </Col>
            <Col md="4">
              <VendorColumnList
              // itemsAdded={itemsAdded}
              />
            </Col>
          </Row>
        </Container>
      </AddedContext>
    </div>
  );
}

export default memo(App);
