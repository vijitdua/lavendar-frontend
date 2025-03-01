import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

function Flashcard({ flashcard, onCorrect }) {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [hints, setHints] = useState(0);
    const [correct, setCorrect] = useState(false);

    // Reset states when a new flashcard is shown
    useEffect(() => {
        setSelectedAnswers({});
        setHints(0);
        setCorrect(false);
    }, [flashcard]); // Runs when flashcard changes

    const handleAnswerClick = (option) => {
        if (correct) return; // Prevent further selection after correct answer

        if (option === flashcard.correctAnswer) {
            setCorrect(true);
            setSelectedAnswers({ ...selectedAnswers, [option]: true }); // Keep only correct selected
            onCorrect(); // Unlock next question
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
                width: "100%",
            }}
        >
            <Typography variant="h5" gutterBottom>
                {flashcard.question}
            </Typography>

            {/* Answer options in a 2x2 grid */}
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, width: "100%" }}>
                {["A", "B", "C", "D"].map((key) => (
                    <Box
                        key={key}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            padding: "10px",
                            cursor: correct ? "default" : "pointer",
                            opacity: correct || selectedAnswers[key] ? 0.5 : 1, // Fade out all unselected options once correct
                            transition: "opacity 0.3s",
                        }}
                        onClick={() => handleAnswerClick(key)}
                    >
                        {/* Circle indicator */}
                        <Box
                            sx={{
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                border: `2px solid ${correct && key === flashcard.correctAnswer ? "green" : "#000"}`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: 1,
                                backgroundColor:
                                    correct && key === flashcard.correctAnswer ? "green" :
                                        selectedAnswers[key] ? "#000" : "transparent",
                            }}
                        />
                        {/* Answer Text */}
                        <Typography variant="body1">
                            {key}. {flashcard[`option${key}`]}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Display hints if applicable */}
            {hints >= 1 && <Typography variant="body2" sx={{ marginTop: 2 }}>Hint: {flashcard.hintOne}</Typography>}
            {hints >= 2 && <Typography variant="body2">Second Hint: {flashcard.hintTwo}</Typography>}

            {/* Show correct answer message when answered correctly */}
            {correct && (
                <Typography variant="body2" sx={{ marginTop: 2, color: "green" }}>
                    ✅ The correct answer is {flashcard.correctAnswer}: {flashcard[`option${flashcard.correctAnswer}`]}!
                </Typography>
            )}
        </Box>
    );
}

export default Flashcard;
