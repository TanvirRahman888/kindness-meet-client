
export type PastEvent = {
  id: number;
  title: string;
  category: string;
  description: string;
  date: string;
  location: string;
  image: string;
};

export const pastEvents: PastEvent[] = [
  {
    id: 1,
    title: "Community Food Distribution",
    category: "Food Drive",
    description:
      "Bringing people together to share essential food supplies with families in need.",
    date: "March 15, 2026",
    location: "Dhaka, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    title: "Neighborhood Cleanup Campaign",
    category: "Community Cleanup",
    description:
      "Working together to clean public spaces and encourage a cleaner environment.",
    date: "February 20, 2026",
    location: "Pabna, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1618477462146-050d2767eac4?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    title: "Green Earth Tree Plantation",
    category: "Tree Plantation",
    description:
      "Planting trees and inspiring community members to care for the environment.",
    date: "January 12, 2026",
    location: "Rajshahi, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    title: "Winter Clothing Distribution",
    category: "Winter Clothes Distribution",
    description:
      "Sharing warm clothing with people facing difficult conditions during winter.",
    date: "December 18, 2025",
    location: "Rangpur, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    title: "Community Health Awareness",
    category: "Health Awareness",
    description:
      "Encouraging healthier communities through awareness and local participation.",
    date: "November 10, 2025",
    location: "Khulna, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 6,
    title: "Education Support Initiative",
    category: "Education Support",
    description:
      "Supporting learning opportunities and encouraging children to pursue education.",
    date: "October 5, 2025",
    location: "Sylhet, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1000&q=85",
  },
];
