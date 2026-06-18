import { useState } from "react";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { CategoryLayout } from "@/components/templates/CategoryLayout";
import { SidebarFilter } from "@/components/organisms/SidebarFilter";
import { ProductGridHeader } from "@/components/organisms/ProductGridHeader";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { ProductCard } from "@/components/molecules/ProductCard";
import { PaginationBox } from "@/components/organisms/PaginationBox";
import { mockProducts, mockSortOptions } from "./mockData";
import "./index.scss";

export const CategoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setSortValue] = useState("popular");

  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Casual" }];

  return (
    <main className="category-page">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />

        <CategoryLayout sidebar={<SidebarFilter />}>
          <ProductGridHeader
            title="Casual"
            showingStart={1}
            showingEnd={10}
            totalProducts={100}
            sortOptions={mockSortOptions}
            sortValue={sortValue}
            onSortChange={setSortValue}
            className="category-page__header"
          />

          <ProductGrid className="category-page__grid">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>

          <PaginationBox
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
            className="category-page__pagination"
          />
        </CategoryLayout>
      </div>
    </main>
  );
};
