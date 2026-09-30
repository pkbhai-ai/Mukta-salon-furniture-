export interface ProductFinish {
  name: string;
  colorHex: string;
  material: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'Shampoo Stations' | 'Meni Pedi Chairs' | 'Pedicure Chairs' | 'Multipurpose Chairs' | 'Barber Chairs' | 'Styling Chairs';
  tagline: string;
  description: string;
  priceEstimate: string;
  image: string;
  materials: string[];
  dimensions: {
    width: string;
    depth: string;
    height: string;
    seatHeight?: string;
  };
  keySpecs: {
    label: string;
    value: string;
  }[];
  features: string[];
  finishes: ProductFinish[];
  application: string;
  leadTime: string;
  warranty: string;
}

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'luna-shampoo-station',
    name: 'Luna Shampoo Station',
    category: 'Shampoo Stations',
    tagline: 'Sculptural ergonomic wash unit with seamless deep ceramic basin',
    description: 'The Luna Shampoo Station embodies Italian minimalist spa aesthetics. Featuring a contoured ergonomic recliner molded with multi-density foam, it provides zero-strain cervical spine support during prolonged hair therapies. Fitted with a deep tilting matte ceramic basin, chrome anti-drip fixtures, and concealed plumbing channels.',
    priceEstimate: 'Trade Pricing on Request',
    image: '/src/assets/images/shampoo_station_luna_1790757030123.jpg',
    materials: ['High-fired Matte Ceramic Basin', 'Italian Marine-Grade Leatherette', 'Kiln-Dried Hardwood Internal Frame', 'Mirror Chrome Gooseneck Mixer'],
    dimensions: {
      width: '68 cm (26.8 in)',
      depth: '142 cm (55.9 in)',
      height: '98 cm (38.6 in)',
      seatHeight: '48 cm (18.9 in)',
    },
    keySpecs: [
      { label: 'Basin Tilt Angle', value: '±18° Multi-Angle' },
      { label: 'Weight Capacity', value: '220 kg (485 lbs)' },
      { label: 'Plumbing Inlet', value: 'Dual Hot/Cold 1/2" BSP' },
      { label: 'Foam Density', value: '45 kg/m³ High Resilient' }
    ],
    features: [
      'Silicone gel neck cushion with ergonomic cervical contour',
      'Dual hot and cold brass ceramic cartridge mixer faucet',
      'Concealed plumbing and drainage trap with easy service access',
      'Anti-stain, chemical-resistant upholstery approved for salon treatments'
    ],
    finishes: [
      { name: 'Espresso Hide', colorHex: '#2A1D17', material: 'Full Grain Leatherette' },
      { name: 'Cognac Tan', colorHex: '#9E5B32', material: 'Saddle Leatherette' },
      { name: 'Obsidian Black', colorHex: '#18181A', material: 'Matte Leatherette' },
      { name: 'Cashmere Sand', colorHex: '#D8CEBE', material: 'Textured Bouclé' }
    ],
    application: 'Luxury Hair Salons, Trichology Clinics, Boutique Day Spas',
    leadTime: '7 - 14 Business Days',
    warranty: '3-Year Frame & Hydraulic Warranty'
  },
  {
    id: 'lina-shampoo-station',
    name: 'Lina Shampoo Station',
    category: 'Shampoo Stations',
    tagline: 'Streamlined low-profile wash bed designed for modern hair studios',
    description: 'Engineered for compact luxury, the Lina Shampoo Station merges a slimline footprint with maximum patron comfort. Its continuous curved backrest cradles the lumbar spine, while the premium white ceramic bowl reflects architectural purity.',
    priceEstimate: 'Trade Pricing on Request',
    image: '/src/assets/images/shampoo_station_lina_1790760524160.jpg',
    materials: ['Glazed White Porcelain Basin', 'Reinforced Fiberglass Sub-base', 'PU High-Grade Synthetic Leather'],
    dimensions: {
      width: '64 cm (25.2 in)',
      depth: '136 cm (53.5 in)',
      height: '95 cm (37.4 in)'
    },
    keySpecs: [
      { label: 'Basin Material', value: 'Vitreous China Gloss' },
      { label: 'Weight Capacity', value: '200 kg' },
      { label: 'Armrest Trim', value: 'Brushed Champagne Metal' }
    ],
    features: [
      'Space-saving 64cm width ideal for multi-station bay setups',
      'Integrated water saver aerator showerhead',
      'Waterproof internal substructure preventing moisture decay'
    ],
    finishes: [
      { name: 'Cognac Saddle', colorHex: '#9E5B32', material: 'Synthetic Nappa' },
      { name: 'Charcoal Noir', colorHex: '#222225', material: 'Matte PU' },
      { name: 'Warm Cream', colorHex: '#F2ECE1', material: 'Perforated PU' }
    ],
    application: 'High-Volume Commercial Salons, Urban Beauty Studios',
    leadTime: '10 - 15 Business Days',
    warranty: '2-Year Commercial Warranty'
  },
  {
    id: 'cubic-shampoo-station',
    name: 'Cubic Shampoo Station',
    category: 'Shampoo Stations',
    tagline: 'Bold geometric silhouette with expansive padded lounge seat',
    description: 'The Cubic Shampoo Station is defined by strong architectural lines and generous box-quilted proportions. Equipped with an oversized black ceramic basin and full-body support, offering an indulgent lounge washing experience.',
    priceEstimate: 'Trade Pricing on Request',
    image: '/src/assets/images/shampoo_station_cubic_1790760537283.jpg',
    materials: ['Heavy-Duty Ceramic Basin', 'Electrostatic Powder Coated Chassis', 'Orthopedic Memory Foam Upholstery'],
    dimensions: {
      width: '72 cm (28.3 in)',
      depth: '150 cm (59.0 in)',
      height: '100 cm (39.4 in)'
    },
    keySpecs: [
      { label: 'Chassis', value: 'Laser-Cut Box Steel' },
      { label: 'Recline Assist', value: 'Gas-Strut Pneumatic' },
      { label: 'Load Limit', value: '240 kg' }
    ],
    features: [
      'Square architectural armrests with integrated phone / glass perch',
      'High-capacity drain strainer preventing hair blockages',
      'Option for built-in vibration lumbar relaxation'
    ],
    finishes: [
      { name: 'Dark Walnut Brown', colorHex: '#2E1F18', material: 'Semi-Aniline PU' },
      { name: 'Slate Gray', colorHex: '#3D3D42', material: 'Textured Weave' },
      { name: 'Champagne Tan', colorHex: '#C5A880', material: 'Suede Finish' }
    ],
    application: 'Executive Grooming Lounges, Premium Hair Spas',
    leadTime: '10 - 18 Business Days',
    warranty: '3-Year Structural Warranty'
  },
  {
    id: 'aura-shampoo-station',
    name: 'Aura Shampoo Station',
    category: 'Shampoo Stations',
    tagline: 'Curved organic contours with ambient under-glow illumination compatibility',
    description: 'Soft rounded geometries create a welcoming, serene aura. The Aura Shampoo Station combines sweeping organic upholstery with a tilting ceramic sink and quiet hydraulic height leveling.',
    priceEstimate: 'Trade Pricing on Request',
    image: '/src/assets/images/shampoo_station_aura_1790760565613.jpg',
    materials: ['Architectural Composite Resin Basin', 'Curved Plywood Shell', 'Bio-based Polyurethane Leather'],
    dimensions: {
      width: '66 cm (26.0 in)',
      depth: '140 cm (55.1 in)',
      height: '96 cm (37.8 in)'
    },
    keySpecs: [
      { label: 'Basin Finish', value: 'Matte Charcoal Composite' },
      { label: 'Neck Support', value: 'Memory Silicone Cushion' },
      { label: 'Basin Width', value: '56 cm Wide-Angle' }
    ],
    features: [
      'Gentle sweeping curved arms designed for patron relaxation',
      'Resistant to peroxide, developer, and salon tints',
      'Dual-layer stain resistant topcoat'
    ],
    finishes: [
      { name: 'Sand Dune', colorHex: '#DFD5C6', material: 'Soft Touch Matte' },
      { name: 'Mocha Espresso', colorHex: '#35251D', material: 'Pebbled Grain' }
    ],
    application: 'Organic Wellness Spas, Minimalist Japanese Concept Salons',
    leadTime: '12 - 20 Business Days',
    warranty: '3-Year Warranty'
  },
  {
    id: 'signature-shampoo-station',
    name: 'Signature Shampoo Station',
    category: 'Shampoo Stations',
    tagline: 'Flagship presidential shampoo lounge with motorized leg-rest elevation',
    description: 'Mukta’s premier flagship wash lounge. Built for clients who demand uncompromised luxury, the Signature features motorized leg-rest elevation, heated neck cradle, and hand-finished walnut side panels.',
    priceEstimate: 'Trade Pricing on Request',
    image: '/src/assets/images/shampoo_station_sign_1790760552112.jpg',
    materials: ['Italian Extra-Deep Ceramic Basin', 'Solid Walnut Wood Accents', 'Medical-Grade Motorized Actuator'],
    dimensions: {
      width: '76 cm (29.9 in)',
      depth: '162 cm (63.8 in extended)',
      height: '102 cm (40.2 in)'
    },
    keySpecs: [
      { label: 'Actuator', value: 'Quiet 24V Motorized Lift' },
      { label: 'Recline Stroke', value: 'Continuous 110° - 165°' },
      { label: 'Basin Color', value: 'Deep Obsidian Matte' }
    ],
    features: [
      'Push-button smooth motorized leg elevation',
      'Solid dark walnut wooden side panels hand-rubbed with matte oil',
      'Anti-microbial, sanitizable hospitality grade leatherette'
    ],
    finishes: [
      { name: 'Royal Cognac', colorHex: '#8C4824', material: 'Nappa Grain' },
      { name: 'Deep Truffle', colorHex: '#251B17', material: 'Full Grain' },
      { name: 'Ivory Bone', colorHex: '#F6F1E7', material: 'Supple PU' }
    ],
    application: 'VIP Suites, 5-Star Hotel Spas, Ultra-Luxury Hair Salons',
    leadTime: '14 - 25 Business Days',
    warranty: '5-Year Motor & Structure Warranty'
  },
  {
    id: 'orion-meni-pedi-massager',
    name: 'Orion Meni Pedi With Massager Chair',
    category: 'Meni Pedi Chairs',
    tagline: 'Comprehensive luxury pedicure station with dual manicure trays and multi-zone shiatsu massage',
    description: 'The Orion Meni Pedi Station represents the pinnacle of salon nail care. Engineered with an intelligent 4-wheel Shiatsu back massager, motorized seat slide, integrated composite stone foot basin with whirlpool hydrotherapy jets, and foldable dark walnut manicure tables.',
    priceEstimate: 'Trade Pricing on Request',
    image: '/src/assets/images/pedicure_chair_orion_1790757045832.jpg',
    materials: ['Handcrafted Resin Stone Foot Basin', 'Pipeless Whirlpool Water Jet', 'Dark Walnut Folding Trays', 'Acetone-Resistant Upholstery'],
    dimensions: {
      width: '84 cm (33.1 in) trays closed / 112 cm open',
      depth: '148 cm (58.3 in)',
      height: '135 cm (53.1 in)'
    },
    keySpecs: [
      { label: 'Massage System', value: '4-Wheel Shiatsu Kneading & Tapping' },
      { label: 'Jet System', value: 'Magnetic Pipeless Hydro Jet' },
      { label: 'Basin Capacity', value: '18 Liters with LED Chromotherapy' },
      { label: 'Power Req.', value: '220-240V, 50Hz, 80W' }
    ],
    features: [
      'Pipeless magnetic jet system ensures 100% sanitary spa operations',
      'Multi-color LED submerged chromotherapy mood lighting',
      'Dual swivel manicure trays with cup holder and nail lamp rest',
      'Full acetone-proof armrest surfaces and chemical resistant upholstery'
    ],
    finishes: [
      { name: 'Warm Sand Cream', colorHex: '#ECE3D4', material: 'Heavy Commercial PU' },
      { name: 'Walnut Espresso', colorHex: '#2B1D16', material: 'Textured Leatherette' },
      { name: 'Blush Sandstone', colorHex: '#D8C3B5', material: 'Soft Grain' }
    ],
    application: 'Luxury Nail Bars, Full-Service Beauty Salons, Resort Spas',
    leadTime: '14 - 21 Business Days',
    warranty: '3-Year Jet & Mechanism Warranty'
  },
  {
    id: 'imporio-meni-pedi-massager',
    name: 'Imporio Meni Pedi With Massager Chair',
    category: 'Meni Pedi Chairs',
    tagline: 'Regal silhouette with synchronized back recline and targeted lumbar heat',
    description: 'Designed for high-end clientele who prioritize ergonomic pampering. The Imporio blends traditional craftsmanship with advanced hydrotherapy, featuring multi-point air-cushion massage, heated lumbar therapy, and heavy-duty glass basin.',
    priceEstimate: 'Trade Pricing on Request',
    image: '/src/assets/images/pedicure_imporio_1790760579891.jpg',
    materials: ['Tempered Crystal Glass Foot Spa', 'Forged Stainless Base Accents', 'Marine Vinyl Foam Cushioning'],
    dimensions: {
      width: '82 cm (32.3 in)',
      depth: '145 cm (57.1 in)',
      height: '132 cm (52.0 in)'
    },
    keySpecs: [
      { label: 'Foot Basin', value: 'Thermal Shock-Proof Glass Bowl' },
      { label: 'Massager Modes', value: '3 Auto Programs + Spot Massage' },
      { label: 'Footrest Adjust', value: '3-Tier Height Adjustable Cushion' }
    ],
    features: [
      'Reclining backrest up to 135° for supreme pedicure relaxation',
      'Integrated pull-out stainless steel handheld sprayer with dual stream',
      'Electronic touch remote embedded into armrest'
    ],
    finishes: [
      { name: 'Alabaster Ivory', colorHex: '#F5EFE6', material: 'Supple PU' },
      { name: 'Cognac Leather', colorHex: '#93542B', material: 'Nappa PU' }
    ],
    application: 'Premium Day Spas, Destination Resorts, Nail Salons',
    leadTime: '12 - 18 Business Days',
    warranty: '3-Year Pump & Electronic Warranty'
  },
  {
    id: 'fairy-meni-pedi-massager',
    name: 'Fairy Meni Pedi With Massager Chair',
    category: 'Meni Pedi Chairs',
    tagline: 'Graceful compact pedicure chair with soft petal curves and gentle ergonomics',
    description: 'The Fairy Chair is crafted with feminine, sculptural curves and soft tailored pleats. Perfect for stylish boutique salons looking for an uplifting, chic atmosphere without compromising on rigorous massage performance.',
    priceEstimate: 'Trade Pricing on Request',
    image: '/src/assets/images/pedicure_fairy_1790760594609.jpg',
    materials: ['Acoustic Soft Foam Core', 'Non-Porous Gel-Coated Basin', 'Champagne Brass Metallic Trim'],
    dimensions: {
      width: '78 cm (30.7 in)',
      depth: '138 cm (54.3 in)',
      height: '126 cm (49.6 in)'
    },
    keySpecs: [
      { label: 'Vibration Massage', value: '6-Node Multi-Speed Back/Seat' },
      { label: 'Basin Type', value: 'Easy-Clean Seamless Acrylic Basin' },
      { label: 'Footrest', value: 'Contoured Soft Sponge Cushion' }
    ],
    features: [
      'Compact envelope specifically tuned for intimate boutique suites',
      'Gentle acoustic vibration massage with whisper-quiet motors',
      'Stain-resistant upholstery resists nail polish remover and acetone'
    ],
    finishes: [
      { name: 'Soft Cashmere', colorHex: '#DFD8CC', material: 'Tweed Velvet PU' },
      { name: 'Desert Rose', colorHex: '#CDB1A4', material: 'Matte Leatherette' },
      { name: 'Olive Bark', colorHex: '#4C4637', material: 'Fine Grain PU' }
    ],
    application: 'Boutique Nail Studios, Bridal Salons, Concept Spas',
    leadTime: '10 - 15 Business Days',
    warranty: '2-Year Full Warranty'
  },
  {
    id: 'chandrayan-pedicure-chair',
    name: 'Chandrayan Pedicure Chair',
    category: 'Pedicure Chairs',
    tagline: 'Futuristic non-plumbed stone-bowl pedicure throne with orbital swivel',
    description: 'Named after progressive engineering, the Chandrayan Pedicure Chair provides high mobility for salons requiring flexible or non-plumbing installations. Features a 360-degree silent swivel, hydraulic height lift, and removable hand-hammered brass or resin pedicure bowl.',
    priceEstimate: 'Trade Pricing on Request',
    image: '/src/assets/images/pedicure_chandra_1790760609404.jpg',
    materials: ['Cast Aluminum Swivel Base', 'Memory Foam Cushioning', 'Detachable Handcrafted Foot Basin', 'Teak Foot Platform'],
    dimensions: {
      width: '74 cm (29.1 in)',
      depth: '110 cm (43.3 in)',
      height: '115 cm (45.3 in)'
    },
    keySpecs: [
      { label: 'Plumbing Requirement', value: 'Zero (Portable Bowl System)' },
      { label: 'Swivel Mechanism', value: '360° Smooth Lockable Bearing' },
      { label: 'Hydraulic Stroke', value: '18 cm Height Adjustment' }
    ],
    features: [
      'No complex floor plumbing required — flexible layout placement',
      'Solid Burma teak wooden footboard treated for water resistance',
      'Comfort-molded backrest with lumbar support pillow'
    ],
    finishes: [
      { name: 'Warm Terracotta Sand', colorHex: '#D5B496', material: 'Italian Leatherette' },
      { name: 'Charcoal Dark', colorHex: '#252528', material: 'Heavy Grain PU' },
      { name: 'Antique White', colorHex: '#EAE5DB', material: 'Matte PU' }
    ],
    application: 'Flexible Spa Suites, Ayurvedic Wellness Centers, Hotel Salons',
    leadTime: '7 - 12 Business Days',
    warranty: '3-Year Hydraulic Warranty'
  },
  {
    id: 'baleno-barber-chair',
    name: 'Baleno Barber Chair',
    category: 'Barber Chairs',
    tagline: 'Heavyweight vintage-modern barber chair with high-precision hydraulic pump and solid steel core',
    description: 'The Baleno is the benchmark of masculine barbering craftsmanship. Built on a cast-iron internal framework with mirror-finish chrome plating, diamond-stitched leather panels, synchronized back recline, and an adjustable, removable headrest.',
    priceEstimate: 'Trade Pricing on Request',
    image: '/src/assets/images/barber_chair_baleno_1790757058220.jpg',
    materials: ['Forged Cast Iron & Chrome Plating', 'Diamond-Quilted Heavy Leatherette', 'Solid Walnut Armrest Inlays', 'Heavy Cast Aluminum Footrest'],
    dimensions: {
      width: '71 cm (28.0 in)',
      depth: '120 cm (47.2 in upright) / 165 cm (reclined)',
      height: '108 cm – 126 cm (42.5 in - 49.6 in)'
    },
    keySpecs: [
      { label: 'Hydraulic Pump', value: 'Commercial Grade 300 kg Load' },
      { label: 'Recline Angle', value: 'Up to 145° with Footrest Linkage' },
      { label: 'Base Diameter', value: '68 cm Heavy Weighted Disc' },
      { label: 'Weight Net', value: '82 kg Solid Steel Construction' }
    ],
    features: [
      'Dual-side recline lever for left or right-handed barber operation',
      'Flip-over padded leg cushion for maximum client comfort during shaves',
      'Solid walnut hand-finished armrests resisting oil and barber pomades',
      'Integrated towel hanger and tool holster'
    ],
    finishes: [
      { name: 'Oxblood Vintage', colorHex: '#522020', material: 'Diamond Stitched Leatherette' },
      { name: 'Dark Truffle Black', colorHex: '#1D1D20', material: 'Pebbled Grain' },
      { name: 'Raw Cognac', colorHex: '#8C4B25', material: 'Distressed Finish' }
    ],
    application: 'Gentlemen’s Grooming Clubs, High-End Barbershops, Vintage Salons',
    leadTime: '8 - 14 Business Days',
    warranty: '5-Year Hydraulic & Frame Warranty'
  },
  {
    id: 'oslo-barber-chair',
    name: 'Oslo Barber Chair',
    category: 'Barber Chairs',
    tagline: 'Scandinavian-inspired minimal barber chair with brushed nickel accents',
    description: 'The Oslo strips away excessive chrome in favor of subtle brushed nickel accents, matte warm leather, and balanced geometric armrests. Engineered for modern unisex grooming and traditional barber shaves alike.',
    priceEstimate: 'Trade Pricing on Request',
    image: '/src/assets/images/barber_chair_oslo_1790760624655.jpg',
    materials: ['Brushed Nickel Stainless Frame', 'High-Density Structural Foam', 'Matte Semi-Aniline Leatherette'],
    dimensions: {
      width: '69 cm (27.2 in)',
      depth: '115 cm (45.3 in)',
      height: '105 cm – 122 cm (41.3 in - 48.0 in)'
    },
    keySpecs: [
      { label: 'Pump Type', value: 'Heavy Duty Smooth Descent Hydraulic' },
      { label: 'Recline Stroke', value: '135° Balanced Tilt' },
      { label: 'Base', value: 'Square Brushed Nickel Plate' }
    ],
    features: [
      'Architectural square base with anti-tip stability pads',
      'Retractable multi-position headrest for beard grooming',
      'Tear-resistant edge piping with contrast hand-stitching'
    ],
    finishes: [
      { name: 'Nordic Charcoal', colorHex: '#2B2B30', material: 'Matte Touch' },
      { name: 'Sand Camel', colorHex: '#B8976C', material: 'Soft Suede Finish' },
      { name: 'Espresso Bean', colorHex: '#241812', material: 'Full Grain PU' }
    ],
    application: 'Nordic Concept Salons, Modern Barber Lounges',
    leadTime: '10 - 15 Business Days',
    warranty: '3-Year Pump & Chassis Warranty'
  },
  {
    id: 'honeycomb-multipurpose-chair',
    name: 'Honeycomb Multipurpose Chair',
    category: 'Multipurpose Chairs',
    tagline: 'Versatile chair for hair styling, facial threading, makeup, and lash extensions',
    description: 'With its distinctive hexagonal honeycomb backrest quilting and 150-degree recline mechanism, the Honeycomb is the most versatile workstation chair. Easily transitions between cutting, blowouts, makeup application, and facial esthetics.',
    priceEstimate: 'Trade Pricing on Request',
    image: '/src/assets/images/chair_honeycomb_1790760638312.jpg',
    materials: ['Reinforced Polyurethane Honeycomb Core', 'Heavy Hydraulic Disc Base', 'Solid Teak Arm Inlays'],
    dimensions: {
      width: '65 cm (25.6 in)',
      depth: '72 cm (28.3 in)',
      height: '92 cm – 107 cm (36.2 in - 42.1 in)'
    },
    keySpecs: [
      { label: 'Multipurpose Tilt', value: 'Gas-Spring Recline to 150°' },
      { label: 'Headrest', value: 'Quick-Release 6-Stop Adjustable' },
      { label: 'Base Option', value: 'Round Champagne Gold or Black Square' }
    ],
    features: [
      'Smooth gas-spring recline effortlessly handled with a fingertip lever',
      'High-grade hexagonal quilting provides active back ventilation',
      'Accommodates lash and brow procedures without patron shifting'
    ],
    finishes: [
      { name: 'Warm Cognac', colorHex: '#8F4A22', material: 'Honeycomb Quilted PU' },
      { name: 'Champagne Beige', colorHex: '#D6C8B4', material: 'Quilted Leatherette' },
      { name: 'Pitch Black', colorHex: '#19191C', material: 'Quilted PU' }
    ],
    application: 'Makeup Studios, Esthetic Clinics, All-In-One Hair & Brow Stations',
    leadTime: '7 - 12 Business Days',
    warranty: '3-Year Warranty'
  },
  {
    id: 'kelly-multipurpose-chair',
    name: 'Kelly Multipurpose Chair',
    category: 'Multipurpose Chairs',
    tagline: 'Soft barrel-back multipurpose chair with cocooning armrests',
    description: 'The Kelly features an enveloping barrel-back shape inspired by mid-century Danish furniture. It supports prolonged sitting during complex color corrections, bridal styling, or beauty treatments with effortless charm.',
    priceEstimate: 'Trade Pricing on Request',
    image: '/src/assets/images/chair_kelly_1790760651572.jpg',
    materials: ['Cold-Cured Molded Foam Core', 'Champagne Brass Finished Column', 'Water-Repellent Velvet PU'],
    dimensions: {
      width: '67 cm (26.4 in)',
      depth: '68 cm (26.8 in)',
      height: '88 cm – 103 cm (34.6 in - 40.5 in)'
    },
    keySpecs: [
      { label: 'Base Mechanism', value: 'Lockable Hydraulic 360°' },
      { label: 'Weight Rating', value: '200 kg' },
      { label: 'Recline', value: '130° Multi-Position Lock' }
    ],
    features: [
      'Continuous curved barrel backrest eliminating pressure points',
      'Easy-to-clean seam layout preventing hair accumulation',
      'Compatible with castor base or hydraulic floor disc'
    ],
    finishes: [
      { name: 'Cashmere Sand', colorHex: '#D9CDBF', material: 'Soft Touch PU' },
      { name: 'Warm Walnut', colorHex: '#38261E', material: 'Fine Texture' },
      { name: 'Sage Green', colorHex: '#5A6351', material: 'Matte Leatherette' }
    ],
    application: 'Bridal Suites, Premium Unisex Salons, Cosmetic Clinics',
    leadTime: '8 - 14 Business Days',
    warranty: '3-Year Hydraulic Warranty'
  }
];

export const SALON_CATEGORIES = [
  'All Collections',
  'Shampoo Stations',
  'Meni Pedi Chairs',
  'Pedicure Chairs',
  'Multipurpose Chairs',
  'Barber Chairs'
] as const;

export const COMPANY_DETAILS = {
  name: 'Mukta Salon Furniture Private Limited',
  tagline: 'Furniture That Defines Your Space',
  address: 'K-71, Sector 3, Bawana Industrial Area, Delhi – 110039, India',
  phone1: '+91 9818216443',
  phone2: '+91 8700856831',
  whatsapp: '919818216443',
  email: 'info@muktasalonfurnitures.com',
  gstin: '07AAVCM2140D1ZK',
  website: 'https://www.muktasalonfurnitures.com/',
  instagram: 'https://www.instagram.com/muktasalonfurniturepvtltd/',
  instagramHandle: '@muktasalonfurniturepvtltd',
  manufacturingArea: '25,000+ sq. ft. State-of-the-Art Production Facility',
  estYear: '2014',
  exportMarkets: 'India, UAE, Nepal, Sri Lanka, UK'
};
