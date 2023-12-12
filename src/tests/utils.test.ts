import RECIPIENTS from '../assets/recipientsData.json';
import * as utils from '../utils';

describe('splitCompanyDomainsAndIndividuals', () => {
  test('should return empty objects when passed an empty array', () => {
    const recipients: Recipient[] = [];
    const result = utils.splitCompanyDomainsAndIndividuals(recipients);
    expect(result.companyDomains).toEqual({});
    expect(result.individualEmailAddresses).toEqual([]);
  });

  test('should return separated individual email addresses and a map of company domains', () => {
    const result = utils.splitCompanyDomainsAndIndividuals(RECIPIENTS);
    expect(result.companyDomains['timescale.com']).toHaveLength(2)
    expect(result.individualEmailAddresses).toHaveLength(2);
  });
});

describe('validateEmailAddress', () => {
  test('should return false when passed an empty string', () => {
    const result = utils.validateEmailAddress('');
    expect(result).toBe(false);
  });

  test('should return false for invalid input', () => {
    const result = utils.validateEmailAddress('ISji8fjd9gg');
    expect(result).toBe(false);
  });

  test('should return true for valid input', () => {
    const result = utils.validateEmailAddress('ISji8fjd9gg@gmail.com');
    expect(result).toBe(true);
  });
});