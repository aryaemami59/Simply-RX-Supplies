import { Form } from "react-bootstrap";
import { memo, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { selectAllItems, setListItems } from "../../../addedSlice";
import PropTypes from "prop-types";

const empty = [];

function InputFieldComponent() {
  const items = useSelector(selectAllItems, shallowEqual);
  const dispatch = useDispatch();
  const [val, setVal] = useState("");

  const listItemsFunc = useCallback(
    e => {
      const trimmedValue = e.target.value.trim().toLowerCase();
      return trimmedValue
        ? items
            .filter(({ name }) => name.toLowerCase().includes(trimmedValue))
            .slice(0, 100)
        : empty;
    },
    [items]
  );

  const changeVal = useCallback(
    e => {
      const listItems = listItemsFunc(e);
      setVal(e.target.value);
      dispatch(setListItems(listItems));
    },
    [dispatch, listItemsFunc]
  );

  return (
    <Form.Control
      placeholder="Search..."
      type="search"
      className="rounded-pill ps-4 mt-3 mb-5 text-white border-0 c-bg"
      key="input box"
      onChange={changeVal}
      value={val}
    />
  );
}

InputFieldComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
      keywords: PropTypes.arrayOf(PropTypes.string),
      nav: PropTypes.arrayOf(PropTypes.string),
      vendors: PropTypes.arrayOf(PropTypes.string),
      src: PropTypes.string,
    })
  ),
};

export default memo(InputFieldComponent);
