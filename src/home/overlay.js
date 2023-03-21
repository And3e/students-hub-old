import React, { useState } from 'react';
import { Button, Card, Modal } from '@mantine/core';

export default function OverlayCard() {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Card</Button>
      <Modal opened={opened} onClose={handleClose}>
        <Card style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Card.Title>Overlay Card</Card.Title>
          <Card.Body>Content goes here</Card.Body>
          <Button onClick={handleClose}>Close Card</Button>
        </Card>
      </Modal>
    </>
  );
}