import { Box, Button, Container, Group, Image, Modal } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SizeIcon } from '@radix-ui/react-icons';
import { ListingImage } from '../../src/model';
import { replaceWithWaterMark } from '../../src/utils/misc';

interface ImageBoxProps {
  images: ListingImage[];
}

const ImageBox = ({ images }: ImageBoxProps) => {
  const [mainImage, setMainImage] = useState(0);
  const [maximizedImage, setMaximizedImage] = useState<ListingImage | null>();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: false,
  };
  const slider = useRef<any>();
  useEffect(() => {
    if (slider) {
      slider?.current?.slickGoTo(mainImage);
    }
  }, [mainImage]);

  const maximizeImage = (image: ListingImage) => {
    setMaximizedImage(image);
  };
  return (
    <Container>
      {images.length > 1 ? (
        <Slider ref={slider} {...settings}>
          {images.map((image) => (
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <Button
                variant="subtle"
                onClick={() => {
                  maximizeImage(image);
                }}
                size="sm"
                compact
                radius="lg"
                sx={{
                  position: 'absolute',
                  right: '40px',
                  top: '2px',
                  zIndex: 10,
                }}
              >
                <SizeIcon style={{ width: 20, height: 20 }} />
              </Button>

              <Image
                width={400}
                src={replaceWithWaterMark({ image: image.image, width: 800, height: 600 })}
                sx={{
                  '&:hover': {
                    boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.3)',
                    filter: 'brightness(60%)',
                  },
                  transition: 'box-shadow 0.25s, filter  0.2s',
                }}
              />
            </Box>
          ))}
        </Slider>
      ) : (
        <Image
          src={replaceWithWaterMark({ image: images[0].image, width: 800, height: 600 })}
          sx={{ marginBottom: '20px' }}
        />
      )}
      <Modal
        opened={maximizedImage ? true : false}
        onClose={() => setMaximizedImage(null)}
        size={1300}
      >
        <Image
          src={replaceWithWaterMark({ image: maximizedImage?.image, height: 1000 })}
          src={`${maximizedImage?.image}?tr=h-1000,ote-TkVKREVKLkNPTQ==,cm-force,bg-F3F3F3,ox-N35,oy-N50,ots-60,oa-5,otbg-70FFFF20`}
          sx={{ marginBottom: '20px' }}
        />
      </Modal>
      <Group>
        {images.map((image, index) => (
          <Image
            onClick={() => {
              if (index !== mainImage) {
                setMainImage(index);
              }
            }}
            width={100}
            src={image.image}
            sx={{
              '&:hover': {
                boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.3)',
                filter: 'brightness(80%)',
              },
              transition: 'box-shadow 0.25s, filter  0.2s',
            }}
          />
        ))}
      </Group>
    </Container>
  );
};

export default ImageBox;
