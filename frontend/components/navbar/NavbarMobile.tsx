import { useState } from 'react';
import { Burger } from '@mantine/core';
import { Container } from '@mantine/core';
import { Group } from '@mantine/core';
import { Title } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { Divider, Paper } from '@mantine/core';
import LinkText from '../common/LinkText';
import Sidebar from './Sidebar';
import { useStore } from '../../src/store/store';
import { routes } from '../../src/utils/routes';

const NavbarMobile = () => {
  const [opened, setOpened] = useState(false);
  const siteName = useStore((state) => state.siteName);
  const darkMode = useStore((state) => state.darkMode);
  return (
    <>
      <Paper
        shadow="md"
        radius={0}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme == 'light' ? theme.colors.gray[1] : theme.colors.dark[4],
          padding: '10px',
        })}
      >
        <Container>
          <Group position="apart">
            <LinkText href={routes.home}>
              <Group position="apart">
                <ActionIcon sx={{ fontSize: '35px' }}>📕</ActionIcon>
                <Title order={4}> {siteName} </Title>
              </Group>
            </LinkText>
            <Divider orientation="vertical" />
            <Group>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                aria-label="Toggle Menu"
              />
              <Sidebar opened={opened} setOpened={setOpened} />
            </Group>
          </Group>
        </Container>
      </Paper>
    </>
  );
};

export default NavbarMobile;
