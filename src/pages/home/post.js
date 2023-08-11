import {
    Card,
    Group,
    Text,
    Menu,
    ActionIcon,
    SimpleGrid,
    Badge,
    Button,
    rem,
    Avatar,
    Modal,
    // useMantineTheme,
} from "@mantine/core";

import { IconDots, IconEye, IconFileZip, IconTrash } from "@tabler/icons-react";

import { ReplyFill, Bookmark, BookmarkFill, EyeFill } from "react-bootstrap-icons";
import { useEffect, useState, useRef } from "react";
import data from "./post-data.js";
import './modal.css'
import { useMediaQuery } from '@mantine/hooks';



export default function Posts() {
    /*function sliceMessages(data) {
        const slicedData = [];
        for (let i = 0; i < data.length; i += 2) {
            const post1 = data[i];
            const post2 = data[i + 1];
            const text1 = post1.text;
            const text2 = post2.text;
            const maxLength = Math.max(text1.length, text2.length);
            const minLength = Math.min(text1.length, text2.length);

            if (maxLength - minLength >= 50) {
                const newText1 = text1.slice(0, minLength) + '...'
                const newText2 = text2.slice(0, minLength) + '...'


                slicedData.push({
                    ...post1,
                    text: newText1,
                });

                slicedData.push({
                    ...post2,
                    text: newText2,
                });
            } else {
                const newText1 = text1.slice(0, maxLength) + '...'
                const newText2 = text2.slice(0, maxLength) + '...'


                slicedData.push({
                    ...post1,
                    text: newText1,
                });

                slicedData.push({
                    ...post2,
                    text: newText2,
                });
            }
        }

        
        return slicedData;

    }*/

    const isMobileScreen = useMediaQuery('(max-width: 500px)')
    const isSmallScreen = useMediaQuery('(min-width: 500px) and (max-width: 950px)');
    const isMediumScreen = useMediaQuery('(min-width: 950px) and (max-width: 1500px)');
    const isLargeScreen = useMediaQuery('(min-width: 1500px)');

    // Salvati
    const [bookmarks, setBookmarks] = useState(
        Array(data.length).fill(false)
    );
    const handleClickBookmark = (i) => {
        const newBookmarks = [...bookmarks];
        newBookmarks[i] = !newBookmarks[i];
        setBookmarks(newBookmarks);
    };

    // Modal
    const [opened, setOpened] = useState(Array(data.length).fill(false));
    const handleClickModal = (i) => {
        setOpened(prev => {
            const newOpened = [...prev];
            newOpened[i] = !newOpened[i];
            return newOpened;
        });
    };

    //const slicedData = sliceMessages(data)

    // Dynamic changes
    const [gridColumns, setGridColumns] = useState(1);
    const [eyeButtonLeftIcon, setEyeButtonLeftIcon] = useState();
    const [eyeButtonContent, setEyeButtonContent] = useState();
    const [replyButtonLeftIcon, setReplyButtonLeftIcon] = useState();
    const [replyButtonContent, setReplyButtonContent] = useState();
    const [maxNameLength, setMaxNameLength] = useState();
    const [maxTitleLength, setMaxTitleLength] = useState();


    // Resize Handler
    useEffect(() => {
        function handleResize() {
            if (isMobileScreen) {
                setGridColumns(1);
                setEyeButtonLeftIcon('');
                setEyeButtonContent(<EyeFill />);
                setReplyButtonLeftIcon('');
                setReplyButtonContent(<ReplyFill />);
                setMaxNameLength(15);
                setMaxTitleLength(15);
            } else if (isSmallScreen) {
                setGridColumns(1);
                setEyeButtonLeftIcon(<EyeFill />);
                setEyeButtonContent('Mostra');
                setReplyButtonLeftIcon(<ReplyFill />);
                setReplyButtonContent('Rispondi');
                setMaxTitleLength(20);
            } else if (isMediumScreen) {
                setGridColumns(2);
                setEyeButtonLeftIcon(<EyeFill />);
                setEyeButtonContent('Mostra');
                setReplyButtonLeftIcon(<ReplyFill />);
                setReplyButtonContent('Rispondi');
                setMaxTitleLength(25);
            } else if (isLargeScreen) {
                setGridColumns(3);
                setEyeButtonLeftIcon(<EyeFill />);
                setEyeButtonContent('Mostra');
                setReplyButtonLeftIcon(<ReplyFill />);
                setReplyButtonContent('Rispondi');
                setMaxTitleLength(30);
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

    return (
        <>
            <SimpleGrid
                cols={gridColumns}
                spacing="md"
            >
                {data.map((post) => (

                    <Card
                        key={post.id}
                        shadow="md"
                        w
                        withBorder
                        radius="md"
                    >
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group position="apart">
                                <Group position="right">
                                    <Avatar src={post.propic} />
                                    <Text weight={600}>
                                        {post.name.length > maxNameLength
                                            ? (post.name.slice(0, maxNameLength) + '...')
                                            : (post.name)}
                                    </Text>
                                </Group>

                                <Menu withinPortal position="bottom-end" shadow="sm">
                                    <Menu.Target>
                                        <ActionIcon>
                                            <IconDots size="1rem" />
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item
                                            icon={<IconTrash size={rem(14)} />}
                                            color="red" 
                                        >
                                            Nascondi
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Group>
                        </Card.Section>
                        <Card.Section inheritPadding py="md" style={{
                            display: 'flex', flexDirection: 'column',
                            justifyContent: 'space-between', height: 'calc(100% - 24px)',
                        }}>
                            <div>
                                {/* Badge */}
                                <Group position="left" >
                                    {post.type === "Richiesta" ? (
                                        <Badge color="pink" variant="light">
                                            {post.type}
                                        </Badge>
                                    ) : post.type === "Ripetizione" ? (
                                        <Badge color="green" variant="light">
                                            {post.type}
                                        </Badge>
                                    ) : (
                                        <Badge color="violet" variant="light">
                                            {post.type}
                                        </Badge>
                                    )}

                                    {/* Titolo */}
                                    <Text weight={500}>
                                        {post.title.length > maxTitleLength ? (
                                            post.title.slice(0, maxTitleLength) + '...'
                                        ) : (
                                            post.title
                                        )}
                                        
                                    </Text>
                                </Group>

                                {/* Testo */}
                                <Text size="sm" color="dimmed" py="sm" style={{ textAlign: "justify" }}>
                                    {post.text}
                                </Text>
                            </div>


                            {/* Modal */}
                            <Modal
                                key={"modal-" + post.id}
                                opened={opened[post.id]}

                                onClose={() => setOpened(prev => {
                                    const newOpened = [...prev];
                                    newOpened[post.id] = false;
                                    return newOpened;
                                })}

                                title="Visualizzazione Post"
                                leftIcon={<EyeFill/>}
                                size="lg"
                                transitionProps={{ transition: 'fade', duration: 50 }}
                                overlayProps={{ opacity: 0.55, blur: 3, }}
                            >
                                <Group key={"modal-" + post.id} position="left">
                                    <Avatar key={"modal-" + post.id} src={post.propic} />

                                    <Text key={"modal-" + post.id} weight={600}> {post.name}</Text>

                                    {post.type === "Richiesta" ? (
                                        <Badge key={"modal-" + post.id} color="pink" variant="light">
                                            {post.type}
                                        </Badge>
                                    ) : post.type === "Ripetizione" ? (
                                        <Badge key={"modal-" + post.id} color="green" variant="light">
                                            {post.type}
                                        </Badge>
                                    ) : (
                                        <Badge key={"modal-" + post.id} color="violet" variant="light">
                                            {post.type}
                                        </Badge>
                                    )}
                                </Group>


                                <Text
                                    key={"modal-" + post.id}
                                    weight={500}
                                >
                                    {post.title.length > maxTitleLength ? (
                                            post.title.slice(0, maxTitleLength) + '...'
                                        ) : (
                                            post.title
                                        )}
                                </Text>
                                <Text
                                    key={"modal-" + post.id}
                                    size="sm"
                                    color="dimmed"
                                >
                                    {post.text}
                                </Text>
                            </Modal>

                            {/* Bottoni */}
                            <Group
                                grow
                            // position="absolute"
                            // bottom="20px"
                            // left="50%"
                            // transform="translateX(-50%)"
                            // spacing="sm"
                            >

                                <Button
                                    key={post.id}
                                    variant="light"
                                    color="blue"
                                    mt="md"
                                    radius="xl"
                                    onClick={() => { handleClickModal(post.id) }}
                                    leftIcon={eyeButtonLeftIcon}
                                >
                                    {eyeButtonContent}
                                </Button>

                                <Button
                                    key={post.id}
                                    variant="light"
                                    color="blue"
                                    mt="md"
                                    radius="xl"
                                    leftIcon={replyButtonLeftIcon}
                                >
                                    {replyButtonContent}
                                </Button>

                                <Button
                                    key={post.id}
                                    variant="light"
                                    mt="md"
                                    radius="xl"
                                    leftIcon={!isMobileScreen ? (bookmarks[post.id] ? <BookmarkFill /> : <Bookmark />) : ''}
                                    onClick={() => handleClickBookmark(post.id)}
                                >
                                    {isMobileScreen ? (bookmarks[post.id] ? <BookmarkFill /> : <Bookmark />) : bookmarks[post.id] ? "Salvato" : "Salva"}
                                </Button>

                            </Group>
                        </Card.Section>
                    </Card>
                    // </div>
                ))
                }
            </SimpleGrid >
        </>
    );
}
