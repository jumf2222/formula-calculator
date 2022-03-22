import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { AppBar, Box, Container, createTheme, CssBaseline, Divider, Drawer, experimental_sx as sx, IconButton, List, ListItem, ListItemIcon, Paper, Tab, Tabs, ThemeProvider, Toolbar, useMediaQuery } from "@mui/material";
import darkScrollbar from '@mui/material/darkScrollbar';
import React, { useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Formula from "./Formula";
import { FORMULAS } from "./formulas";
import { useSavedState } from "./savedState";


enum Appearance {
  LIGHT = "LIGHT",
  DARK = "DARK",
  SYSTEM = "SYSTEM",
}

const APPEARANCES = {
  "LIGHT": "Light",
  "DARK": "Dark",
  "SYSTEM": "System"
};


const drawerExpandedWidth = 240;

const App = () => {
  const [appearance, setAppearance] = useSavedState(Appearance.SYSTEM, "appearance");
  const [isDrawerOpen, setIsDrawerOpen] = useSavedState<boolean>(false, "drawerOpen");
  const [formulaIndex, setFormulaIndex] = useSavedState<number>(0, "formulaIndex");
  const systemAppearanceDark = useMediaQuery('(prefers-color-scheme: dark)');

  const isDarkMode = ((appearance === Appearance.SYSTEM && systemAppearanceDark) || appearance === Appearance.DARK);
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: isDarkMode ? darkScrollbar() : null,
          "body > div": {
            whiteSpace: "pre-wrap"
          },
          "body, html, #root": {
            height: "100%"
          }
        }
      },
      MuiPaper: {
        defaultProps: {
          elevation: isDarkMode ? 2 : 0,
          variant: isDarkMode ? "elevation" : "outlined"
        },
        styleOverrides: {
          root: sx({
            borderRadius: { xs: 0, sm: 1 }
          })
        }
      }
    },
    typography: {
      fontFamily: ["ProductSans", "sans-serif"].join(',')
    },
    palette: {
      mode: ((appearance === Appearance.SYSTEM && systemAppearanceDark) || appearance === Appearance.DARK) ? "dark" : "light",
    }
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const drawerWidth = isMobile ? "0px" : (isDrawerOpen ? `${drawerExpandedWidth}px` : "0px");

  useEffect(() => {
    if (!(appearance === Appearance.LIGHT ||
      appearance === Appearance.DARK ||
      appearance === Appearance.SYSTEM)) {
      setAppearance(Appearance.SYSTEM);
    }
  }, [appearance, setAppearance]);

  const handleFormulaChange = (event: React.SyntheticEvent, newValue: number) => {
    setFormulaIndex(newValue);
    if (isMobile) setIsDrawerOpen(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" elevation={0} color="transparent" sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1, borderBottom: 1, borderColor: (theme) => theme.palette.divider,
          position: "fixed",
          top: 0,
          left: 'auto',
          right: 0,
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          '@media print': {
            // Prevent the app bar to be visible on each printed page.
            position: 'absolute',
          }
        }}>
          <Paper elevation={3} sx={{ borderRadius: { xs: 0, sm: 0 }, border: "none", boxShadow: "none" }} className="mui-fixed">
            <Toolbar variant="dense">
              <IconButton
                edge="start"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => { setIsDrawerOpen(open => !open); }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }}>
                Formula Calculator
              </Box>
            </Toolbar>
          </Paper>
        </AppBar>
        <Drawer variant={isMobile ? "temporary" : "permanent"} anchor="left" open={isDrawerOpen} onClose={() => { setIsDrawerOpen(false); }}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            elevation: theme.palette.mode === "dark" ? 3 : 0,
            sx: {
              overflowX: "hidden",
              boxShadow: "none",
              width: isMobile ? drawerExpandedWidth : drawerWidth,
              transition: (theme) =>
                isDrawerOpen ? theme.transitions.create(['width'], {
                  duration: theme.transitions.duration.enteringScreen,
                  easing: theme.transitions.easing.easeOut
                }) : theme.transitions.create(['width'], {
                  duration: theme.transitions.duration.leavingScreen,
                  easing: theme.transitions.easing.sharp
                })
            }
          }}
        >
          <Toolbar variant="dense" />
          <List sx={{ width: drawerExpandedWidth - (isDarkMode ? 1 : 2) }}>
            <Tabs
              orientation="vertical"
              value={formulaIndex}
              onChange={handleFormulaChange}>
              {FORMULAS.map((formula, ind) => <Tab key={formula.name} label={formula.name} value={ind} />)}
            </Tabs>
            <Divider />
            <ListItem button sx={{ minHeight: 48 }} onClick={() => {
              if (appearance === Appearance.LIGHT) setAppearance(Appearance.DARK);
              if (appearance === Appearance.DARK) setAppearance(Appearance.SYSTEM);
              if (appearance === Appearance.SYSTEM) setAppearance(Appearance.LIGHT);
            }}>
              <ListItemIcon>
                {appearance !== Appearance.LIGHT ? null : <LightModeIcon fontSize="small" />}
                {appearance !== Appearance.DARK ? null : <DarkModeIcon fontSize="small" />}
                {appearance !== Appearance.SYSTEM ? null : <SettingsBrightnessIcon fontSize="small" />}
              </ListItemIcon>
              {`Appearance: ${APPEARANCES[appearance]}`}
            </ListItem>
          </List>
        </Drawer>
        <Box sx={{
          height: "100%",
          marginLeft: drawerWidth, transition: (theme) =>
            isDrawerOpen ? theme.transitions.create(['margin-left'], {
              duration: theme.transitions.duration.enteringScreen,
              easing: theme.transitions.easing.easeOut
            }) : theme.transitions.create(['margin-left'], {
              duration: theme.transitions.duration.leavingScreen,
              easing: theme.transitions.easing.sharp
            }),
          display: "flex",
          flexDirection: "column"
        }}>
          <Toolbar variant="dense" />
          <Box sx={{ overflow: "auto", flex: 1 }} >
            <Container sx={{ p: { xs: 0, sm: 2 }, height: "100%", display: "flex", flexDirection: "column", gap: { xs: 0, sm: 2 } }} maxWidth="sm">
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={formulaIndex}
                onChangeIndex={(index: number) => { setFormulaIndex(index); }}
                style={{ height: "100%" }}
                containerStyle={{ height: "100%" }}
              >
                {FORMULAS.map((formula, ind) => <Formula key={formula.name} formula={formula} />)}
              </SwipeableViews>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;
