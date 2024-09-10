import { useEffect, useState } from "react";
import getAllAds from "../../services/getAllAds";
import { Advertisment } from "../../types/types";
import AdCard from "../../components/AdCard/AdCard";
import { Box } from "@chakra-ui/react";

export default function AllAdsPage() {
  const [ads, setAds] = useState<Advertisment[]>([]);

  useEffect(() => {
    async function setAllAds() {
      const allAds = await getAllAds();
      setAds(allAds);
    }
    setAllAds();
  }, []);
  return (
    <Box>
      {ads.map((ad) => (
        <AdCard ad={ad} />
      ))}
    </Box>
  );
}
