import ping from 'Core/ping';
import {
  VALIDATION_ERROR_SAMPLE,
  VALIDATION_ERROR_UNKNOWN_PARAMETER,
} from 'Constants/errorCodes';

describe('test ping core', () => {
  it('ping request should return Pong', () => {
    return expect(ping(null)).resolves.toBe('Pong');
  });

  it('ping request with sample error should return error message', () => {
    return expect(ping({ 'sample-error': 'message' })).rejects.toBe(
      'Error Message'
    );
  });

  it('ping request with sample error exception should return error exception', () => {
    return expect(ping({ 'sample-error': 'exception' })).rejects.toHaveProperty(
      'code',
      VALIDATION_ERROR_SAMPLE
    );
  });

  it('ping request with unknown input should return error exception', () => {
    return expect(ping({ invalid: 'invalid' })).rejects.toHaveProperty(
      'code',
      VALIDATION_ERROR_UNKNOWN_PARAMETER
    );
  });
});
