import ListingCard, { ListingCardProps } from './ListingCard';
import { Meta, Story } from '@storybook/react';
import { getApiListingsListMock } from '../../src/api/api.msw';
export default {
  title: 'ListingCard',
  component: ListingCard,
};

const Template: Story<ListingCardProps> = (args) => <ListingCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  listing: getApiListingsListMock()[0],
};
