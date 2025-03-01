import { useState } from "react";
import { Box, Typography } from "@mui/material";

function Flashcard({ flashcard, onCorrect }) {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [hints, setHints] = useState(0);
    const [correct, setCorrect] = useState(false);

    const handleAnswerClick = (option) => {
        if (correct) return; // Prevent changes after selecting the correct answer

        if (option === flashcard.correctAnswer) {
            setCorrect(true);
            setSelectedAnswers({ A: true, B: true, C: true, D: true });
            onCorrect(); // Unlock the next button
        } else {
            setSelectedAnswers((prev) => ({ ...prev, [option]: true }));
            setHints((prev) => Math.min(prev + 1, 2));
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed #ccc",
                borderRadius: "8px",
                padding: "20px",
                marginTop: "20px",
                textAlign: "center",
                position: "relative",
            }}
        >
            <Typography variant="h5" gutterBottom>
                {flashcard.question}
            </Typography>

            {/* Render the answer options */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {["A", "B", "C", "D"].map((key) => (
                    <Box
                        key={key}
                        sx={{
                            padding: "10px",
                            border: "1px solid",
                            borderRadius: "5px",
                            cursor: correct ? "default" : "pointer",
                            backgroundColor: selectedAnswers[key] ? "#ddd" : "#fff",
                            opacity: selectedAnswers[key] ? 0.6 : 1,
                        }}
                        onClick={() => handleAnswerClick(key)}
                    >
                        {flashcard[`option${key}`]}
                    </Box>
                ))}
            </Box>

            {/* Display hints if applicable */}
            {hints >= 1 && <Typography variant="body2" sx={{ marginTop: 2 }}>{flashcard.hintOne}</Typography>}
            {hints >= 2 && <Typography variant="body2">{flashcard.hintTwo}</Typography>}
        </Box>
    );
}

export default Flashcard;
