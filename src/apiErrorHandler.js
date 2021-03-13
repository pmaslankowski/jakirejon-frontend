
export const handleError = error => {
  throw new Error(getErrorMessage(error));
}

const getErrorMessage = error => {
  try {
    return error.response.data.message;
  } catch (e) {
    console.log('An unexpected error occured:', error);
    return 'Nieoczekiwany błąd';
  }
}