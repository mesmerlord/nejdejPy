import ListingCard, { ListingCardProps } from './ListingCard';
import { Story } from '@storybook/react';
export default {
  title: 'ListingCard',
  component: ListingCard,
};

const Template: Story<ListingCardProps> = (args) => <ListingCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  listing: {
    id: '1',
    title: 'Listing 1',
    price: '100',
    listing_images: [
      {
        id: 1,
        image: 'https://via.placeholder.com/150',
      },
    ],
    views: {
      id: 1,
      daily: 1,
      weekly: 1,
      monthly: 1,
      yearly: 1,
      total: 1,
      listing: '1',
    },
    description: 'Something something',
    status: 'PB',
    user: 1,
    sub_category: 'something',
  },
};
