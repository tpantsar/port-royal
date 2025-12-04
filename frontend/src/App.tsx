import { useEffect, useMemo, useState } from 'react';

import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Group as PlayersIcon,
  Science as ResearchIcon,
  Style as TableIcon,
} from '@mui/icons-material';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';

import './App.css';
import ResearchPile from './components/ResearchPile';
import SnackbarGeneric from './components/SnackbarGeneric';
import TablePile from './components/TablePile';
import Players from './components/players/Players';
import { useAppDispatch, useAppSelector } from './hooks/common';
import { drawCard, fetchGameState, resetGame, switchPlayerTurn } from './reducers/gameReducer';
import { PaletteMode, getDesignTokens } from './theme';

type ViewKey = 'table' | 'research' | 'players';

export default function App() {
  const dispatch = useAppDispatch();

  const [mode, setMode] = useState<PaletteMode>('light');
  const theme = useMemo(() => getDesignTokens(mode), [mode]);
  const [view, setView] = useState<ViewKey>('table');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  console.log('isMobile:', isMobile);

  const drawerWidth = 220;

  useEffect(() => {
    dispatch(fetchGameState());
  }, [dispatch]);

  const gameState = useAppSelector((state) => state.game.game);

  const handleDraw = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await dispatch(drawCard());
  };

  const handleReset = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await dispatch(resetGame());
  };

  const handleSwitch = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await dispatch(switchPlayerTurn());
  };

  const renderContent = () => {
    switch (view) {
      case 'table':
        return <TablePile />;
      case 'research':
        return <ResearchPile />;
      case 'players':
        return <Players isMobile={isMobile} />;
      default:
        return null;
    }
  };

  if (!gameState || gameState === undefined) {
    return <div>Loading</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Top AppBar */}
        <AppBar position="fixed" elevation={2}>
          <Toolbar sx={{ minHeight: 56 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Port Royal
            </Typography>
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))}
            >
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Desktop side nav */}
        {!isMobile && (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
                mt: 7,
              },
            }}
          >
            <List>
              <ListItemButton selected={view === 'table'} onClick={() => setView('table')}>
                <ListItemIcon>
                  <TableIcon />
                </ListItemIcon>
                <ListItemText primary="Table Pile" />
              </ListItemButton>
              <ListItemButton selected={view === 'research'} onClick={() => setView('research')}>
                <ListItemIcon>
                  <ResearchIcon />
                </ListItemIcon>
                <ListItemText primary="Research Pile" />
              </ListItemButton>
              <ListItemButton selected={view === 'players'} onClick={() => setView('players')}>
                <ListItemIcon>
                  <PlayersIcon />
                </ListItemIcon>
                <ListItemText primary="Players" />
              </ListItemButton>
            </List>
          </Drawer>
        )}

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 7,
            pb: isMobile ? 8 : 4,
            px: { xs: 2, sm: 3, md: 4 },
            ml: !isMobile ? `${drawerWidth}px` : 0,
            maxWidth: 1440,
            width: '100%',
            mx: 'auto',
          }}
        >
          <button onClick={handleDraw}>Draw</button>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleSwitch}>Switch player</button>
          {renderContent()}
        </Box>

        {/* Mobile bottom navigation */}
        {isMobile && (
          <Paper
            elevation={3}
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <BottomNavigation
              value={view}
              onChange={(_, newValue) => setView(newValue as ViewKey)}
              sx={{ minHeight: 56 }}
            >
              <BottomNavigationAction label="Table" value="table" icon={<TableIcon />} />
              <BottomNavigationAction label="Research" value="research" icon={<ResearchIcon />} />
              <BottomNavigationAction label="Players" value="players" icon={<PlayersIcon />} />
            </BottomNavigation>
          </Paper>
        )}

        {/* Snackbar feedback */}
        <SnackbarGeneric />
      </Box>
    </ThemeProvider>
  );
}
