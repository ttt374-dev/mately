
import { Box, List, ListItem, Button, Stack, Paper, Typography, Grid, Card, CardHeader  } from '@mui/material';
import { useNavigate } from 'react-router-dom';


type StatItem = {
  label: string;
  value: number | string;
};

type Props = {
  items: StatItem[];
  title: string;
  width?: number | string; // optional, Paper の幅
  spacing?: number;        // optional, 行間
  selected: boolean,
};

export const DeckCard = ({ items, title, spacing = 1, selected }: Props) => {
  return (
    <Card elevation={1} sx={{ p: 2, backgroundColor: selected ? "rgba(30,144,255,0.1)" : "white" }}>
        <CardHeader title={
            <Typography variant="subtitle2" fontSize="0.9rem" fontWeight={500}>
                {title}
          </Typography>
        }/>
      {items.map((item) => (
        <Box
          key={item.label}
          display="flex"
          justifyContent="space-between"
          mb={spacing}
        >
          <Typography variant="body2" color="textSecondary">
            {item.label}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {item.value}
          </Typography>
        </Box>
      ))}
    </Card>
  );
};