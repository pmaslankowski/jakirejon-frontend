import axios from "axios";
import { handleError } from "../apiErrorHandler";

const ADDRESS_DETAILS_URL = 'addresses';

const fetchAddressDetails = async (address) => {
  try {
    const response = await axios.get(ADDRESS_DETAILS_URL, { params: { address }});
    return response.data;
  } catch (e) {
    handleError(e);
  }
};

export default { fetchAddressDetails };