import { createSlice } from "@reduxjs/toolkit";

interface StepState {
  currentStep: number;
  steps: number;
}

const initialState: StepState = {
  currentStep: 1,
  steps: 3,
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { nextStep, prevStep, setStep } = stepSlice.actions;

export default stepSlice.reducer;
