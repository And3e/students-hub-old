import { Card, Group, Text, Menu, ActionIcon, Image, SimpleGrid, Badge, Button, rem, Avatar } from '@mantine/core';
import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';

import { ReplyFill } from 'react-bootstrap-icons'

import data from './post-data.js'

export default function Demo() {

    return (
        <SimpleGrid cols={2} spacing="md"
            breakpoints={[
                { maxWidth: 'md', cols: 1, spacing: 'sm' },
            ]}>
            {data.map((post, index) => (

                <Card
                    key={index}
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                >
                    <Card.Section withBorder inheritPadding py="xs">
                        <Group position='apart'>
                            <Group position='right'>
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
                                    <Menu.Item icon={<IconFileZip size={rem(14)} />}>Download zip</Menu.Item>
                                    <Menu.Item icon={<IconEye size={rem(14)} />}>Preview all</Menu.Item>
                                    <Menu.Item icon={<IconTrash size={rem(14)} />} color="red">Delete all</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </Card.Section>

                    {/* Intestazione */}
                    <Group position="left" mt="md" mb="xs">
                        {post.type === 'Richiesta' ? (
                            <Badge color="pink" variant="light">{post.type}</Badge>
                        ) : post.type === 'Ripetizione' ? (
                            <Badge color="green" variant="light">{post.type}</Badge>
                        ) : (
                            <Badge color="violet" variant="light">{post.type}</Badge>
                        )}
                        <Text weight={500}>{post.title}</Text>

                    </Group>

                    {/* Testo */}
                    <Text size="sm" color="dimmed" >
                        {post.message}
                    </Text>

                    {/* Bottone */}
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                        <ReplyFill />
                        Rispondi
                    </Button>
                </Card >
            ))
            }
        </SimpleGrid >
    )
}