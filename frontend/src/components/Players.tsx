import { useAppSelector } from '../hooks/common';
import { Player } from '../types/Player';

import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <Grid container spacing={2}>
    {Array.from({ length: count }).map((_, index) => (
      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
        <Card>
          <CardHeader
            avatar={<Skeleton variant="circular" width={40} height={40} />}
            title={<Skeleton width="60%" />}
            subheader={<Skeleton width="40%" />}
          />
          <CardContent>
            <Skeleton width="80%" />
            <Skeleton width="50%" />
          </CardContent>
          <CardActions sx={{ px: 2, pb: 2 }}>
            <Skeleton variant="rectangular" width={80} height={32} />
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
);

const ErrorState: React.FC<{
  message: string;
  onRetry?: () => void;
}> = ({ message, onRetry }) => (
  <Box textAlign="center" py={6}>
    <Typography variant="body1" color="error" gutterBottom>
      {message}
    </Typography>
    {onRetry && (
      <Button variant="outlined" onClick={onRetry}>
        Retry
      </Button>
    )}
  </Box>
);

const EmptyState: React.FC<{
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}> = ({ title, description, actionLabel, onAction }) => (
  <Box textAlign="center" py={8}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" mb={3}>
      {description}
    </Typography>
    {actionLabel && onAction && (
      <Button variant="contained" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </Box>
);

interface PlayerCardsViewProps {
  isMobile: boolean;
}

export default function Players({ isMobile }: PlayerCardsViewProps) {
  const { players } = useAppSelector((state) => state.game.game!);

  const loading = false;
  const error: string | null = null;

  return (
    <Box>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar - 1,
          bgcolor: 'background.default',
          pb: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Players
        </Typography>
        <Divider sx={{ mt: 1 }} />
      </Box>

      <Box mt={2}>
        {loading && <LoadingSkeleton count={3} />}
        {error && <ErrorState message={error} />}

        {!loading && !error && players.length === 0 && (
          <EmptyState
            title="No players yet"
            description="Invite your friends or add bots to start a game."
            actionLabel="Invite player"
          />
        )}

        {!loading && !error && players.length > 0 && (
          <Grid container spacing={2}>
            {players.map((player: Player) => {
              const initials = player.name
                .split(' ')
                .map((p) => p[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={player.id}>
                  <Card
                    elevation={2}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <CardHeader
                      avatar={<Avatar sx={{ bgcolor: player.color }}>{initials}</Avatar>}
                      title={player.name}
                      subheader={`Player ID: ${player.id}`}
                    />
                    <CardContent sx={{ pb: 1 }}>
                      <Stack spacing={2}>
                        <Box
                          sx={{
                            position: 'relative',
                            width: 140,
                            height: 200,
                            mx: 'auto',
                            borderRadius: 1,
                            padding: 0.5,
                            overflow: 'hidden',
                            boxShadow: 2,
                          }}
                        >
                          <Box
                            component="img"
                            src="/cards/cardback.png"
                            alt="Player coins cardback"
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              display: 'block',
                            }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              textShadow: '0px 3px 8px rgba(0,0,0,0.65)',
                              bgcolor: 'rgba(0,0,0,0.18)',
                            }}
                          >
                            <Typography variant="h4" fontWeight={800} lineHeight={1}>
                              {player.coins}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ letterSpacing: 1, textTransform: 'uppercase' }}
                            >
                              Coins
                            </Typography>
                          </Box>
                        </Box>

                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent="space-between"
                          flexWrap="wrap"
                          sx={{ width: '100%' }}
                        >
                          <Stack spacing={0.5}>
                            <Typography variant="caption" color="text.secondary">
                              Score
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {player.score}
                            </Typography>
                          </Stack>
                          <Stack spacing={0.5}>
                            <Typography variant="caption" color="text.secondary">
                              Coins
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {player.coins}
                            </Typography>
                          </Stack>
                          <Stack spacing={0.5}>
                            <Typography variant="caption" color="text.secondary">
                              Swords
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {player.abilities.filter((ability) => ability === 'SWORDS').length}
                            </Typography>
                          </Stack>
                          <Stack spacing={0.5}>
                            <Typography variant="caption" color="text.secondary">
                              Research
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {
                                player.abilities.filter((ability) =>
                                  ['ANCHOR', 'CROSS', 'HOUSE'].includes(ability),
                                ).length
                              }
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </CardContent>
                    <CardActions
                      sx={{
                        px: 2,
                        pb: 2,
                        pt: 0,
                        justifyContent: 'space-between',
                      }}
                    >
                      <Button
                        variant="contained"
                        size={isMobile ? 'medium' : 'small'}
                        fullWidth={isMobile}
                        onClick={() => console.log(`Opening board for ${player.name}`)}
                      >
                        View board
                      </Button>
                      {!isMobile && (
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => console.log(`Messaging ${player.name}`)}
                          >
                            Message
                          </Button>
                          <IconButton
                            size="small"
                            onClick={() => console.log(`More actions for ${player.name}`)}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
