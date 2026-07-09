import { useState, useCallback } from "react";
import { Bold, Italic, Underline, Strikethrough, Code, Link2, Image as ImageIcon, List, ListOrdered, Quote, AlignLeft, AlignCenter, AlignRight, Type, Minus, Heading1, Heading2, Undo, Redo, Eye, Edit3 } from "lucide-react";

interface RichTextEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

type ToolbarButton = {
  label: string;
  icon: React.ElementType;
  command: string;
  value?: string;
};

const TOOLBAR_GROUPS: ToolbarButton[][] = [
  [
    { label: "Undo", icon: Undo, command: "undo" },
    { label: "Redo", icon: Redo, command: "redo" },
  ],
  [
    { label: "Heading 1", icon: Heading1, command: "formatBlock", value: "h1" },
    { label: "Heading 2", icon: Heading2, command: "formatBlock", value: "h2" },
    { label: "Paragraph", icon: Type, command: "formatBlock", value: "p" },
  ],
  [
    { label: "Bold", icon: Bold, command: "bold" },
    { label: "Italic", icon: Italic, command: "italic" },
    { label: "Underline", icon: Underline, command: "underline" },
    { label: "Strikethrough", icon: Strikethrough, command: "strikeThrough" },
  ],
  [
    { label: "Inline Code", icon: Code, command: "formatBlock", value: "pre" },
    { label: "Blockquote", icon: Quote, command: "formatBlock", value: "blockquote" },
    { label: "Divider", icon: Minus, command: "insertHorizontalRule" },
  ],
  [
    { label: "Bullet List", icon: List, command: "insertUnorderedList" },
    { label: "Numbered List", icon: ListOrdered, command: "insertOrderedList" },
  ],
  [
    { label: "Align Left", icon: AlignLeft, command: "justifyLeft" },
    { label: "Align Center", icon: AlignCenter, command: "justifyCenter" },
    { label: "Align Right", icon: AlignRight, command: "justifyRight" },
  ],
];

export function RichTextEditor({ value, onChange, placeholder = "Start writing...", minHeight = "400px" }: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [editorContent, setEditorContent] = useState(value || "");

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
  }, []);

  const handleInsertLink = () => {
    const url = prompt("Enter URL:", "https://");
    if (url) execCommand("createLink", url);
  };

  const handleInsertImage = () => {
    const url = prompt("Enter image URL:", "https://");
    if (url) execCommand("insertImage", url);
  };

  const handleTogglePreview = () => {
    const editor = document.getElementById("rte-content");
    if (!isPreview && editor) {
      setPreviewContent(editor.innerHTML);
    }
    setIsPreview((v) => !v);
  };

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1">
        {TOOLBAR_GROUPS.map((group, gi) => (
          <div key={gi} className="flex items-center gap-0.5">
            {group.map((btn) => (
              <button
                key={btn.label}
                title={btn.label}
                onMouseDown={(e) => {
                  e.preventDefault();
                  execCommand(btn.command, btn.value);
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:text-[#1B2A6B] transition-colors text-xs"
              >
                <btn.icon size={15} />
              </button>
            ))}
            {gi < TOOLBAR_GROUPS.length - 1 && (
              <div className="w-px h-5 bg-slate-300 mx-1" />
            )}
          </div>
        ))}

        {/* Link & Image */}
        <div className="w-px h-5 bg-slate-300 mx-1" />
        <button
          title="Insert Link"
          onMouseDown={(e) => { e.preventDefault(); handleInsertLink(); }}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:text-[#1B2A6B] transition-colors"
        >
          <Link2 size={15} />
        </button>
        <button
          title="Insert Image"
          onMouseDown={(e) => { e.preventDefault(); handleInsertImage(); }}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:text-[#1B2A6B] transition-colors"
        >
          <ImageIcon size={15} />
        </button>

        {/* Preview toggle — pushed to end */}
        <div className="ml-auto flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
          <button
            onClick={() => { if (isPreview) handleTogglePreview(); }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-colors ${!isPreview ? "bg-[#1B2A6B] text-white" : "text-slate-500 hover:bg-slate-100"}`}
          >
            <Edit3 size={12} /> Write
          </button>
          <button
            onClick={() => { if (!isPreview) handleTogglePreview(); }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-colors ${isPreview ? "bg-[#1B2A6B] text-white" : "text-slate-500 hover:bg-slate-100"}`}
          >
            <Eye size={12} /> Preview
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      {isPreview ? (
        <div
          className="p-6 prose prose-slate max-w-none"
          style={{ minHeight }}
          dangerouslySetInnerHTML={{ __html: previewContent || "<p class='text-slate-400 italic'>Nothing to preview yet.</p>" }}
        />
      ) : (
        <div
          id="rte-content"
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => {
            const html = (e.currentTarget as HTMLDivElement).innerHTML;
            setEditorContent(html);
            onChange?.(html);
          }}
          className="p-6 outline-none text-slate-800 font-medium text-sm leading-relaxed"
          style={{ minHeight }}
          data-placeholder={placeholder}
          dangerouslySetInnerHTML={{ __html: editorContent }}
        />
      )}

      {/* Footer */}
      <div className="border-t border-slate-100 px-4 py-2 bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>HTML editor · Rich Text · Markdown supported</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full inline-block"></span>
          Auto-save enabled
        </span>
      </div>

      <style>{`
        [contenteditable]:empty::before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
        }
        [contenteditable] h1 { font-size: 1.875rem; font-weight: 900; color: #0f172a; margin: 1rem 0 0.5rem; }
        [contenteditable] h2 { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin: 0.75rem 0 0.5rem; }
        [contenteditable] blockquote { border-left: 4px solid #C9A227; padding-left: 1rem; color: #64748b; font-style: italic; margin: 0.75rem 0; }
        [contenteditable] pre { background: #0f172a; color: #e2e8f0; padding: 1rem; border-radius: 0.75rem; font-family: monospace; margin: 0.75rem 0; }
        [contenteditable] ul, [contenteditable] ol { padding-left: 1.5rem; margin: 0.5rem 0; }
        [contenteditable] a { color: #1B2A6B; text-decoration: underline; }
        [contenteditable] img { max-width: 100%; border-radius: 0.75rem; margin: 0.75rem 0; }
        [contenteditable] hr { border: 1px dashed #e2e8f0; margin: 1rem 0; }
      `}</style>
    </div>
  );
}
