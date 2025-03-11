"use client";
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GradientText } from "@/app/components/shared/GradienText";
import MainButton from "@/app/components/forms/form-elements/button/MainButton";
import Image from "next/image";
import theme from "@/utils/theme";
import { motion } from "framer-motion";
import Link from "next/link";

const Banner = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  return (
    <Box
      sx={{
        borderRadius: "0px",
        background:
          "linear-gradient(180deg,rgb(255, 255, 255) 70%, #763EBD80 100%)",
        position: "relative",
      }}
      pt={lgUp ? 7 : 4}
      minHeight="85vh"
      display="flex"
      alignItems="center"
    >
      <Container
        sx={{
          maxWidth: lgUp ? "1400px !important" : "100%",
          position: "relative",
          textAlign: "center",
          mt: -32,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <GradientText
            variant="h1"
            sx={{
              fontSize: {
                xs: "32px",
                sm: "48px",
                lg: "56px",
              },
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Secure BNB Transactions,
            <br />
            <Typography
              component="span"
              color="#006DAF"
              sx={{
                fontSize: "inherit",
                fontWeight: "inherit",
              }}
            >
              with Smart Escrow
            </Typography>
          </GradientText>
        </motion.div>

        <Box height={32}></Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <Typography
            variant="body2"
            sx={(theme) => ({
              fontSize: {
                xs: "14px",
                sm: "16px",
                md: "16px",
              },
              color: "text.secondary",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: 1.6,
              [theme.breakpoints.up("lg")]: {
                fontSize: "16px",
              },
            })}
          >
            Experience secure and transparent BNB transactions with our smart
            contract escrow service. Trade with confidence, no intermediaries
            needed.
          </Typography>
        </motion.div>

        <Box height={32}></Box>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        >
          <Link href="/ecommerce/shop" style={{ textDecoration: "none" }}>
            <MainButton
              target="_blank"
              rel="noopener noreferrer"
              children={"Get Started"}
            ></MainButton>
          </Link>
        </motion.div>

        {/* Add floating image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.7, ease: "easeOut" }}
        >
          <Box
            sx={{
              borderRadius: "28px",
              overflow: "hidden",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "1000px",
              maxWidth: "100%",
              boxShadow: theme.shadows[5],
              mt: 6,
              zIndex: 1,
              "& img": {
                width: "100%",
                height: "auto",
              },
            }}
          >
            <Image
              src="/images/backgrounds/banner-2.jpg"
              alt="Platform Preview"
              width={1000}
              height={450}
              priority
            />
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Banner;
