"use client";
import React from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { GradientText } from "@/app/components/shared/GradienText";
import { BoltRounded, SecurityRounded, SavingsRounded, SpeedRounded } from "@mui/icons-material";
import FeatureCard from "../components/FeatureCard";

const features = [
  {
    title: "Secure & Non-Custodial",
    description:
      "Your funds are protected by smart contracts - always under your control, never in our possession",
    icon: <SecurityRounded sx={{ fontSize: 32, color: "primary.main" }} />,
    imageSrc: "/images/backgrounds/img-why-chooseys.avif",
  },
  {
    title: "Fast & Cost-Effective",
    description:
      "Instant settlements on BNB network with only minimal gas fees, no hidden charges",
    icon: <BoltRounded sx={{ fontSize: 32, color: "primary.main" }} />,
    imageSrc: "/images/backgrounds/img-why-chooseys2.svg",
  },
];

const WhyChooseUs = () => {
  return (
    <Box py={10}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Header Section */}
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
                Why Choose Our Escrow Service
              </GradientText>
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ maxWidth: "700px" }}
              >
                Our smart contract escrow removes middlemen, reduces fees, and
                ensures your transactions are secure from start to finish
              </Typography>
            </Stack>
          </motion.div>

          {/* Features Grid */}
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    imageSrc={feature.imageSrc}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;