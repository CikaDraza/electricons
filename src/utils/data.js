import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Sinan',
      email: 'sinan.sakic@gmail.com',
      password: bcrypt.hashSync('Sinana123'),
      isAdmin: false,
      image: '/images/sinan.jpeg'
    },
    {
      name: 'Milan',
      email: 'super.admin@gmail.com',
      password: bcrypt.hashSync('Dmdevelo123'),
      isAdmin: true,
      image: '/images/admin.jpg'
    },
    {
      name: 'Zoran Drazic',
      email: 'zokac.pokac@gmail.com',
      password: bcrypt.hashSync('Z@kula03'),
      isAdmin: false,
      image: '/images/lenjivac.jpg',
      birthday: '03.10.1988',
      address: 'Vase Stajica 16',
      phone: '381644356988',
      country: 'Serbia',
      city: 'Sremska Mitrovica',
      postalcode: '22000',
      company: '',
      vatNumber: null,
      newsletter: 'newsletter',
    }
  ],
  products: [
    {
      title: "AMD Ryzen 53500",
      images: [{image: "/images/amd-desktop-ryzen.jpg"}, {image: "/images/amd-acer-desktop.jpg"}, {image: "/images/amd-dell-desktop.jpg"}],
      image: ["/images/amd-desktop-ryzen.jpg"],
      shortDescription: "Ryzen 5 | 3.6 GHz | Chipset B450 | RAM 16 GB | SSD 500 GB | Nvidia RTX 3050 8GB GDDR6",
      description: "Processor type: Ryzen 5 Processor model: Ryzen 3500, Processor clock speed: 3.6 GHz, Motherboard chipset: B450, Memory: 16 GB, Hard disk type: SSD Hard disk capacity: 500 GB, Graphics card: Nvidia, Graphics card model: NVD RTX 3050, Graphics card memory: 8GB GDDR6",
      rating: 4,
      price: "$980",
      oldPrice: "$1020",
      slug: "amd-ryzen-53500",
      category: "Desktop computers",
      categoryUrl: "desktop-computers",
      subCategory: "AMD Computers",
      subCategoryUrl: "AMD-Computers",
      brand: "AMD",
      brandImg: "/images/AMD-logo.png",
      reviews: 3,
      inStock: 10,
      inWidget: "hero",
      inStock: 10
    },
    {
      title: "AMD Acer Aspire",
      images: [{image: "/images/amd-dell-desktop.jpg"}, {image: "/images/amd-acer-desktop.jpg"}],
      shortDescription: "Ryzen 5 | 3.6 GHz | Chipset B450 | RAM 16 GB | SSD 500 GB | Nvidia RTX 3050 8GB GDDR6",
      description: "Processor type: Ryzen 5 Processor model: Ryzen 3500, Processor clock speed: 3.6 GHz, Motherboard chipset: B450, Memory: 16 GB, Hard disk type: SSD Hard disk capacity: 500 GB, Graphics card: Nvidia, Graphics card model: NVD RTX 3050, Graphics card memory: 8GB GDDR6",
      rating: 4,
      price: "$1030",
      oldPrice: "$1020",
      slug: "amd-acer-aspire",
      category: "Desktop computers",
      categoryUrl: "desktop-computers",
      subCategory: "AMD Computers",
      subCategoryUrl: "AMD-Computers",
      brand: "AMD",
      brandImg: "/images/dell-logo.png",
      reviews: 5,
      inStock: 10,
      inWidget: "top-product",
      inStock: 0
    },
    {
      title: "AMD Dell Desktop",
      images: [{image: "/images/amd-dell-desktop.jpg"}, {image: "/images/amd-desktop-ryzen.jpg"}],
      shortDescription: "Ryzen 5 | 3.6 GHz | Chipset B450 | RAM 16 GB | SSD 500 GB | Nvidia RTX 3050 8GB GDDR6",
      description: "Processor type: Ryzen 5 Processor model: Ryzen 3500, Processor clock speed: 3.6 GHz, Motherboard chipset: B450, Memory: 16 GB, Hard disk type: SSD Hard disk capacity: 500 GB, Graphics card: Nvidia, Graphics card model: NVD RTX 3050, Graphics card memory: 8GB GDDR6",
      rating: 4,
      price: "$1200",
      oldPrice: "$1020",
      slug: "amd-dell-desktop",
      category: "Desktop computers",
      categoryUrl: "desktop-computers",
      subCategory: "AMD Computers",
      subCategoryUrl: "AMD-Computers",
      brand: "Dell",
      brandImg: "/images/dell-logo.png",
      reviews: 3,
      inStock: 10,
      inWidget: "hero"
    },
    {
      title: "Dell PRO",
      images: [{image: "/images/desktopAvatar.jpeg"}, {image: "/images/amd-dell-desktop.jpg"}],
      shortDescription: "Ryzen 5 | 3.6 GHz | Chipset B450 | RAM 16 GB | SSD 500 GB | Nvidia RTX 3050 8GB GDDR6",
      description: "Processor type: Ryzen 5 Processor model: Ryzen 3500, Processor clock speed: 3.6 GHz, Motherboard chipset: B450, Memory: 16 GB, Hard disk type: SSD Hard disk capacity: 500 GB, Graphics card: Nvidia, Graphics card model: NVD RTX 3050, Graphics card memory: 8GB GDDR6",
      rating: 4,
      price: "$980",
      oldPrice: "$1020",
      slug: "dell-pro-desktop",
      category: "Desktop computers",
      categoryUrl: "desktop-computers",
      subCategory: "Dell Computers",
      subCategoryUrl: "Dell-Computers",
      brand: "Dell",
      brandImg: "/images/dell-logo.png",
      reviews: 3,
      inStock: 10,
      inWidget: "hero"
    },
    {
      title: "Dell business",
      images: [{image: "/images/amd-desktop-ryzen.jpg"}],
      shortDescription: "Ryzen 5 | 3.6 GHz | Chipset B450 | RAM 16 GB | SSD 500 GB | Nvidia RTX 3050 8GB GDDR6",
      description: "Processor type: Ryzen 5 Processor model: Ryzen 3500, Processor clock speed: 3.6 GHz, Motherboard chipset: B450, Memory: 16 GB, Hard disk type: SSD Hard disk capacity: 500 GB, Graphics card: Nvidia, Graphics card model: NVD RTX 3050, Graphics card memory: 8GB GDDR6",
      rating: 4,
      price: "$980",
      oldPrice: "$1020",
      slug: "dell-business",
      category: "Desktop computers",
      categoryUrl: "desktop-computers",
      subCategory: "Dell Computers",
      subCategoryUrl: "Dell-Computers",
      brand: "Dell",
      brandImg: "/images/dell-logo.png",
      reviews: 3,
      inStock: 10,
      inWidget: "top-product"
    },
    {
      title: "HP server",
      images: [{image: "/images/amd-desktop-ryzen.jpg"}],
      shortDescription: "Ryzen 5 | 3.6 GHz | Chipset B450 | RAM 16 GB | SSD 500 GB | Nvidia RTX 3050 8GB GDDR6",
      description: "Processor type: Ryzen 5 Processor model: Ryzen 3500, Processor clock speed: 3.6 GHz, Motherboard chipset: B450, Memory: 16 GB, Hard disk type: SSD Hard disk capacity: 500 GB, Graphics card: Nvidia, Graphics card model: NVD RTX 3050, Graphics card memory: 8GB GDDR6",
      rating: 3,
      price: "$980",
      oldPrice: "$1020",
      slug: "hp-server-computer",
      category: "Desktop computers",
      categoryUrl: "desktop-computers",
      subCategory: "HP Computers",
      subCategoryUrl: "HP-Computers",
      brand: "HP",
      brandImg: "/images/dell-logo.png",
      reviews: 3,
      inStock: 10,
      inWidget: "top-product"
    },
    {
      title: "HP home racunar",
      images: [{image: "/images/amd-desktop-ryzen.jpg"}, {image: "/images/amd-dell-desktop.jpg"}],
      shortDescription: "Ryzen 5 | 3.6 GHz | Chipset B450 | RAM 16 GB | SSD 500 GB | Nvidia RTX 3050 8GB GDDR6",
      description: "Processor type: Ryzen 5 Processor model: Ryzen 3500, Processor clock speed: 3.6 GHz, Motherboard chipset: B450, Memory: 16 GB, Hard disk type: SSD Hard disk capacity: 500 GB, Graphics card: Nvidia, Graphics card model: NVD RTX 3050, Graphics card memory: 8GB GDDR6",
      rating: 3,
      price: "$980",
      oldPrice: "$1020",
      slug: "hp-home-desktop",
      category: "Desktop computers",
      categoryUrl: "desktop-computers",
      subCategory: "HP Computers",
      subCategoryUrl: "HP-Computers",
      brand: "HP",
      brandImg: "/images/dell-logo.png",
      reviews: 3,
      inStock: 10,
      inWidget: "top-product"
    },
    {
      title: "Acer laptop",
      images: [{image: "/images/acer-laptop.png"}, {image: "/images/laptopAvatar.jpg"}],
      shortDescription: "Ryzen 5 | 3.6 GHz | Chipset B450 | RAM 16 GB | SSD 500 GB | Nvidia RTX 3050 8GB GDDR6",
      description: "Processor type: Ryzen 5 Processor model: Ryzen 3500, Processor clock speed: 3.6 GHz, Motherboard chipset: B450, Memory: 16 GB, Hard disk type: SSD Hard disk capacity: 500 GB, Graphics card: Nvidia, Graphics card model: NVD RTX 3050, Graphics card memory: 8GB GDDR6",
      rating: 4,
      price: "$980",
      oldPrice: "$1020",
      slug: "acer-notebook",
      category: "Laptop computers",
      categoryUrl: "laptops",
      subCategory: "Acer Laptops",
      subCategoryUrl: "Acer-Laptops",
      brand: "Acer",
      brandImg: "/images/dell-logo.png",
      reviews: 3,
      inStock: 10,
      inWidget: "hero"
    },
    {
      title: "Lenovo laptop",
      images: [{image: "/images/lenovo-laptop.jpg"}],
      shortDescription: "Ryzen 5 | 3.6 GHz | Chipset B450 | RAM 16 GB | SSD 500 GB | Nvidia RTX 3050 8GB GDDR6",
      description: "Processor type: Ryzen 5 Processor model: Ryzen 3500, Processor clock speed: 3.6 GHz, Motherboard chipset: B450, Memory: 16 GB, Hard disk type: SSD Hard disk capacity: 500 GB, Graphics card: Nvidia, Graphics card model: NVD RTX 3050, Graphics card memory: 8GB GDDR6",
      rating: 2,
      price: "$980",
      oldPrice: "$1020",
      slug: "lenovo-laptop",
      category: "Laptop computers",
      categoryUrl: "laptops",
      subCategory: "Lenovo Laptops",
      subCategoryUrl: "Lenovo-Laptops",
      brand: "Lenovo",
      brandImg: "/images/dell-logo.png",
      reviews: 3,
      inStock: 10,
      inWidget: "hero"
    },
    {
      title: "Toshiba Satellite",
      images: [{image: "/images/laptopAvatar.jpg"}, {image: "/images/notebook-dell.jpeg"}],
      shortDescription: "Ryzen 5 | 3.6 GHz | Chipset B450 | RAM 16 GB | SSD 500 GB | Nvidia RTX 3050 8GB GDDR6",
      description: "Processor type: Ryzen 5 Processor model: Ryzen 3500, Processor clock speed: 3.6 GHz, Motherboard chipset: B450, Memory: 16 GB, Hard disk type: SSD Hard disk capacity: 500 GB, Graphics card: Nvidia, Graphics card model: NVD RTX 3050, Graphics card memory: 8GB GDDR6",
      rating: 4,
      price: "$880",
      oldPrice: "$920",
      slug: "toshiba-satellite",
      category: "Laptop computers",
      categoryUrl: "laptops",
      subCategory: "Toshiba Laptops",
      subCategoryUrl: "Toshiba-Laptops",
      brand: "Toshiba",
      brandImg: "/images/dell-logo.png",
      reviews: 10,
      inStock: 0,
      inWidget: "hero"
    },
    {
      title: "Xiaomi Redmi Note 9",
      images: [{image: "/images/Redmi-Note-9-1pro.jpg"}],
      shortDescription: "Ryzen 5 | 3.6 GHz | Chipset B450 | RAM 16 GB | SSD 500 GB | Nvidia RTX 3050 8GB GDDR6",
      description: "Processor type: Ryzen 5 Processor model: Ryzen 3500, Processor clock speed: 3.6 GHz, Motherboard chipset: B450, Memory: 16 GB, Hard disk type: SSD Hard disk capacity: 500 GB, Graphics card: Nvidia, Graphics card model: NVD RTX 3050, Graphics card memory: 8GB GDDR6",
      rating: 4,
      price: "$980",
      oldPrice: "$1020",
      slug: "xiaomi-redmi-note-9",
      category: "Smartphones",
      categoryUrl: "smartphones",
      subCategory: "Xiaomi Smartphones",
      subCategoryUrl: "Xiaomi-Smartphones",
      brand: "Xiaomi",
      brandImg: "/images/dell-logo.png",
      reviews: 3,
      inStock: 10,
      inWidget: "hero"
    },
    {
      title: "Xiaomi 10",
      images: [{image: "/images/Redmi-Note-9-1pro.jpg"}],
      shortDescription: "Ryzen 5 | 3.6 GHz | Chipset B450 | RAM 16 GB | SSD 500 GB | Nvidia RTX 3050 8GB GDDR6",
      description: "Processor type: Ryzen 5 Processor model: Ryzen 3500, Processor clock speed: 3.6 GHz, Motherboard chipset: B450, Memory: 16 GB, Hard disk type: SSD Hard disk capacity: 500 GB, Graphics card: Nvidia, Graphics card model: NVD RTX 3050, Graphics card memory: 8GB GDDR6",
      rating: 4,
      price: "$980",
      oldPrice: "$1020",
      slug: "xiaomi-10-phone",
      category: "Smartphones",
      categoryUrl: "smartphones",
      subCategory: "Xiaomi Smartphones",
      subCategoryUrl: "Xiaomi-Smartphones",
      brand: "Xiaomi",
      brandImg: "/images/dell-logo.png",
      reviews: 3,
      inStock: 10,
      inWidget: "top-product"
    },
    {
      title: "Nokia Seven",
      images: [{image: "/images/nokia-smartphone.jpeg"}],
      shortDescription: "Ryzen 5 | 3.6 GHz | Chipset B450 | RAM 16 GB | SSD 500 GB | Nvidia RTX 3050 8GB GDDR6",
      description: "Processor type: Ryzen 5 Processor model: Ryzen 3500, Processor clock speed: 3.6 GHz, Motherboard chipset: B450, Memory: 16 GB, Hard disk type: SSD Hard disk capacity: 500 GB, Graphics card: Nvidia, Graphics card model: NVD RTX 3050, Graphics card memory: 8GB GDDR6",
      rating: 4,
      price: "$980",
      oldPrice: "$1020",
      slug: "nokia-seven-mobile",
      category: "Smartphones",
      categoryUrl: "smartphones",
      subCategory: "Nokia Smartphones",
      subCategoryUrl: "Nokia-Smartphones",
      brand: "Nokia",
      brandImg: "/images/dell-logo.png",
      reviews: 3,
      inStock: 10,
      inWidget: "hero"
    },
    {
      title: "Nokia Spring",
      images: [{image: "/images/nokia-smartphone.jpeg"}],
      shortDescription: "Ryzen 5 | 3.6 GHz | Chipset B450 | RAM 16 GB | SSD 500 GB | Nvidia RTX 3050 8GB GDDR6",
      description: "Processor type: Ryzen 5 Processor model: Ryzen 3500, Processor clock speed: 3.6 GHz, Motherboard chipset: B450, Memory: 16 GB, Hard disk type: SSD Hard disk capacity: 500 GB, Graphics card: Nvidia, Graphics card model: NVD RTX 3050, Graphics card memory: 8GB GDDR6",
      rating: 4,
      price: "$980",
      oldPrice: "$1020",
      slug: "nokia-spring-mobile",
      category: "Smartphones",
      categoryUrl: "smartphones",
      subCategory: "Nokia Smartphones",
      subCategoryUrl: "Nokia-Smartphones",
      brand: "Nokia",
      brandImg: "/images/dell-logo.png",
      reviews: 3,
      inStock: 10,
      inWidget: "top-product"
    },
    {
      title: "Huawei 14x Elite",
      images: [{image: "/images/huawei.jpg"}],
      shortDescription: "Ryzen 5 | 3.6 GHz | Chipset B450 | RAM 16 GB | SSD 500 GB | Nvidia RTX 3050 8GB GDDR6",
      description: "Processor type: Ryzen 5 Processor model: Ryzen 3500, Processor clock speed: 3.6 GHz, Motherboard chipset: B450, Memory: 16 GB, Hard disk type: SSD Hard disk capacity: 500 GB, Graphics card: Nvidia, Graphics card model: NVD RTX 3050, Graphics card memory: 8GB GDDR6",
      rating: 3,
      price: "$980",
      oldPrice: "$1020",
      slug: "huawei-s14x-elite",
      category: "Smartphones",
      categoryUrl: "smartphones",
      subCategory: "Huawei Smartphones",
      subCategoryUrl: "Huawei-Smartphones",
      brand: "Huawei",
      brandImg: "/images/dell-logo.png",
      reviews: 3,
      inStock: 10,
      inWidget: "hero",
      inStock: 15
    }
  ]
}

export default data;