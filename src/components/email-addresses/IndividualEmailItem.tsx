import { Box } from 'grommet';

const IndividualEmailItem = ({ recipient, onClick }: {
  recipient: Recipient;
  onClick: (recipient: Recipient) => void;
}) => {
  return (
    <Box pad="6px 8px" hoverIndicator onClick={() => onClick(recipient)}>
      {recipient.email}
    </Box>
  );
};

export default IndividualEmailItem;
