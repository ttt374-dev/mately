import React, { useState } from "react";
import styles from "./AppLayout.module.css";
import { AppBar, Box, Drawer, IconButton, List, ListItemButton, ListItemText, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useNavigate } from "react-router-dom";

import BackupRestoreDialog from "./BackupRestoreDialog";
import { useStoreContext } from "@/app/providers/StoreProvider";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const footerButtonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 64,
        },
      },
    },
  },
});


function AppLayoutFooter({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={footerButtonTheme}>
      {children}
    </ThemeProvider>
  );
}


interface Props {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  rightActions?: React.ReactNode;
}



export function AppLayout({ header, footer, children, rightActions  }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [backupDialogOpen, setBackupDialogOpen] = useState(false);
  const navigate = useNavigate()
  //const learningApi = useLearningRecordsContext() // TODO: temp
  const store = useStoreContext()
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  const handleClearLearnings = () => {
    
    store.clearAll()
  }

  function ListMenu(){
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <>
      <IconButton
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>並び替え</MenuItem>
        <MenuItem>フィルタ</MenuItem>
      </Menu>
    </>
  );
  }
  return (
    <div className={styles.container}>
      <AppBar position="static" className={styles.header}>
        <Toolbar >
          {/* ハンバーガー */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography>
            { header }
          </Typography>
          <Box sx={{flexGrow: 1}}></Box>

          
          { rightActions}          
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} >
        <Box width={250} mt={3} role="presentation"  className={styles.header}>
          <List>
            <ListItemButton onClick={() => navigate("/dashboard")}>
              <ListItemText primary="ダッシュボード" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/library")}>
              <ListItemText primary="ライブラリ" />
            </ListItemButton>

            <ListItemButton onClick={() => console.log("settings")}>
              <ListItemText primary="設定" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      
      
      <div className={styles.main}>{children}</div>
      {footer && 
        <AppLayoutFooter>
          <div className={styles.footer}>{footer}</div>
        </AppLayoutFooter>
      }
     


      { <BackupRestoreDialog open={backupDialogOpen} 
        onClose={()=>setBackupDialogOpen(false)}/>}
    </div>
  );
}
