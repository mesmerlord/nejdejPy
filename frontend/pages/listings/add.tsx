import { TextInput, Button, NumberInput, Select, Container } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useNotifications } from '@mantine/notifications';
import DropImage from '../../components/pageSpecific/listings/DropImage';
import {
  apiCategoriesNestedSubcategoriesList,
  apiUsersMeRetrieve,
  getApiCategoriesNestedSubcategoriesListQueryKey,
  getApiUsersMeRetrieveQueryKey,
  useApiCategoriesNestedSubcategoriesList,
  useApiListingsCreate,
} from '../../src/api/api';
import { Category, ListingRequest, SubCategory } from '../../src/model';
import { dehydrate, QueryClient } from 'react-query';
import nookies from 'nookies';

type ReturnedPhotoUrl = {
  id: string;
  thumbnailUrl: string;
  url: string;
  name: string;
};

export async function getServerSideProps(ctx) {
  const accessToken = nookies.get(ctx)?.accessToken;
  const queryClient = new QueryClient();

  if (accessToken) {
    await queryClient.prefetchQuery(getApiUsersMeRetrieveQueryKey(), () => apiUsersMeRetrieve(), {
      staleTime: Infinity,
    });
  }
  await queryClient.prefetchQuery(
    getApiCategoriesNestedSubcategoriesListQueryKey(),
    () => apiCategoriesNestedSubcategoriesList(),
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

const AddListing = () => {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<ReturnedPhotoUrl[]>([]);
  const notifications = useNotifications();

  const [availableSubcategories, setAvailableSubcategories] = useState<any[] | null>(null);
  const [subCategorySelected, setSubCategorySelected] = useState<string | null>();
  const initial_values = {
    title: 'test title',
    description: 'test description',
    price: 0,
    subCategory: '',
  };
  const form = useForm({
    initialValues: initial_values,
  });
  const mutation = useApiListingsCreate({
    mutation: {
      onSuccess: () => {
        notifications.showNotification({
          title: 'Listing added',
          message: 'Hey there, your listing is now visible',
        });
      },
    },
  });

  const subcategoriesQuery = useApiCategoriesNestedSubcategoriesList();

  const createAd = (values) => {
    const listing_images = selectedFiles.map((selectedFile) => {
      return { id: selectedFile.id };
    });
    const allValues: ListingRequest = {
      listing_images,
      sub_category: subCategorySelected ?? undefined,
      ...values,
    };
    mutation.mutate({ data: { ...allValues } });
  };

  const getSubCategories = (value) => {
    if (subcategoriesQuery?.data) {
      const subCategories = subcategoriesQuery?.data?.filter((category) => category.slug === value);
      setAvailableSubcategories(subCategories[0].subcategories);
    }
  };

  useEffect(() => {
    if (subCategorySelected) {
      form.setFieldValue('subCategory', subCategorySelected);
    }
  }, [subCategorySelected]);
  return (
    <Container>
      <form onSubmit={form.onSubmit((values) => createAd(values))}>
        <TextInput required label="Description" {...form.getInputProps('description')} />
        <TextInput required label="Title" {...form.getInputProps('title')} />
        <NumberInput required label="Price" {...form.getInputProps('price')} />
        <Select
          label="Your category first"
          placeholder="Pick one"
          data={
            subcategoriesQuery?.data?.map((category: Category) => {
              return {
                value: category.slug,
                label: category.name,
              };
            }) || []
          }
          onChange={getSubCategories}
        />
        <Select
          label="Select a subcategory"
          placeholder="Pick one"
          data={
            availableSubcategories?.map((subCategory: SubCategory) => {
              return {
                value: subCategory.slug,
                label: subCategory.name,
              };
            }) || []
          }
          value={subCategorySelected}
          onChange={setSubCategorySelected}
        />
        <DropImage selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
        <Button type="submit">Submit</Button>
      </form>
    </Container>
  );
};
export default AddListing;
