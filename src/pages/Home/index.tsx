import { Suspense } from "react";
import { useLoaderData, Await, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";
import { BannerSection } from "@/components/organisms/BannerSection";
import { ProductCollectionSection } from "@/components/organisms/ProductCollectionSection";
import { StyleCategorySection } from "@/components/organisms/StyleCategorySection";
import { FeedbackSection } from "@/components/organisms/FeedbackSection";
import { ProductCard } from "@/components/molecules/ProductCard";
import { ProductCardSkeleton } from "@/components/molecules/ProductCardSkeleton";
import { ReviewCard } from "@/components/molecules/ReviewCard";
import { ReviewCardSkeleton } from "@/components/molecules/ReviewCardSkeleton";
import { FEEDBACK_CONSTS } from "@/consts/feedback";
import {
  HERO_TITLE,
  HERO_DESCRIPTION,
  HERO_CTA,
  HERO_IMAGE,
  HERO_STATS,
  HERO_EFFECTS,
} from "@/consts/homeData";
import { BrandLogoBar } from "@/components/molecules/BrandLogoBar";
import type { HomeLoaderData } from "./loader";
import type { ProductCardData } from "@/types/product";
import type { ReviewData } from "@/types/review";
import "./index.scss";

// Utility component to render a list of skeletons
const ProductCardSkeletonList = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <li key={i} className="product-collection__item">
        <ProductCardSkeleton />
      </li>
    ))}
  </>
);

export const HomePage = () => {
  const { newArrivals, topSellings, reviews } =
    useLoaderData() as HomeLoaderData;
  const navigate = useNavigate();

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

      <div className="container">
        <ProductCollectionSection className="home__product-collection">
          <ProductCollectionSection.Header title="NEW ARRIVALS" />
          <ErrorBoundary onReset={() => navigate(0)}>
            <ProductCollectionSection.Content>
              <Suspense fallback={<ProductCardSkeletonList count={4} />}>
                <Await resolve={newArrivals}>
                  {(resolvedNewArrivals) =>
                    (resolvedNewArrivals as ProductCardData[]).map(
                      (product) => (
                        <li
                          key={product.id}
                          className="product-collection__item"
                        >
                          <ProductCard product={product} />
                        </li>
                      ),
                    )
                  }
                </Await>
              </Suspense>
            </ProductCollectionSection.Content>
            <ProductCollectionSection.Footer label="View All" />
          </ErrorBoundary>
        </ProductCollectionSection>

        <ProductCollectionSection>
          <ProductCollectionSection.Header title="TOP SELLING" />
          <ErrorBoundary onReset={() => navigate(0)}>
            <ProductCollectionSection.Content>
              <Suspense fallback={<ProductCardSkeletonList count={4} />}>
                <Await resolve={topSellings}>
                  {(resolvedTopSellings) =>
                    (resolvedTopSellings as ProductCardData[]).map(
                      (product) => (
                        <li
                          key={product.id}
                          className="product-collection__item"
                        >
                          <ProductCard product={product} />
                        </li>
                      ),
                    )
                  }
                </Await>
              </Suspense>
            </ProductCollectionSection.Content>
            <ProductCollectionSection.Footer label="View All" />
          </ErrorBoundary>
        </ProductCollectionSection>

        <StyleCategorySection title="BROWSE BY DRESS STYLE" />
      </div>

      <FeedbackSection>
        <FeedbackSection.Header title={FEEDBACK_CONSTS.DEFAULT_TITLE} />
        <ErrorBoundary className="error-boundary--center" onReset={() => navigate(0)}>
          <FeedbackSection.Content>
            <Suspense
              fallback={Array.from({
                length: FEEDBACK_CONSTS.SKELETON_COUNT,
              }).map((_, i) => (
                <li key={`skeleton-${i}`}>
                  <ReviewCardSkeleton showDate={false} />
                </li>
              ))}
            >
              <Await resolve={reviews}>
                {(resolvedReviews) =>
                  (resolvedReviews as ReviewData[]).map((review) => (
                    <li key={review.id}>
                      <ReviewCard review={review} showDate={false} />
                    </li>
                  ))
                }
              </Await>
            </Suspense>
          </FeedbackSection.Content>
        </ErrorBoundary>
      </FeedbackSection>
    </main>
  );
};
