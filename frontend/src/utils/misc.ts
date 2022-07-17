interface WaterMarkProps {
  image?: string;
  width?: number;
  height?: number;
}

export const replaceWithWaterMark = ({ image, width, height }: WaterMarkProps) => {
  const defaults = {
    width: 600,
    height: 800,
  };
  const image_kit_url = 'https://ik.imagekit.io/opyvhypp7cj/nejdej-py/nejdej/';
  if (!image) {
    return ``;
  }
  let image_name = image?.split('/').pop();

  let image_url = `${image_kit_url}${image_name}`;

  if (width && height) {
    image_url = `${image_url}?tr=h-${height},w-${width}`;
  } else if (width && !height) {
    image_url = `${image_url}?tr=w-${width}`;
  } else if (!width && height) {
    image_url = `${image_url}?tr=h-${height}`;
  }
  const watermarkedImage = `${image_url},ote-TkVKREVKLkNPTQ==,cm-force,bg-F3F3F3,ox-N35,oy-N50,ots-50,oa-6,otbg-70FFFF30`;
  console.log(watermarkedImage);

  return watermarkedImage;
};
