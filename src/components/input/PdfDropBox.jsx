import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {useGlobalSnackbar} from "@/contexts/globalFeedbackSnackbarProvider";

const DropBox = styled(Box)(({ theme, isDragging }) => ({
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: isDragging ? theme.palette.action.hover : "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(8px)",
    padding: theme.spacing(4),
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
}));

function PdfDropBox({ onFileUpload }) {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState("");

    const { enqueueAlertFeedbackSnackbar } = useGlobalSnackbar(); // Error snackbar from your provider

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];
        if (file && file.type === "application/pdf") {
            setFileName(file.name);
            onFileUpload && onFileUpload(file);
        } else {
            enqueueAlertFeedbackSnackbar("Only PDF files are allowed!", 5000);
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setFileName(file.name);
            onFileUpload && onFileUpload(file);
        } else {
            enqueueAlertFeedbackSnackbar("Only PDF files are allowed!", 5000);
        }
    };

    return (
        <DropBox
            isDragging={isDragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            component="label"
        >
            <input
                type="file"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={handleFileSelect}
            />
            <CloudUploadIcon sx={{ fontSize: 50, color: "primary.main" }} />
            <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
                {fileName ? fileName : "Drag & Drop your notes / lecture slides or click to upload"}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, borderRadius: 4 }}
                component="span"
            >
                Select File
            </Button>
        </DropBox>
    );
}

export default PdfDropBox;
