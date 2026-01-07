import { useState } from "react";
import styles from "./AppLayout.module.css";
import { AppBar, Box, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import BackupRestoreDialog from "../backupRestore/BackupRestoreDialog";
import MultipleFilesButton from "@/ui/sharedComponents/MultipleFilesButton";
import { buildProblem } from "@/domain/problem/factory";
import ImportFilesButton from "../importFiles/ImportFilesButton";
import { useProblemRecordsContext } from "@/app/providers/ProblemCollectionProvider";
import { useLearningRecordsContext } from "@/app/providers/LearningRecordsProvider";

interface Props {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export function AppLayout({ header, footer, children }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [backupDialogOpen, setBackupDialogOpen] = useState(false);
  const navigate = useNavigate()
  const learningApi = useLearningRecordsContext() // TODO: temp
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  const handleClearLearnings = () => {
    
    learningApi.clearAll()
  }


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

            <ImportFilesButton buttonType="listItem"/>

            <ListItemButton onClick={() => {
              setDrawerOpen(false);          // ① Drawer を閉じる
              setBackupDialogOpen(true);     // ② Dialog を開く
            }}>
              <ListItemText primary="バックアップ/レストア" />
            </ListItemButton>

            <ListItemButton onClick={handleClearLearnings}>
              <ListItemText primary="学習データをクリア" />
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
