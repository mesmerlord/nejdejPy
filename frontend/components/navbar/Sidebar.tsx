import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Drawer, Accordion, Title, Group } from '@mantine/core';
import { useRouter } from 'next/router';
import LinkText from '../common/LinkText';
import { useEffect } from 'react';
import { useStore } from '../../src/store/store';
import { routes } from '../../src/utils/routes';

const Sidebar = ({ opened, setOpened }) => {
  const accessToken = useStore((state) => state.accessToken);
  const logOut = useStore((state) => state.logOut);
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setOpened(false);
    });
  }, [router]);
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title="Menu"
      padding="md"
      size="sm"
      position="right"
      sx={{
        div: {
          marginBottom: '10px',
        },

        button: { marginTop: '15px' },
      }}
    >
      <Group>
        <LinkText href={routes.home}>
          <Title order={3}>🏠</Title>
        </LinkText>

        <LinkText href={routes.home}>
          <Title order={3}>Home</Title>
        </LinkText>
      </Group>
      <Accordion iconPosition="left" sx={{ h4: { marginBottom: '10px' } }}>
        <Accordion.Item label={<Title order={3}>Categories</Title>}>
          <LinkText href={`${routes.categories}`}>
            <Title order={4}>All</Title>
          </LinkText>
          <LinkText href={`${routes.category}action`}>
            <Title order={4}>Action</Title>
          </LinkText>
          <LinkText href={`${routes.category}adventure`}>
            <Title order={4}>Adventure</Title>
          </LinkText>
          <LinkText href={`${routes.category}shoujo`}>
            <Title order={4}>Shoujo</Title>
          </LinkText>
          <LinkText href={`${routes.category}romance`}>
            <Title order={4}>Romance</Title>
          </LinkText>
        </Accordion.Item>
        <Accordion.Item label={<Title order={3}>Tags</Title>}>
          <LinkText href={`${routes.tags}`}>
            <Title order={4}>All</Title>
          </LinkText>
          <LinkText href={`${routes.tag}game-elements`}>
            <Title order={4}>Game Elements</Title>
          </LinkText>
        </Accordion.Item>
        {accessToken && (
          <Accordion.Item label={<Title order={3}>Account</Title>}>
            <LinkText href={`${routes.profileView}`}>
              <Title order={4}>Profile</Title>
            </LinkText>

            <LinkText href={`${routes.bookmark}`}>
              <Title order={4}>Bookmarks</Title>
            </LinkText>

            <LinkText href={`${routes.settings}`}>
              <Title order={4}>Settings</Title>
            </LinkText>
          </Accordion.Item>
        )}
      </Accordion>
      <LinkText href={`${routes.search}`}>
        <Button
          size="md"
          // compact={true}
          leftIcon={<SearchIcon />}
          fullWidth
        >
          Search
        </Button>
      </LinkText>
      {!accessToken ? (
        <Button
          onClick={() => router.push(`${routes.login}`)}
          leftIcon={<LoginIcon />}
          fullWidth
          size="md"
        >
          Log In
        </Button>
      ) : (
        <Button onClick={() => logOut()} leftIcon={<LogoutIcon />} fullWidth size="md">
          Log Out
        </Button>
      )}
    </Drawer>
  );
};
export default Sidebar;
