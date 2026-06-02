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
import { Divider } from "@/components/atoms/Divider";
import { BrandLogoBar } from "@/components/molecules/BrandLogoBar";
import "./Home.scss";
import { useProductCollection } from "@/hooks/useProductCollection";
import { useReviews } from "@/hooks/useReviews";

export const HomePage = () => {
  const { products: newArrivals, isLoading: isLoadingNewArrivals } =
    useProductCollection({
      sort_by: "created_at",
      sort_dir: "desc",
      per_page: 4,
    });
  const { products: topSellings, isLoading: isLoadingTopSellings } =
    useProductCollection({
      sort_by: "selling",
      sort_dir: "desc",
      per_page: 4,
    });
  const { reviews: feedBacks, isLoading: isLoadingFeedBacks } = useReviews({
    sort_by: "rating",
    sort_dir: "desc",
    limit: 8,
  });

  return (
    <>
      <BannerSection
        title={HERO_TITLE}
        description={HERO_DESCRIPTION}
        ctaLabel={HERO_CTA}
        stats={HERO_STATS}
        heroImage={HERO_IMAGE}
        effectSrc={HERO_EFFECTS.src}
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
