import { Typography, TypographyProps } from "@mui/material";

export const GradientText = (props: TypographyProps) => (
  <Typography
    {...props}
    sx={{
      background: "linear-gradient(45deg, #0074BA,rgb(171, 223, 255))",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
      paddingBottom: 2,
      ...props.sx
    }}
  />
);