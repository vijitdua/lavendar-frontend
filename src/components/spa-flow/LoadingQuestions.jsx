import {Box, LinearProgress, Typography} from "@mui/material";
import {Container} from "@mui/system";
import {useEffect, useState} from "react";

function LoadingQuestions(){
    const topMarginVH = 15; // Space below the margin where to start

    // Cat GIFs list
    const catGifs = [
        "https://media.tenor.com/blwK0rdIId8AAAAj/cat-oiiaoiia-cat.gif",
        "https://cataas.com/cat/gif",
        "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
        "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
        "https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif",
        "https://media1.tenor.com/m/FSR0osM5A84AAAAC/rinaspixel-rinauchis.gif",
    ];

    const [progress, setProgress] = useState(0); // State for fake progress bar
    const [gifIndex, setGifIndex] = useState(0); // State for current GIF index

    // Change GIF every 3 seconds
    useEffect(() => {
        const gifInterval = setInterval(() => {
            setGifIndex((prevIndex) => (prevIndex + 1) % catGifs.length);
        }, 3000);

        // Simulate an asymptotic progress bar reaching 90%
        const progressInterval = setInterval(() => {
            setProgress((prev) => (prev < 90 ? prev + (90 - prev) * 0.1 : prev));
        }, 500);

        return () => {
            clearInterval(gifInterval);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <Container maxWidth="md">

            {/* Box that centers everything in the middle of the screen */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: `${topMarginVH}vh`,
                height: `${100 - topMarginVH}vh`
            }}>
                <Container maxWidth="sm">

                    {/* Box containing title and logo (aligned left and right)*/}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Typography variant="h2" gutterBottom>
                            Lavender
                        </Typography>
                        <Box
                            component="img"
                            sx={{
                                height: 100,
                                width: 100,
                            }}
                            alt="Lavender logo"
                            src="/lavender.png"
                        />
                    </Box>

                    {/* Loading Box */}
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
                        {/* Progress Bar */}
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: 5,
                            }}
                        />

                        {/* GIF Display */}
                        <Box
                            component="img"
                            src={catGifs[gifIndex]}
                            alt="Loading GIF"
                            sx={{
                                height: 350, // Set a fixed height
                                width: "auto", // Let the width adjust automatically
                                borderRadius: "5px",
                                marginTop: "10px",
                                maxWidth: "100%", // Ensures it doesn't overflow its container
                            }}
                        />

                        <Typography variant="body1" sx={{ marginTop: 2 }}>
                            Loading your flashcards...
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Container>
    );
}

export default LoadingQuestions;
