import axios from 'axios';

const SUGGESTIONS_URL = 'suggestions';

const fetchMatchingStreets = async (prefix) => {
  const { status, data } = await axios.get(SUGGESTIONS_URL, { params: { prefix }});
  if (status !== 200) {
    throw new Error(`Bad status: ${status}`);
  }
  return data;
};

export default { fetchMatchingStreets };