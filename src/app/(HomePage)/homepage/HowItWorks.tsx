"use client";
import React from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { GradientText } from "@/app/components/shared/GradienText";
import Image from "next/image";

const steps = [
  {
    title: "Connect Wallet",
    description: "Connect your BNB Smart Chain wallet to get started",
    image: "/images/howitworks/1.jpg",
  },
  {
    title: "Create Escrow",
    description: "Set up the trade details and deposit funds into the smart contract",
    image: "/images/howitworks/2.jpg",
  },
  {
    title: "Complete Trade",
    description: "Once both parties agree, funds are automatically released",
    image: "/images/howitworks/3.jpg",
  },
];

const HowItWorks = () => {
  return (
    <Box py={10}>
      <Container maxWidth="lg"
      sx={{
        px: { xs: 2, sm: 3 }
      }}>
        <Stack spacing={8}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Stack spacing={2} alignItems="center">
              <GradientText
                variant="h2"
                align="center"
                sx={{
                  fontSize: { xs: "28px", sm: "36px", lg: "42px" },
                  fontWeight: 700,
                }}
              >
                How It Works
              </GradientText>
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ maxWidth: "700px" }}
              >
                Simple, secure, and transparent escrow process powered by smart contracts
              </Typography>
            </Stack>
          </motion.div>

          {/* Steps */}
          <Grid container spacing={{ xs: 0, md: 4 }} >
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}sx={{
                width: '100%',
                pb: { xs: 6, md: 0 } 
              }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Stack spacing={2} alignItems="center">
                  <Box
                      sx={{
                        width: 340,
                        height: 340,
                        position: "relative",
                        mb: 2,
                        borderRadius: 4,
                        border: '1px solid rgba(0, 116, 186, 0.1)',
                        overflow: 'hidden',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                          border: '1px solid rgba(0, 116, 186, 0.2)',
                        }
                      }}
                    >
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </Box>
                    <Typography variant="h5" fontWeight={600}>
                      {step.title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      align="center"
                      sx={{ maxWidth: "280px" }}
                    >
                      {step.description}
                    </Typography>
                  </Stack>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default HowItWorks;