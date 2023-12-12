import { Box } from 'grommet';

const IndividualEmailItem = ({ recipient, onClick }: {
  recipient: Recipient;
  onClick: (recipient: Recipient) => void;
}) => {
  return (
    <Box hoverIndicator onClick={() => onClick(recipient)}>
      {recipient.email}
    </Box>
  );
};

export default IndividualEmailItem;
