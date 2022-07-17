import { useRouter } from 'next/router';
import { Box, Col, Grid } from '@mantine/core';
import ListingCard from '../../components/common/ListingCard';
import { apiListingsList, getApiListingsListQueryKey, useApiListingsList } from '../../src/api/api';
import { dehydrate, QueryClient } from 'react-query';

export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    getApiListingsListQueryKey({ sub_category_slug: slug }),
    () => apiListingsList({ sub_category_slug: slug }),
    {
      staleTime: Infinity,
    }
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const SubCategoryViewPage = () => {
  const slug = useRouter().query.slug as string;
  const locale = useRouter().locale;

  const { data: listings } = useApiListingsList({ sub_category_slug: slug });

  return (
    <>
      <Box sx={{ margin: '20px' }}>
        <Grid>
          <Col span={3}>
            <div>nothing</div>
          </Col>
          <Col span={9}>
            <Grid>
              {listings?.results?.map((listing) => (
                <Col span={12} sm={6} md={4} xs={6} xl={3} key={listing.id}>
                  <ListingCard listing={listing} />
                </Col>
              ))}
            </Grid>
          </Col>
        </Grid>
      </Box>
    </>
  );
};

export default SubCategoryViewPage;
