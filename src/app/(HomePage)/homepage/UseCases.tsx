"use client";
import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { GradientText } from "@/app/components/shared/GradienText";
import theme from "@/utils/theme";

const cases = [
  {
    title: "Freelance Payments",
    description: "Secure milestone payments for freelancers and clients",
    icon: "💼"
  },
  {
    title: "P2P Trading",
    description: "Safe peer-to-peer cryptocurrency and asset trading",
    icon: "🤝"
  },
  {
    title: "Secure Transactions",
    description: "Protected high-value digital asset exchanges",
    icon: "💱"
  }
];

const UseCases = () => {
  return (
    <Box py={10}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <GradientText
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: "28px", sm: "36px", lg: "42px" },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Perfect For
            <Typography
              component="span"
              color="#006DAF"
              sx={{
                fontSize: "inherit",
                fontWeight: "inherit",
              }}
            >
              {" "}Every Trade
            </Typography>
          </GradientText>
        </motion.div>

        <Grid container spacing={4} mt={4}>
          {cases.map((useCase, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    p: 4,
                    height: "100%",
                    borderRadius: "24px",
                    background: "linear-gradient(145deg, #ffffff 0%, rgba(118, 62, 189, 0.05) 100%)",
                    boxShadow: theme.shadows[2],
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <Typography fontSize="52px" mb={2}>
                    {useCase.icon}
                  </Typography>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    {useCase.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {useCase.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default UseCases;