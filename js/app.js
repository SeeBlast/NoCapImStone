// Restaurant and menu data for FeedMe
// Each restaurant has a list of menu items grouped by category

window.restaurants = [

  {
    id: 1,
    name: "Burger Palace",
    cuisine: "American",
    description: "Best burgers in town with crispy fries",
    rating: 4.5,
    deliveryTime: "25-35 min",
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80",
    menu: [
      {
        id: 101,
        name: "Classic Burger",
        category: "Burgers",
        description: "Beef patty, lettuce, tomato, special sauce",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80"
      },
      {
        id: 102,
        name: "Double Smash",
        category: "Burgers",
        description: "Two smashed beef patties with American cheese",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80"
      },
      {
        id: 103,
        name: "BBQ Bacon Burger",
        category: "Burgers",
        description: "Smoky BBQ sauce, crispy bacon, cheddar",
        price: 16.99,
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80"
      },
      {
        id: 104,
        name: "Crispy Chicken Burger",
        category: "Chicken",
        description: "Fried chicken fillet with coleslaw",
        price: 13.99,
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80"
      },
      {
        id: 105,
        name: "Veggie Burger",
        category: "Burgers",
        description: "Plant-based patty with fresh veggies",
        price: 13.49,
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&q=80"
      },
      {
        id: 106,
        name: "Loaded Fries",
        category: "Sides",
        description: "Fries topped with cheese, bacon and jalapeños",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&q=80"
      },
      {
        id: 107,
        name: "Onion Rings",
        category: "Sides",
        description: "Golden crispy battered onion rings",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=80"
      },
      {
        id: 108,
        name: "Chocolate Milkshake",
        category: "Drinks",
        description: "Thick creamy chocolate milkshake",
        price: 7.49,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80"
      }
    ]
  },

  {
    id: 2,
    name: "Pizza Express",
    cuisine: "Italian",
    description: "Wood-fired pizzas made fresh daily",
    rating: 4.7,
    deliveryTime: "30-40 min",
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=500&q=80",
    menu: [
      {
        id: 201,
        name: "Margherita",
        category: "Pizza",
        description: "Classic tomato, mozzarella, fresh basil",
        price: 13.99,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80"
      },
      {
        id: 202,
        name: "Pepperoni Pizza",
        category: "Pizza",
        description: "Hand-tossed with pepperoni and mozzarella",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80"
      },
      {
        id: 203,
        name: "Four Cheese",
        category: "Pizza",
        description: "Mozzarella, gorgonzola, provolone, parmesan",
        price: 16.99,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80"
      },
      {
        id: 204,
        name: "Pasta Carbonara",
        category: "Pasta",
        description: "Creamy pasta with bacon and parmesan",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80"
      },
      {
        id: 205,
        name: "Pasta Arrabiata",
        category: "Pasta",
        description: "Spicy tomato sauce with garlic and chilli",
        price: 13.49,
        image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=400&q=80"
      },
      {
        id: 206,
        name: "Tiramisu",
        category: "Desserts",
        description: "Classic Italian coffee dessert",
        price: 7.99,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80"
      },
      {
        id: 207,
        name: "Garlic Bread",
        category: "Sides",
        description: "Toasted bread with herb garlic butter",
        price: 5.99,
        image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&q=80"
      }
    ]
  },

  {
    id: 3,
    name: "Sushi House",
    cuisine: "Japanese",
    description: "Fresh sushi rolls and sashimi daily",
    rating: 4.8,
    deliveryTime: "35-45 min",
    priceRange: "$$$",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80",
    menu: [
      {
        id: 301,
        name: "Sushi Platter",
        category: "Sushi",
        description: "Assorted rolls with wasabi and ginger",
        price: 18.99,
        image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80"
      },
      {
        id: 302,
        name: "Dragon Roll",
        category: "Sushi",
        description: "Shrimp tempura, avocado, cucumber",
        price: 16.99,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80"
      },
      {
        id: 303,
        name: "Spicy Tuna Roll",
        category: "Sushi",
        description: "Fresh tuna with spicy mayo",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=400&q=80"
      },
      {
        id: 304,
        name: "Salmon Sashimi",
        category: "Sashimi",
        description: "8 pieces of fresh Atlantic salmon",
        price: 17.99,
        image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&q=80"
      },
      {
        id: 305,
        name: "Ramen Bowl",
        category: "Ramen",
        description: "Rich pork broth with noodles and toppings",
        price: 16.49,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80"
      },
      {
        id: 306,
        name: "Gyoza (6pc)",
        category: "Starters",
        description: "Pan-fried Japanese dumplings",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=400&q=80"
      },
      {
        id: 307,
        name: "Edamame",
        category: "Starters",
        description: "Salted steamed soybeans",
        price: 5.99,
        image: "https://images.unsplash.com/photo-1612630741022-b29a37b67b35?w=400&q=80"
      },
      {
        id: 308,
        name: "Miso Soup",
        category: "Starters",
        description: "Traditional Japanese miso with tofu",
        price: 3.99,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80"
      }
    ]
  },

  {
    id: 4,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    description: "Authentic tacos and burritos",
    rating: 4.3,
    deliveryTime: "20-30 min",
    priceRange: "$",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80",
    menu: [
      {
        id: 401,
        name: "Chicken Tacos (3pc)",
        category: "Tacos",
        description: "Grilled chicken, salsa, guac, sour cream",
        price: 13.99,
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80"
      },
      {
        id: 402,
        name: "Beef Burrito",
        category: "Burritos",
        description: "Seasoned beef, rice, beans, cheese",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80"
      },
      {
        id: 403,
        name: "Carnitas Bowl",
        category: "Bowls",
        description: "Slow-cooked pork with rice and black beans",
        price: 15.49,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80"
      },
      {
        id: 404,
        name: "Quesadilla",
        category: "Sides",
        description: "Cheese and chicken grilled quesadilla",
        price: 11.99,
        image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&q=80"
      },
      {
        id: 405,
        name: "Nachos Supreme",
        category: "Sides",
        description: "Chips with cheese, jalapeños, salsa, guac",
        price: 10.99,
        image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&q=80"
      },
      {
        id: 406,
        name: "Churros",
        category: "Desserts",
        description: "Cinnamon sugar churros with chocolate dip",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=400&q=80"
      }
    ]
  },

  {
    id: 5,
    name: "Pasta House",
    cuisine: "Italian",
    description: "Homemade pasta with authentic Italian recipes",
    rating: 4.6,
    deliveryTime: "30-40 min",
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&q=80",
    menu: [
      {
        id: 501,
        name: "Spaghetti Bolognese",
        category: "Pasta",
        description: "Classic beef ragù with spaghetti",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&q=80"
      },
      {
        id: 502,
        name: "Fettuccine Alfredo",
        category: "Pasta",
        description: "Rich cream sauce with parmesan",
        price: 13.99,
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80"
      },
      {
        id: 503,
        name: "Penne Arrabbiata",
        category: "Pasta",
        description: "Spicy tomato and garlic sauce",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=400&q=80"
      },
      {
        id: 504,
        name: "Lasagna",
        category: "Baked",
        description: "Layers of pasta, beef ragù, béchamel",
        price: 16.99,
        image: "https://images.unsplash.com/photo-1619895092538-128341789043?w=400&q=80"
      },
      {
        id: 505,
        name: "Caesar Salad",
        category: "Salads",
        description: "Romaine, croutons, parmesan, Caesar dressing",
        price: 10.99,
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80"
      },
      {
        id: 506,
        name: "Panna Cotta",
        category: "Desserts",
        description: "Vanilla cream with berry compote",
        price: 7.99,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80"
      }
    ]
  },

  {
    id: 6,
    name: "Green Bowl",
    cuisine: "Healthy",
    description: "Nutritious bowls and salads for a healthy you",
    rating: 4.4,
    deliveryTime: "20-30 min",
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
    menu: [
      {
        id: 601,
        name: "Acai Bowl",
        category: "Bowls",
        description: "Açaí blend topped with granola and fresh fruit",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80"
      },
      {
        id: 602,
        name: "Buddha Bowl",
        category: "Bowls",
        description: "Quinoa, roasted veg, tahini dressing",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80"
      },
      {
        id: 603,
        name: "Salmon Poke",
        category: "Bowls",
        description: "Sushi-grade salmon, avocado, edamame over rice",
        price: 16.99,
        image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=400&q=80"
      },
      {
        id: 604,
        name: "Greek Salad",
        category: "Salads",
        description: "Tomato, cucumber, olives, feta, olive oil",
        price: 11.99,
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80"
      },
      {
        id: 605,
        name: "Green Smoothie",
        category: "Drinks",
        description: "Spinach, banana, mango, almond milk",
        price: 8.49,
        image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&q=80"
      },
      {
        id: 606,
        name: "Energy Balls (4pc)",
        category: "Snacks",
        description: "Oats, dates, peanut butter, dark chocolate",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&q=80"
      }
    ]
  },

  {
    id: 7,
    name: "Ramen Bar",
    cuisine: "Japanese",
    description: "Authentic Japanese ramen with rich broths",
    rating: 4.9,
    deliveryTime: "30-45 min",
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80",
    menu: [
      {
        id: 701,
        name: "Tonkotsu Ramen",
        category: "Ramen",
        description: "Rich pork bone broth, chashu pork, soft egg",
        price: 17.99,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80"
      },
      {
        id: 702,
        name: "Miso Ramen",
        category: "Ramen",
        description: "White miso broth with corn and butter",
        price: 16.49,
        image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400&q=80"
      },
      {
        id: 703,
        name: "Spicy Tantanmen",
        category: "Ramen",
        description: "Sesame chilli broth with ground pork",
        price: 17.49,
        image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&q=80"
      },
      {
        id: 704,
        name: "Karaage Chicken",
        category: "Sides",
        description: "Japanese fried chicken with lemon mayo",
        price: 11.99,
        image: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80"
      },
      {
        id: 705,
        name: "Takoyaki (6pc)",
        category: "Sides",
        description: "Octopus balls with bonito and mayo",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1630345987817-e90f80699c6b?w=400&q=80"
      },
      {
        id: 706,
        name: "Matcha Ice Cream",
        category: "Desserts",
        description: "Creamy green tea ice cream",
        price: 6.49,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80"
      }
    ]
  },

  {
    id: 8,
    name: "Sweet Treats",
    cuisine: "Desserts",
    description: "Indulgent desserts and sweet delights",
    rating: 4.5,
    deliveryTime: "20-35 min",
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=80",
    menu: [
      {
        id: 801,
        name: "Chocolate Lava Cake",
        category: "Cakes",
        description: "Warm chocolate cake with molten centre",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80"
      },
      {
        id: 802,
        name: "NY Cheesecake",
        category: "Cakes",
        description: "Classic New York style cheesecake",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80"
      },
      {
        id: 803,
        name: "Crème Brûlée",
        category: "Classics",
        description: "French vanilla custard with caramel top",
        price: 8.49,
        image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&q=80"
      },
      {
        id: 804,
        name: "Waffle Stack",
        category: "Waffles",
        description: "Belgian waffles with berries and cream",
        price: 11.99,
        image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&q=80"
      },
      {
        id: 805,
        name: "Gelato (3 scoops)",
        category: "Ice Cream",
        description: "Artisan Italian gelato of your choice",
        price: 7.99,
        image: "https://images.unsplash.com/photo-1567206563114-c179706e2e11?w=400&q=80"
      },
      {
        id: 806,
        name: "Macaron Box (6pc)",
        category: "Pastries",
        description: "Assorted French macarons",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&q=80"
      }
    ]
  },

  {
    id: 9,
    name: "Dragon Palace",
    cuisine: "Chinese",
    description: "Traditional Chinese cuisine with bold flavours",
    rating: 4.5,
    deliveryTime: "30-40 min",
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&q=80",
    menu: [
      {
        id: 901,
        name: "Dim Sum Basket",
        category: "Dim Sum",
        description: "Assorted steamed dumplings (8pc)",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80"
      },
      {
        id: 902,
        name: "Kung Pao Chicken",
        category: "Mains",
        description: "Spicy stir-fry with peanuts and peppers",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80"
      },
      {
        id: 903,
        name: "Peking Duck",
        category: "Mains",
        description: "Crispy duck with pancakes and hoisin",
        price: 22.99,
        image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400&q=80"
      },
      {
        id: 904,
        name: "Fried Rice",
        category: "Rice",
        description: "Wok-fried rice with egg and vegetables",
        price: 11.99,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80"
      },
      {
        id: 905,
        name: "Spring Rolls (4pc)",
        category: "Starters",
        description: "Crispy fried spring rolls with sweet chilli",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1616192016529-87a1b2db5dbe?w=400&q=80"
      },
      {
        id: 906,
        name: "Beef Chow Mein",
        category: "Noodles",
        description: "Stir-fried noodles with tender beef strips",
        price: 16.49,
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80"
      }
    ]
  },

  {
    id: 10,
    name: "Spice Garden",
    cuisine: "Indian",
    description: "Aromatic curries and tandoor specialties",
    rating: 4.7,
    deliveryTime: "35-45 min",
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80",
    menu: [
      {
        id: 1001,
        name: "Butter Chicken",
        category: "Curries",
        description: "Creamy tomato curry with tender chicken",
        price: 16.99,
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80"
      },
      {
        id: 1002,
        name: "Paneer Tikka",
        category: "Starters",
        description: "Grilled spiced cottage cheese with mint chutney",
        price: 13.99,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80"
      },
      {
        id: 1003,
        name: "Lamb Biryani",
        category: "Rice",
        description: "Fragrant basmati rice with slow-cooked lamb",
        price: 18.99,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80"
      },
      {
        id: 1004,
        name: "Dal Makhani",
        category: "Curries",
        description: "Slow-cooked black lentils in creamy sauce",
        price: 14.49,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80"
      },
      {
        id: 1005,
        name: "Garlic Naan",
        category: "Breads",
        description: "Soft leavened bread with garlic butter",
        price: 4.49,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80"
      },
      {
        id: 1006,
        name: "Mango Lassi",
        category: "Drinks",
        description: "Chilled yoghurt drink with sweet mango",
        price: 5.99,
        image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80"
      },
      {
        id: 1007,
        name: "Gulab Jamun",
        category: "Desserts",
        description: "Milk dumplings in rose-scented syrup",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80"
      }
    ]
  },

  {
    id: 11,
    name: "Thai Orchid",
    cuisine: "Thai",
    description: "Authentic Thai street food and curries",
    rating: 4.6,
    deliveryTime: "25-35 min",
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1b0f96?w=500&q=80",
    menu: [
      {
        id: 1101,
        name: "Pad Thai",
        category: "Noodles",
        description: "Stir-fried rice noodles with shrimp and peanuts",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&q=80"
      },
      {
        id: 1102,
        name: "Green Curry",
        category: "Curries",
        description: "Coconut green curry with chicken and bamboo",
        price: 16.49,
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1b0f96?w=400&q=80"
      },
      {
        id: 1103,
        name: "Tom Yum Soup",
        category: "Soups",
        description: "Spicy lemongrass prawn soup",
        price: 13.49,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80"
      },
      {
        id: 1104,
        name: "Mango Sticky Rice",
        category: "Desserts",
        description: "Sweet glutinous rice with fresh mango",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80"
      },
      {
        id: 1105,
        name: "Spring Rolls (4pc)",
        category: "Starters",
        description: "Fresh rolls with vermicelli and peanut dip",
        price: 9.49,
        image: "https://images.unsplash.com/photo-1616192016529-87a1b2db5dbe?w=400&q=80"
      },
      {
        id: 1106,
        name: "Thai Iced Tea",
        category: "Drinks",
        description: "Sweetened black tea with condensed milk",
        price: 4.99,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80"
      }
    ]
  },

  {
    id: 12,
    name: "The Grill House",
    cuisine: "American",
    description: "Premium steaks and BBQ smoked meats",
    rating: 4.8,
    deliveryTime: "35-50 min",
    priceRange: "$$$",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80",
    menu: [
      {
        id: 1201,
        name: "Ribeye Steak",
        category: "Steaks",
        description: "12oz prime ribeye, cooked to your liking",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80"
      },
      {
        id: 1202,
        name: "BBQ Ribs (Half Rack)",
        category: "BBQ",
        description: "Slow-smoked ribs with house BBQ sauce",
        price: 27.99,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80"
      },
      {
        id: 1203,
        name: "Pulled Pork Sandwich",
        category: "Sandwiches",
        description: "Slow-cooked pork with coleslaw on brioche",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?w=400&q=80"
      },
      {
        id: 1204,
        name: "Mac & Cheese",
        category: "Sides",
        description: "Creamy four-cheese macaroni",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&q=80"
      },
      {
        id: 1205,
        name: "Corn on the Cob",
        category: "Sides",
        description: "Grilled corn with herb butter",
        price: 5.99,
        image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80"
      },
      {
        id: 1206,
        name: "Craft Lemonade",
        category: "Drinks",
        description: "House-made lemonade with mint",
        price: 4.99,
        image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=400&q=80"
      }
    ]
  }

];
