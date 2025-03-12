"use client";

import React from "react";

import ParentCard from "@/app/components/shared/ParentCard";
import QuillEdit from "./QuillEdit";

const Editor = () => {
  return (
    <ParentCard title="Quill Editor">
      <QuillEdit value={""} onChange={function (content: string): void {
        throw new Error("Function not implemented.");
      } } />
    </ParentCard>
  );
};

export default Editor;
