import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import TextIconButtons from '@/app/components/forms/form-elements/button/TextIconButtons';
import Image from 'next/image';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageSrc?: string;
}

const FeatureCard = ({ title, description, icon, imageSrc }: FeatureCardProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        background: "#FFFFFF",
        p: 1,
        borderRadius: "24px",
        border: "1px solid rgba(0, 116, 186, 0.1)",
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgb(245 247 255)',
          p: 4,
          borderRadius: "20px",
          height: "100%",
        }}
      >
        <Stack spacing={2}>
          {icon && (
            <TextIconButtons
              startIcon={icon}
              text="Learn More"
              sx={{ fontWeight: 600 }}
            />
          )}
          <Typography variant="h5" fontWeight={600}>
            {title}
          </Typography>
          <Typography color="text.secondary">
            {description}
          </Typography>
          {imageSrc && (
            <Box
              sx={{
                position: "relative",
                width: "416px",
                height: "403px",
              }}
            >
              <Image
                src={imageSrc}
                alt={title}
                fill
                style={{ objectFit: "cover" }}
                quality={100}
              />
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default FeatureCard;