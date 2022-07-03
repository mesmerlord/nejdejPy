import ListingCard from './ListingCard';

export default {
  title: 'ListingCard',
  component: ListingCard,
};

const Template = (args) => <ListingCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  listing: {
    id: '1',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      },
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehe',
    title: 'Classic Tour',
  },
};
