import { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';

import * as styles from './EditableText.css';

const EditableText = ({ value, onSave, className }: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleClick = () => setIsEditing(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleBlur = () => {
    if (localValue.trim() && localValue !== value) {
      onSave(localValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <div onClick={handleClick} className={className}>
      {isEditing ? (
        <input
          type="text"
          value={localValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className={styles.input}
        />
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
};

export default EditableText;

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
}
