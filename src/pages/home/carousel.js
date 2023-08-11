import { Carousel } from '@mantine/carousel';
import { createStyles, Paper, Text, Title, Button, rem } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useEffect, useState } from 'react';
// import { useEffect } from 'react';

import data from './carousel-data.js'
import { useMediaQuery } from '@mantine/hooks';

//Stile
const useStyles = createStyles((theme) => ({
    card: {
        height: rem(440),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.white,
        lineHeight: 1.2,
        fontSize: rem(32),
        marginTop: theme.spacing.md,
        backgroundColor: theme.fn.rgba('#474b52', 0.6),
        borderRadius: '10px',
        padding: '10px',
    },

    category: {
        color: theme.white,
        opacity: 0.75,
        fontWeight: 700,
        textTransform: 'uppercase',
        backgroundColor: theme.fn.rgba('#474b52', 0.6),
        borderRadius: '10px',
        padding: '5px',
        display: 'inline-block',
    },
}));
// Creazione della Card
function Card(props) {
    const { image, title, category, link } = props;
    const { classes } = useStyles();

    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            sx={{ backgroundImage: `url(${image})` }}
            className={classes.card}
        >

            <div>
                <Text className={classes.category} size="sm">
                    {category}
                </Text>
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
            </div>
            <Button variant="white" color="dark" href={link} target="_blank" rel="noopener noreferrer" component="a"
            >
                Leggi Articolo
            </Button>
        </Paper>
    );
}

export default function NewsCarousel() {
    const isMobileScreen = useMediaQuery('(max-width: 500px)')
    const isSmallScreen = useMediaQuery('(min-width: 500px) and (max-width: 950px)');
    const isMediumScreen = useMediaQuery('(min-width: 950px) and (max-width: 1500px)');
    const isLargeScreen = useMediaQuery('(min-width: 1500px)');
    
    // Dynamic changes
    const [controlsVisibility, setControlsVisibility] = useState(true);

    // Resize Handler
    useEffect(() => {
        function handleResize() {
            if (isMobileScreen) {
                setControlsVisibility(false);
            } else if (isSmallScreen) {
                setControlsVisibility(true);
            } else if (isMediumScreen) {
                setControlsVisibility(true);
            } else if (isLargeScreen) {
                setControlsVisibility(true);
            }
        }
        handleResize()

        window.addEventListener('load', handleResize)
        window.addEventListener('orientationchange', handleResize)
        window.addEventListener('resize', handleResize)
        window.addEventListener('DOMContentLoaded', handleResize)

        return () => {
            window.removeEventListener('load', handleResize)
            window.removeEventListener('orientationchange', handleResize)
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('DOMContentLoaded', handleResize)
        };
    }, [isMobileScreen, isSmallScreen, isMediumScreen, isLargeScreen]);

    const autoplay = useRef(Autoplay({ delay: 5000 }));

    // Creazione delle Slides richiamando Card
    const slides = data.map((item) => (
        <Carousel.Slide key={item.title}>
            <Card {...item} />
        </Carousel.Slide>
    ));

    //Return Carousel
    return (
        <>
            <Carousel
                loop
                slideSize="50%"
                breakpoints={[{ maxWidth: 'md', slideSize: '100%', slideGap: 2 }]}
                slideGap="xl"
                align="start"
                withControls={controlsVisibility}

                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
                onClick={autoplay.current.reset}

            >
                {slides}
            </Carousel>
        </>
    );
}