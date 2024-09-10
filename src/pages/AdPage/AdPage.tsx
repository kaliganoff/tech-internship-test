import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getSingleAd from "../../services/getSingleAd";
import { Advertisment } from "../../types/types";
import { Box, Button, Image, Input } from "@chakra-ui/react";

export default function AdPage() {
  const { id } = useParams<{ id: string | undefined }>();
  const [ad, setAd] = useState<Advertisment>();
  const [editorMode, setEditorMode] = useState(false);

  useEffect(() => {
    async function setSingleAd() {
      const ad = await getSingleAd(id);
      setAd(ad);
    }
    setSingleAd();
  }, [id]);

  return (
    <Box>
      {editorMode ? (
        <Input
          value={ad?.imageUrl}
          onChange={(e) => setAd({ ...ad, imageUrl: e.target.value })}
        />
      ) : (
        <Image boxSize="100px" src={ad?.imageUrl} alt={ad?.name} />
      )}
      <p>{ad?.name}</p>
      {editorMode ? <Input value={ad?.price} /> : <p>Цена: {ad?.price}</p>}
      <p>Просмотры: {ad?.views}</p>
      <p>Лайки: {ad?.likes}</p>
      {editorMode ? (
        <Input value={ad?.description} />
      ) : (
        <p>{ad?.description}</p>
      )}
      <p>{ad?.createdAt}</p>
      <Button onClick={() => setEditorMode((prev) => !prev)}>
        Редактировать
      </Button>
      {editorMode && <Button onClick={() => HandleEditAd()}>Сохранить</Button>}
    </Box>
  );
}
