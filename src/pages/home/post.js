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
import { useState } from "react";
import data from "./post-data.js";
import './modal.css'
import { useMediaQuery } from '@mantine/hooks';


export default function Posts() {

    const isMobileScreen = useMediaQuery('(max-width: 500px)')
    const isSmallScreen = useMediaQuery('(min-width: 500px) and (max-width: 950px)');
    const isMediumScreen = useMediaQuery('(min-width: 950px) and (max-width: 1500px)');
    const isLargeScreen = useMediaQuery('(min-width: 1500px)');


    // Theme
    // const theme = useMantineTheme();

    // Salvati
    const [bookmarks, setBookmarks] = useState(
        Array(data.length).fill(false)
    );
    const handleClickBookmark = (index) => {
        const newBookmarks = [...bookmarks];
        newBookmarks[index] = !newBookmarks[index];
        setBookmarks(newBookmarks);
    };

    // Modal
    const [opened, setOpened] = useState(Array(data.length).fill(false));
    const handleClickModal = (index) => {
        setOpened(prev => {
            const newOpened = [...prev];
            newOpened[index] = !newOpened[index];
            return newOpened;
        });
    };

    return (
        <>
            {isMobileScreen &&
                <SimpleGrid
                    cols={1}
                    spacing="md"
                >
                    {data.map((post, index) => (
                        <Card
                            key={index}
                            shadow="sm"
                            w
                            withBorder
                            padding="lg"
                            radius="md"
                        >
                            <Card.Section withBorder inheritPadding py="xs">
                                <Group position="apart">
                                    <Group position="right">
                                        <Avatar src={post.propic} />
                                        <Text weight={600}> {post.name}</Text>
                                    </Group>

                                    <Menu withinPortal position="bottom-end" shadow="sm">
                                        <Menu.Target>
                                            <ActionIcon>
                                                <IconDots size="1rem" />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item icon={<IconFileZip size={rem(14)} />}>
                                                Download zip
                                            </Menu.Item>
                                            <Menu.Item icon={<IconEye size={rem(14)} />}>
                                                Preview all
                                            </Menu.Item>
                                            <Menu.Item
                                                icon={<IconTrash size={rem(14)} />}
                                                color="red"
                                            >
                                                Delete all
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Group>
                            </Card.Section>

                            {/* Badge */}
                            <Group position="left" mt="md" mb="xs">
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
                                <Text weight={500}>{post.title}</Text>
                            </Group>

                            {/* Testo */}
                            {post.message.length > 150 ? (
                                <Text size="sm" color="dimmed">
                                    {post.message.slice(0, 150)}...
                                </Text>
                            ) : (
                                <Text size="sm" color="dimmed">
                                    {post.message}
                                </Text>
                            )}

                            {/* Modal */}
                            <Modal
                                key={index}
                                opened={opened[index]}
                                onClose={() => setOpened(prev => {
                                    const newOpened = [...prev];
                                    newOpened[index] = false;
                                    return newOpened;
                                })}
                                title="Post"
                                size="lg"
                                transitionProps={{ transition: 'fade', duration: 50 }}
                                overlayProps={{
                                    opacity: 0.55,
                                    blur: 3,
                                }}
                            >
                                <Group key={index} position="left">
                                    <Avatar key={index} src={post.propic} />
                                    <Text key={index} weight={600}> {post.name}</Text>
                                    {post.type === "Richiesta" ? (
                                        <Badge key={index} color="pink" variant="light">
                                            {post.type}
                                        </Badge>
                                    ) : post.type === "Ripetizione" ? (
                                        <Badge key={index} color="green" variant="light">
                                            {post.type}
                                        </Badge>
                                    ) : (
                                        <Badge key={index} color="violet" variant="light">
                                            {post.type}
                                        </Badge>
                                    )}
                                </Group>


                                <Text key={index} weight={500}>{post.title}</Text>
                                <Text key={index} size="sm" color="dimmed">{post.message}</Text>
                                {/* <Text size="sm" color="dimmed">{post.message}</Text> */}
                            </Modal>

                            {/* Bottoni */}
                            <Group position="apart"
                                grow
                                noWrap
                            >

                                {post.message.length > 100 && (
                                    <Button key={index}
                                        variant="light"
                                        color="blue"
                                        mt="md"
                                        radius="xl"
                                        onClick={() => { handleClickModal(index) }}
                                    >
                                        <EyeFill />
                                    </Button>
                                )}

                                <Button
                                    key={index}
                                    variant="light"
                                    color="blue"
                                    mt="md"
                                    radius="xl"
                                >
                                    <ReplyFill />
                                </Button>

                                <Button
                                    key={index}
                                    variant="light"
                                    mt="md"
                                    radius="xl"
                                    onClick={() => handleClickBookmark(index)}
                                >
                                    {bookmarks[index] ? <BookmarkFill /> : <Bookmark />}

                                </Button>

                            </Group>
                        </Card>
                    ))}
                </SimpleGrid>
            }

            {isSmallScreen &&
                <SimpleGrid
                    cols={1}
                    spacing="md"
                >
                    {data.map((post, index) => (
                        <Card
                            key={index}
                            shadow="sm"
                            w
                            withBorder
                            padding="lg"
                            radius="md"
                        >
                            <Card.Section withBorder inheritPadding py="xs">
                                <Group position="apart">
                                    <Group position="right">
                                        <Avatar src={post.propic} />
                                        <Text weight={600}> {post.name}</Text>
                                    </Group>

                                    <Menu withinPortal position="bottom-end" shadow="sm">
                                        <Menu.Target>
                                            <ActionIcon>
                                                <IconDots size="1rem" />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item icon={<IconFileZip size={rem(14)} />}>
                                                Download zip
                                            </Menu.Item>
                                            <Menu.Item icon={<IconEye size={rem(14)} />}>
                                                Preview all
                                            </Menu.Item>
                                            <Menu.Item
                                                icon={<IconTrash size={rem(14)} />}
                                                color="red"
                                            >
                                                Delete all
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Group>
                            </Card.Section>

                            {/* Badge */}
                            <Group position="left" mt="md" mb="xs">
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
                                <Text weight={500}>{post.title}</Text>
                            </Group>

                            {/* Testo */}
                            {post.message.length > 150 ? (
                                <Text size="sm" color="dimmed">
                                    {post.message.slice(0, 150)}...
                                </Text>
                            ) : (
                                <Text size="sm" color="dimmed">
                                    {post.message}
                                </Text>
                            )}

                            {/* Modal */}
                            <Modal
                                key={index}
                                opened={opened[index]}
                                onClose={() => setOpened(prev => {
                                    const newOpened = [...prev];
                                    newOpened[index] = false;
                                    return newOpened;
                                })}
                                title="Post"
                                size="lg"
                                transitionProps={{ transition: 'fade', duration: 50 }}
                                overlayProps={{
                                    opacity: 0.55,
                                    blur: 3,
                                }}
                            >
                                <Group key={index} position="left">
                                    <Avatar key={index} src={post.propic} />
                                    <Text key={index} weight={600}> {post.name}</Text>
                                    {post.type === "Richiesta" ? (
                                        <Badge key={index} color="pink" variant="light">
                                            {post.type}
                                        </Badge>
                                    ) : post.type === "Ripetizione" ? (
                                        <Badge key={index} color="green" variant="light">
                                            {post.type}
                                        </Badge>
                                    ) : (
                                        <Badge key={index} color="violet" variant="light">
                                            {post.type}
                                        </Badge>
                                    )}
                                </Group>


                                <Text key={index} weight={500}>{post.title}</Text>
                                <Text key={index} size="sm" color="dimmed">{post.message}</Text>
                                {/* <Text size="sm" color="dimmed">{post.message}</Text> */}
                            </Modal>

                            {/* Bottoni */}
                            <Group position="apart"
                                grow
                                noWrap
                            >
                                {post.message.length > 100 && (
                                    <Button key={index}
                                        variant="light"
                                        color="blue"
                                        mt="md"
                                        radius="xl"
                                        onClick={() => { handleClickModal(index) }}
                                        leftIcon={<EyeFill />}
                                    >
                                        Visualizza
                                    </Button>
                                )}

                                <Button
                                    key={index}
                                    variant="light"
                                    color="blue"
                                    mt="md"
                                    radius="xl"
                                    leftIcon={<ReplyFill />}
                                >
                                    Rispondi
                                </Button>

                                <Button
                                    key={index}
                                    variant="light"
                                    mt="md"
                                    radius="xl"
                                    leftIcon={bookmarks[index] ? <BookmarkFill /> : <Bookmark />}
                                    onClick={() => handleClickBookmark(index)}
                                >
                                    {bookmarks[index] ? "Salvato" : "Salva"}
                                </Button>

                            </Group>
                        </Card>
                    ))}
                </SimpleGrid>
            }

            {isMediumScreen &&
                <SimpleGrid
                    cols={2}
                    spacing="md"
                >
                    {data.map((post, index) => (

                        <Card
                            key={index}
                            shadow="sm"
                            w
                            withBorder
                            padding="lg"
                            radius="md"
                        >
                            <Card.Section withBorder inheritPadding py="xs">
                                <Group position="apart">
                                    <Group position="right">
                                        <Avatar src={post.propic} />
                                        <Text weight={600}> {post.name}</Text>
                                    </Group>

                                    <Menu withinPortal position="bottom-end" shadow="sm">
                                        <Menu.Target>
                                            <ActionIcon>
                                                <IconDots size="1rem" />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item icon={<IconFileZip size={rem(14)} />}>
                                                Download zip
                                            </Menu.Item>
                                            <Menu.Item icon={<IconEye size={rem(14)} />}>
                                                Preview all
                                            </Menu.Item>
                                            <Menu.Item
                                                icon={<IconTrash size={rem(14)} />}
                                                color="red"
                                            >
                                                Delete all
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Group>
                            </Card.Section>

                            {/* Badge */}
                            <Group position="left" mt="md" mb="xs">
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
                                <Text weight={500}>{post.title}</Text>
                            </Group>

                            {/* Testo */}
                            {post.message.length > 100 ? (
                                <Text size="sm" color="dimmed">
                                    {post.message.slice(0, 150)}...
                                </Text>
                            ) : (
                                <Text size="sm" color="dimmed">
                                    {post.message}
                                </Text>
                            )}


                            {/* Modal */}
                            <Modal
                                key={index}
                                opened={opened[index]}
                                onClose={() => setOpened(prev => {
                                    const newOpened = [...prev];
                                    newOpened[index] = false;
                                    return newOpened;
                                })}
                                title="Post"
                                size="lg"
                                transitionProps={{ transition: 'fade', duration: 50 }}
                                overlayProps={{
                                    opacity: 0.55,
                                    blur: 3,
                                }}
                            >
                                <Group key={index} position="left">
                                    <Avatar key={index} src={post.propic} />
                                    <Text key={index} weight={600}> {post.name}</Text>
                                    {post.type === "Richiesta" ? (
                                        <Badge key={index} color="pink" variant="light">
                                            {post.type}
                                        </Badge>
                                    ) : post.type === "Ripetizione" ? (
                                        <Badge key={index} color="green" variant="light">
                                            {post.type}
                                        </Badge>
                                    ) : (
                                        <Badge key={index} color="violet" variant="light">
                                            {post.type}
                                        </Badge>
                                    )}
                                </Group>


                                <Text key={index} weight={500}>{post.title}</Text>
                                <Text key={index} size="sm" color="dimmed">{post.message}</Text>
                                {/* <Text size="sm" color="dimmed">{post.message}</Text> */}
                            </Modal>

                            {/* Bottoni */}
                            <Group position="apart"
                                grow
                                noWrap
                            >

                                {post.message.length > 100 && (
                                    <Button key={index}
                                        variant="light"
                                        color="blue"
                                        mt="md"
                                        radius="xl"
                                        onClick={() => { handleClickModal(index) }}
                                    >
                                        <EyeFill />
                                        Visualizza
                                    </Button>
                                )}

                                <Button
                                    key={index}
                                    variant="light"
                                    color="blue"
                                    mt="md"
                                    radius="xl"
                                >
                                    <ReplyFill />
                                    Rispondi
                                </Button>

                                <Button
                                    key={index}
                                    variant="light"
                                    mt="md"
                                    radius="xl"
                                    leftIcon={bookmarks[index] ? <BookmarkFill /> : <Bookmark />}
                                    onClick={() => handleClickBookmark(index)}
                                >
                                    {bookmarks[index] ? "Salvato" : "Salva"}
                                </Button>

                            </Group>
                        </Card>



                    ))}
                </SimpleGrid>

            }

            {isLargeScreen &&
                <SimpleGrid
                    cols={3}
                    spacing="md"
                >
                    {data.map((post, index) => (
                        <Card
                            key={index}
                            shadow="sm"
                            w
                            withBorder
                            padding="lg"
                            radius="md"
                        >
                            <Card.Section withBorder inheritPadding py="xs">
                                <Group position="apart">
                                    <Group position="right">
                                        <Avatar src={post.propic} />
                                        <Text weight={600}> {post.name}</Text>
                                    </Group>

                                    <Menu withinPortal position="bottom-end" shadow="sm">
                                        <Menu.Target>
                                            <ActionIcon>
                                                <IconDots size="1rem" />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item icon={<IconFileZip size={rem(14)} />}>
                                                Download zip
                                            </Menu.Item>
                                            <Menu.Item icon={<IconEye size={rem(14)} />}>
                                                Preview all
                                            </Menu.Item>
                                            <Menu.Item
                                                icon={<IconTrash size={rem(14)} />}
                                                color="red"
                                            >
                                                Delete all
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Group>
                            </Card.Section>

                            {/* Badge */}
                            <Group position="left" mt="md" mb="xs">
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
                                <Text weight={500}>{post.title}</Text>
                            </Group>

                            {/* Testo */}
                            {post.message.length > 150 ? (
                                <Text size="sm" color="dimmed">
                                    {post.message.slice(0, 150)}...
                                </Text>
                            ) : (
                                <Text size="sm" color="dimmed">
                                    {post.message}
                                </Text>
                            )}

                            {/* Modal */}
                            <Modal
                                key={index}
                                opened={opened[index]}
                                onClose={() => setOpened(prev => {
                                    const newOpened = [...prev];
                                    newOpened[index] = false;
                                    return newOpened;
                                })}
                                title="Post"
                                size="lg"
                                transitionProps={{ transition: 'fade', duration: 50 }}
                                overlayProps={{
                                    opacity: 0.55,
                                    blur: 3,
                                }}
                            >
                                <Group key={index} position="left">
                                    <Avatar key={index} src={post.propic} />
                                    <Text key={index} weight={600}> {post.name}</Text>
                                    {post.type === "Richiesta" ? (
                                        <Badge key={index} color="pink" variant="light">
                                            {post.type}
                                        </Badge>
                                    ) : post.type === "Ripetizione" ? (
                                        <Badge key={index} color="green" variant="light">
                                            {post.type}
                                        </Badge>
                                    ) : (
                                        <Badge key={index} color="violet" variant="light">
                                            {post.type}
                                        </Badge>
                                    )}
                                </Group>


                                <Text key={index} weight={500}>{post.title}</Text>
                                <Text key={index} size="sm" color="dimmed">{post.message}</Text>
                                {/* <Text size="sm" color="dimmed">{post.message}</Text> */}
                            </Modal>

                            {/* Bottoni */}
                            <Group position="apart"
                                grow
                                noWrap
                            >

                                {post.message.length > 100 && (
                                    <Button key={index}
                                        variant="light"
                                        color="blue"
                                        mt="md"
                                        radius="xl"
                                        onClick={() => { handleClickModal(index) }}
                                    >
                                        <EyeFill />
                                        Visualizza
                                    </Button>
                                )}

                                <Button
                                    key={index}
                                    variant="light"
                                    color="blue"
                                    mt="md"
                                    radius="xl"
                                >
                                    <ReplyFill />
                                    Rispondi
                                </Button>

                                <Button
                                    key={index}
                                    variant="light"
                                    mt="md"
                                    radius="xl"
                                    leftIcon={bookmarks[index] ? <BookmarkFill /> : <Bookmark />}
                                    onClick={() => handleClickBookmark(index)}
                                >
                                    {bookmarks[index] ? "Salvato" : "Salva"}
                                </Button>

                            </Group>
                        </Card>
                    ))}
                </SimpleGrid>
            }

        </>
    );
}
