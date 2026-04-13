"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";

import ToolbarButton from "@/components/rich-text-editor/ToolbarButton";

export default function TiptapEditor({ value, onChange }:{ value?: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit,
      Underline,
      Image,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Enter the content...",
      }),
    ],

    content: value || "",

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const addImage = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = async () => {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    

    const formData = new FormData();
    console.log(formData);
    formData.append("file", file);

    

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    editor.chain().focus().setImage({ src: data.url }).run();
  };

  input.click();
};

  const buttons = [
    {
      label: "Bold",
      command: () => editor.chain().focus().toggleBold().run(),
      active: () => editor.isActive("bold"),
    },
    {
      label: "Italic",
      command: () => editor.chain().focus().toggleItalic().run(),
      active: () => editor.isActive("italic"),
    },
    {
      label: "Underline",
      command: () => editor.chain().focus().toggleUnderline().run(),
      active: () => editor.isActive("underline"),
    },
    {
      label: "H1",
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: () => editor.isActive("heading", { level: 1 }),
    },
    {
      label: "H2",
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: () => editor.isActive("heading", { level: 2 }),
    },
    {
      label: "Bullet List",
      command: () => editor.chain().focus().toggleBulletList().run(),
      active: () => editor.isActive("bulletList"),
    },
    {
      label: "Numbered List",
      command: () => editor.chain().focus().toggleOrderedList().run(),
      active: () => editor.isActive("orderedList"),
    },
  ];

  return (
    <div className="border border-border rounded-lg overflow-hidden">

  {/* Toolbar */}
  <div className="flex flex-wrap gap-2 p-2 border-b border-border bg-surface-muted">
    {buttons.map((btn) => (
      <ToolbarButton
        key={btn.label}
        onClick={btn.command}
        isActive={btn.active()}
      >
        {btn.label}
      </ToolbarButton>
    ))}
    <ToolbarButton onClick={addImage} isActive={false}>
      Image
    </ToolbarButton>
  </div>

  {/* Editor */}
  <div className="p-4 min-h-[200px] bg-surface text-text-primary">
    <EditorContent editor={editor} />
  </div>

</div>
  );
}