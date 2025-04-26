const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Products = require("../models/Products");
const cloudinary = require("../config/cloudinary");
const path = require("path");


// Admin user details
const adminUser = {
  name: "Admin",
  username: "admin", // Add this line
  email: "admin@example.com",
  password: "admin123",
  role: "admin",
};


const products = [
  {
    title: "Apple iPhone 13 (128GB) - Blue",
    description:
      "Apple iPhone 13 in excellent condition. Super Retina XDR display with lightning-fast performance.",
    price: 28000,
    category: "Electronics",
    location: "Mumbai, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742368785/i2_j1krvy.jpg"],
  },
  {
    title: "Honda City 2021",
    description:
      "Honda City with great mileage and smooth drive. Automatic transmission and fuel-efficient engine.",
    price: 150000,
    category: "Cars",
    location: "Kerala, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742368765/car1_z57ls1.webp"],
  },
  {
    title: "Samsung Smart TV",
    description:
      "55-inch 4K UHD Smart TV with HDR10+ support. Built-in Alexa and Google Assistant.",
    price: 35000,
    category: "Electronics",
    location: "Chennai, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742368764/tv1_qkgttf.jpg"],
  },
  {
    title: "Apple iPhone 14 (128GB) - Midnight",
    description:
      "Apple iPhone 14 with a 6.1-inch Super Retina XDR display, A15 Bionic chip, and a powerful dual-camera system. 5G-enabled for ultra-fast connectivity. Supports 4K Dolby Vision HDR recording.",
    price: 39999,
    category: "Electronics",
    location: "Mumbai, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742368764/phone2_em5pvq.jpg"],
  },
  {
    title: "Men's Cotton Casual Shirt",
    description:
      "Premium-quality cotton casual shirt for men, perfect for all occasions. Available in multiple colors and sizes. Soft, breathable fabric ensures all-day comfort.",
    price: 600,
    category: "Fashion",
    location: "Delhi, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742368765/shirt1_sh2rmn.jpg"],
  },
  {
    title: "Leather Biker Jacket",
    description:
      "Stylish leather biker jacket with a premium finish. Designed for comfort and durability. Features multiple pockets and a warm inner lining.",
    price: 1500,
    category: "Fashion",
    location: "Bangalore, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742377500/jack1_tcimpp.jpg"],
  },
  {
    title: "3BHK House for Sale in Pune",
    description:
      "Spacious 3BHK independent house in Pune. Located in a prime area with excellent connectivity and amenities. Fully furnished with modular kitchen and parking space.",
    price: 8500000,
    category: "Property",
    location: "Pune, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742377501/home1_p8clvm.webp"],
  },
  {
    title: "Honda Activa 6G Scooter",
    description:
      "Honda Activa 6G in excellent condition. Features a fuel-efficient engine, smooth ride, and comfortable seating. Recently serviced and ready to ride.",
    price: 65000,
    category: "Bikes",
    location: "Chennai, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742377500/scooty1_waiztz.avif"],
  },
  {
    title: "Royal Enfield Classic 350",
    description:
      "Royal Enfield Classic 350 in mint condition. Equipped with a 349cc engine, ABS braking system, and retro-styled design. Perfect for long rides and city commuting.",
    price: 180000,
    category: "Bikes",
    location: "Hyderabad, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742377500/royal1_bzzwmy.jpg"],
  },
  {
    title: "2BHK Apartment in Kolkata",
    description:
      "2BHK apartment available in a gated community with 24/7 security, gym, swimming pool, and clubhouse. Well-ventilated rooms with modern interiors.",
    price: 6000000,
    category: "Property",
    location: "Kolkata, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742377501/2bhk_ky50jy.webp"],
  },
  {
    title: "Wooden Dining Table Set",
    description:
      "6-seater wooden dining table set with a premium teakwood finish. Strong and durable, ideal for family dining. Comes with cushioned chairs.",
    price: 25000,
    category: "Furniture",
    location: "Ahmedabad, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742377500/table1_mxfqvu.jpg"],
  },
  {
    title: "Samsung Galaxy S23 Ultra (256GB) - Green",
    description:
      "Samsung Galaxy S23 Ultra with a 200MP camera, S-Pen support, and 6.8-inch Dynamic AMOLED display. Snapdragon 8 Gen 2 processor for flagship performance.",
    price: 69999,
    category: "Electronics",
    location: "Jaipur, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742377500/s1_cg5rpc.jpg"],
  },
  {
    title: "Modern Sofa Set",
    description:
      "Luxurious 5-seater modern sofa set with high-density foam cushions. Stylish design with premium fabric and sturdy wooden frame. Ideal for living rooms.",
    price: 30000,
    category: "Furniture",
    location: "Surat, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742377501/sofa1_pk4vvk.jpg"],
  },
  {
    title: "Yamaha R15 V4 2022",
    description:
      "Yamaha R15 V4 with ABS braking system and sporty look. Perfect for city and highway rides. Comes with a liquid-cooled, 155cc engine that offers an exhilarating performance.",
    price: 70000,
    category: "Bikes",
    location: "Mumbai, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742959817/y1_fq8zex.webp"],
  },
  {
    title: "Apple MacBook Air M2 2023",
    description:
      "Apple MacBook Air powered by M2 chip with 8GB RAM and 512GB SSD. 13.6-inch Liquid Retina display with true-tone technology. Ideal for productivity and creative tasks.",
    price: 80000,
    category: "Electronic",
    location: "Bangalore, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742959816/macbook1_tws2gq.jpg"],
  },
  {
    title: "Luxury 4BHK Villa in Alibaug",
    description:
      "Luxurious 4BHK villa in Goa with private swimming pool, garden. Ideal for vacation homes and rental properties.",
    price: 15000000,
    category: "Property",
    location: "Alibaug, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742959817/villa1_xrraom.avif"],
  },
  {
    title: "Samsung 55-inch 4K Smart TV",
    description:
      "Samsung Ultra HD Smart TV with crystal-clear resolution and Dolby Atmos sound system. Built-in OTT apps for streaming movies and TV shows.",
    price: 60000,
    category: "Electronics",
    location: "Bangalore, India",
    images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1742959816/tv2_hjxdg5.jpg"],
  },  
    {
      title: "Vintage Leather Messenger Bag",
      description:
        "Handcrafted genuine leather messenger bag with a timeless vintage design. Features multiple compartments including a padded laptop sleeve that fits up to 15.6-inch devices. The adjustable shoulder strap and ergonomic design ensure comfort even during long commutes. The premium full-grain leather develops a beautiful patina over time, making each bag uniquely yours. Perfect for professionals, students, and travelers who appreciate quality craftsmanship and functional design. Includes a lifetime warranty against manufacturing defects.",
      price: 999,
      category: "Fashion",
      location: "Jaipur, India",
      images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1743671333/bag1_f6qv4n.webp"], // You'll add image links later
    },
    
    {
      title: "Professional DSLR Camera Kit",
      description:
        "Complete professional photography kit featuring a high-end DSLR camera with 45.7MP full-frame sensor. The package includes three premium lenses: a 24-70mm f/2.8 for versatile shooting, a 70-200mm f/2.8 telephoto for portraits and distant subjects, and a 14-24mm f/2.8 ultra-wide for landscapes and architecture. The camera boasts exceptional low-light performance with ISO range of 64-25,600 (expandable to 102,400), 4K UHD video recording at 60fps, and a sophisticated 153-point autofocus system. Also included are two professional-grade flash units, a sturdy carbon fiber tripod, six extra batteries, multiple memory cards totaling 512GB storage, and a weather-resistant camera bag. Perfect for professional photographers or serious enthusiasts looking to elevate their photography to the next level.",
      price: 125000,
      category: "Electronics",
      location: "Delhi, India",
      images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1743671333/c1_ggjduq.jpg"], // You'll add image links later
    },
    
    {
      title: "Luxury Penthouse with Sea View",
      description:
        "Exquisite 4-bedroom penthouse spanning 4,500 sq. ft. with breathtaking panoramic sea views from every room. This architectural masterpiece features floor-to-ceiling windows, Italian marble flooring, and a private rooftop infinity pool. The gourmet kitchen is equipped with top-of-the-line appliances, custom cabinetry, and a large center island with breakfast bar. The master suite includes a spa-like bathroom with jacuzzi, steam shower, and walk-in closet. Additional amenities include a home theater room, wine cellar, smart home automation system, and a spacious terrace perfect for entertaining. The building offers 24/7 concierge service, valet parking, fitness center, spa, and direct beach access. Located in the most prestigious neighborhood with proximity to fine dining, luxury shopping, and cultural attractions. A rare opportunity to own one of the most coveted properties in the city.",
      price: 25000000,
      category: "Property",
      location: "Mumbai, India",
      images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1743671331/pent1_oed4rd.jpg"], // You'll add image links later
    },
    
    {
      title: "Handcrafted Teak Wood Bookshelf",
      description:
        "Meticulously handcrafted bookshelf made from sustainable teak wood by master artisans. This heirloom-quality piece features intricate hand-carved details inspired by traditional Indian motifs. Standing at 7 feet tall and 4 feet wide, the bookshelf offers ample storage with adjustable shelves to accommodate books and collectibles of various sizes. The natural wood grain is enhanced with a hand-rubbed oil finish that protects the wood while highlighting its natural beauty. The solid construction ensures stability and durability for generations to come. Each shelf is designed to prevent sagging even when fully loaded with heavy books. The bookshelf is constructed using traditional joinery techniques without nails or screws, showcasing exceptional craftsmanship. A statement piece that adds warmth and character to any home library, living room, or office space. Comes with a 25-year warranty and free white-glove delivery service.",
      price: 9000,
      category: "Furniture",
      location: "Kerala, India",
      images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1743671332/shelf1_e98oy4.jpg"], // You'll add image links later
    },
    
    {
      title: "Ducati Panigale V4 S 2023",
      description:
        "Experience the pinnacle of Italian motorcycle engineering with this immaculate Ducati Panigale V4 S. Powered by a 1,103cc Desmosedici Stradale V4 engine producing 214 hp and 124 Nm of torque, this superbike delivers breathtaking acceleration and a top speed exceeding 300 km/h. The electronic package includes cornering ABS, traction control, wheelie control, slide control, and multiple riding modes all managed through a 5-inch TFT display. The Öhlins NIX-30 front forks and TTX36 rear shock feature the second-generation Öhlins Smart EC 2.0 system with event-based control mode. Brembo Stylema monobloc calipers provide exceptional stopping power. The aerodynamic carbon fiber bodywork is finished in the iconic Ducati Red with minimal mileage of just 1,200 km. All service records are available, and the bike has never been raced or dropped. Includes additional carbon fiber accessories worth over ₹2 lakh. A rare opportunity to own one of the most advanced production motorcycles ever created.",
      price: 200000,
      category: "Bikes",
      location: "Bangalore, India",
      images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1743671331/du1_g5hy0r.jpg"], // You'll add image links later
    },
    
    {
      title: "Antique Brass Telescope with Wooden Tripod",
      description:
        "Exquisite fully-functional antique-style brass telescope with genuine optical glass lenses providing 25x magnification. This collector's piece is handcrafted using traditional techniques and features a 42mm objective lens for clear, bright images of celestial objects. The telescope body is made from solid brass with a beautiful aged patina finish and extends from 15 inches to 38 inches. It comes mounted on an adjustable hardwood tripod with brass fittings that can be positioned at various heights between 36 and 57 inches. The precision rack-and-pinion focusing mechanism allows for smooth and accurate adjustments. Decorative engravings adorn the main tube, adding to its vintage appeal. Perfect for amateur astronomy, nautical decor, or as a sophisticated decorative piece in a study or library. Each telescope is individually numbered and comes with a certificate of authenticity.",
      price: 18500,
      category: "Others",
      location: "Chennai, India",
      images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1743671332/tele1_ogidjw.webp"], // You'll add image links later
    },
    
    {
      title: "Luxury Swiss Automatic Watch",
      description:
        "Prestigious Swiss-made automatic watch featuring a 41mm case crafted from 18K rose gold with sapphire crystal on both front and exhibition caseback. The intricate in-house movement boasts 27 jewels, a 72-hour power reserve, and is meticulously hand-finished with Geneva stripes, perlage, and anglage. The deep blue sunburst dial features applied gold indices, luminous hands, and a subtle date window at 6 o'clock. The watch is water-resistant to 100 meters and comes on a hand-stitched alligator leather strap with a matching 18K rose gold deployant clasp. Each timepiece undergoes rigorous testing for precision and reliability, certified by COSC as a chronometer. Presented in a luxurious wooden box with all documentation, including a certificate of authenticity, instruction manual, and international 5-year warranty. A masterpiece of horological craftsmanship that will be treasured for generations.",
      price: 950000,
      category: "Others",
      location: "Delhi, India",
      images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1743671332/w1_kpkmws.jpg"], // You'll add image links later
    },
    
    {
      title: "Professional DJ Equipment Complete Setup",
      description:
        "Comprehensive professional DJ setup featuring top-of-the-line equipment ready for club performances or professional events. The package includes two industry-standard CDJ-3000 multi-players with high-resolution displays and enhanced performance features, a DJM-900NXS2 4-channel mixer with built-in sound card and effects, and a pair of reference-quality HDJ-X10 headphones. Also included are two powerful 15-inch active PA speakers with 2000W total output, a 18-inch active subwoofer for earth-shaking bass, all necessary cables and connectors, a professional DJ booth with integrated LED lighting system, and a custom flight case for safe transportation. The setup comes with professional DJ software license and a 1TB SSD loaded with a curated collection of tracks across various genres. Perfect for professional DJs, event companies, or venues looking for a complete turnkey solution. All equipment is in pristine condition with less than 100 hours of use and includes original packaging and documentation.",
      price: 650000,
      category: "Others",
      location: "Mumbai, India",
      images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1743671332/dj1_bamghy.webp"], // You'll add image links later
    },
    
    {
      title: "Handwoven Persian Silk Carpet",
      description:
        "Exquisite museum-quality Persian silk carpet handwoven by master artisans using techniques passed down through generations. This magnificent 9' x 12' masterpiece features an intricate floral medallion design with over 600 knots per square inch, representing thousands of hours of meticulous craftsmanship. The carpet is made from the finest natural silk, known for its lustrous sheen that changes appearance when viewed from different angles. The rich color palette includes deep burgundy, royal blue, emerald green, and gold, all derived from traditional vegetable dyes that will retain their vibrancy for decades. The border showcases elaborate calligraphy and geometric patterns that frame the central design. This heirloom-quality piece comes with documentation verifying its authenticity, origin, and craftsmanship. A true work of art that will transform any space while appreciating in value over time. Includes professional cleaning service and custom-made protective underlay.",
      price: 750000,
      category: "Others",
      location: "Hyderabad, India",
      images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1743671333/ct1_okgeky.webp"], // You'll add image links later
    },
    {
      title: "Designer Silk Evening Gown",
      description:
        "Exquisite hand-embroidered silk evening gown created by a renowned fashion designer. This floor-length masterpiece features intricate beadwork with over 5,000 individually sewn crystals and pearls that catch the light with every movement. The fitted bodice transitions into a flowing A-line silhouette with a subtle train, creating a flattering shape for any figure. The deep midnight blue color is achieved through a traditional dyeing process that produces a multidimensional sheen. The back features an elegant keyhole design with covered buttons and hidden zipper. The gown is fully lined with premium silk for comfort against the skin. Each dress is made to order with customizable measurements and takes over 300 hours of skilled craftsmanship to complete. Perfect for galas, award ceremonies, or any special occasion requiring the ultimate in luxury and sophistication. Includes a custom garment bag for storage and a certificate of authenticity from the designer.",
      price: 1000,
      category: "Fashion",
      location: "Mumbai, India",
      images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1743671331/gown1_r9yuxs.jpg"], // You'll add image links later
    },
    {
      title: "Handcrafted Pashmina Shawl",
      description:
        "Luxurious authentic Pashmina shawl handwoven by master artisans in Kashmir using traditional techniques passed down through generations. This exceptional piece is crafted from the finest grade of Pashmina wool, harvested from the underbelly of Himalayan mountain goats at elevations above 14,000 feet. The incredibly soft fibers, measuring just 12-16 microns in diameter, are hand-spun and then woven on traditional wooden looms to create a fabric of unparalleled softness and warmth despite its lightweight nature. The shawl features an intricate paisley pattern that took over four months to complete, with delicate embroidery work covering nearly the entire surface. The rich burgundy base color is achieved using natural dyes derived from walnut shells and pomegranate rinds. Measuring 2 meters by 1 meter, this versatile accessory can be worn as a wrap, scarf, or draped over evening wear. Each shawl comes with a certificate of authenticity and a handcrafted wooden storage box lined with silk.",
      price: 30000,
      category: "Fashion",
      location: "Kashmir, India",
      images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1743671332/sl1_ultjwt.webp"], // You'll add image links later
    },
    {
      title: "Limited Edition Graphic Designer T-Shirt",
      description:
        "Exclusive limited-edition graphic t-shirt created in collaboration with an internationally acclaimed visual artist. This collector's item features an intricate hand-drawn design that combines elements of street art, traditional Indian motifs, and contemporary digital aesthetics, screen-printed using specialized eco-friendly inks that maintain their vibrancy even after numerous washes. The shirt itself is crafted from premium organic cotton with a perfect 180 GSM weight that provides exceptional comfort while maintaining structure and durability. The custom-developed fabric undergoes a proprietary pre-washing process that ensures a soft hand feel from the first wear with minimal shrinkage. Each shirt features hand-numbered limited edition details discreetly printed on the inner hem, along with the artist's signature. The relaxed contemporary fit is designed to flatter all body types while providing unrestricted movement. Available in sizes XS to 3XL, each shirt comes packaged in a custom-designed reusable wooden box with a certificate of authenticity and an exclusive art print suitable for framing. Only 500 pieces have been produced worldwide, making this a true collector's item for fashion and art enthusiasts alike.",
      price: 2500,
      category: "Fashion",
      location: "Delhi, India",
      images: ["https://res.cloudinary.com/da8jr5gfa/image/upload/v1743671331/tshirt1_ckteyv.avif"], // You'll add image links later
    }
];

const seedDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/olx", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    await User.deleteMany({});
    await Products.deleteMany({});
  
    // Hash admin password
    const salt = await bcrypt.genSalt(10);
    adminUser.password = await bcrypt.hash(adminUser.password, salt);

    // Create Admin User
  await User.create(adminUser);
  console.log("Admin user added successfully!");

    // Clear existing data
    await Products.deleteMany({});
    console.log("🗑️ All existing products deleted.");

    // Insert new product data
    await Products.insertMany(products);
    console.log("🌱 Database seeded with sample products.");

    // Close connection
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error while seeding:", error);
    mongoose.connection.close();
  }
};

// ✅ Wrap it in an IIFE (Immediately Invoked Function Expression)
(async () => {
  await seedDB();
})();