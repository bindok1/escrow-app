import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";

interface ContactInfoProps {
  contactInfo: string;
  onContactInfoChange: (value: string) => void;
}

const ContactInfo = ({
  contactInfo,
  onContactInfoChange,
}: ContactInfoProps) => {
  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>
        Contact Information
      </Typography>

      <CustomFormLabel htmlFor="contact_info" sx={{ mt: 0 }}>
        Contact Details{" "}
        <Typography color="error.main" component="span">
          *
        </Typography>
      </CustomFormLabel>
      <TextField
        id="contact_info"
        multiline
        rows={4}
        fullWidth
        placeholder="Example:
Telegram: @seller123
WhatsApp: +62812xxxx
Discord: seller#1234"
        value={contactInfo}
        onChange={(e) => onContactInfoChange(e.target.value)}
      />
      <Typography variant="body2" sx={{ mt: 1 }}>
      Add your preferred contact methods for buyers to reach you. Please provide valid contact information as incorrect details may result in delayed transactions and buyer funds being held in escrow. Buyers will need to create a new order if contact information is invalid.
      </Typography>
    </Box>
  );
};

export default ContactInfo;
