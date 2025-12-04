import { Player } from '../../types/Player';

import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

interface PlayerProps {
  player: Player;
  isMobile: boolean;
}

export default function PlayerItem({ player, isMobile }: PlayerProps) {
  const initials = player.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  function PlayerCoinsCard() {
    return (
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
            justifyContent: 'top',
            color: '#fff',
            textShadow: '0px 3px 8px rgba(0,0,0,0.65)',
            bgcolor: 'rgba(0,0,0,0.18)',
          }}
        >
          <Typography variant="h4" fontWeight={800} lineHeight={1} sx={{ marginTop: 3 }}>
            {player.coins}
          </Typography>
          <Typography variant="caption" sx={{ letterSpacing: 1, textTransform: 'uppercase' }}>
            Coins
          </Typography>
        </Box>
      </Box>
    );
  }

  function PlayerStats() {
    return (
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
              player.abilities.filter((ability) => ['ANCHOR', 'CROSS', 'HOUSE'].includes(ability))
                .length
            }
          </Typography>
        </Stack>
      </Stack>
    );
  }

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
            <PlayerCoinsCard />
            <PlayerStats />
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
}
