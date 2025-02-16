"use client";
import React from "react";
import Box from "@mui/material/Box";
import { Chip, Typography, useTheme } from "@mui/material";
import { useDropzone } from "react-dropzone";

interface MediaCardProps {
  imageUrl?: string;
  onImageUpload: (file: File) => void;
}

const MediaCard = ({imageUrl, onImageUpload}: MediaCardProps) => {
  const theme = useTheme();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles: any) => {
      if (acceptedFiles?.[0]) {
        onImageUpload(acceptedFiles[0]);
      }
    },
  });

  return (
    <Box p={3}>
      <Typography variant="h5">Media</Typography>

      {imageUrl && (
        <Box mt={2}>
          <img 
            src={imageUrl} 
            alt="Product" 
            style={{ maxWidth: '100%', maxHeight: '200px' }} 
          />
        </Box>
      )}

      <Box
        mt={3}
        fontSize="12px"
        sx={{
          backgroundColor: "primary.light",
          color: "primary.main",
          padding: "40px 30px",
          textAlign: "center",
          border: `1px dashed`,
          borderColor: "primary.main",
        }}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        <Box>
          Drag 'n' drop some files here, or click to select files
        </Box>
      </Box>
      <Box mt={2}>
        <Typography variant="h6" fontSize="15px">
          Files:
        </Typography>
        <Box>
          {acceptedFiles.map((file: any) => (
            <Box
              key={file.path}
              display="flex"
              alignItems="center"
              py={1}
              mt={2}
              sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
              justifyContent="space-between"
            >
              <Typography variant="body1" fontWeight="500">
                {file.path}
              </Typography>
              <Chip color="primary" label={`${file.size} Bytes`} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MediaCard;
