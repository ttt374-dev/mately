import { useState } from "react";
import styles from "./AppLayout.module.css";
import { AppBar, Box, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

interface Props {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export function AppLayout({ header, footer, children }: Props) {
  const [open, setOpen] = useState(false);
    const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };
  const navigate = useNavigate()
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
          { header }
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} >
        <Box sx={{ width: 250 }} role="presentation"  className={styles.header}>
          <List>
            <ListItemButton onClick={() => navigate("/deck")}>
              <ListItemText primary="デッキに戻る" />
            </ListItemButton>

            <ListItemButton onClick={() => console.log("settings")}>
              <ListItemText primary="設定" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      
      <div className={styles.main}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
