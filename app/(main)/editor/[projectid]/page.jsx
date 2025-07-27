import { useParams } from "next/navigation";
import React from "react";


const Editor = () => {
  const {projectId} = useParams();
  return <div>Editor</div>;
};

export default Editor;
