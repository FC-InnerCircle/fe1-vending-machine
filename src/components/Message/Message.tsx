import React from "react";

interface LogMessageProps {
  children: React.ReactNode;
}

const Message = ({ children }: LogMessageProps) => {
  return <p>{children}</p>;
};

export default Message;
