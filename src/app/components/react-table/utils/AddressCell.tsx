import { Typography } from "@mui/material";

export const AddressCell = ({ address }: { address: string }) => (
  <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
    {`${address.slice(0, 6)}...${address.slice(-4)}`}
  </Typography>
);