import {useEffect, useState} from "react";
import {Box, Typography, Button, LinearProgress} from "@mui/material";
import {Container} from "@mui/system";
import Flashcard from "@/components/flashcard/Flashcard";

function FlashcardsDisplay({step, goToNextQuestion, flashcards}) {
    const topMarginVH = 10;
    const currentFlashcard = flashcards[step - 1];
    const [canProceed, setCanProceed] = useState(false);

    const progress = (step / flashcards.length) * 100;

    // Whenever step changes, make can proceed false
    useEffect(() => {
        setCanProceed(false);
    }, [step])


    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: `${topMarginVH}vh`,
                    height: `${100 - topMarginVH}vh`,
                }}
            >
                <Container maxWidth="sm">

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="h2" gutterBottom>
                            Lavender
                        </Typography>
                        <Box
                            component="img"
                            sx={{height: 100, width: 100}}
                            alt="Lavender logo"
                            src="/lavender.png"
                        />
                    </Box>

                    {/* Progress Bar */}
                    <Box sx={{ mt: 3, width: "100%", position: "relative", marginBottom: 2 }}>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 8,
                                backgroundColor: "#ffffff",
                                borderRadius: 2,
                                "& .MuiLinearProgress-bar": { backgroundColor: "#A997DF" },
                            }}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                position: "absolute",
                                top: "-25px",
                                right: 0,
                                fontWeight: "bold",
                            }}
                        >
                            {step}/{flashcards.length}
                        </Typography>
                    </Box>
                    {/* Display the current flashcard */}
                    <Flashcard
                        flashcard={currentFlashcard}
                        onCorrect={() => setCanProceed(true)}
                    />

                    {/* Next Question Button */}
                    <Box sx={{display: "flex", flexDirection: 'row', marginTop: "20px", justifyContent: "flex-end"}}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!canProceed}
                            onClick={canProceed ? goToNextQuestion : undefined}
                        >
                            Next
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Container>
    );
}

export default FlashcardsDisplay;
