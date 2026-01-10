import { Stack, Typography } from "@mui/material"



export function LearningStats({rows}: {
    rows: { label: string, value: string | number}[]
}){
    return (<Stack spacing={1}>
    {rows.map(({ label, value }) => (
      <Stack
        key={label}
        direction="row"
        justifyContent="space-between"
      >
        <Typography color="text.secondary">
          {label}
        </Typography>
        <Typography>
          {value}
        </Typography>
      </Stack>
    ))}
  </Stack>)
}