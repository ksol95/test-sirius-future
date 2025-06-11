import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { setFile } from "./store/slice/fileUploadSlice";
import { nextStep, prevStep } from "./store/slice/stepsSlice";
import { LoadPicture } from "./components/LoadPicture";
import { QuestionForm } from "./components/QuestionForm";
import { StepInfo } from "./components/StepInfo";

function App() {
  const label = [
    "Дом, дерево, человек",
    "Несуществующее животное",
    "Автопортрет",
  ];
  const dispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.steps.currentStep
  );
  const files = useSelector((state: RootState) => state.fileUpload.files);

  const allFilesUploaded = files.every((file) => file !== null);

  const handleFileChange = (file: File | null, index: number) => {
    dispatch(setFile({ index, file }));
  };

  const goToNextStep = () => {
    if (currentStep === 1 && !allFilesUploaded) return;
    dispatch(nextStep());
  };
  const goBack = () => {
    dispatch(prevStep());
  };

  return (
    <div className="page">
      <main className="container">
        <progress
          className="progress-bar"
          value={currentStep}
          max="3"
        ></progress>

        {currentStep === 1 && (
          <LoadPicture
            onFileChange={handleFileChange}
            files={files}
            label={label}
          />
        )}
        {currentStep === 2 && <QuestionForm />}

        <footer className="footer">
          <StepInfo currentStep={currentStep} steps={3} />
          <div className="footer__buttons-bar">
            {currentStep > 1 && (
              <button className="btn secondary arrow-back" onClick={goBack}>
                К загрузке рисунков
              </button>
            )}
            <button
              className="btn primary arrow-icon"
              disabled={currentStep === 1 && !allFilesUploaded}
              onClick={goToNextStep}
            >
              Далее
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
