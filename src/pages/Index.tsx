import { useState, useMemo } from "react";
import { HeroSection } from "@/components/HeroSection";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { ShoppingCart } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-accent" />
            <span className="text-lg font-bold text-foreground">
              Price<span className="text-accent">Peek</span>
            </span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">
            Compare. Choose. Save.
          </span>
        </div>
      </nav>

      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">
              No products found. Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 PricePeek — Prices are indicative and may vary.
      </footer>
    </div>
  );
};

export default Index;
