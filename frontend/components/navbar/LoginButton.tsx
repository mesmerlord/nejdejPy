import { useState } from 'react';
import { Button, Avatar, Group, Popover } from '@mantine/core';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMediaQuery } from '@mantine/hooks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { useRouter } from 'next/router';
import { useStore } from '../../src/store/store';
import { routes } from '../../src/utils/routes';

const LoginButton = () => {
  const token = useStore((state) => state.accessToken);
  const logOut = useStore((state) => state.logOut);
  const userInfo = useStore((state) => state.userInfo);
  const [menuOpened, setMenuOpened] = useState(false);
  const phone = useMediaQuery('(max-width: 1024px)');
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };
  const closeMenu = () => {
    setMenuOpened(false);
  };

  return (
    <>
      {!token && !phone && (
        <Button
          onClick={() => {
            router.push(`${routes.login}`);
          }}
          leftIcon={<LoginIcon />}
        >
          Log In
        </Button>
      )}

      {!phone && token && userInfo && (
        <Popover
          opened={menuOpened}
          onClose={closeMenu}
          target={
            <Group onClick={toggleMenu}>
              <Avatar src={userInfo && userInfo.imageUrl}>{userInfo && userInfo.initials}</Avatar>
            </Group>
          }
          position="bottom"
          withArrow
          placement="end"
          sx={{ marginBottom: '10px' }}
        >
          <Button
            onClick={() => router.push(routes.profileView)}
            variant="outline"
            leftIcon={<AccountCircleIcon />}
            fullWidth
            sx={{
              inner: { justifyContent: 'start' },
              marginBottom: '5px',
            }}
          >
            Profile
          </Button>

          <Button
            onClick={() => router.push(routes.bookmark)}
            variant="outline"
            leftIcon={<BookmarksIcon />}
            fullWidth
            sx={{
              inner: { justifyContent: 'start' },
              marginBottom: '5px',
            }}
          >
            Saved Bookmark
          </Button>

          <Button
            onClick={() => logOut()}
            variant="outline"
            leftIcon={<LogoutIcon />}
            fullWidth
            sx={{
              inner: { justifyContent: 'start' },
              marginBottom: '5px',
            }}
          >
            Logout
          </Button>
        </Popover>
      )}
    </>
  );
};

export default LoginButton;
