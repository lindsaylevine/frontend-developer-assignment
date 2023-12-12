import { useState } from 'react';
import { Box, Heading, TextInput, Text, Button } from 'grommet';
import RECIPIENTS from '../../assets/recipientsData.json';
import { splitCompanyDomainsAndIndividuals, validateEmailAddress } from '../../utils';
import { CaretDownFill, CaretRightFill, Search } from 'grommet-icons';
import CompanyDomainItem from './CompanyDomainItem';
import IndividualEmailItem from './IndividualEmailItem';

/**
 * Some comments:
 * - If the JSON didn't include the isSelected property, I may have managed selected state by keeping
 * an array of selected email adddresses separate from the supplied recipients (meaning Recipient wouldn't need an isSelected property),
 * but I felt like since it was included in the JSON, I should expand off of that.
 * - I *think* I interpreted the mockup and selection UX correctly for company domains vs individual email addresses, but
 * I'm not 1000% sure because I do think the UX is a little confusing? o_O I understand the value of building it this way for
 * the sake of the exercise and the challenge of composing the logic, but I'm not sure I otherwise see the value in splitting
 * up the addresses between domains and individual. For example, why not just have *only* domains with the full emails under it,
 * even if there's only one full email address for that domain? That way addresses aren't bouncing in and out of the different groups
 * as you select and unselect. Hopefully that makes sense :'D.
 * - I originally built it to support expanding and collapsing domain groups (on top of the Company and Individual selection groups)
 * but (1) felt like that was an unnecessary UX on the available side (2) it made for a weird UX challenge since we want clicking a domain
 * to select all of its email addresses (3) the instructions only explicitly asked for the two selected groups to be expandable, and the nested expandability
 * on that side felt like weird UX.
 * 
 * Potential improvements:
 * - Fuzzy search or better search query matching than just includes
 *    - if you type john@timescale.com should that domain group stay visible?
 * - Making some styling props more DRY
 * - Breaking "available" and "selected" into their own components - felt like overkill for this exercise
 * - Empty + error states
 * - Expand selected groups when selections are made or collapse when the last selection is unselected
 * - Allow enter key in input to add new recipient when email is valid
 */

const ManageEmailAddresses = () => {
  const [recipients, setRecipients] = useState<Recipient[]>(RECIPIENTS);

  const [shouldExpandSelectedCompanyDomains, setShouldExpandSelectedCompanyDomains] = useState<boolean>(false);
  const [shouldExpandSelectedIndividualEmails, setShouldExpandSelectedIndividualEmails] = useState<boolean>(false);

  const [recipientSearchQuery, setRecipientSearchQuery] = useState<string>('');

  const isValidEmailInSearchQuery = validateEmailAddress(recipientSearchQuery);

  const selectedRecipients: Recipient[] = recipients.filter((recipient: Recipient) => recipient.isSelected);
  const recipientChoices = recipients.filter((recipient: Recipient) => !recipient.isSelected);
  const filteredRecipientChoices = recipientChoices.filter((recipient: Recipient) => {
    return recipient.email.toLowerCase().includes(recipientSearchQuery.toLowerCase());
  });
  const { companyDomains, individualEmailAddresses } = splitCompanyDomainsAndIndividuals(filteredRecipientChoices);
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

  const handleAddNewRecipient = () => {
    setRecipients((prevRecipients: Recipient[]) => {
      return [
        ...prevRecipients,
        {
          email: recipientSearchQuery,
          isSelected: false,
        }
      ];
    });
    setRecipientSearchQuery('');
  };

  return (
    <Box direction="row" gap="24px">
      <Box>
        <Heading level="4">Available Recipients</Heading>
        <Box gap="12px">
          <TextInput
            value={recipientSearchQuery}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRecipientSearchQuery(event.target.value)}
            icon={<Search size="16px" color="#000" />}
            size="16px"
            style={{ fontWeight: 'normal' }}
            placeholder="Search" />
          {isValidEmailInSearchQuery && (
            <Button primary onClick={handleAddNewRecipient} label="Add recipient" style={{ fontSize: '16px' }} />
          )}
        </Box>
        <Box margin={{ top: '8px' }}>
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
          <Box
            align="center"
            direction="row"
            onClick={() => setShouldExpandSelectedCompanyDomains(!shouldExpandSelectedCompanyDomains)}
            margin={{ bottom: '8px '}}
          >
            {shouldExpandSelectedCompanyDomains ? <CaretDownFill color="#000" /> : <CaretRightFill color="#000" />}
            <Text size="16px" weight="bold">
              Company Recipients
            </Text>
          </Box>
          {shouldExpandSelectedCompanyDomains && (
            <Box pad={{ left: '24px' }}>
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
          <Box
            margin={{ top: '12px', bottom: '8px' }}
            align="center"
            direction="row"
            onClick={() => setShouldExpandSelectedIndividualEmails(!shouldExpandSelectedIndividualEmails)}
          >
            {shouldExpandSelectedIndividualEmails ? <CaretDownFill color="#000" /> : <CaretRightFill color="#000" />}
            <Text size="16px" weight="bold">
              Email Recipients
            </Text>
          </Box>
          {shouldExpandSelectedIndividualEmails && (
            <Box pad={{ left: '24px' }}>
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
