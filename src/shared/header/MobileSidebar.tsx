"use client";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import { NavLinks } from "./Navigations";
import { ConnectButton } from "@rainbow-me/rainbowkit";


const MobileSidebar = () => {
  return (
    <>
      <Box px={3}>
        <Logo />
      </Box>
      <Box p={3}>
        <Stack direction="column" spacing={2}>
          {NavLinks.map((navlink, i) => (
            <Button
              color="inherit"
              href={navlink.href}
              key={i}
              sx={{
                justifyContent: "start",
              }}
            >
              {navlink.title}{" "}
              
            </Button>
          ))}

          <Button
            color="inherit"
            href="#"
            sx={{
              justifyContent: "start",
            }}
          >
            Support
          </Button>
          <Box sx={{ my: 2 }}>
            <ConnectButton />
          </Box>
          <Button color="primary" variant="contained" href="/auth/auth1/login">
            Get Started
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default MobileSidebar;
