export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          city: string | null;
          state: string | null;
          pincode: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      categories: {
        Row: {
          id: number;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          meta_title: string | null;
          meta_description: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["categories"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          price: number;
          compare_price: number | null;
          category_id: number | null;
          stock: number;
          is_new: boolean;
          is_featured: boolean;
          rating: number;
          review_count: number;
          tags: string[] | null;
          meta_title: string | null;
          meta_description: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      product_images: {
        Row: {
          id: number;
          product_id: string;
          url: string;
          alt: string | null;
          position: number;
        };
        Insert: Omit<Database["public"]["Tables"]["product_images"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["product_images"]["Insert"]>;
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          status: string;
          total: number;
          shipping_address: Json | null;
          payment_id: string | null;
          razorpay_order_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      order_items: {
        Row: {
          id: number;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Insert: Omit<Database["public"]["Tables"]["order_items"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["order_items"]["Insert"]>;
      };
      reviews: {
        Row: {
          id: number;
          product_id: string;
          user_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["reviews"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["reviews"]["Insert"]>;
      };
    };
  };
}

// Convenience aliases
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductImage = Database["public"]["Tables"]["product_images"]["Row"];
export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

// Extended types with joined data
export type ProductWithImages = Product & {
  product_images: ProductImage[];
  categories: Pick<Category, "slug" | "name"> | null;
};

export type ProductCard = Pick<Product, "id" | "name" | "slug" | "price" | "compare_price" | "rating" | "is_new"> & {
  product_images: Pick<ProductImage, "url" | "alt">[];
  categories: Pick<Category, "slug" | "name"> | null;
};
