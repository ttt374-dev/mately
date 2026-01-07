import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Stack, Typography, Divider, Card, Box, Button, IconButton, toggleButtonClasses } from '@mui/material';
import { PlyControl } from "./PlyControl";

function AppBarStar({ starred }: { starred: boolean }) {
  return starred ? (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <StarIcon sx={{ color: "#FFC107" }} />
      <StarBorderIcon sx={{ color: "#fff", position: "absolute", inset: 0 }} />
    </Box>
  ) : (
    <StarBorderIcon sx={{ color: "#fff" }} />
  );
}
export const StarControl = ({isStarred, onToggleStar}: {
    isStarred: boolean
    onToggleStar: () => void
}) => {
    return (<IconButton
        size="small"
        onClick={onToggleStar}
        disableRipple
        sx={{
            '&:focus': { outline: 'none' },
            '&:focus-visible': { outline: 'none' },
        }}
    >
        { /* {isStarred ? <StarIcon /> : <StarBorderIcon />}*/ }
        <AppBarStar starred={isStarred}/>   
    </IconButton>)
}