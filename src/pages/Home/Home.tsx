import { BannerSection } from "@/components/organisms/BannerSection";
import { ProductCollectionSection } from "@/components/organisms/ProductCollectionSection";
import { StyleCategorySection } from "@/components/organisms/StyleCategorySection";
import { FeedbackSection } from "@/components/organisms/FeedbackSection";
import { MainLayout } from "@/components/templates/MainLayout";

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

export const HomePage = () => {
  return (
    <MainLayout>
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
        products={NEW_ARRIVALS}
        ctaLabel="View All"
      />

      <Divider direction="horizontal" />

      <ProductCollectionSection
        title="TOP SELLING"
        products={TOP_SELLING}
        ctaLabel="View All"
      />

      <StyleCategorySection title="BROWSE BY DRESS STYLE" />

      <FeedbackSection reviews={MOCK_REVIEWS.slice(0, 6)} />
    </MainLayout>
  );
};
