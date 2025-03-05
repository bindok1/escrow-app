'use client'
import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Container
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqData = [
  {
    question: "How does the escrow service work?",
    answer: "Our escrow service uses smart contracts to hold funds securely until both parties fulfill their obligations. The process is automated, transparent, and non-custodial."
  },
  {
    question: "What are the fees?",
    answer: "We only charge minimal gas fees for blockchain transactions. There are no hidden charges or additional fees."
  },
  {
    question: "Is it safe to use?",
    answer: "Yes, our smart contracts are secure and non-custodial. Your funds remain under your control and are protected by blockchain technology."
  },
  {
    question: "Which cryptocurrencies are supported?",
    answer: "Currently, we support BNB (BSC) transactions. More tokens will be added in future updates."
  }
];

const FaqAccordion = () => {
  return (
    <Container maxWidth="lg">
      <Stack spacing={3} py={8}>
        <Typography variant="h2" align="center" fontWeight={700} mb={4}>
          Frequently Asked Questions
        </Typography>
        {faqData.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Container>
  );
};

export default FaqAccordion;