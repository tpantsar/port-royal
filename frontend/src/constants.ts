export const cardStyle = {
  height: 250,
  width: '100%',
  objectFit: 'contain' as const,
  bgcolor: 'grey.100',
  display: 'block',
};

export const cardContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: 'fit-content',
  borderRadius: 1.0,
  padding: 1.0,
  overflow: 'hidden',
};

export const pileContainerStyle = {
  p: { xs: 2, sm: 3 },
  borderRadius: 1,
  background: 'linear-gradient(135deg, #fffefb 0%, #f2eee4 100%)',
  border: '1px solid',
  borderColor: 'divider',
};
