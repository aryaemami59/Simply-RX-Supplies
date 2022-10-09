import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import QRCode from "qrcode";
import { createSelector } from "reselect";
import {
  addedStateInitial,
  addItemsByVendorInterface,
  addItemsInterface,
  categoriesObjType,
  Category,
  FetchCategories,
  FetchItems,
  FetchVendors,
  ItemObjType,
  Link,
  officialVendorNameType,
  vendorNameType,
  VendorsObjInAddedState,
  vendorsObjType,
} from "../customTypes/types";
import {
  GITHUB_URL_CATEGORIES,
  GITHUB_URL_ITEMS,
  GITHUB_URL_VENDORS,
} from "./fetchInfo";
import { RootState } from "./store";
import { ItemsObj, addedState } from "../customTypes/types";

const intersection = (firstArray: string[], secondArray: string[]): string[] =>
  firstArray.filter(e => !secondArray.includes(e));

const createAsyncThunkFunc = (strVal: string, githubUrl: string) =>
  createAsyncThunk(`${strVal}/fetch${strVal}`, async () => {
    const response: Response = await fetch(githubUrl);
    if (!response.ok) {
      return Promise.reject(`Unable to fetch, status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
    // const myItems = await data[strVal];
    // return myItems;
  });

const emptyObj = {};
// emptyObj;

// export const fetchItems = createAsyncThunk();

export const fetchItems: FetchItems = createAsyncThunkFunc(
  "items",
  GITHUB_URL_ITEMS
);

// export const fetchVendors: FetchVendors = createAsyncThunkFunc(
//   "vendors",
//   GITHUB_URL_VENDORS
// );

// export const fetchCategories: FetchCategories = createAsyncThunkFunc(
//   "categories",
//   GITHUB_URL_CATEGORIES
// );

const emptyArr: [] = [];

const emptyVendorObj: VendorsObjInAddedState = {
  items: emptyArr,
  qrContent: "",
  qrText: "",
};

const initialState = {
  listItems: emptyArr,
  // compact: false,
  // showItemNumber: true,
  // showItemBarcode: true,
  // showItemName: true,
  // vendorsIsLoading: true,
  // categoriesIsLoading: true,
  errMsg: "",
  isLoading: true,
  itemsArr: emptyArr,
  itemsObj: emptyObj,
  vendorsArr: emptyArr,
  vendorsObj: emptyObj,
  categoriesArr: emptyArr,
  categoriesObj: emptyObj,
} as unknown as addedState;

// const itemInitialState: itemState = {
//   itemsArr: empty,
//   isLoading: true,
//   errMsg: "",
// };

export const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<addItemsInterface>) => {
      action.payload.vendors.forEach((vendorName: vendorNameType) => {
        if (
          !current(state.vendorsObj[vendorName])!.itemsAdded!.includes(
            action.payload.itemObj
          )
        ) {
          state.vendorsObj[vendorName]!.itemsAdded!.push(
            action.payload.itemObj
          );
          const qr = state.vendorsObj[vendorName]!.itemsAdded!.map(
            ({ itemNumber }) => itemNumber
          ).join(state.vendorsObj![vendorName].joinChars);
          QRCode.toDataURL(qr, (err, url) => {
            state.vendorsObj[vendorName]!.qrContent = url;
          });
          state.vendorsObj[vendorName]!.qrText = qr;
          state.listItems = state.listItems.filter(
            ({ name }) => name !== action.payload.itemObj.name
          );
          state.itemsObj[action.payload.itemObj.name]!.vendorsAdded = [
            ...state.itemsObj[action.payload.itemObj.name]!.vendorsAdded,
            ...state.itemsObj[action.payload.itemObj.name]!.vendorsToAdd,
          ];
          state.itemsObj[action.payload.itemObj.name]!.vendorsToAdd = state
            .itemsObj[action.payload.itemObj.name]!.vendorsToAdd.length
            ? (intersection(
                action.payload.itemObj.vendors,
                state.itemsObj[action.payload.itemObj.name]!.vendorsAdded
              ) as vendorNameType[])
            : emptyArr;
        }
      });
    },
    addItemsByVendor: (
      state,
      action: PayloadAction<addItemsByVendorInterface>
    ) => {
      state.vendorsObj[action.payload.vendorName]!.itemsAdded!.push(
        action.payload.itemObj
      );
    },
    removeItems: (state, action: PayloadAction<addItemsByVendorInterface>) => {
      state.vendorsObj![action.payload.vendorName]!.itemsAdded =
        state.vendorsObj![action.payload.vendorName]!.itemsAdded!.filter(
          ({ id }: ItemObjType) => id !== action.payload.itemObj.id
        );
    },
    setListItems: (state, action: PayloadAction<ItemObjType[]>) => {
      state.listItems = action.payload;
    },
    clearListItems: state => {
      state.listItems = emptyArr;
    },
    setVendors: (state, action: PayloadAction<addItemsByVendorInterface>) => {
      const { itemObj, vendorName } = action.payload;
      state.itemsObj[itemObj.name]!.vendorsToAdd = state.itemsObj[
        itemObj.name
      ]!.vendorsToAdd.includes(action.payload.vendorName)
        ? state.itemsObj[itemObj.name]!.vendorsToAdd.filter(
            vendorNameParam => vendorNameParam !== vendorName
          )
        : state.itemsObj[itemObj.name]!.vendorsToAdd.concat(vendorName);
    },
    // compactSearchResults: state => {
    //   state.compact = !state.compact;
    // },
    // ToggleItemNumber: state => {
    //   state.showItemNumber = !state.showItemNumber;
    // },
    // ToggleItemBarcode: state => {
    //   state.showItemBarcode = !state.showItemBarcode;
    // },
    // ToggleItemName: state => {
    //   state.showItemName = !state.showItemName;
    // },
  },
  extraReducers: builder => {
    builder.addCase(fetchItems.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error.message || "Fetch failed";
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      const { categories, items, vendors } = action.payload;
      state.itemsArr = items.map(({ name }) => name);
      for (const itemObj of items) {
        state.itemsObj![itemObj.name] = {
          ...itemObj,
          vendorsAdded: emptyArr,
          vendorsToAdd: itemObj.vendors,
        };
      }
      state.vendorsArr = Object.keys(vendors) as vendorNameType[];
      // vendors.
      // state.vendorsObj = {...vendors, itemsAdded}

      for (const vendorObj of Object.values(vendors)) {
        state.vendorsObj[vendorObj.abbrName] = {
          ...vendorObj,
          itemsAdded: emptyArr as ItemObjType[],
          qrContent: "",
          qrText: "",
        };
      }
      state.categoriesArr = Object.keys(categories) as Category[];
      state.categoriesObj = { ...categories };
      // for (const categoryObj of Object.values(categories)) {
      //   state.vendorsObj[categoryObj.] = {
      //     ...categoryObj,
      //     itemsAdded: emptyObj,
      //   };
      // }

      state.isLoading = false;
      state.errMsg = "";
    });
    // builder.addCase(fetchVendors.pending, state => {
    //   state.vendorsIsLoading = true;
    // });
    // builder.addCase(fetchCategories.pending, state => {
    //   state.categoriesIsLoading = true;
    // });
    // builder.addCase(
    //   fetchCategories.fulfilled,
    //   (state, action: PayloadAction<categoriesObjType>) => {
    //     state.categoriesObj = action.payload;
    //     const keys = Object.keys(action.payload) as Category[];
    //     state.categoriesArr = keys;
    //     state.categoriesIsLoading = false;
    //     state.errMsg = "";
    //   }
    // );
    // builder.addCase(
    //   fetchVendors.fulfilled,
    //   (state, action: PayloadAction<vendorsObjType>) => {
    //     const payload: vendorsObjType = action.payload;
    //     const keys = Object.keys(payload) as vendorNameType[];
    //     state.vendorsArr = keys;
    //     state.vendorsObj = payload as vendorsObjType;
    //     let val: vendorNameType;
    //     for (val in payload) {
    //       state[val] = emptyVendorObj;
    //     }
    //     state.vendorsIsLoading = false;
    //     state.errMsg = "";
    //   }
    // );
    // builder.addCase(fetchVendors.rejected, (state, action) => {
    //   state.vendorsIsLoading = false;
    //   state.errMsg = action.error.message || "Fetch failed";
    // });
    // builder.addCase(fetchCategories.rejected, (state, action) => {
    //   state.categoriesIsLoading = false;
    //   state.errMsg = action.error.message || "Fetch failed";
    // });
  },
});

// export const itemSlice = createSlice({
//   name: "item",
//   initialState: itemInitialState,
//   reducers: {
//     setVendors: (state, action: PayloadAction<addItemsByVendorInterface>) => {
//       state[action.payload.itemObj.name]!.vendorsToAdd = state[
//         action.payload.itemObj.name
//       ]!.vendorsToAdd.includes(action.payload.vendorName)
//         ? state[action.payload.itemObj.name]!.vendorsToAdd.filter(
//             vendorName => vendorName !== action.payload.vendorName
//           )
//         : state[action.payload.itemObj.name]!.vendorsToAdd.concat(
//             action.payload.vendorName
//           );
//     },
//   },
//   extraReducers: builder => {
//     builder.addCase(fetchItems.pending, (state: itemState) => {
//       state.isLoading = true;
//     });
//     builder.addCase(
//       fetchItems.fulfilled,
//       (state, action: PayloadAction<ItemObjType[]>) => {
//         for (const itemObj of action.payload) {
//           state[itemObj.name] = {
//             ...itemObj,
//             vendorsToAdd: itemObj.vendors,
//             vendorsAdded: empty,
//           };
//         }
//         state.isLoading = false;
//         state.errMsg = "";
//         state.itemsArr = action.payload;
//       }
//     );
//     builder.addCase(fetchItems.rejected, (state, action) => {
//       state.isLoading = false;
//       state.errMsg = action.error.message || "Fetch failed";
//     });
//     builder.addCase(addItems, (state, action) => {
//       state[action.payload.itemObj.name]!.vendorsAdded = [
//         ...state[action.payload.itemObj.name]!.vendorsAdded,
//         ...state[action.payload.itemObj.name]!.vendorsToAdd,
//       ];
//       state[action.payload.itemObj.name]!.vendorsToAdd = state[
//         action.payload.itemObj.name
//       ]!.vendorsToAdd.length
//         ? (intersection(
//             action.payload.itemObj.vendors,
//             state[action.payload.itemObj.name]!.vendorsAdded
//           ) as vendorNameType[])
//         : empty;
//     });
//     builder.addCase(
//       addItemsByVendor,
//       (state, action: PayloadAction<addItemsByVendorInterface>) => {
//         state[action.payload.itemObj.name]!.vendorsAdded = [
//           ...state[action.payload.itemObj.name]!.vendorsAdded,
//           action.payload.vendorName,
//         ];
//         state[action.payload.itemObj.name]!.vendorsToAdd = state[
//           action.payload.itemObj.name
//         ]!.vendorsToAdd.length
//           ? (intersection(
//               action.payload.itemObj.vendors,
//               state[action.payload.itemObj.name]!.vendorsAdded
//             ) as vendorNameType[])
//           : empty;
//       }
//     );
//     builder.addCase(
//       removeItems,
//       (state, action: PayloadAction<addItemsByVendorInterface>) => {
//         state[action.payload.itemObj.name]!.vendorsAdded = state[
//           action.payload.itemObj.name
//         ]!.vendorsAdded.filter(
//           vendorName => vendorName !== action.payload.vendorName
//         );
//       }
//     );
//   },
// });

export const selectByVendor =
  (vendorName: vendorNameType) =>
  (state: RootState): ItemObjType[] =>
    state.added.vendorsObj[vendorName]!.items.map(
      e => Object.values(state.added.itemsObj).find(({ id }) => id === e)!
    );

export const selectVendorsArr = (state: RootState): vendorNameType[] =>
  state.added.vendorsArr ? state.added.vendorsArr : emptyArr;

export const selectVendorsLinks =
  (vendorName: vendorNameType) =>
  (state: RootState): Link =>
    state.added.vendorsObj[vendorName]!.link;

export const selectCategoriesArr = (state: RootState): Category[] =>
  state.added.categoriesArr!;

export const addedItemsLength =
  (vendorName: vendorNameType) =>
  (state: RootState): number =>
    state.added.vendorsObj[vendorName]!.itemsAdded!.length;

export const checkIfAddedToOneVendor =
  (itemObj: ItemObjType, vendorName: vendorNameType) =>
  (state: RootState): boolean =>
    state.added[itemObj.name]!.vendorsAdded.includes(vendorName);

export const selectItemsByVendor =
  (vendorName: vendorNameType) =>
  (state: RootState): ItemObjType[] =>
    state.added.vendorsObj![vendorName].items.map(
      (itemId: number) =>
        Object.values(state.added.itemsObj).find(({ id }) => id === itemId)!
    );

export const selectVendorsToAddTo =
  (itemObj: ItemObjType) =>
  (state: RootState): vendorNameType[] =>
    state.added.itemsObj[itemObj.name]!.vendorsToAdd;

export const selectCategories =
  (category: Category) =>
  (state: RootState): ItemObjType[] => {
    const categoriesObj = state.added.categoriesObj as categoriesObjType;
    return categoriesObj[category].items.map(
      itemId =>
        Object.values(state.added.itemsObj).find(({ id }) => id === itemId)!
    );
  };

export const selectQRCodeContent =
  (vendorName: vendorNameType) =>
  (state: RootState): string =>
    state.added.vendorsObj[vendorName]!.qrContent!;

export const numbersOnQR = (vendorName: vendorNameType) => (state: RootState) =>
  state.added.vendorsObj[vendorName]!.qrText!;

export const checkIfAddedToAllVendors =
  (itemObj: ItemObjType) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemObj.name]!.vendorsAdded.length ===
    itemObj.vendors.length;

export const checkIfItemAddedToOneVendor =
  (vendorName: vendorNameType, itemObj: ItemObjType) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemObj.name]!.vendorsAdded.includes(vendorName);

export const selectItemsArr = (state: RootState): ItemObjType[] =>
  Object.values(state.added.itemsObj);

export const selectVendorOfficialName =
  (vendorName: vendorNameType) =>
  (state: RootState): officialVendorNameType =>
    state.added.vendorsObj![vendorName].officialName;

export const selectAllVendorOfficialNames = (
  state: RootState
): officialVendorNameType[] =>
  state.added.vendorsArr!.map(
    (vendorName: vendorNameType) =>
      state.added.vendorsObj![vendorName].officialName
  );

// export const qr = (state: RootState) => (vendorName: vendorNameType) =>
//   QRCode.toDataURL(QRCodeContent, (err, url) => {
//     setSrc(url);
//   });

export const selectAllListItems = createSelector(
  (state: RootState): ItemObjType[] => state.added.listItems,
  (listItems: ItemObjType[]): ItemObjType[] => listItems
);

export const checkIfLoading = (state: RootState): boolean =>
  state.added.isLoading;
// state.added.vendorsIsLoading ||
// state.added.categoriesIsLoading;

export const selectErrMsg = (state: RootState): string => state.added.errMsg;

export const {
  addItems,
  removeItems,
  addItemsByVendor,
  setListItems,
  clearListItems,
  setVendors,
  // compactSearchResults,
  // ToggleItemNumber,
  // ToggleItemBarcode,
  // ToggleItemName,
} = addedSlice.actions;

// export const { setVendors } = itemSlice.actions;

// export const itemReducer: Reducer<itemState, AnyAction> = itemSlice.reducer;

export const addedReducer = addedSlice.reducer;
