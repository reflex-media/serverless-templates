import { VALIDATION_ERROR_UNKNOWN_PARAMETER } from 'Constants/errorCodes';
import { normalize } from 'Middlewares/normalizeRequest';
import ValidationError from 'Exceptions/ValidationError';

describe('test normalizeRequest middleware', () => {
  it('test without parameters', () => {
    const data = normalize(undefined, null, null);
    expect(data).toBe(null);
  });

  it('test with valid query string', () => {
    const data = normalize({}, { someKey: 'someValue' }, null);
    expect(data).toMatchObject({ someKey: 'someValue' });
  });

  it('test with valid body and content-type', () => {
    const data = normalize(
      { 'content-type': 'application/json' },
      null,
      JSON.stringify({ someKey: 'someValue' })
    );

    expect(data).toMatchObject({ someKey: 'someValue' });
  });

  it('test with valid body and Content-Type', () => {
    const data = normalize(
      { 'Content-Type': 'application/json' },
      null,
      JSON.stringify({ someKey: 'someValue' })
    );

    expect(data).toMatchObject({ someKey: 'someValue' });
  });

  it('test with valid query string and body and Content-Type', () => {
    const data = normalize(
      { 'Content-Type': 'application/json' },
      { someKeyQS: 'someValueQS' },
      JSON.stringify({ someKeyBody: 'someValueBody' })
    );

    expect(data).toMatchObject({
      someKeyQS: 'someValueQS',
      someKeyBody: 'someValueBody',
    });
  });

  it('test with invalid body and valid Content-Type', () => {
    expect(() =>
      normalize({ 'Content-Type': 'application/json' }, null, {
        someKey: 'someValue',
      })
    ).toThrow(
      new ValidationError(
        'Content type defined as JSON but an invalid JSON was provided',
        VALIDATION_ERROR_UNKNOWN_PARAMETER
      )
    );
  });
});
