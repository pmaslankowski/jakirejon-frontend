import { handleError } from "./apiErrorHandler";

describe('apiErrorHandler', () => {

  it('should throw an error with message when data contains a message', () => {
    const error = {
      response: {
        data: {
          message: 'message' 
        }
      }
    };
    expect(() => handleError(error)).toThrow('message');
  });

  it('should handle an unknown error', () => {
    const error = {
      response: {
        foo: 'bar' 
      }
    };

    expect(() => handleError(error)).toThrow('Nieoczekiwany błąd');
  });
});