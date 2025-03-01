import {Alert, Box, Button, Typography} from "@mui/material";
import {Container} from "@mui/system";
import React from "react";

function FailedLoading({retry, error}) {
    const topMarginVH = 25; // Space below the margin where to start
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

                    {/*    */}
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
                        <Typography variant="h6" gutterBottom color='error'>
                            Flashcards failed to load
                        </Typography>

                        {error && <Alert severity="error">{error}</Alert>}

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{mt: 2, borderRadius: 4}}
                            component="span"
                            onClick={retry}
                        >
                            Retry
                        </Button>
                    </Box>

                </Container>
            </Box>
        </Container>
    );
}

export default FailedLoading;
