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
    image: "/images/steps/connect-wallet.svg",
  },
  {
    title: "Create Escrow",
    description: "Set up the trade details and deposit funds into the smart contract",
    image: "/images/steps/create-escrow.svg",
  },
  {
    title: "Complete Trade",
    description: "Once both parties agree, funds are automatically released",
    image: "/images/steps/complete-trade.svg",
  },
];

const HowItWorks = () => {
  return (
    <Box py={10}>
      <Container maxWidth="lg">
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
          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Stack spacing={3} alignItems="center">
                    <Box
                      sx={{
                        width: 280,
                        height: 200,
                        position: "relative",
                        mb: 2,
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