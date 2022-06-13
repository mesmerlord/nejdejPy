import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { useApiCategoriesList } from '../src/api/api';
import { Category } from '../src/model';
import { dehydrate, QueryClient } from 'react-query';
import { apiCategoriesList } from '../src/api/api';

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
  if (error) return <p>Error :(</p>;

  return (
    <>
      <Welcome />
      <>
        {data?.map((category: Category) => (
          <div key={category.slug}>
            <h2>{category.name}</h2>
            <img src={category.image || undefined} alt={category.name} />
          </div>
        ))}
      </>
      <ColorSchemeToggle />
    </>
  );
}
