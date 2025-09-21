"use client";

import { useState } from "react";

const QuillEditor = ({
  value,
  onChange,
  placeholder = "Tulis konten di sini...",
}) => {
  const [isPreview, setIsPreview] = useState(false);

  const handleTextChange = (e) => {
    onChange(e.target.value);
  };

  const insertMarkdown = (markdown) => {
    const textarea = document.getElementById("content-editor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText =
      value.substring(0, start) +
      markdown +
      selectedText +
      markdown +
      value.substring(end);
    onChange(newText);
  };

  const formatText = (format) => {
    const textarea = document.getElementById("content-editor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    let newText = "";
    switch (format) {
      case "bold":
        newText =
          value.substring(0, start) +
          `**${selectedText}**` +
          value.substring(end);
        break;
      case "italic":
        newText =
          value.substring(0, start) +
          `*${selectedText}*` +
          value.substring(end);
        break;
      case "header":
        newText =
          value.substring(0, start) +
          `## ${selectedText}` +
          value.substring(end);
        break;
      case "list":
        newText =
          value.substring(0, start) +
          `- ${selectedText}` +
          value.substring(end);
        break;
      case "link":
        newText =
          value.substring(0, start) +
          `[${selectedText}](url)` +
          value.substring(end);
        break;
      default:
        newText = value;
    }
    onChange(newText);
  };

  return (
    <div className="quill-editor rounded-lg border border-gray-300">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 bg-gray-50 p-3">
        <button
          type="button"
          onClick={() => formatText("bold")}
          className="rounded border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-100"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => formatText("italic")}
          className="rounded border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-100"
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => formatText("header")}
          className="rounded border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-100"
          title="Header"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => formatText("list")}
          className="rounded border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-100"
          title="List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => formatText("link")}
          className="rounded border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-100"
          title="Link"
        >
          🔗
        </button>
        <div className="flex-1"></div>
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className="rounded border border-blue-500 bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
        >
          {isPreview ? "Edit" : "Preview"}
        </button>
      </div>

      {/* Editor */}
      {!isPreview ? (
        <textarea
          id="content-editor"
          value={value}
          onChange={handleTextChange}
          placeholder={placeholder}
          className="h-80 w-full resize-none border-0 p-4 focus:outline-none"
          style={{ minHeight: "300px" }}
        />
      ) : (
        <div className="h-80 overflow-y-auto bg-white p-4">
          <div className="prose max-w-none">
            {value.split("\n").map((line, index) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={index} className="mt-4 mb-2 text-xl font-bold">
                    {line.substring(3)}
                  </h2>
                );
              } else if (line.startsWith("- ")) {
                return (
                  <li key={index} className="ml-4">
                    {line.substring(2)}
                  </li>
                );
              } else if (line.includes("**") && line.includes("**")) {
                const parts = line.split("**");
                return (
                  <p key={index}>
                    {parts.map((part, i) =>
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                    )}
                  </p>
                );
              } else if (line.includes("*") && line.includes("*")) {
                const parts = line.split("*");
                return (
                  <p key={index}>
                    {parts.map((part, i) =>
                      i % 2 === 1 ? <em key={i}>{part}</em> : part
                    )}
                  </p>
                );
              } else if (line.includes("[") && line.includes("](")) {
                const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
                if (linkMatch) {
                  return (
                    <p key={index}>
                      <a
                        href={linkMatch[2]}
                        className="text-blue-600 underline"
                      >
                        {linkMatch[1]}
                      </a>
                    </p>
                  );
                }
              }
              return <p key={index}>{line}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuillEditor;
