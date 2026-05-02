export const products = [
  {
    id: 1,
    name: "Edifier R1280DB Powered Bluetooth Bookshelf Speakers",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800"
    ],
    originalPrice: "$149.99",
    salePrice: "$129.99",
    rating: 4.8,
    reviews: 1240,
    availability: "In Stock",
    sku: "EDF-R1280DB-W",
    colorOptions: [
      { name: "Wood", color: "#8B4513" },
      { name: "Black", color: "#000000" },
      { name: "White", color: "#FFFFFF" }
    ],
    sizeOptions: ["Pair"],
    description: "Upgrade your sound with the Edifier R1280DB speakers. These bookshelf speakers feature Bluetooth, optical, and coaxial inputs, delivering studio-quality sound in a sleek, classic design. Perfect for your turntable, PC, or home theater setup.",
    tabs: [
      { id: "description", label: "Description" },
      { id: "details", label: "Details" },
      { id: "reviews", label: "Reviews" }
    ],
    content: [
      {
        id: "description",
        text: `The Edifier R1280DB bookshelf speakers offer a blend of retro aesthetic and modern functionality. With a 4-inch bass driver and a 13mm silk dome tweeter, they deliver a rich, balanced sound profile. Whether you're listening to music, watching movies, or gaming, these speakers provide exceptional clarity and depth.

Equipped with multiple input options including Bluetooth, Optical, and Coaxial, the R1280DB ensures compatibility with a wide range of devices. The side-mounted control panel allows for easy adjustment of bass, treble, and volume, while the included remote control provides convenient operation from a distance.`,
        features: [
          "Bluetooth, Optical, and Coaxial inputs for versatile connectivity.",
          "4-inch bass driver and 13mm silk dome tweeter for balanced sound.",
          "Classic wood finish that complements any decor.",
          "Wireless remote for easy volume and input control.",
          "Calibrated flared bass reflex port for deep, rich bass."
        ]
      },
      {
        id: "details",
        table: [
          { label: "Speaker Type", value: "Bookshelf, Powered" },
          { label: "Connectivity", value: "Bluetooth 5.0, Optical, Coaxial, Dual RCA" },
          { label: "Total Power", value: "42W RMS" },
          { label: "Driver Units", value: "4-inch Bass, 13mm Tweeter" },
          { label: "Frequency Response", value: "55Hz - 20KHz" },
          { label: "Dimensions", value: "5.75 x 9.5 x 7.75 inches" }
        ]
      }
    ]
  }
];

export const productReviews = [
  { user: "Sarah M.", comment: "Amazing sound for the price! Easy to set up and looks great in my living room.", rating: 5 },
  { user: "James K.", comment: "Solid build quality and the Bluetooth connectivity is rock solid.", rating: 4 },
  { user: "Alex P.", comment: "Perfect for my home office. The sound is crystal clear even at high volumes.", rating: 5 }
];

export const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    date: "April 15, 2024",
    excerpt: "Exploring the latest trends in web development, from AI-driven designs to the rise of serverless architecture.",
    author: "Jordan Smith",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    category: "Technology",
  },
  {
    id: 2,
    title: "Mastering UI/UX Design",
    date: "April 10, 2024",
    excerpt: "Essential tips and tricks for creating user-centric designs that provide a seamless experience.",
    author: "Maria Garcia",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
    category: "Design",
  },
  {
    id: 3,
    title: "Securing Your Business in a Digital Age",
    date: "April 5, 2024",
    excerpt: "The importance of robust cybersecurity measures and how to protect your business from cyber threats.",
    author: "David Lee",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    category: "Security",
  }
];
