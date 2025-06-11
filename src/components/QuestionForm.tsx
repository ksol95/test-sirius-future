import React, { useState } from "react";
// import flag from "../assets/images/flag.svg";
// import thumbsUp from "../assets/images/thumbs-up.svg";
import questionsJSON from "../questions/questions.json";

interface IInstruction {
  text: string;
  img: string;
  alt: string;
}

interface IQuestion {
  id: number;
  type: "radio" | "textarea";
  question: string;
  variants?: { value: string; label: string }[];
}

interface ISection {
  id: number;
  name: string;
  questions: IQuestion[];
}

interface IQuestionsJSON {
  personalData: {
    childName: string;
    childBirthDate: string;
    childGender: string;
    parentName: string;
  };
  instructions: IInstruction[];
  qSection: ISection[];
}

interface IFormData {
  [key: number]: string;
}

export const QuestionForm = () => {
  const questions: IQuestionsJSON = questionsJSON as IQuestionsJSON;
  const [personalData, setPersonalData] = useState({
    childName: "",
    childBirthDate: "",
    childGender: "",
    parentName: "",
  });

  const [answers, setAnswers] = useState<IFormData>({});

  const handlePersonalDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const questionId = parseInt(name, 10);
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <form className="question-form">
      {/* Персональные данные */}
      <fieldset className="question-form__fieldset">
        <legend className="section-title">Общая информация о ребенке</legend>

        <label className="inline-input">
          Имя ребенка
          <input
            type="text"
            name="childName"
            className="form-control"
            value={personalData.childName}
            onChange={handlePersonalDataChange}
          />
        </label>

        <label className="inline-input">
          Дата рождения ребенка
          <input
            type="date"
            name="childBirthDate"
            className="form-control"
            value={personalData.childBirthDate}
            onChange={handlePersonalDataChange}
          />
        </label>

        <fieldset className="question-form__fieldset row">
          <legend>Пол ребенка</legend>
          <label className="radio-btn">
            <input
              type="radio"
              name="childGender"
              value="male"
              checked={personalData.childGender === "male"}
              onChange={(e) =>
                setPersonalData((prev) => ({
                  ...prev,
                  childGender: e.target.value,
                }))
              }
            />
            <span>Мужской</span>
          </label>
          <label className="radio-btn">
            <input
              type="radio"
              name="childGender"
              value="female"
              checked={personalData.childGender === "female"}
              onChange={(e) =>
                setPersonalData((prev) => ({
                  ...prev,
                  childGender: e.target.value,
                }))
              }
            />
            <span>Женский</span>
          </label>
        </fieldset>

        <label className="inline-input">
          <span>Имя родителя, заполняющего анкету</span>
          <input
            type="text"
            name="parentName"
            className="form-control"
            value={personalData.parentName}
            onChange={handlePersonalDataChange}
          />
        </label>
      </fieldset>

      {/* Инструкции */}
      <div className="panel-info">
        {questions.instructions.map((item, index) => (
          <div key={index} className="panel-info__item">
            <div className="panel-info__icon">
              <img
                src={`/images/${item.img}`}
                alt={item.alt}
                className="panel-info__image"
              />
            </div>
            <div className="panel-info__text">{item.text}</div>
          </div>
        ))}
      </div>

      {questions.qSection.map((qSection) => (
        <fieldset key={qSection.id} className="question-form__fieldset gap-2">
          <legend className="section-title">{qSection.name}</legend>

          {qSection.questions.map((question) => (
            <React.Fragment key={question.id}>
              {question.type === "radio" && (
                <fieldset className="question-form__fieldset row">
                  <legend>{question.question}</legend>
                  {question.variants?.map((variant) => (
                    <label key={variant.value} className="radio-btn">
                      <input
                        type="radio"
                        name={`q${question.id}`}
                        value={variant.value}
                        checked={answers[question.id] === variant.value}
                        onChange={() =>
                          handleRadioChange(question.id, variant.value)
                        }
                      />
                      <span>{variant.label}</span>
                    </label>
                  ))}
                </fieldset>
              )}

              {question.type === "textarea" && (
                <label className="inline-input">
                  <span>{question.question}</span>
                  <textarea
                    className="form-control"
                    name={String(question.id)}
                    value={answers[question.id] || ""}
                    onChange={handleTextareaChange}
                  />
                </label>
              )}
            </React.Fragment>
          ))}
        </fieldset>
      ))}

      {/* Для отладки */}
      <pre style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
        {JSON.stringify({ personalData, answers }, null, 2)}
      </pre>
    </form>
  );
};
