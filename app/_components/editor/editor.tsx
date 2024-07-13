import { Block, BlockNoteEditor, locales, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// Custom Slash Menu item to insert a block after the current one.

async function loadFromStorage(data: string) {
  // Gets the previously stored editor contents.
  const storageString = data;
  return storageString
    ? (JSON.parse(storageString) as PartialBlock[])
    : undefined;
}

interface EditorProps {
  editable?: boolean;
  data?: string;
  setWriteModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

async function uploadFile(file: File) {
  if (!file.type.startsWith("image/")) {
    toast.error("이미지 파일만 업로드 가능합니다!"); // Alternatively, you can return null or a specific message instead of throwing an error
    return null;
  }

  const body = new FormData();
  body.append("file", file);

  const ret = await fetch(process.env.NEXT_PUBLIC_UPLOAD_SERVER as string, {
    method: "POST",
    body: body,
  });
  const data = await ret.json();
  return data?.url;
}

export default function Editor({ editable = true, data }: EditorProps) {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "불러오는 중"
  >("불러오는 중");

  async function saveToStorage(jsonBlocks: Block[]) {
    localStorage.setItem("editorContent", JSON.stringify(jsonBlocks));
  }

  // Loads the previously stored editor contents.
  useEffect(() => {
    loadFromStorage(data as string).then((e) => {
      setInitialContent(e);
    });
  }, [data]);

  // Creates a new editor instance.
  // We use useMemo + createBlockNoteEditor instead of useCreateBlockNote so we
  // can delay the creation of the editor until the initial content is loaded.
  const editor = useMemo(() => {
    if (initialContent === "불러오는 중") {
      return undefined;
    }
    return BlockNoteEditor.create({
      initialContent,
      dictionary: locales.ko,
      uploadFile,
    });
  }, [initialContent]);

  if (editor === undefined) {
    return "불러오는 중...";
  }

  // Renders the editor instance.
  return (
    <>
      <BlockNoteView
        editor={editor}
        onChange={() => {
          saveToStorage(editor.document).then();
        }}
        editable={editable}
      />
    </>
  );
}