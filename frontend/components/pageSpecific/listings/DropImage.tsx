import {
  Group,
  Image,
  Text,
  useMantineTheme,
  Container,
  Card,
  Button,
  createStyles,
  Box,
  Grid,
  Col,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ImageIcon, UploadIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { useNotifications } from '@mantine/notifications';
import { useApiListingImagesCreate } from '../../../src/api/api';

type ReturnedPhotoUrl = {
  id: string;
  thumbnailUrl: string;
  url: string;
  name: string;
};
type AllowedImages = 'image/png' | 'image/jpeg' | 'image/sgv+xml' | 'image/gif' | 'image/webp';
export interface DropImageProps {
  selectedFiles: ReturnedPhotoUrl[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<ReturnedPhotoUrl[]>>;
}

function ImageUploadIcon({ status, ...props }) {
  if (status.accepted) {
    return <UploadIcon {...props} />;
  }

  if (status.rejected) {
    return <CrossCircledIcon {...props} />;
  }

  return <ImageIcon {...props} />;
}

function getIconColor(status, theme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
    ? theme.colors.red[6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.black;
}

const useStyles = createStyles((theme) => ({
  disabled: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
    cursor: 'not-allowed',

    '& *': {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },
  },
}));

const DropImage = ({ selectedFiles, setSelectedFiles }: DropImageProps) => {
  const [addedFiles, setAddedFiles] = useState<{}>({});
  const notifications = useNotifications();

  const [filesRemaining, setFilesRemaining] = useState<number>(
    Math.min(5 - Object.keys(selectedFiles).length, 5)
  );
  const [uploading, setUploading] = useState<boolean>(false);
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const createImageMutation = useApiListingImagesCreate();

  const deleteFile = (fileName: string) => {
    const newSelectedFiles = selectedFiles.filter((file) => file.name != fileName);
    setSelectedFiles(newSelectedFiles);
    setFilesRemaining(filesRemaining + 1);
  };
  useEffect(() => {
    setFilesRemaining(Math.max(6 - Object.keys(selectedFiles).length, 0));
  }, [selectedFiles]);

  const addFile = (files: File[]) => {
    files.slice(0, 6).map((file) => {
      const fileName = file.name;
      if (!addedFiles[fileName] && filesRemaining !== 0) {
        let addedFile = {};
        addedFile[fileName] = { file, fileType: file.type as AllowedImages };
        setAddedFiles({ ...addedFile, ...addedFiles });
        createImageMutation.mutate(
          { data: { image: file } },
          {
            onSuccess: (data) => {
              let newSelectedFiles: any = {
                id: data.id,
                name: file.name,
                thumbnailUrl: data.image,
                url: data.image,
              };
              setUploading(false);
              setSelectedFiles((oldArray) => [...oldArray, newSelectedFiles]);
            },
          }
        );
      }
    });
  };
  return (
    <>
      <Container sx={{ marginTop: '10px' }}>
        {filesRemaining !== 0 && (
          <Dropzone
            onDrop={addFile}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            disabled={filesRemaining === 0 ? true : false}
            className={(filesRemaining === 0 && classes.disabled) || ''}
            accept={['image/png', 'image/jpeg', 'image/sgv+xml', 'image/gif', 'image/webp']}
            loading={createImageMutation?.isLoading || uploading}
            sx={{ marginBottom: '10px' }}
          >
            {(status) => (
              <Group
                position="center"
                spacing="xl"
                style={{ minHeight: 220, pointerEvents: 'none' }}
              >
                <ImageUploadIcon
                  status={status}
                  style={{
                    width: 80,
                    height: 80,
                    color: getIconColor(status, theme),
                  }}
                />

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Attach 6 files as you like, each file should not exceed 5mb
                  </Text>
                </div>
              </Group>
            )}
          </Dropzone>
        )}
      </Container>
      <Container sx={{ marginBottom: '10px' }}>
        <Grid>
          {selectedFiles.map((file) => (
            <Col span={12} sm={6} md={2} xs={6} xl={2}>
              <Card
                sx={{
                  '&:hover': {
                    boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.3)',
                  },
                  transition: 'box-shadow 0.25s',
                  position: 'relative',
                }}
              >
                <Button
                  color="red"
                  onClick={() => {
                    deleteFile(file.name);
                  }}
                  radius={1200}
                  size="lg"
                  compact
                  sx={{
                    position: 'absolute',
                    right: '7px',
                    top: '2px',
                    zIndex: 10,
                  }}
                >
                  X
                </Button>
                <Image
                  height="100%"
                  width="100%"
                  key={file.name}
                  src={file.thumbnailUrl}
                  fit="contain"
                  radius="md"
                />
              </Card>
            </Col>
          ))}
          {Array.from(Array(filesRemaining).keys()).map((file) => (
            <Col span={12} sm={6} md={2} xs={6} xl={2}>
              <Box
                sx={{
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                  textAlign: 'center',
                  // padding: theme.spacing.xl,
                  padding: '50px',
                  borderRadius: theme.radius.md,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor:
                      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                  },
                }}
              >
                <ImageIcon
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
                <ImageUploadIcon
                  style={{
                    width: 16,
                    height: 16,
                    margin: '3px',
                  }}
                  status={{ accepted: true }}
                />
              </Box>
            </Col>
          ))}
        </Grid>
      </Container>
    </>
  );
};
export default DropImage;
