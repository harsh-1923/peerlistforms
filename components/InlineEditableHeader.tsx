"use client";
import React, { useEffect, useRef, useState } from "react";

interface InlineEditableFieldProps {
  initialText: string;
  onSave: (value: string) => void;
  style?: string;
}

const InlineEditableField = ({
  initialText,
  onSave,
  style,
}: InlineEditableFieldProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(initialText);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onSave(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onSave(text);
    }
  };
  return (
    <div className={`inline-block w-full ${style}`}>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="border-b-[1px] border-gray-300 focus:outline-none focus:border-blue-500 min-w-full"
        />
      ) : (
        <h2 onClick={handleClick} className="cursor-text">
          {text}
        </h2>
      )}
    </div>
  );
};

export default InlineEditableField;
