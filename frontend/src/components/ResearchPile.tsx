import { cardStyle } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks/common';
import { buyCard } from '../reducers/gameReducer';
import { ResearchCard } from '../types/Card';

import { MouseEvent } from 'react';

import {
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

export default function ResearchPile() {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.game.game);

  const researchPile = gameState?.cards.researchPile ?? [];
  const researchCount = researchPile.length;

  const handleBuyResearch = async (event: MouseEvent<HTMLElement>, card: ResearchCard) => {
    event.preventDefault();
    event.stopPropagation();

    const currentPlayerId = gameState?.currentPlayer.id;
    const cardId = card?.id;

    if (currentPlayerId !== undefined && cardId !== undefined) {
      await dispatch(buyCard(currentPlayerId, cardId));
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          background: 'linear-gradient(135deg, #fffefb 0%, #f2eee4 100%)',
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
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Research Pile
          </Typography>
          <Chip label={`Cards: ${researchCount}`} color="default" variant="outlined" />
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Grid container columnSpacing={0.75} rowSpacing={1.5}>
          {researchPile.map((card: ResearchCard) => {
            const cardImage = card.displayImage
              ? `/cards/${card.imageName}`
              : '/cards/cardback.png';

            return (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 2 }}
                key={card.id}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <MUICard
                  elevation={3}
                  sx={{
                    width: 'fit-content',
                    height: '100%',
                    borderRadius: 2.5,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardActionArea onClick={(event) => handleBuyResearch(event, card)} sx={{ p: 0 }}>
                    <CardMedia component="img" image={cardImage} alt={card.name} sx={cardStyle} />
                    <CardContent sx={{ px: 1.25, py: 1 }}>
                      <Stack spacing={0.75}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="h6" fontWeight={700}>
                            {card.name}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                          <Chip
                            label={`Victory: ${card.victoryPoints}`}
                            size="small"
                            variant="outlined"
                          />
                          <Chip label={`Mode: ${card.researchMode}`} size="small" color="success" />
                          <Chip
                            label={`Coins: ${card.coinsAmount}`}
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        </Stack>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{ px: 1.25, pb: 1.25, pt: 0.5, mt: 'auto' }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      onClick={(event) => handleBuyResearch(event, card)}
                    >
                      Buy research
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
