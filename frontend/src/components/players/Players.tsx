import { useAppSelector } from '../../hooks/common';
import { Player } from '../../types/Player';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';

import PlayerItem from './PlayerItem';

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
              return <PlayerItem key={player.id} player={player} isMobile={isMobile} />;
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
