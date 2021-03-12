import axios from "axios";

const ADDRESS_DETAILS_URL = 'addresses';

const fetchAddressDetails = async (address) => {
  const { status, data } = await axios.get(ADDRESS_DETAILS_URL, { params: { address }});
  if (status !== 200) {
    throw new Error(`${data.message}`);
  }
  return data;
};

export default { fetchAddressDetails };