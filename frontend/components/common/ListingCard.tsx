import { Button, Card, Group, Image, Text } from '@mantine/core';
import { Listing } from '../../src/model';
import LinkText from './LinkText';

export interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }) => (
  <LinkText href={`/listing/${listing.id}`}>
    <Card shadow="sm">
      <Card.Section>
        <Image
          src={`${listing?.listing_images[0].image}?=${Math.floor(Math.random() * 1000)}`}
          height={160}
        />
      </Card.Section>

      <Group position="apart" style={{ marginBottom: 5 }}>
        <Text weight={500}>{listing.title}</Text>
      </Group>

      <Text size="sm">{listing.description}</Text>

      <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
        Book classic tour now
      </Button>
    </Card>
  </LinkText>
);
export default ListingCard;
