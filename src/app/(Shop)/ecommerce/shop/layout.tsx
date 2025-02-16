'use client'

import { Box } from "@mui/material"

export default function ShopLayout({children,}: {children: React.ReactNode}) {
  return (
    <Box sx={{p:3}}>
      {children}
    </Box>
  )
}