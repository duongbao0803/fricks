import { Radio } from "antd";
import React from "react";

interface RadioCustomProps {
  className?: string;
  title?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioCustom: React.FC<RadioCustomProps> = (props) => {
  const { className, title, checked, onChange } = props;

  return (
    <Radio
      className={`custom-radio ${className}`}
      checked={checked}
      onChange={onChange}
    >
      {title}
    </Radio>
  );
};

export default RadioCustom;
