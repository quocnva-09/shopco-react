import { BannerSection } from "@/components/organisms/BannerSection";
import { ProductCollectionSection } from "@/components/organisms/ProductCollectionSection";
import { StyleCategorySection } from "@/components/organisms/StyleCategorySection";
import { FeedbackSection } from "@/components/organisms/FeedbackSection";
import {
  HERO_TITLE,
  HERO_DESCRIPTION,
  HERO_CTA,
  HERO_IMAGE,
  HERO_STATS,
  NEW_ARRIVALS,
  TOP_SELLING,
} from "@/consts/homeData";
import { MOCK_REVIEWS } from "@/components/organisms/FeedbackSection/feedbackData";
import { Divider } from "@/components/atoms/Divider";
import { BrandLogoBar } from "@/components/molecules/BrandLogoBar";
import "./Home.scss";
import { useEffect, useState } from "react";
import type { ProductCardData } from "@/types/product";
import { ProductService } from "@/services/product.service";
import { mapProductCardData } from "@/utils/mappers/product.mapper";

export const HomePage = () => {
  const [newArrivals, setNewArrivals] = useState<ProductCardData[]>([]);
  const [isLoadingNewArrivals, setIsLoadingNewArrivals] =
    useState<boolean>(true);
  const [topSellings, setTopSellings] = useState<ProductCardData[]>([]);
  const [isLoadingTopSellings, setIsLoadingTopSellings] =
    useState<boolean>(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      setIsLoadingNewArrivals(true);
      try {
        const response = await ProductService.getProducts({
          sort_by: "created_at",
          sort_dir: "desc",
          per_page: 4,
        });

        // Transform the backend snake_case response into UI camelCase model
        const mappedData = response.data.map(mapProductCardData);
        setNewArrivals(mappedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoadingNewArrivals(false);
      }
    };
    fetchNewArrivals();
  }, []);

  useEffect(() => {
    const fetchTopSellings = async () => {
      setIsLoadingTopSellings(true);
      try {
        const response = await ProductService.getProducts({
          sort_by: "selling",
          sort_dir: "desc",
          per_page: 4,
        });

        // Transform the backend snake_case response into UI camelCase model
        const mappedData = response.data.map(mapProductCardData);
        setTopSellings(mappedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoadingTopSellings(false);
      }
    };
    fetchTopSellings();
  }, []);

  return (
    <>
      <div className="container">
        <BannerSection
          title={HERO_TITLE}
          description={HERO_DESCRIPTION}
          ctaLabel={HERO_CTA}
          stats={HERO_STATS}
          heroImage={HERO_IMAGE}
        />

        <BrandLogoBar className="home__brand-logo" />

        <ProductCollectionSection
          title="NEW ARRIVALS"
          products={newArrivals}
          ctaLabel="View All"
        />

        <Divider direction="horizontal" />

        <ProductCollectionSection
          title="TOP SELLING"
          products={topSellings}
          ctaLabel="View All"
        />

        <StyleCategorySection title="BROWSE BY DRESS STYLE" />
      </div>

      <FeedbackSection reviews={MOCK_REVIEWS.slice(0, 8)} />
    </>
  );
};
