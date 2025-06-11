export const StepInfo = ({
  currentStep = 0,
  steps = 0,
}: {
  currentStep: number;
  steps: number;
}) => (
  <p className="step-info">
    Шаг {currentStep}/{steps}
  </p>
);
