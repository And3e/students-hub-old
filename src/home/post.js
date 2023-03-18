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
} from "@mantine/core";

import { IconDots, IconEye, IconFileZip, IconTrash } from "@tabler/icons-react";

import { ReplyFill, Bookmark, BookmarkFill } from "react-bootstrap-icons";
import { useState } from "react";
import data from "./post-data.js";

export default function Posts() {
    const [bookmarks, setBookmarks] = useState(
        Array(data.length).fill(false)
    );

    const handleClick = (index) => {
        const newBookmarks = [...bookmarks];
        newBookmarks[index] = !newBookmarks[index];
        setBookmarks(newBookmarks);
    };

    return (
        <SimpleGrid
            cols={2}
            spacing="md"
            breakpoints={[{ maxWidth: "md", cols: 1, spacing: "sm" }]}
        >
            {data.map((post, index) => (
                <Card
                    key={index}
                    shadow="sm"
                    w
                    radius={8} padding={16}
                    withBorder

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

                        <Text weight={500}>{post.title}</Text>
                    </Group>

                    {/* Testo */}
                    <Text size="sm" color="dimmed">
                        {post.message}
                    </Text>

                    {/* Bottoni */}
                    <Button
                        variant="light"
                        color="blue"
                        fullWidth
                        mt="md"
                        radius="md"
                    >
                        <ReplyFill />
                        Rispondi
                    </Button>

                    <Button
                        variant="light"
                        fullWidth
                        mt="md"
                        radius="md"
                        leftIcon={bookmarks[index] ? <BookmarkFill /> : <Bookmark />}
                        onClick={() => handleClick(index)}
                    >
                        {bookmarks[index] ? "Salvato" : "Salva"}
                    </Button>
                </Card>
            ))}
        </SimpleGrid>
    );
}
