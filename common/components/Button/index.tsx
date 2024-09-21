import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};

const Button: React.FC<Props> = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={classNames(className)}>
      {children}
    </button>
  );
};

export default Button;
