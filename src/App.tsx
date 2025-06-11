// import "./App.css";
import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);
  return (
    <div className="container">
      <progress className="progress-bar" value={step} max="3"></progress>
      {/* <WelcomePage testName="Название" /> */}
      <LoadPicture />
    </div>
  );
}

export default App;

export const WelcomePage = ({
  testName = "Название теста",
}: {
  testName: string;
}) => <h1>{testName}</h1>;

export const LoadPicture = () => (
  <div className="content">
    <div className="heading">
      <h2 className="title">Загрузите фотографии рисунков </h2>
      <span className="alert">
        Допустимые форматы файлов: jpg, jpeg, png, pdf. Размер не более 5 Мб
      </span>
    </div>

    <form className="load-picture" action="">
      <div className="load-picture__preview">
        <label className="load-picture__input">
          <input type="file" hidden />
        </label>
        <span className="load-picture__caption">Дом, дерево, человек</span>
      </div>
      <div className="load-picture__preview">
        <label className="load-picture__input">
          <input type="file" hidden />
        </label>
        <span className="load-picture__caption">Несуществующее животное</span>
      </div>
      <div className="load-picture__preview">
        <label className="load-picture__input">
          <input type="file" hidden />
        </label>
        <span className="load-picture__caption">Автопортрет</span>
      </div>
    </form>
  </div>
);

export const StepInfo = ({
  currentStep = 0,
  steps = 0,
}: {
  currentStep: number;
  steps: number;
}) => (
  <p>
    Шаг {currentStep}/{steps}
  </p>
);
