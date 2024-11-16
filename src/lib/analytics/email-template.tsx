/* eslint-disable @next/next/no-img-element */
import * as React from "react";

export interface EmailTemplateProps {
  name?: string;
  url?: string;
}

export const EmailTemplate = ({ name, url }: EmailTemplateProps) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <div style={{ fontSize: "14px" }}>
        <div style={{ fontSize: "14px" }}>
          <strong>Name: </strong>
          <span>{name}</span>
        </div>
        <div>
          <strong>URL: </strong>
          <span>{url}</span>
        </div>
      </div>
    </div>
  );
};
