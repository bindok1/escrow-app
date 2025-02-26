import { Typography } from "@mui/material";

export const TextCell = ({ value }: { value: string | number }) => (
  <Typography variant="body1">{value}</Typography>
);