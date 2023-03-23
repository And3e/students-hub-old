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

    function sliceMessages(data) {
        const slicedData = [];
        for (let i = 0; i < data.length; i += 2) {
            const post1 = data[i];
            const post2 = data[i + 1];
            const message1 = post1.message;
            const message2 = post2.message;
            const maxLength = Math.max(message1.length, message2.length);
            const newMessage1 = message1.padEnd(maxLength, " ");
            const newMessage2 = message2.padEnd(maxLength, " ");
            console.log(i)

            slicedData.push({
                ...post1,
                message: newMessage1,
            });

            slicedData.push({
                ...post2,
                message: newMessage2,
            });
        }
        return slicedData;
    }

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

    const slicedData = sliceMessages(data)

    return (
        <>
            {isMobileScreen &&
                <SimpleGrid
                    cols={1}
                    spacing="md"
                >
                    {data.map((post) => (
                        <Card
                            key={post.id}
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
                                key={"modal-" + post.id}
                                opened={opened[post.id]}
                                onClose={() => setOpened(prev => {
                                    const newOpened = [...prev];
                                    newOpened[post.id] = false;
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


                                <Text key={"modal-" + post.id} weight={500}>{post.title}</Text>
                                <Text key={"modal-" + post.id} size="sm" color="dimmed">{post.message}</Text>
                                {/* <Text size="sm" color="dimmed">{post.message}</Text> */}
                            </Modal>

                            {/* Bottoni */}
                            <Group position="apart"
                                grow
                                noWrap
                            >

                                {post.message.length > 100 && (
                                    <Button key={post.id}
                                        variant="light"
                                        color="blue"
                                        mt="md"
                                        radius="xl"
                                        onClick={() => { handleClickModal(post.id) }}
                                    >
                                        <EyeFill />
                                    </Button>
                                )}

                                <Button
                                    key={post.id}
                                    variant="light"
                                    color="blue"
                                    mt="md"
                                    radius="xl"
                                >
                                    <ReplyFill />
                                </Button>

                                <Button
                                    key={post.id}
                                    variant="light"
                                    mt="md"
                                    radius="xl"
                                    onClick={() => handleClickBookmark(post.id)}
                                >
                                    {bookmarks[post.id] ? <BookmarkFill /> : <Bookmark />}

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
                    {data.map((post) => (
                        <Card
                            key={post.id}
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
                                key={"modal-" + post.id}
                                opened={opened[post.id]}
                                onClose={() => setOpened(prev => {
                                    const newOpened = [...prev];
                                    newOpened[post.id] = false;
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
                                <Group key={post.id} position="left">
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


                                <Text key={"modal-" + post.id} weight={500}>{post.title}</Text>
                                <Text key={"modal-" + post.id} size="sm" color="dimmed">{post.message}</Text>
                                {/* <Text size="sm" color="dimmed">{post.message}</Text> */}
                            </Modal>

                            {/* Bottoni */}
                            <Group position="apart"
                                grow
                                noWrap
                            >
                                {post.message.length > 100 && (
                                    <Button key={post.id}
                                        variant="light"
                                        color="blue"
                                        mt="md"
                                        radius="xl"
                                        onClick={() => { handleClickModal(post.id) }}
                                        leftIcon={<EyeFill />}
                                    >
                                        Visualizza
                                    </Button>
                                )}

                                <Button
                                    key={post.id}
                                    variant="light"
                                    color="blue"
                                    mt="md"
                                    radius="xl"
                                    leftIcon={<ReplyFill />}
                                >
                                    Rispondi
                                </Button>

                                <Button
                                    key={post.id}
                                    variant="light"
                                    mt="md"
                                    radius="xl"
                                    leftIcon={bookmarks[post.id] ? <BookmarkFill /> : <Bookmark />}
                                    onClick={() => handleClickBookmark(post.id)}
                                >
                                    {bookmarks[post.id] ? "Salvato" : "Salva"}
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
                    {slicedData.map((post) => (
                        <Card
                            key={post.id}
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
                            <Text size="sm" color="dimmed">
                                {post.id}
                                {post.message}
                            </Text>


                            {/* Modal */}
                            <Modal
                                key={"modal-" + post.id}
                                opened={opened[post.id]}
                                onClose={() => setOpened(prev => {
                                    const newOpened = [...prev];
                                    newOpened[post.id] = false;
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
                                <Group key={post.id} position="left">
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


                                <Text key={"modal-" + post.id} weight={500}>{post.title}</Text>
                                <Text key={"modal-" + post.id} size="sm" color="dimmed">{post.message}</Text>
                                {/* <Text size="sm" color="dimmed">{post.message}</Text> */}
                            </Modal>

                            {/* Bottoni */}
                            <Group position="apart"
                                grow
                                noWrap
                            >

                                {post.message.length > 100 && (
                                    <Button key={post.id}
                                        variant="light"
                                        color="blue"
                                        mt="md"
                                        radius="xl"
                                        onClick={() => { handleClickModal(post.id) }}
                                    >
                                        <EyeFill />
                                        Visualizza
                                    </Button>
                                )}

                                <Button
                                    key={post.id}
                                    variant="light"
                                    color="blue"
                                    mt="md"
                                    radius="xl"
                                >
                                    <ReplyFill />
                                    Rispondi
                                </Button>

                                <Button
                                    key={post.id}
                                    variant="light"
                                    mt="md"
                                    radius="xl"
                                    leftIcon={bookmarks[post.id] ? <BookmarkFill /> : <Bookmark />}
                                    onClick={() => handleClickBookmark(post.id)}
                                >
                                    {bookmarks[post.id] ? "Salvato" : "Salva"}
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
                    {data.map((post) => (
                        <Card
                            key={post.id}
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
                            <Text size="sm" color="dimmed">
                                {post.message}
                            </Text>

                            {/* Modal */}
                            <Modal
                                key={"modal-" + post.id}
                                opened={opened[post.id]}
                                onClose={() => setOpened(prev => {
                                    const newOpened = [...prev];
                                    newOpened[post.id] = false;
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


                                <Text key={"modal-" + post.id} weight={500}>{post.title}</Text>
                                <Text key={"modal-" + post.id} size="sm" color="dimmed">{post.message}</Text>
                                {/* <Text size="sm" color="dimmed">{post.message}</Text> */}
                            </Modal>

                            {/* Bottoni */}
                            <Group position="apart"
                                grow
                                noWrap
                            >

                                {post.message.length > 100 && (
                                    <Button key={post.id}
                                        variant="light"
                                        color="blue"
                                        mt="md"
                                        radius="xl"
                                        onClick={() => { handleClickModal(post.id) }}
                                    >
                                        <EyeFill />
                                        Visualizza
                                    </Button>
                                )}

                                <Button
                                    key={post.id}
                                    variant="light"
                                    color="blue"
                                    mt="md"
                                    radius="xl"
                                >
                                    <ReplyFill />
                                    Rispondi
                                </Button>

                                <Button
                                    key={post.id}
                                    variant="light"
                                    mt="md"
                                    radius="xl"
                                    leftIcon={bookmarks[post.id] ? <BookmarkFill /> : <Bookmark />}
                                    onClick={() => handleClickBookmark(post.id)}
                                >
                                    {bookmarks[post.id] ? "Salvato" : "Salva"}
                                </Button>

                            </Group>
                        </Card>
                    ))}
                </SimpleGrid>
            }

        </>
    );
}
