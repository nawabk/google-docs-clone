import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";

const QuillEditor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quill = useRef<Quill | null>(null);

  useEffect(() => {
    const editorContainer = containerRef.current;
    if (quill.current === null && editorContainer) {
      quill.current = new Quill(editorContainer, {
        theme: "snow",
      });
    }
    console.log(quill.current);
  }, []);
  return <div ref={containerRef}></div>;
};

export default QuillEditor;
