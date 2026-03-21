import carSeatImg from "@/assets/car-seat.jpg";
import babyDressImg from "@/assets/baby-dress-model.jpg";
import babyRompersImg from "@/assets/baby-rompers.jpg";
import woodenBlocksImg from "@/assets/wooden-blocks.jpg";
import toddlerSneakersImg from "@/assets/toddler-sneakers.jpg";
import babyBouncerImg from "@/assets/baby-bouncer.jpg";
import kidsBooksImg from "@/assets/kids-books.jpg";
import plushToyImg from "@/assets/plush-toy.jpg";

export type ListingCondition = "Like New" | "Gently Used" | "Well Loved";
export type ListingCategory = "Clothes" | "Shoes" | "Toys" | "Gear" | "Books";
export type AgeRange = "0-6m" | "6-12m" | "1-3y" | "4-6y" | "7y+";
export type EscrowStatus = "Available" | "Paid (In Escrow)" | "Shipped" | "Received/Released" | "Completed" | "Sold";

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ListingCategory;
  ageRange: AgeRange;
  condition: ListingCondition;
  images: string[];
  sellerName: string;
  sellerRating: number;
  sellerLocation: string;
  createdAt: string;
  isGiftItForward: boolean;
}

export const mockListings: Listing[] = [
  {
    id: "1",
    title: "Baby Girl Floral Dress Set",
    description: "Beautiful floral dress with matching headband. Worn only twice for photos. Perfect condition!",
    price: 3500,
    category: "Clothes",
    ageRange: "6-12m",
    condition: "Like New",
    images: [babyDressImg],
    sellerName: "Mama Adaeze",
    sellerRating: 4.8,
    sellerLocation: "Lagos, Lekki",
    createdAt: "2026-03-17",
    isGiftItForward: false,
  },
  {
    id: "2",
    title: "Wooden Stacking Blocks Set",
    description: "Educational wooden blocks, 24 pieces. Great for motor skills development. Minor scratches.",
    price: 2000,
    category: "Toys",
    ageRange: "1-3y",
    condition: "Gently Used",
    images: [woodenBlocksImg],
    sellerName: "Daddy Emeka",
    sellerRating: 4.5,
    sellerLocation: "Abuja, Wuse",
    createdAt: "2026-03-16",
    isGiftItForward: false,
  },
  {
    id: "3",
    title: "Toddler Sneakers – Size 22",
    description: "Nike toddler sneakers, barely worn. My son outgrew them in 2 weeks!",
    price: 4500,
    category: "Shoes",
    ageRange: "1-3y",
    condition: "Like New",
    images: [toddlerSneakersImg],
    sellerName: "Mama Chisom",
    sellerRating: 5.0,
    sellerLocation: "Lagos, Ikeja",
    createdAt: "2026-03-15",
    isGiftItForward: false,
  },
  {
    id: "4",
    title: "Baby Bouncer – FREE!",
    description: "Still works perfectly! We just don't need it anymore. Giving back to the community 💚",
    price: 0,
    category: "Gear",
    ageRange: "0-6m",
    condition: "Well Loved",
    images: [babyBouncerImg],
    sellerName: "Mama Ngozi",
    sellerRating: 4.9,
    sellerLocation: "Port Harcourt",
    createdAt: "2026-03-18",
    isGiftItForward: true,
  },
  {
    id: "5",
    title: "Children's Picture Book Bundle",
    description: "Set of 8 children's picture books. Some have minor page bends but all are readable.",
    price: 1500,
    category: "Books",
    ageRange: "4-6y",
    condition: "Gently Used",
    images: [kidsBooksImg],
    sellerName: "Uncle Bayo",
    sellerRating: 4.3,
    sellerLocation: "Ibadan",
    createdAt: "2026-03-14",
    isGiftItForward: false,
  },
  {
    id: "6",
    title: "Baby Romper Pack (3 pieces)",
    description: "Cute cotton rompers in neutral colors. Perfect for newborns. Washed and ready to go!",
    price: 0,
    category: "Clothes",
    ageRange: "0-6m",
    condition: "Gently Used",
    images: [babyRompersImg],
    sellerName: "Mama Funke",
    sellerRating: 4.7,
    sellerLocation: "Lagos, Surulere",
    createdAt: "2026-03-13",
    isGiftItForward: true,
  },
  {
    id: "7",
    title: "Baby Car Seat (0-12 months)",
    description: "Barely used car seat. No accidents, no stains. Clean and safe for your little one.",
    price: 5000,
    category: "Gear",
    ageRange: "0-6m",
    condition: "Like New",
    images: [carSeatImg],
    sellerName: "Daddy Tunde",
    sellerRating: 4.6,
    sellerLocation: "Lagos, Victoria Island",
    createdAt: "2026-03-12",
    isGiftItForward: false,
  },
  {
    id: "8",
    title: "Peppa Pig Plush Toy",
    description: "Medium-sized Peppa Pig plush. Been through a lot of cuddles but still has life in her!",
    price: 800,
    category: "Toys",
    ageRange: "1-3y",
    condition: "Well Loved",
    images: [plushToyImg],
    sellerName: "Mama Kemi",
    sellerRating: 4.4,
    sellerLocation: "Enugu",
    createdAt: "2026-03-11",
    isGiftItForward: false,
  },
];

export const categories: ListingCategory[] = ["Clothes", "Shoes", "Toys", "Gear", "Books"];
export const ageRanges: AgeRange[] = ["0-6m", "6-12m", "1-3y", "4-6y", "7y+"];
export const locations = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Enugu", "Kano"];
