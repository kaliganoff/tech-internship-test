import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getSingleAd from "../../services/getSingleAd";
import { Advertisment } from "../../types/types";
import { Box, Button, Image, Input } from "@chakra-ui/react";
import editAd from "../../services/editAd";

export default function AdPage() {
  const { id } = useParams<{ id: string | undefined }>();
  const [ad, setAd] = useState<Advertisment>();
  const [editorMode, setEditorMode] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState<string | undefined>('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    async function setSingleAd() {
      const ad: Advertisment = await getSingleAd(id);
      setAd(ad);
      setImageUrl(ad?.imageUrl);
      setName(ad?.name);
      setPrice(String(ad?.price));
      setDescription(ad?.description)
    }
    setSingleAd();
  }, [id, editorMode]);

  function HandleEditAd() {
    editAd(id, imageUrl, name, description, price);
  }

  return (
    <Box>
      {editorMode ? (
        <Input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      ) : (
        <Image boxSize="100px" src={ad?.imageUrl} alt={ad?.name} />
      )}
      { editorMode ? <Input value={name} onChange={(e) => setName(e.target.value)} /> : <p>{ad?.name}</p>}
      {editorMode ? <Input value={price} onChange={(e) => setPrice(e.target.value)} /> : <p>Цена: {ad?.price}</p>}
      <p>Просмотры: {ad?.views}</p>
      <p>Лайки: {ad?.likes}</p>
      {editorMode ? (
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
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
