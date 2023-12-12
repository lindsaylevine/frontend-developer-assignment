export const splitCompanyDomainsAndIndividuals = (recipients: Recipient[]): {
  companyDomains: { [domain: string]: Recipient[] };
  individualEmailAddresses: Recipient[];
} => {
  const companyDomains: { [domain: string]: Recipient[] } = {};
  const individualEmailAddresses: Recipient[] = [];

  const recipientDomains: { [domain: string]: Recipient[]; } = recipients.reduce((map: any, recipient: Recipient) => {
    const domain = recipient.email.split('@')[1];
    if (!map[domain]) {
      map[domain] = [recipient];
    } else {
      map[domain].push(recipient);
    }
    return map;
  }, {});

  Object.keys(recipientDomains).forEach((domain: string) => {
    if (recipientDomains[domain].length > 1) {
      companyDomains[domain] = recipientDomains[domain];
    } else {
      individualEmailAddresses.push(...recipientDomains[domain]);
    }
  });

  return { companyDomains, individualEmailAddresses };
};

export const validateEmailAddress = (emailAddress: string): boolean => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailAddress);
};