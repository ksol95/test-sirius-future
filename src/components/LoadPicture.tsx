import { useEffect, useState } from "react";

interface LoadPictureProps {
  onFileChange: (file: File | null, index: number) => void;
  files: (File | null)[];
  label: string[];
}

export const LoadPicture = ({
  onFileChange,
  files,
  label,
}: LoadPictureProps) => {
  const [previews, setPreviews] = useState<(string | null)[]>([]);

  useEffect(() => {
    const newPreviews = files.map((file) =>
      file ? URL.createObjectURL(file) : null
    );
    setPreviews(newPreviews);
  }, [files]);

  const handleRemoveFile = (index: number) => {
    onFileChange(null, index);
  };

  return (
    <div className="content">
      <div className="heading">
        <h2 className="title">Загрузите фотографии рисунков</h2>
        <span className="alert">
          Допустимые форматы файлов: jpg, jpeg, png, pdf. Размер не более 5 Мб
        </span>
      </div>

      <div className="load-picture">
        {files.map((_, index) => (
          <div key={index} className="load-picture__card">
            <label className="load-picture__preview">
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) =>
                  onFileChange(e.target.files?.[0] || null, index)
                }
                hidden
              />
              {previews[index] ? (
                <>
                  <img
                    src={previews[index]!}
                    alt="Превью"
                    className="load-picture__img"
                  />
                  <button
                    className="load-picture__button reload"
                    onClick={() => handleRemoveFile(index)}
                    type="button"
                  ></button>
                </>
              ) : (
                <div className="load-picture__button upload"></div>
              )}
            </label>
            <span className="load-picture__caption"> {label[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
