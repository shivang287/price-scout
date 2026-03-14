import { categories } from "@/data/products";
import { cn } from "@/lib/utils";

type CategoryFilterProps = {
  selected: string;
  onSelect: (cat: string) => void;
};

export const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
            selected === cat
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
