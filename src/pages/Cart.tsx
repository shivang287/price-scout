import { useCart } from "@/contexts/CartContext";
import { Platform, platformMeta } from "@/data/products";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type PlatformTotal = {
  platform: Platform;
  total: number;
  originalTotal: number;
  allInStock: boolean;
  unavailableCount: number;
  fastestDelivery: string | null;
};

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const platformTotals: PlatformTotal[] = (["blinkit", "amazon", "flipkart"] as Platform[]).map(
    (platform) => {
      let total = 0;
      let originalTotal = 0;
      let unavailableCount = 0;
      let fastestDelivery: string | null = null;

      items.forEach(({ product, quantity }) => {
        const entry = product.prices.find((p) => p.platform === platform);
        if (!entry || !entry.inStock) {
          unavailableCount++;
          return;
        }
        total += entry.price * quantity;
        originalTotal += (entry.originalPrice ?? entry.price) * quantity;

        // Parse delivery time for comparison
        if (entry.deliveryTime && entry.deliveryTime !== "N/A") {
          if (!fastestDelivery) fastestDelivery = entry.deliveryTime;
          else {
            const getMinutes = (t: string) => {
              if (t.includes("min")) return parseInt(t);
              if (t.includes("day")) return parseInt(t) * 24 * 60;
              return 99999;
            };
            if (getMinutes(entry.deliveryTime) < getMinutes(fastestDelivery)) {
              fastestDelivery = entry.deliveryTime;
            }
          }
        }
      });

      return {
        platform,
        total,
        originalTotal,
        allInStock: unavailableCount === 0,
        unavailableCount,
        fastestDelivery,
      };
    }
  );

  const bestPlatform = platformTotals
    .filter((p) => p.total > 0)
    .reduce<PlatformTotal | null>(
      (best, curr) => (!best || curr.total < best.total ? curr : best),
      null
    );

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ShoppingCart className="h-5 w-5 text-accent" />
              <span className="text-lg font-bold text-foreground">Price<span className="text-accent">Peek</span></span>
            </button>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center py-32 px-4">
          <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add products to compare cart totals across platforms</p>
          <Button onClick={() => navigate("/")}>Browse Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ShoppingCart className="h-5 w-5 text-accent" />
            <span className="text-lg font-bold text-foreground">Price<span className="text-accent">Peek</span></span>
          </button>
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive hover:text-destructive">
            Clear Cart
          </Button>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </button>

        <h1 className="text-2xl font-bold text-foreground mb-6">
          Your Cart ({items.reduce((s, i) => s + i.quantity, 0)} items)
        </h1>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Cart items */}
          <div className="lg:col-span-3 space-y-3">
            {items.map(({ product, quantity }) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-4 rounded-xl border border-border bg-card p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground text-sm line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">{product.brand} · {product.unit}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                    >
                      <Minus className="h-3 w-3 text-secondary-foreground" />
                    </button>
                    <span className="text-sm font-medium text-card-foreground w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                    >
                      <Plus className="h-3 w-3 text-secondary-foreground" />
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(product.id)} className="text-muted-foreground hover:text-destructive transition-colors self-start">
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Platform comparison */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-lg font-bold text-foreground">Cart Total by Platform</h2>
            {platformTotals.map((pt) => {
              const meta = platformMeta[pt.platform];
              const isBest = bestPlatform?.platform === pt.platform;
              const savings = pt.originalTotal > pt.total ? pt.originalTotal - pt.total : 0;

              return (
                <motion.div
                  key={pt.platform}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl border p-4 transition-all ${
                    isBest
                      ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          pt.platform === "blinkit" ? "bg-blinkit/20" :
                          pt.platform === "amazon" ? "bg-amazon/20" :
                          "bg-flipkart/20"
                        } text-foreground`}
                      >
                        <span>{meta.icon}</span>
                        {meta.label}
                      </span>
                      {isBest && (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                          BEST PRICE
                        </span>
                      )}
                    </div>
                  </div>

                  {pt.total > 0 ? (
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-card-foreground">₹{pt.total}</span>
                        {savings > 0 && (
                          <span className="text-xs text-deal font-semibold">Save ₹{savings}</span>
                        )}
                      </div>
                      {pt.unavailableCount > 0 && (
                        <p className="text-xs text-destructive">
                          {pt.unavailableCount} item{pt.unavailableCount > 1 ? "s" : ""} unavailable
                        </p>
                      )}
                      {pt.fastestDelivery && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          {pt.fastestDelivery.includes("min") ? (
                            <Truck className="h-3 w-3 text-accent" />
                          ) : (
                            <Clock className="h-3 w-3" />
                          )}
                          <span>
                            {pt.fastestDelivery.includes("min") ? "Fast delivery: " : "Delivery: "}
                            {pt.fastestDelivery}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">All items unavailable</p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
