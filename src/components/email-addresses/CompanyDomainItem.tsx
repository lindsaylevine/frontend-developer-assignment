import { Box } from 'grommet';
import { CaretDownFill } from 'grommet-icons';
import IndividualEmailItem from './IndividualEmailItem';

const CompanyDomainItem = ({ domain, recipients, onDomainClick, onRecipientClick }: {
  domain: string;
  recipients: Recipient[];
  onDomainClick: (recipients: Recipient[]) => void;
  onRecipientClick: (recipient: Recipient) => void;
}) => {
  return (
    <Box>
      <Box align="center" direction="row" hoverIndicator onClick={() => onDomainClick(recipients)}>
        <CaretDownFill color="#000" />
        {domain}
      </Box>
      <Box pad={{ left: '24px' }}>
        {recipients.map((recipient: Recipient) => (
          <IndividualEmailItem key={`available-domain-recipient-${recipient.email}`} recipient={recipient} onClick={onRecipientClick} />
        ))}
      </Box>
    </Box>
  )
};

export default CompanyDomainItem;
