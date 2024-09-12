import { useEffect, useState } from "react";
import getAllAds from "../../services/getAllAds";
import { Advertisment } from "../../types/types";
import AdCard from "../../components/AdCard/AdCard";
import {
  Box,
  Button,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Text,
} from "@chakra-ui/react";
import getAdsPaginated from "../../services/getAdsPaginated";
import createAd from "../../services/createAd";

export default function AllAdsPage() {
  const [ads, setAds] = useState<Advertisment[]>([]);
  const [adsOnPage, setAdsOnPage] = useState<Advertisment[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pictureModal, setPictureModal] = useState("");
  const [nameModal, setNameModal] = useState("");
  const [descriptionModal, setDescriptionModal] = useState("");
  const [priceModal, setPriceModal] = useState("");
  const [needUpdate, setNeedUpdate] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function setAllAds() {
      const allAds = await getAllAds();
      setAds(allAds);
    }
    setAllAds();
  }, [needUpdate]);

  useEffect(() => {
    async function setAdsPaginated() {
      const adsPaginated = await getAdsPaginated(currentPage, itemsPerPage);
      setAdsOnPage(
        searchValue
          ? adsPaginated.filter((item: Advertisment) =>
              item.name.includes(searchValue),
            )
          : adsPaginated,
      );
    }
    setAdsPaginated();
  }, [itemsPerPage, currentPage, needUpdate, searchValue]);

  const renderPagination = () => {
    const pages = [];
    const totalPages = Math.ceil(ads.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(
        <Button
          key={i}
          onClick={() => setCurrentPage(i)}
          isDisabled={i === currentPage}
          mx={1}
          size="sm"
          bgColor={i === currentPage ? "#ded6cb" : "gray.200"}
        >
          {i}
        </Button>,
      );
    }
    return pages;
  };

  function HandleCreateAd() {
    createAd(pictureModal, nameModal, descriptionModal, priceModal);
    setPictureModal("");
    setNameModal("");
    setDescriptionModal("");
    setPriceModal("");
    setNeedUpdate((prev) => !prev);
  }

  function HandleSearch() {
    setAds((prev) => prev.filter((item) => item.name.includes(searchValue)));
    setAdsOnPage((prev) =>
      prev.filter((item) => item.name.includes(searchValue)),
    );
    setCurrentPage(1);
  }

  return (
    <Box>
      <Input
        value={searchValue}
        onChange={(e) => {
          setNeedUpdate((prev) => !prev);
          setSearchValue(e.target.value);
        }}
      ></Input>
      <Button onClick={HandleSearch}>Искать</Button>
      {adsOnPage.map((ad) => (
        <AdCard ad={ad} key={ad.id} />
      ))}
      {renderPagination()}
      <Select
        placeholder="Количество объявлений на странице"
        onChange={(e) => setItemsPerPage(+e.target.value)}
      >
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </Select>
      <Button onClick={onOpen}>Создать новое объявление</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Создать новое объявление</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Картинка:</Text>
            <Input
              value={pictureModal}
              onChange={(e) => setPictureModal(e.target.value)}
            ></Input>
            <Text>Название:</Text>
            <Input
              value={nameModal}
              onChange={(e) => setNameModal(e.target.value)}
            ></Input>
            <Text>Описание:</Text>
            <Input
              value={descriptionModal}
              onChange={(e) => setDescriptionModal(e.target.value)}
            ></Input>
            <Text>Стоимость:</Text>
            <Input
              value={priceModal}
              onChange={(e) => setPriceModal(e.target.value)}
            ></Input>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Закрыть
            </Button>
            <Button onClick={() => HandleCreateAd()} variant="ghost">
              Создать объявление
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
