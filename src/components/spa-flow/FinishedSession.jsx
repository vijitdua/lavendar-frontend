import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";

function FinishedSession({ retry }) {
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

    const [gifIndex, setGifIndex] = useState(0); // State for current GIF index

    // Change GIF every 3 seconds
    useEffect(() => {
        const gifInterval = setInterval(() => {
            setGifIndex((prevIndex) => (prevIndex + 1) % catGifs.length);
        }, 3000);

        return () => clearInterval(gifInterval);
    }, []);

    return (
        <Container maxWidth="md">
            {/* Box that centers everything in the middle of the screen */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: `${topMarginVH}vh`,
                    height: `${100 - topMarginVH}vh`,
                }}
            >
                <Container maxWidth="sm">
                    {/* Box containing title and logo (aligned left and right) */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
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

                    {/* Congratulatory Box */}
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
                            marginBottom: "20px",
                            textAlign: "center",
                            position: "relative",
                        }}
                    >
                        {/* Heading */}
                        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#4CAF50" }}>
                            🎉 Congratulations!
                        </Typography>

                        {/* GIF Display */}
                        <Box
                            component="img"
                            src={catGifs[gifIndex]}
                            alt="Celebration GIF"
                            sx={{
                                height: 350,
                                width: "auto",
                                borderRadius: "5px",
                                marginTop: "10px",
                                maxWidth: "100%",
                            }}
                        />

                        <Typography variant="body1" sx={{ marginTop: 2 }}>
                            You've successfully completed your study session!
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={retry}
                            sx={{ mt: 2 }}
                        >
                            Start New Session
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Container>
    );
}

export default FinishedSession;
