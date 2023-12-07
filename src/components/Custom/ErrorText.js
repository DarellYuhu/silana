import React from "react";

const ErrorText = ({ errors, touched }) => {
  if (errors && touched) {
    return <div style={{ color: "red", fontSize: 12 }}>{errors}</div>;
  }
};

export default ErrorText;
