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
} from "@/consts/homeData";
import { Divider } from "@/components/atoms/Divider";
import { BrandLogoBar } from "@/components/molecules/BrandLogoBar";
import "./Home.scss";
import { useEffect, useState } from "react";
import type { ProductCardData } from "@/types/product";
import { ProductService } from "@/services/product.service";
import { mapProductCardData } from "@/utils/mappers/product.mapper";
import type { ReviewData } from "@/types/review";
import { mapReviewData } from "@/utils/mappers/review.mapper";
import { ReviewService } from "@/services/review.service";

export const HomePage = () => {
  const [newArrivals, setNewArrivals] = useState<ProductCardData[]>([]);
  const [isLoadingNewArrivals, setIsLoadingNewArrivals] =
    useState<boolean>(true);
  const [topSellings, setTopSellings] = useState<ProductCardData[]>([]);
  const [isLoadingTopSellings, setIsLoadingTopSellings] =
    useState<boolean>(true);
  const [feedBacks, setFeedBacks] = useState<ReviewData[]>([]);
  const [isLoadingFeedBacks, setIsLoadingFeedBacks] = useState<boolean>(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      setIsLoadingNewArrivals(true);
      try {
        const response = await ProductService.getProducts({
          sort_by: "created_at",
          sort_dir: "desc",
          per_page: 4,
        });

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

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoadingFeedBacks(true);
      try {
        const response = await ReviewService.getReviews({
          sort_by: "rating",
          sort_direction: "desc",
          limit: 8,
        });

        const mappedData = response.data.map(mapReviewData);
        setFeedBacks(mappedData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoadingFeedBacks(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <>
      <BannerSection
        title={HERO_TITLE}
        description={HERO_DESCRIPTION}
        ctaLabel={HERO_CTA}
        stats={HERO_STATS}
        heroImage={HERO_IMAGE}
      />

      <BrandLogoBar className="home__brand-logo" />

      <div className="container">
        {isLoadingNewArrivals ? (
          <div style={{ padding: "4rem 0", textAlign: "center" }}>
            Loading new arrivals...
          </div>
        ) : (
          <ProductCollectionSection
            title="NEW ARRIVALS"
            products={newArrivals}
            ctaLabel="View All"
          />
        )}

        <Divider direction="horizontal" />

        {isLoadingTopSellings ? (
          <div style={{ padding: "4rem 0", textAlign: "center" }}>
            Loading top sellings...
          </div>
        ) : (
          <ProductCollectionSection
            title="TOP SELLING"
            products={topSellings}
            ctaLabel="View All"
          />
        )}

        <StyleCategorySection title="BROWSE BY DRESS STYLE" />
      </div>

      {isLoadingFeedBacks ? (
        <div style={{ padding: "4rem 0", textAlign: "center" }}>
          Loading feedbacks...
        </div>
      ) : (
        <FeedbackSection reviews={feedBacks} />
      )}
    </>
  );
};
