import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';

const images = ["https://picsum.photos/1000", "https://picsum.photos/1000", "https://picsum.photos/1000", "https://picsum.photos/1000", "https://picsum.photos/1000"];

export default function carousel() {
    const slides = images.map((url) => (
        <Carousel.Slide key={url}>
            <Image src={url} />
        </Carousel.Slide>
    ));

    return (
        <Carousel maw={1200} height={300} loop dragFree={false} withControls={true} withIndicators
            slideSize="40%"
            slideGap="md"
            breakpoints={[
                { maxWidth: 'md', slideSize: '50%' },
                { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
            ]}>

            {slides}
        </Carousel>
    );
}

