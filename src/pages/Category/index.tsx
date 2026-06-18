import { Suspense } from "react";
import {
  useLoaderData,
  useSearchParams,
  useLocation,
  Await,
} from "react-router-dom";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { CategoryLayout } from "@/components/templates/CategoryLayout";
import { SidebarFilter } from "@/components/organisms/SidebarFilter";
import { ProductGridHeader } from "@/components/organisms/ProductGridHeader";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { ProductCard } from "@/components/molecules/ProductCard";
import { PaginationBox } from "@/components/organisms/PaginationBox";
import type { CategoryLoaderData } from "./loader";
import "./index.scss";

export const CategoryPage = () => {
  const { products, masterData, sortData } =
    useLoaderData() as CategoryLoaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const sortValue = searchParams.get("sort_by") || "popular";
  const currentPage = Number(searchParams.get("page")) || 1;

  const handleSortChange = (newSort: string) => {
    setSearchParams((prev) => {
      prev.set("sort_by", newSort);
      return prev;
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  const handleApplyFilter = (filters: {
    category_slug?: string;
    colors?: string[];
    sizes?: string[];
    style_slugs?: string[];
    min_price?: number;
    max_price?: number;
  }) => {
    setSearchParams((prev) => {
      prev.delete("page");

      if (filters.category_slug)
        prev.set("category_slug", filters.category_slug);
      else prev.delete("category_slug");

      if (filters.colors?.length) prev.set("colors", filters.colors.join(","));
      else prev.delete("colors");

      if (filters.sizes?.length) prev.set("sizes", filters.sizes.join(","));
      else prev.delete("sizes");

      if (filters.style_slugs?.length)
        prev.set("style_slugs", filters.style_slugs.join(","));
      else prev.delete("style_slugs");

      if (filters.min_price)
        prev.set("min_price", filters.min_price.toString());
      else prev.delete("min_price");

      if (filters.max_price)
        prev.set("max_price", filters.max_price.toString());
      else prev.delete("max_price");

      return prev;
    });
  };

  const activeFilters = {
    category_slug: searchParams.get("category_slug") || undefined,
    colors: searchParams.get("colors")?.split(","),
    sizes: searchParams.get("sizes")?.split(","),
    style_slugs: searchParams.get("style_slugs")?.split(","),
    min_price: searchParams.get("min_price")
      ? Number(searchParams.get("min_price"))
      : undefined,
    max_price: searchParams.get("max_price")
      ? Number(searchParams.get("max_price"))
      : undefined,
  };

  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Casual" }];

  return (
    <main className="category-page">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />

        <CategoryLayout
          sidebar={
            <Suspense
              fallback={<div style={{ padding: 20 }}>Loading filters...</div>}
            >
              <Await resolve={masterData}>
                {([cats, cols, szi, styls]) => (
                  <SidebarFilter
                    categories={cats}
                    colors={cols}
                    sizes={szi}
                    styles={styls}
                    initialFilters={activeFilters}
                    onApplyFilter={handleApplyFilter}
                  />
                )}
              </Await>
            </Suspense>
          }
        >
          <Suspense
            key={location.search}
            fallback={
              <div
                style={{
                  padding: 20,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Loading products...
              </div>
            }
          >
            <Await resolve={products}>
              {({ data, total, lastPage }) => {
                const perPage = 15;
                const showingStart =
                  total === 0 ? 0 : (currentPage - 1) * perPage + 1;
                const showingEnd = Math.min(currentPage * perPage, total);

                return (
                  <>
                    <ProductGridHeader
                      title="Casual"
                      showingStart={showingStart}
                      showingEnd={showingEnd}
                      totalProducts={total}
                      sortOptions={sortData}
                      sortValue={sortValue}
                      onSortChange={handleSortChange}
                      className="category-page__header"
                    />

                    <ProductGrid className="category-page__grid">
                      {data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </ProductGrid>

                    {total > 0 && (
                      <PaginationBox
                        currentPage={currentPage}
                        totalPages={lastPage}
                        onPageChange={handlePageChange}
                        className="category-page__pagination"
                      />
                    )}
                  </>
                );
              }}
            </Await>
          </Suspense>
        </CategoryLayout>
      </div>
    </main>
  );
};
