import React from "react";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button, IconButton, ListItemButton } from "@mui/material";
import type { ButtonProps, IconButtonProps, ListItemButtonProps } from "@mui/material";


export type MultipleFilesButtonHandle = {
  open: () => void;
};


//export type ButtonType = "button" | "icon" | "listItem";

type Props = {
  label?: string;
  onFileSelected: (files: File[]) => void;
  //type?: ButtonType; // 追加
  buttonProps?: ButtonProps | IconButtonProps | ListItemButtonProps;
}


const MultipleFilesButton = React.forwardRef<
  MultipleFilesButtonHandle,
  Props
>(function MultipleFilesButton(
  { onFileSelected },
  ref
) {
  const fileRef = React.useRef<HTMLInputElement | null>(null);

  React.useImperativeHandle(ref, () => ({
    open() {
      fileRef.current?.click();
    },
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      onFileSelected(Array.from(files));
    }
    e.target.value = "";
  };

  return (
    <input
      type="file"
      ref={fileRef}
      multiple
      accept="*.kif"
      style={{ display: "none" }}
      onChange={handleChange}
    />
  );
});
export default MultipleFilesButton