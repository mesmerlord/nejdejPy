import { useRouter } from 'next/router';
import NextError from 'next/error';
import {
  Badge,
  Box,
  Button,
  Col,
  Container,
  Grid,
  Group,
  Image,
  Text,
  Title,
  Card,
} from '@mantine/core';
import LinkText from '../../components/common/LinkText';
import ListingCard from '../../components/common/ListingCard';
import {
  apiListingsList,
  apiSubCategoriesList,
  getApiListingsListQueryKey,
  getApiSubCategoriesListQueryKey,
  useApiListingsList,
  useApiSubCategoriesList,
} from '../../src/api/api';
import { dehydrate, QueryClient } from 'react-query';

export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    getApiSubCategoriesListQueryKey({ category: slug }),
    () => apiSubCategoriesList({ category: slug }),
    {
      staleTime: Infinity,
    }
  );
  await queryClient.prefetchQuery(
    getApiListingsListQueryKey({ category_slug: slug }),
    () => apiListingsList({ category_slug: slug }),
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

const CategoryViewPage = () => {
  const slug = useRouter().query.slug as string;
  const locale = useRouter().locale;

  const { data: subCategories } = useApiSubCategoriesList({ category: slug });
  const { data: listings } = useApiListingsList({ category_slug: slug });

  return (
    <>
      <Box sx={{ margin: '20px' }}>
        <Grid>
          <Col span={3}>
            {subCategories?.map((subcategory) => (
              <LinkText href={`/subcategories/${subcategory.slug}`}>
                <Card shadow="sm" sx={{ marginBottom: '10px' }}>
                  <Card.Section>
                    <Image
                      src={`https://fakeimg.pl/350x200/?text=${subcategory?.name}`}
                      height={50}
                    />

                    {/* <Image src={`${subcategory?.image}`} height={50} /> */}
                  </Card.Section>
                </Card>
              </LinkText>
            ))}
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

export default CategoryViewPage;
