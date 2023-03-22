import { Carousel } from '@mantine/carousel';
import { createStyles, Paper, Text, Title, Button, rem } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

import data from './carousel-data.js'

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