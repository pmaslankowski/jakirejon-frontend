
const fetchAddressDetails = async (address) => {
  const details = {
    address: 'Testowa 123a',
    hospital: {
      name: 'testowy szpital',
      address: 'Szpitalna 23',
      phone: '123 456 789'
    }
  };

  return new Promise(resolve => setTimeout(() => resolve(details), 300));
};

export default { fetchAddressDetails };