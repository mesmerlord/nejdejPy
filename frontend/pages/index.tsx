import { Box, Button, Card, Col, Grid, Group, Image, Text, Title } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { useApiCategoriesList } from '../src/api/api';
import { Category } from '../src/model';
import { dehydrate, QueryClient } from 'react-query';
import { apiCategoriesList } from '../src/api/api';
import LinkText from '../components/common/LinkText';
import { useRouter } from 'next/router';

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['home_view'], () => apiCategoriesList(), {
    staleTime: Infinity,
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 3,
  };
}

export default function HomePage() {
  const { data, error } = useApiCategoriesList();
  const router = useRouter();

  if (error) return <p>Error :(</p>;

  return (
    <>
      <Box sx={{ margin: '30px' }}>
        <Title>Hello</Title>
        <Grid>
          {data?.map((category) => (
            <Col span={12} sm={6} md={4} xs={6} xl={3} key={category.slug}>
              <LinkText href={`/categories/${category.slug}`}>
                <Card shadow="sm">
                  <Card.Section>
                    <Image src={category?.image || ''} height={160} />
                  </Card.Section>

                  <Group position="apart" style={{ marginBottom: 5 }}>
                    <Text weight={500}>{category?.name}</Text>
                  </Group>

                  <Text size="sm">{category.description}</Text>

                  <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
                    Visit Category Page
                  </Button>
                </Card>
              </LinkText>
            </Col>
          ))}
        </Grid>
      </Box>
      <ColorSchemeToggle />
    </>
  );
}
