import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  id: string;
  sellerAddress: string;
  type: 'telegram' | 'whatsapp';
  value: string;
  createdAt: number;
}

interface StateType {
  contacts: Contact[];
  currentContact: Contact | null;
}

const initialState: StateType = {
  contacts: [],
  currentContact: null,
};

export const ContactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer: (state: StateType, action: PayloadAction<Contact>) => {
        state.contacts.push(action.payload);
      },
      prepare: (sellerAddress: string, type: 'telegram' | 'whatsapp', value: string) => {
        return {
          payload: {
            id: `${sellerAddress}-${Date.now()}`,
            sellerAddress,
            type,
            value,
            createdAt: Date.now(),
          },
        };
      },
    },
    
    updateContact: (state: StateType, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },

    deleteContact: (state: StateType, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },

    setCurrentContact: (state: StateType, action: PayloadAction<string>) => {
      state.currentContact = state.contacts.find(c => c.id === action.payload) || null;
    },
  },
});

export const {
  addContact,
  updateContact,
  deleteContact,
  setCurrentContact,
} = ContactSlice.actions;

export default ContactSlice.reducer;