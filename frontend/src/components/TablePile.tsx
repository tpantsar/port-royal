import { cardContainerStyle, cardStyle } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks/common';
import { buyCard, drawCard } from '../reducers/gameReducer';
import { Card } from '../types/Card';

import { MouseEvent } from 'react';

import {
  Badge,
  Box,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Card as MUICard,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

export default function TablePile() {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.game.game);
  const tablePile = gameState?.cards.tablePile ?? [];
  const primaryPileCount = gameState?.cards.primaryPile.length ?? 0;
  const tablePileCount = gameState?.cards.tablePile.length ?? 0;

  const handleBuyCard = async (event: MouseEvent<HTMLElement>, card: Card) => {
    event.preventDefault();
    event.stopPropagation();

    const currentPlayerId = gameState?.currentPlayer.id;
    const cardId = card?.id;

    if (currentPlayerId !== undefined && cardId !== undefined) {
      await dispatch(buyCard(currentPlayerId, cardId));
    }
  };

  const handleDrawCard = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    await dispatch(drawCard());
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4ecf5 100%)',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={1.5}
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              Table Pile
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click a card to buy it.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip label={`Deck: ${primaryPileCount}`} color="default" variant="outlined" />
            <Chip label={`Table: ${tablePileCount}`} color="default" variant="outlined" />
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Grid container columnSpacing={0.75} rowSpacing={1.5}>
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 2 }}
            key="deck-card"
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <MUICard elevation={3} sx={cardContainerStyle}>
              <CardActionArea onClick={(event) => handleDrawCard(event)} sx={{ p: 0 }}>
                <Box sx={{ position: 'relative' }}>
                  <Badge
                    color="primary"
                    badgeContent={primaryPileCount}
                    overlap="circular"
                    max={999}
                    sx={{ '.MuiBadge-badge': { fontWeight: 700, fontSize: '0.9rem' } }}
                  >
                    <CardMedia
                      component="img"
                      image="/cards/cardback.png"
                      alt="Primary deck"
                      sx={cardStyle}
                    />
                  </Badge>
                </Box>
                <CardContent sx={{ px: 1.25, py: 1 }}>
                  <Stack spacing={0.5}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" fontWeight={600}>
                        Primary Deck
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ px: 1.25, pb: 1.25, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={(event) => handleDrawCard(event)}
                >
                  Draw card
                </Button>
              </CardActions>
            </MUICard>
          </Grid>
          {tablePile.map((card) => {
            const cardImage = card.displayImage
              ? `/cards/${card.imageName}`
              : '/cards/cardback.png';

            return (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 2 }}
                key={card.id}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <MUICard elevation={4} sx={cardContainerStyle}>
                  <CardActionArea onClick={(event) => handleBuyCard(event, card)} sx={{ p: 0 }}>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia component="img" image={cardImage} alt={card.name} sx={cardStyle} />
                    </Box>
                    <CardContent sx={{ px: 1.25, py: 1 }}>
                      <Stack spacing={0.5}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" fontWeight={600}>
                            {card.name}
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{ px: 1.25, pb: 1.25, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="info"
                      onClick={(event) => handleBuyCard(event, card)}
                    >
                      Buy card
                    </Button>
                  </CardActions>
                </MUICard>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
}
