"use client";
import styles from "./page.module.css";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Input from "@mui/material/Input";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import { addTodo } from "./actions/handleSubmit";
import Snackbar from "@mui/material/Snackbar";
import Container from "@mui/material/Container";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { revalidatePath } from "next/cache";
import type { PutBlobResult } from "@vercel/blob";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home() {
  const [filename, setFilename] = React.useState("");
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [blob, setBlob] = React.useState<PutBlobResult | null>(null);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [submitButton, setSubmitButton] = React.useState(false);

  const updateFilename = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFilename(name);
  };

  async function clientAction(formData: FormData) {
    setSubmitButton(true);
    const response = await addTodo(formData);
    if (response.message === "Success") {
      setOpenSuccess(true);
      setSubmitButton(false);
      window.location.assign("/success");
    } else {
      setOpenError(true);
      setSubmitButton(false);
    }
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
        </Toolbar>
      </AppBar>
      <Snackbar open={openError} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: "100%" }}>
          This is an error message!
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccess} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Form submitted successfully!
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form action={clientAction}>
            <TextField
              id="title"
              name="title"
              fullWidth
              label="Title"
              variant="outlined"
            />
            <br></br>
            <br></br>
            <TextField
              id="slug"
              name="slug"
              fullWidth
              label="Slug"
              variant="outlined"
            />
            <br></br>
            <br></br>
            <Button type="submit" variant="outlined" disabled={submitButton}>
              Submit
            </Button>
          </form>
        </Box>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={async (event) => {
              event.preventDefault();

              if (!inputFileRef.current?.files) {
                throw new Error("No file selected");
              }

              const file = inputFileRef.current.files[0];

              const response = await fetch(
                `/actions/handleUpload?filename=${file.name}`,
                {
                  method: "POST",
                  body: file,
                }
              );

              const newBlob = (await response.json()) as PutBlobResult;

              setBlob(newBlob);
            }}
          >
            <Button variant="contained" component="label">
              Choose File
              <input
                name="file"
                ref={inputFileRef}
                type="file"
                hidden
                required
                onChange={updateFilename}
              />
            </Button>
            <Button type="submit">Upload</Button>
            <Box>{filename}</Box>
          </form>
        </Box>
      </Container>
    </div>
  );
}
