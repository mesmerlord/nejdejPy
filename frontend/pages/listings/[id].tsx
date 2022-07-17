import { useRouter } from 'next/router';
import { Col, Container, Grid, Group, Text, Title } from '@mantine/core';
import { dehydrate, QueryClient } from 'react-query';
import {
  apiListingsRetrieve,
  apiUsersMeRetrieve,
  getApiListingsRetrieveQueryKey,
  getApiUsersMeRetrieveQueryKey,
  useApiListingsRetrieve,
} from '../../src/api/api';
import ImageBox from '../../components/common/ImageBox';
import { UserCard } from '../../components/common/UserCard';
import { useEffect } from 'react';
import nookies from 'nookies';
import { initializeStore } from '../../src/store/store';

export async function getServerSideProps(ctx) {
  const id = ctx.params.id as string;
  const queryClient = new QueryClient();
  const accessToken = nookies.get(ctx)?.accessToken;
  let zustandStore = initializeStore({});
  if (accessToken) {
    await queryClient.prefetchQuery(getApiUsersMeRetrieveQueryKey(), () => apiUsersMeRetrieve(), {
      staleTime: Infinity,
    });
    zustandStore = initializeStore({
      accessToken,
    });
  }
  await queryClient.prefetchQuery(
    getApiListingsRetrieveQueryKey(id),
    () => apiListingsRetrieve(id),
    {
      staleTime: Infinity,
    }
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())),
    },
  };
}

const ListingViewPage = () => {
  const id = useRouter().query.id as string;
  const { data } = useApiListingsRetrieve(id);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Container>
        {data && data?.listing_images && (
          <Container>
            <Title>{data.title}</Title>
            <ImageBox images={data.listing_images} />
            <Grid sx={{ marginTop: '10px' }}>
              <Col span={9}>
                <Text>{data.description}</Text>
              </Col>
              <Col span={3}>
                {data.user && (
                  <UserCard
                    image={data.user.image || ''}
                    first_name={data.user.first_name || 'NA'}
                    id={data.user.id}
                  />
                )}
              </Col>
            </Grid>
            <Text>{data?.views?.daily}</Text>
          </Container>
        )}
      </Container>
    </>
  );
};

export default ListingViewPage;
