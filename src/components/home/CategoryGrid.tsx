import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types/database.types";

interface Props {
  categories: Pick<Category, "slug" | "name" | "image_url" | "description">[];
}

export default function CategoryGrid({ categories }: Props) {
  return (
    <section className="py-20 container mx-auto px-6">
      <div className="text-center mb-14">
        <p className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
          Explore
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-brand-deep">
          Shop by Category
        </h2>
        <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className="group relative overflow-hidden rounded-2xl aspect-[3/4] block"
            aria-label={`Browse ${cat.name} collection`}
          >
            {cat.image_url ? (
              <Image
                src={cat.image_url}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-brand-rose" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-serif text-xl text-white font-bold">
                {cat.name}
              </h3>
              {cat.description && (
                <p className="text-white/60 text-[10px] mt-1 line-clamp-1">
                  {cat.description}
                </p>
              )}
              <p className="text-brand-gold-light text-[10px] font-bold uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Shop Now →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
