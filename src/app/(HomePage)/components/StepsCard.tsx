
import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import theme from "@/utils/theme";

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  delay: number;
}

export const StepCard = ({ icon, title, description, buttonText, delay }: StepCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      style={{ flex: 1 }}
    >
      <Box
        sx={{
          p: 1,
          height: "100%",
          borderRadius: "24px",
          border: `1px solid ${theme.palette.grey[300]}`,
          backgroundColor: "background.paper",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: theme.shadows[2],
          },
        }}
      >
        <Stack spacing={2} alignItems="left" sx={{
          background: "linear-gradient(135deg, rgb(235, 238, 255) 0%, rgb(255, 255, 255) 35%, rgba(255, 255, 255, 0.6) 65%, rgba(255, 255, 255, 0.05) 100%)",
          p: 2,
          borderRadius: "24px",
        }}>
          <Box
            sx={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(235, 238, 255, 0.7)",
              boxShadow: "0 4px 12px rgba(0, 109, 175, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          <Typography color="text.secondary">
            {description}
          </Typography>
          <Box
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              borderColor: 'rgba(0, 109, 175, 0.3)',
              borderRadius: '8px',
              px: 1,
              py: 0.6,
              width: 'fit-content',
              boxShadow: '0 2px 8px rgba(0, 109, 175, 0.08)',
              backdropFilter: 'blur(4px)',
              background: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            <Typography 
              variant="body1" 
              color="text.secondary"
              fontWeight={500}
            >
              {buttonText}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </motion.div>
  );
};