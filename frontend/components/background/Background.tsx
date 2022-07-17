import { Paper } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useEffect } from 'react';
import { useApiUsersMeRetrieve } from '../../src/api/api';
import { useStore } from '../../src/store/store';

const Background = (props) => {
  const axiosRun = useStore((state) => state.axiosRun);
  const accessToken = useStore((state) => state.accessToken);
  const setProfile = useStore((state) => state.setProfile);
  const { data } = useApiUsersMeRetrieve({ query: { enabled: Boolean(accessToken) } });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(data, accessToken);
      axiosRun();
    }
  }, []);
  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <Paper radius={0} sx={{ minHeight: '90vh' }}>
          {props.children}
        </Paper>
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default Background;
