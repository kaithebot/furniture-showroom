// Script to generate products.js with multiple images
const fs = require('fs');

// Image collections for different product types
const sofaImages = [
  ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800","https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=800","https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800","https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800"],
  ["https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800","https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800","https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=800","https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800"],
  ["https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800","https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=800","https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800","https://images.unsplash.com/photo-1491926621425-7e655a0e6d28?w=800"],
  ["https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=800","https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800","https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800","https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800"],
  ["https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800","https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800","https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800","https://images.unsplash.com/photo-1499933374294-4584851497cc?w=800"],
  ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800","https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800","https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800","https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"]
];

const sectionalImages = [
  ["https://images.unsplash.com/photo-1567688699-b03738e295da?w=800","https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800","https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800","https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"],
  ["https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800","https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800","https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800","https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800"],
  ["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800","https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800","https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800","https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=800"],
  ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800","https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800","https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800","https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800"]
];

const bedroomImages = [
  ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800","https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800","https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800","https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"],
  ["https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800","https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800","https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800","https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800"],
  ["https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800","https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800","https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800","https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800"]
];

const diningImages = [
  ["https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800","https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800","https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800","https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"],
  ["https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800","https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800","https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800","https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800"],
  ["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800","https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800","https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800","https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800"]
];

const mattressImages = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
  "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800"
];

const consoleImages = [
  "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800",
  "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800",
  "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
];

// Product templates
const recliningSofaData = [
  { id: "RS-001", name: "Ashley PC62606 DeepWakes PWR REC", price: "$1,299", desc: "Premium power reclining sofa with deep seating comfort and USB charging.", dims: "84\"W x 40\"D x 40\"H", mat: "Polyester Blend", color: "Dark Gray" },
  { id: "RS-002", name: "Ashley PCU11700 Glossmore", price: "$1,399", desc: "Elegant reclining sofa with glossy finish upholstery.", dims: "86\"W x 38\"D x 39\"H", mat: "Faux Leather", color: "Black" },
  { id: "RS-003", name: "Ashley PCU12100 Next Move", price: "$1,499", desc: "Next-gen reclining with power headrest and USB ports.", dims: "88\"W x 42\"D x 41\"H", mat: "Performance Fabric", color: "Charcoal" },
  { id: "RS-004", name: "S4306 Rima (Light Grey)", price: "$1,199", desc: "Contemporary light grey reclining sofa with clean lines.", dims: "82\"W x 39\"D x 38\"H", mat: "Microfiber", color: "Light Grey" },
  { id: "RS-005", name: "S4306 Rima (Dark Grey)", price: "$1,199", desc: "Dark grey Rima with premium reclining mechanism.", dims: "82\"W x 39\"D x 38\"H", mat: "Microfiber", color: "Dark Grey" },
  { id: "RS-006", name: "S4306 Rima (Brown)", price: "$1,199", desc: "Warm brown reclining sofa with cozy elegance.", dims: "82\"W x 39\"D x 38\"H", mat: "Microfiber", color: "Brown" },
  { id: "RS-007", name: "S4200 Robin (Brown)", price: "$1,099", desc: "Classic brown reclining sofa with traditional styling.", dims: "80\"W x 38\"D x 40\"H", mat: "Bonded Leather", color: "Brown" },
  { id: "RS-008", name: "S4200 Robin (Black)", price: "$1,099", desc: "Sleek black reclining sofa for contemporary interiors.", dims: "80\"W x 38\"D x 40\"H", mat: "Bonded Leather", color: "Black" },
  { id: "RS-009", name: "S4200 Robin (Grey)", price: "$1,099", desc: "Versatile grey reclining sofa for any color scheme.", dims: "80\"W x 38\"D x 40\"H", mat: "Bonded Leather", color: "Grey" },
  { id: "RS-010", name: "S4230 Willow (Brown)", price: "$1,299", desc: "Willow collection with extra plush cushioning.", dims: "85\"W x 40\"D x 41\"H", mat: "Fabric Blend", color: "Brown" },
  { id: "RS-011", name: "S4230 Willow (Black)", price: "$1,299", desc: "Black Willow reclining sofa with modern comfort.", dims: "85\"W x 40\"D x 41\"H", mat: "Fabric Blend", color: "Black" },
  { id: "RS-