import { VendorNameType } from "../custom_types/types";
import { useAppSelector } from "../Redux/hooks";
import { selectVendorOfficialName } from "../Redux/selectors";

const useOfficialVendorName = (vendorName: VendorNameType) =>
  useAppSelector(selectVendorOfficialName(vendorName));

export default useOfficialVendorName;
