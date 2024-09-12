import { Box, Image } from "@chakra-ui/react";
import { Advertisment } from "../../types/types";
import { Link } from "react-router-dom";

export default function AdCard({ ad }: { ad: Advertisment }) {
  const { id, name, price, views, likes, imageUrl } = ad;

  return (
    <Link to={`${id}`}>
      <Box>
        <Image boxSize="100px" src={imageUrl} alt={name} />
        <p>{name}</p>
        <p>Цена: {price}</p>
        <p>Просмотры: {views}</p>
        <p>Лайки: {likes}</p>
      </Box>
    </Link>
  );
}
