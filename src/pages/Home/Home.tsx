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
  HERO_EFFECTS,
} from "@/consts/homeData";
import { BrandLogoBar } from "@/components/molecules/BrandLogoBar";
import { SectionStateWrapper } from "@/components/molecules/SectionStateWrapper";
import "./Home.scss";
import { useProductCollection } from "@/hooks/useProductCollection";
import { useReviews } from "@/hooks/useReviews";

export const HomePage = () => {
  const {
    products: newArrivals,
    isLoading: isLoadingNewArrivals,
    error: newArrivalsError,
    isRetryable: newArrivalsRetryable,
    retry: retryNewArrivals,
  } = useProductCollection({
    sort_by: "created_at",
    sort_dir: "desc",
    per_page: 4,
  });

  const {
    products: topSellings,
    isLoading: isLoadingTopSellings,
    error: topSellingsError,
    isRetryable: topSellingsRetryable,
    retry: retryTopSellings,
  } = useProductCollection({
    sort_by: "selling",
    sort_dir: "desc",
    per_page: 4,
  });

  const {
    reviews: feedBacks,
    isLoading: isLoadingFeedBacks,
    error: feedBacksError,
    isRetryable: feedBacksRetryable,
    retry: retryFeedBacks,
  } = useReviews({
    sort_by: "rating",
    sort_dir: "desc",
    limit: 8,
  });

  return (
    <main>
      <BannerSection
        title={HERO_TITLE}
        description={HERO_DESCRIPTION}
        ctaLabel={HERO_CTA}
        stats={HERO_STATS}
        heroImage={HERO_IMAGE}
        effectSrc={HERO_EFFECTS.src}
      />

      <BrandLogoBar className="home__brand-logo" />

      <div className="container home__main-container">
        <SectionStateWrapper
          isLoading={isLoadingNewArrivals}
          loadingMessage="Loading new arrivals..."
          error={newArrivalsError}
          isRetryable={newArrivalsRetryable}
          onRetry={retryNewArrivals}
        >
          <ProductCollectionSection
            className="home__divider-bottom"
            title="NEW ARRIVALS"
            products={newArrivals}
            ctaLabel="View All"
            showArrows={false}
          />
        </SectionStateWrapper>

        <SectionStateWrapper
          isLoading={isLoadingTopSellings}
          loadingMessage="Loading top selling..."
          error={topSellingsError}
          isRetryable={topSellingsRetryable}
          onRetry={retryTopSellings}
        >
          <ProductCollectionSection
            title="TOP SELLING"
            products={topSellings}
            ctaLabel="View All"
            showArrows={false}
          />
        </SectionStateWrapper>

        <StyleCategorySection title="BROWSE BY DRESS STYLE" />
      </div>

      <SectionStateWrapper
        isLoading={isLoadingFeedBacks}
        loadingMessage="Loading reviews..."
        error={feedBacksError}
        isRetryable={feedBacksRetryable}
        onRetry={retryFeedBacks}
      >
        <FeedbackSection reviews={feedBacks} />
      </SectionStateWrapper>
    </main>
  );
};
