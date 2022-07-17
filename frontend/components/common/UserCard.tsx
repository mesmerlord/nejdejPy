import React from 'react';
import { createStyles, Card, Avatar, Text, Button } from '@mantine/core';
import LinkText from './LinkText';
import { ListingUser } from '../../src/model/listingUser';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  image: {
    border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
  },
}));

export function UserCard({ image, first_name, id }: ListingUser) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder radius="md" className={classes.card}>
      {/* <Card.Section sx={{ backgroundImage: `url(${image})`, height: 140 }} /> */}
      <Avatar src={image} size={80} radius={80} mx="auto" mt={-30} className={classes.image} />
      <Text align="center" size="lg" weight={500} mt="sm">
        {first_name}
      </Text>

      <LinkText href={`/user/${id}`}>
        <Button
          fullWidth
          radius="md"
          mt="xl"
          size="md"
          color={theme.colorScheme === 'dark' ? undefined : 'dark'}
        >
          View Profile
        </Button>
      </LinkText>
    </Card>
  );
}
