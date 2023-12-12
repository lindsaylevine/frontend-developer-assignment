import { useEffect, useState } from 'react';
import { Box, Heading, TextInput, Text } from 'grommet';
import RECIPIENTS from '../../assets/recipientsData.json';
import { splitCompanyDomainsAndIndividuals } from '../../utils';
import { CaretDownFill, CaretRightFill, Search } from 'grommet-icons';
import CompanyDomainItem from './CompanyDomainItem';
import IndividualEmailItem from './IndividualEmailItem';

/**
 * Some comments:
 * - If the JSON didn't include the isSelected property, I probably would have managed selected state by just keeping
 * an array of selected email adddresses, but I felt like since it was included in the JSON, I should expand off of that.
 * - I *think* I interpreted the mockup and selection UX correctly for company domains vs individual email addresses, but
 * I'm not 1000% sure because I do think the UX is a little confusing? I understand the value of building it this way for
 * the sake of the exercise and writing the logic, but I'm not sure I see the value in splitting up between company and individual.
 * Why not just have *only* domains with the emails under it, even if there's only one email? That way addresses aren't bouncing
 * in and out of different groups (on the selection side) as you select and unselect. Hopefully that makes sense :'D.
 */

const ManageEmailAddresses = () => {
  const [recipients, setRecipients] = useState<Recipient[]>(RECIPIENTS);

  const [shouldExpandSelectedCompanyDomains, setShouldExpandSelectedCompanyDomains] = useState<boolean>(false);
  const [shouldExpandSelectedIndividualEmails, setShouldExpandSelectedIndividualEmails] = useState<boolean>(false);

  const selectedRecipients: Recipient[] = recipients.filter((recipient: Recipient) => recipient.isSelected);
  const recipientChoices = recipients.filter((recipient: Recipient) => !recipient.isSelected);
  const { companyDomains, individualEmailAddresses } = splitCompanyDomainsAndIndividuals(recipientChoices);
  const { companyDomains: selectedDomains, individualEmailAddresses: selectedIndividualAddresses } = splitCompanyDomainsAndIndividuals(selectedRecipients);

  const handleDomainClick = (recipients: Recipient[]) => {
    setRecipients((prevRecipients: Recipient[]) => {
      const updatedRecipients = [...prevRecipients];
      recipients.forEach((recipient: Recipient) => {
        const recipientIndex = updatedRecipients.findIndex((updatedRecipient: Recipient) => updatedRecipient.email === recipient.email);
        updatedRecipients[recipientIndex] = {
          ...updatedRecipients[recipientIndex],
          isSelected: !updatedRecipients[recipientIndex].isSelected,
        };
      });
      return updatedRecipients;
    });
  };

  const handleRecipientClick = (recipient: Recipient) => {
    handleDomainClick([recipient]);
  };

  return (
    <Box direction="row" gap="24px">
      <Box>
        <Heading level="4">Available Recipients</Heading>
        <TextInput icon={<Search size="16px" color="#000" />} style={{ fontWeight: 'normal' }} size="16px" placeholder="Search" />
        <Box>
          {Object.keys(companyDomains).map((domain: string) => {
            return (
              <CompanyDomainItem
                key={`available-domain-${domain}`}
                onDomainClick={handleDomainClick}
                onRecipientClick={handleRecipientClick}
                domain={domain}
                recipients={companyDomains[domain]} />
            )
          })}
          {individualEmailAddresses.map((recipient: Recipient) => (
            <IndividualEmailItem key={`available-individual-recipient-${recipient.email}`} recipient={recipient} onClick={handleRecipientClick} />
          ))}
        </Box>
      </Box>
      <Box>
        <Heading level="4">Selected recipients</Heading>
        <Box>
          <Box align="center" direction="row" hoverIndicator onClick={() => setShouldExpandSelectedCompanyDomains(!shouldExpandSelectedCompanyDomains)}>
            {shouldExpandSelectedCompanyDomains ? <CaretDownFill color="#000" /> : <CaretRightFill color="#000" />}
            <Text size="16px" weight="bold">
              Company Recipients
            </Text>
          </Box>
          {shouldExpandSelectedCompanyDomains && (
            <Box>
              {Object.keys(selectedDomains).map((domain: string) => (
                <CompanyDomainItem
                  key={`selected-domain-${domain}`}
                  onDomainClick={handleDomainClick}
                  onRecipientClick={handleRecipientClick}
                  domain={domain}
                  recipients={selectedDomains[domain]} />
              ))}
            </Box>
          )}
          <Box align="center" direction="row" hoverIndicator onClick={() => setShouldExpandSelectedIndividualEmails(!shouldExpandSelectedIndividualEmails)}>
            {shouldExpandSelectedIndividualEmails ? <CaretDownFill color="#000" /> : <CaretRightFill color="#000" />}
            <Text size="16px" weight="bold">
              Email Recipients
            </Text>
          </Box>
          {shouldExpandSelectedIndividualEmails && (
            <Box>
              {selectedIndividualAddresses.map((recipient: Recipient) => (
                <IndividualEmailItem key={`selected-individual-recipient-${recipient.email}`} recipient={recipient} onClick={handleRecipientClick} />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
};

export default ManageEmailAddresses;
