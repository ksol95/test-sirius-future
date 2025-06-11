import { useState } from "react";
import type { ChangeEvent } from "react";

export const FileUpload = ({
  label,
  onChange,
}: {
  label: string;
  onChange: (file: File | null) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];
  const maxFileSize = 5 * 1024 * 1024; // 5 MB

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setError("Файл не выбран");
      onChange(null);
      return;
    }

    if (!allowedTypes.includes(selectedFile.type)) {
      setError(
        "Недопустимый формат файла. Допустимые форматы: JPG, JPEG, PNG, PDF."
      );
      onChange(null);
      return;
    }

    if (selectedFile.size > maxFileSize) {
      setError("Файл слишком большой. Максимальный размер — 5 МБ.");
      onChange(null);
      return;
    }

    setFile(selectedFile);
    setError(null);
    onChange(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    onChange(null);
  };

  return (
    <div className="load-picture__card">
      <label className="load-picture__preview">
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileChange}
          hidden
        />
        {file && !error && preview ? (
          <>
            <img className="load-picture__img" src={preview} alt="Превью" />
            <button
              className="load-picture__button reload"
              onClick={handleRemoveFile}
              type="button"
            ></button>
          </>
        ) : (
          <div className="load-picture__button upload"></div>
        )}
      </label>
      <span className="load-picture__caption">{label}</span>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
};
