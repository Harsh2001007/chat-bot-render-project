import { useState, useEffect } from "react";

export default function LabelField({ title, buttonAction, values, method }) {
  return (
    <div className="label-field-div">
      <h3 style={{ color: "white" }}>{title}</h3>
      <input type="text" className="inputs" value={values} />
      {buttonAction ? (
        <button className="generate-button" onClick={method}>
          Generate UUID
        </button>
      ) : undefined}
    </div>
  );
}
