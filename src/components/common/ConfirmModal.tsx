import { Button, Card, Divider, Modal, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  buttonText: string;
  title: string;
  subtitle: string;
  onSubmitFunction: () => void;
}

export const ConfirmModal = ({
  buttonText,
  title,
  subtitle,
  onSubmitFunction,
}: Props) => {
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    p: 4,
  };

  const handleYes = () => {
    onSubmitFunction();
    setOpen(false);
  };

  const handleNo = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>{buttonText}</Button>
      <Modal open={open} onClose={handleNo}>
        <Card sx={style}>
          <Typography variant="h5">{title}</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="h6">{subtitle}</Typography>
          <Divider sx={{ my: 1 }} />

          <Stack flexDirection="row">
            <Button onClick={handleYes}>Yes</Button>
            <Button onClick={handleNo}>No</Button>
          </Stack>
        </Card>
      </Modal>
    </>
  );
};
