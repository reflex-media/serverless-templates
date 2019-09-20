import ErrorException from 'Exceptions/ErrorException';
import { ERROR_EXCEPTION, ERROR_SAMPLE } from 'Constants/errorCodes';

describe('test ErrorException', () => {
  it('test ErrorException with default parameters', () => {
    const data = new ErrorException('Error exception test');

    expect(data.name).toBe('ErrorException');
    expect(data.message).toBe('Error exception test');
    expect(data.code).toBe(ERROR_EXCEPTION);
    expect(data.statusCode).toBe(400);
    expect(data.extra).toBeUndefined();
  });

  it('test ErrorException fully defined parameters', () => {
    const data = new ErrorException('Error exception test', ERROR_SAMPLE, 444, {
      someKey: 'someValue',
    });

    expect(data.name).toBe('ErrorException');
    expect(data.message).toBe('Error exception test');
    expect(data.code).toBe(ERROR_SAMPLE);
    expect(data.statusCode).toBe(444);
    expect(data.extra).toMatchObject({
      someKey: 'someValue',
    });
  });
});
