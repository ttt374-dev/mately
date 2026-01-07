import { useState } from "react";
import styles from "./AppLayout.module.css";
import { AppBar, Box, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import BackupRestoreDialog from "../backupRestore/BackupRestoreDialog";
import MultipleFilesButton from "@/ui/sharedComponents/MultipleFilesButton";
import { buildProblem } from "@/domain/problem/factory";

interface Props {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export function AppLayout({ header, footer, children }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [backupDialogOpen, setBackupDialogOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navigate = useNavigate()

  // handlers
  const handleSelectFiles = async (files: File[]) => {
   
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
          { header }
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} >
        <Box sx={{ width: 250 }} role="presentation"  className={styles.header}>
          <List>
            <ListItemButton onClick={() => navigate("/deck")}>
              <ListItemText primary="デッキに戻る" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/library")}>
              <ListItemText primary="ライブラリ" />
            </ListItemButton>

            <MultipleFilesButton
              onFileSelected={handleSelectFiles}
              label="インポート"
              type="listItem"
              buttonProps={{ fullWidth: true, variant: "outlined" }}
            />

            <ListItemButton onClick={() => {
              setDrawerOpen(false);          // ① Drawer を閉じる
              setBackupDialogOpen(true);     // ② Dialog を開く
            }}>
              <ListItemText primary="バックアップ/レストア" />
            </ListItemButton>

            <ListItemButton onClick={() => console.log("settings")}>
              <ListItemText primary="設定" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      
      <div className={styles.main}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}


      { <BackupRestoreDialog open={backupDialogOpen} 
        onClose={()=>setBackupDialogOpen(false)}/>}
    </div>
  );
}
