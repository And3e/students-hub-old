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
    useMantineTheme,
} from "@mantine/core";

import { IconDots, IconEye, IconFileZip, IconTrash } from "@tabler/icons-react";

import { ReplyFill, Bookmark, BookmarkFill } from "react-bootstrap-icons";
import { useState } from "react";
import data from "./post-data.js";
import { useDisclosure } from '@mantine/hooks';
import './modal.css'



export default function Posts() {

    const [bookmarks, setBookmarks] = useState(
        Array(data.length).fill(false)
    );
    const handleClickBookmark = (index) => {
        const newBookmarks = [...bookmarks];
        newBookmarks[index] = !newBookmarks[index];
        setBookmarks(newBookmarks);
    };

    const [selectedModal, setSelectedModal] = useState(
        Array(data.length).fill(false)
    );

    const [opened, setOpened] = useState(Array(data.length).fill(false));

    //const [opened, { open, close }] = useDisclosure(false);
    const theme = useMantineTheme();

    const handleClickModal = (index) => {
        setOpened(prev => {
            const newOpened = [...prev];
            newOpened[index] = !newOpened[index];
            return newOpened;
        });
    };
    return (

        <SimpleGrid
            cols={3}
            spacing="md"
            breakpoints={[
                { maxWidth: "xs", cols: 1, spacing: "sm" },
                { maxWidth: "md", cols: 2, spacing: "sm" },
            ]}
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
                            ${post.message.slice(0, 100)}...
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
                            color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
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
                    <Group position="left">

                        {post.message.length > 100 && (
                            <Button key={index} variant="light" onClick={() => { handleClickModal(index) }}>
                                Visualizza tutto ...
                            </Button>
                        )}

                        <Button
                            variant="light"
                            color="blue"
                            mt="md"
                            radius="md"
                        >
                            <ReplyFill />
                            Rispondi
                        </Button>

                        <Button
                            variant="light"
                            mt="md"
                            radius="md"
                            leftIcon={bookmarks[index] ? <BookmarkFill /> : <Bookmark />}
                            onClick={() => handleClickBookmark(index)}
                        >
                            {bookmarks[index] ? "Salvato" : "Salva"}
                        </Button>

                    </Group>
                </Card>
            ))}
        </SimpleGrid>
    );
}
