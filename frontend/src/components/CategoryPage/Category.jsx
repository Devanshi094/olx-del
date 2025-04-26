import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import Car from "./Car";
import Property from "./Property";
import Mobile from "./Mobile";
import Bikes from "./Bikes";
import Books from "./Books";
import Furniture from "./Furniture";
import Electronics from "./Electronic";
import Fashion from "./Fashion";

const categories = [
  { name: "Cars", icon: "🚗", subcategories: ["Cars"] },
  { name: "Properties", icon: "🏠", subcategories: ["For Sale: Houses & Apartments"] },
  { name: "Mobiles", icon: "📱", subcategories: ["Mobile Phones"] },
  { name: "Bikes", icon: "🚴", subcategories: ["Bikes"] },
  { name: "Electronics & Appliances", icon: "📺", subcategories: ["Electronics"] },
  { name: "Books", icon: "📚", subcategories: ["Books"] },
  { name: "Furniture", icon: "🛋️", subcategories: ["Furniture"] },
  { name: "Fashion", icon: "👗", subcategories: ["Fashion"] },
];

const Category = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Render components based on selection
  switch (selectedSubcategory) {
    case "Cars":
      return <Car />;
    case "For Sale: Houses & Apartments":
      return <Property />;
    case "Mobile Phones":
      return <Mobile />;
    case "Bikes":
      return <Bikes />;
    case "Electronics":
      return <Electronics />;
    case "Books":
      return <Books />;
    case "Furniture":
      return <Furniture />;
    case "Fashion":
      return <Fashion />;
    default:
      break;
  }

  return (
    <div className="min-h-dvh bg-gray-100 flex justify-center items-center relative">
      <div className="bg-white rounded-lg shadow-md w-[450px] max-w-[550px] p-6 relative">
        <h1 className="text-2xl font-semibold text-center mb-6">POST YOUR AD</h1>

        <Accordion.Root type="single" collapsible>
          {categories.map((category, index) => (
            <div key={index} className="relative">
              <Accordion.Item
                value={category.name}
                className="mb-2 border-b last:border-b-0 border-gray-200"
              >
                <Accordion.Trigger
                  className="flex items-center justify-between w-full py-3 px-4 text-left text-gray-700 hover:bg-gray-50 focus:outline-none"
                  onClick={() =>
                    setActiveCategory(activeCategory === category.name ? null : category.name)
                  }
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">{category.icon}</span>
                    {category.name}
                  </span>
                  <span className="text-gray-400">
                    {activeCategory === category.name ? "▲" : "▶"}
                  </span>
                </Accordion.Trigger>
              </Accordion.Item>

              {activeCategory === category.name && category.subcategories && (
                <div className="absolute left-full top-0 ml-2 bg-white shadow-lg rounded-md p-3 w-72 z-10">
                  <ul className="space-y-2">
                    {category.subcategories.map((sub, i) => (
                      <li
                        key={i}
                        className="py-2 px-3 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                        onClick={() => setSelectedSubcategory(sub)}
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </Accordion.Root>
      </div>
    </div>
  );
};

export default Category;
