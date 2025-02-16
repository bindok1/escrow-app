"use client";

import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import "./Quill.css";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill: any = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
);

import Paper from "@mui/material/Paper";

interface QuillEditProps {
  value: string;
  onChange: (content: string) => void;
}

const QuillEdit = ({ value, onChange }: QuillEditProps) => {
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <Paper sx={{ border: `1px solid ${borderColor}`, borderRadius: 3 }} variant="outlined">
      <ReactQuill
        value={value}
        onChange={(content: string) => {
          onChange(content);
        }}
        placeholder="Type here..."
      />
    </Paper>
  );
};

export default QuillEdit;
