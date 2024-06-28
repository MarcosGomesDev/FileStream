"use client";

/* eslint-disable no-unused-vars */
import DropzoneJs, { DropzoneOptions } from "dropzone";
import React, { createRef, HTMLAttributes, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { init } from "./dropzone";

export interface DropzoneElement extends HTMLDivElement {
  dropzone: DropzoneJs;
}

export interface DropzoneProps
  extends React.PropsWithChildren,
    React.ComponentPropsWithoutRef<"div">,
    HTMLAttributes<HTMLDivElement> {
  options: DropzoneOptions;
  getRef: (el: DropzoneElement) => void;
}

function Dropzone(props: DropzoneProps) {
  const fileUploadRef = createRef<DropzoneElement>();

  useEffect(() => {
    if (fileUploadRef.current) {
      props.getRef(fileUploadRef.current);
      init(fileUploadRef.current, props);
    }
  }, [props.options, props.children]);

  const { options, getRef, className, ...computedProps } = props;
  return (
    <div
      {...computedProps}
      ref={fileUploadRef}
      className={twMerge([
        "dropzone [&.dropzone]:border-darkmode-200/60 [&.dropzone]:dark:bg-darkmode-600 border-primary bg-primary/5 [&.dropzone]:border-2 [&.dropzone]:border-dashed [&.dropzone]:dark:border-white/5",
        className,
      ])}
    >
      <div className="dz-message">{props.children}</div>
    </div>
  );
}

Dropzone.defaultProps = {
  options: {},
  getRef: () => {},
};

export default Dropzone;
