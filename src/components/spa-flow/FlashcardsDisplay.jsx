import {useState} from "react";
import {Box, Typography, Button} from "@mui/material";
import {Container} from "@mui/system";
import Flashcard from "@/components/flashcard/Flashcard";

function FlashcardsDisplay({step, goToNextQuestion, flashcards}) {
    const topMarginVH = 10;
    const currentFlashcard = flashcards[step - 1];
    const [canProceed, setCanProceed] = useState(false);


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

                    {/* Display the current flashcard */}
                    <Flashcard
                        flashcard={currentFlashcard}
                        onCorrect={() => setCanProceed(true)}
                    />

                    {/* Next Question Button */}
                    {currentFlashcard < flashcards.length && (
                        <Box sx={{marginTop: "20px"}}>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={!canProceed}
                                onClick={goToNextQuestion}
                            >
                                Next Question
                            </Button>
                        </Box>
                    )}
                </Container>
            </Box>
        </Container>
    );
}

export default FlashcardsDisplay;
