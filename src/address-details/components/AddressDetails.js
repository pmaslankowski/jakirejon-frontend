import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import addressDetailsApi from '../address-details-api';

const AddressDetails = ({ address, className }) => {
  
  const [isLoading, setLoading] = useState(true);
  const [details, setDetails] = useState();
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const addressDetails = await addressDetailsApi.fetchAddressDetails(address);
        setDetails(addressDetails);
      } catch (e) {
        setErrorMsg(e.message);
      }
      setLoading(false);
    };

    fetch();
  }, [address]);

  const renderSpinner = () => (
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Ładowanie...</span>
    </div>
  );
  
  const renderDetails = () => {
    return errorMsg ? renderError() : renderDetailsTable();
  };

  const renderError = () => (
    <h5 className="text-info">{errorMsg}</h5>
  );

  const renderDetailsTable = () => (
    <div className={className}>
      <table className="table">
        <tbody>
          <tr>
            <td>Wyszukiwany adres</td>
            <td>{details.address}</td>
          </tr>
          <tr>
            <td>Nazwa szpitala</td>
            <td>{details.hospital.name}</td>
          </tr>
          <tr>
            <td>Adres szpitala</td>
            <td>{details.hospital.address}</td>
          </tr>
          <tr>
            <td>Numer telefonu</td>
            <td>{details.hospital.phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return isLoading ? renderSpinner() : renderDetails();
};

AddressDetails.propTypes = {
  address: PropTypes.string
};

export default AddressDetails;