"use client";
import React from "react";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import { Chip } from "@mui/material";
import NextLink from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const NavLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Add Product",
    new: true,
    href: "/ecommerce/add-product",
  },
  {
    title: "Shop",
    href: "/ecommerce/shop",
  },

  {
    title: "Buyer Transactions",
    href: "/buyer-transactions",
  },
  {
    title: "Seller Transactions",
    href: "/seller-transactions",
  },
];

const Navigations = () => {
  const router = usePathname();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const StyledButton = styled(Button)(({ theme }) => ({
    a: {
      color: theme.palette.text.secondary,
      fontWeight: 500,
      fontSize: "15px",
    },

    "&.active": {
      backgroundColor: "rgba(93, 135, 255, 0.15)",
      a: {
        color: theme.palette.primary.main,
      },
    },
  }));

  return (
    <>
      {NavLinks.map((navlink, i) => (
        <StyledButton
          color="inherit"
          className={router === navlink.href ? "active" : "not-active"}
          variant="text"
          key={i}
        >
          <NextLink href={navlink.href}>
            {navlink.title}{" "}
           
          </NextLink>
        </StyledButton>
      ))}
    </>
  );
};

export default Navigations;
