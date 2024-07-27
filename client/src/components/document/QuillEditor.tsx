import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";
import { useDocumentContext } from "../../context/document-context";

const QuillEditor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quill = useRef<Quill | null>(null);
  const { state } = useDocumentContext();
  const { selectedDocument } = state;

  useEffect(() => {
    const editorContainer = containerRef.current;
    if (quill.current === null && editorContainer) {
      quill.current = new Quill(editorContainer, {
        theme: "snow",
      });
    }
    console.log(quill.current);
  }, []);

  if (!selectedDocument) return null;

  return <div ref={containerRef}></div>;
};

export default QuillEditor;
