import { Box } from 'grommet';
import { MailOption } from 'grommet-icons';
import IndividualEmailItem from './IndividualEmailItem';

const CompanyDomainItem = ({ domain, recipients, onDomainClick, onRecipientClick }: {
  domain: string;
  recipients: Recipient[];
  onDomainClick: (recipients: Recipient[]) => void;
  onRecipientClick: (recipient: Recipient) => void;
}) => {
  return (
    <Box>
      <Box pad="4px 4px" gap="6px" align="center" direction="row" hoverIndicator onClick={() => onDomainClick(recipients)}>
        <MailOption color="#000" size="14px" />
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
