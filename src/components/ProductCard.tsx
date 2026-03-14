import { motion } from "framer-motion";
import { Product, PriceEntry, platformMeta } from "@/data/products";
import { PlatformBadge } from "./PlatformBadge";
import { TrendingDown, Clock, ExternalLink, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const getBestPrice = (prices: PriceEntry[]) => {
  const inStock = prices.filter((p) => p.inStock);
  if (inStock.length === 0) return null;
  return inStock.reduce((a, b) => (a.price < b.price ? a : b));
};

const getSavingsPercent = (entry: PriceEntry) => {
  if (!entry.originalPrice) return 0;
  return Math.round(((entry.originalPrice - entry.price) / entry.originalPrice) * 100);
};

export const ProductCard = ({ product }: { product: Product }) => {
  const best = getBestPrice(product.prices);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({ title: "Added to cart", description: `${product.name} added to your cart.` });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group rounded-2xl border border-border bg-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 bg-secondary/50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {best && (
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
            <TrendingDown className="h-3 w-3" />
            Best: ₹{best.price}
          </div>
        )}
        <span className="absolute top-3 right-3 rounded-full bg-card/80 backdrop-blur-sm px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {product.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-card-foreground leading-tight line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {product.brand} · {product.unit}
          </p>
        </div>

        {/* Price rows */}
        <div className="space-y-2">
          {product.prices.map((entry) => {
            const isBest = best?.platform === entry.platform && entry.inStock;
            const savings = getSavingsPercent(entry);

            return (
              <div
                key={entry.platform}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                  isBest
                    ? "bg-accent/10 ring-1 ring-accent/30"
                    : "bg-secondary/50"
                } ${!entry.inStock ? "opacity-50" : ""}`}
              >
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <PlatformBadge platform={entry.platform} />
                </a>

                <div className="flex items-center gap-2">
                  {entry.inStock ? (
                    <>
                      <div className="text-right">
                        <span className="font-bold text-card-foreground">
                          ₹{entry.price}
                        </span>
                        {entry.originalPrice && (
                          <span className="ml-1 text-xs text-muted-foreground line-through">
                            ₹{entry.originalPrice}
                          </span>
                        )}
                      </div>
                      {savings > 0 && (
                        <span className="rounded-md bg-deal/15 px-1.5 py-0.5 text-[10px] font-bold text-deal">
                          -{savings}%
                        </span>
                      )}
                      <div className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                        <Clock className="h-2.5 w-2.5" />
                        {entry.deliveryTime}
                      </div>
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 transition-colors"
                        title={`Buy on ${platformMeta[entry.platform].label}`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      Out of stock
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add to Cart */}
        <Button onClick={handleAddToCart} className="w-full gap-2" size="sm">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};
