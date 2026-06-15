import { Product } from './types';

export const STORE_TIENDA_INFO = {
  name: "Mz.B Lt.6",
  tagline: "De la calle nace todo",
  yapeNumber: "926 718 192", // Standard Peruvian format
  yapeOwner: "Josué Benjamin - Mz.B Lt.6",
  storePhone: "51926718192", // WhatsApp link target (must be pure numbers + country code)
  storeAddress: "Av. Las Flores de la Primavera 1420 (Segundo Piso), San Juan de Lurigancho, Lima (Frente a la Estación Los Jardines)",
  storeHours: "Lunes a Sábado: 11:30 AM - 8:30 PM | Domingos: Cerrado",
};

export const PRODUCTS: Product[] = [
  {
    id: "mzb-calle-todo",
    name: "Tee 'De La Calle Nace Todo'",
    price: 75.00,
    description: "Polo verde bosque lavado con la gráfica tributo a los pequeños vendedores de la calle con grandes sueños.",
    longDescription: "Un homenaje a nuestras raíces y al esfuerzo de la calle. Confeccionado en algodón lavado premium con un tacto vintage único. Gráfica de alto impacto en serigrafía al tacto cero mostrando a los vendedores de la calle que sueñan en grande bajo el lema 'De la calle nace todo'.",
    isBestSeller: true,
    tag: "Colección 'Raíces'",
    sizes: ["S", "M", "L", "XL"],
    category: "raices",
    color: "Verde Musgo Lavado / Moss Green Acid Wash",
    wash: "Acid Wash Pro (Tácto Ultra-Suave y resistencia al encogido)",
    details: [
      "Algodón 100% Reactivo Pesado (24/1)",
      "Corte Boxy / Oversized premium con caída impecable",
      "Estampado en alta definición (Tacto Cero)",
      "Costuras reforzadas de hombro a hombro",
      "Hecho con orgullo en Lima, Perú"
    ],
    images: {
      preview: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80",
    },
    quote: "DE LA CALLE NACE TODO. NO ES POBREZA, ES LUCHA. HOY SOMOS CALLE, MAÑANA LEYENDA."
  },
  {
    id: "mzb-buen-dia",
    name: "Tee 'Buen Día y Adiós'",
    price: 70.00,
    description: "Polo charcoal acid wash. Frente: muñeco de felpa cosido. Espalda: nave retro que abduce lo cotidiano.",
    longDescription: "Diseño conceptual exclusivo. Lleva en el pecho un voodoo-doll cosido con corazón spray-painted de rebeldía, y en la espalda la clásica ilustración de la nave espacial abuciendo lo ordinario con el legendario texto contestatario.",
    isBestSeller: true,
    tag: "Colección 'Coyuntura'",
    sizes: ["S", "M", "L", "XL"],
    category: "coyuntura",
    color: "Charcoal Acid Wash",
    wash: "Washed Mineral (Desgastado selectivo)",
    details: [
      "100% Algodón Reactivo Orgánico",
      "Oversized Fit estructurado",
      "Estampado frontal y dorsal resistente a lavadas",
      "Cuello grueso acanalado (Rib 2x1)",
      "Color gris mineral con sutiles vetas desgastadas"
    ],
    images: {
      preview: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    },
    quote: "BUEN DÍA, DORMIR Y ADIÓS PARA SIEMPRE A INTENTAR SER DISTINTO."
  },
  {
    id: "mzb-humanidad",
    name: "Tee 'Memoria & Humanidad'",
    price: 80.00,
    description: "Polo gris asfalto con masivo backprint tipográfico en graffiti consciente y silueta con sombrero.",
    longDescription: "Un recordatorio de lo que realmente importa. Gráfica dorsal masiva con las palabras que definen la lucha colectiva urbana: Memoria, Humanidad, Justicia, Esperanza e Identidad escritas en diferentes tipografías de graffiti callejero.",
    tag: "Colección 'Coyuntura'",
    sizes: ["S", "M", "L", "XL"],
    category: "coyuntura",
    color: "Gris Cemento Lavado / Slate Vintage Gray",
    wash: "Stone Wash Suave con texturizado superficial",
    details: [
      "Algodón de fibra larga de alta densidad",
      "Corte Boxy clásico de los 90s",
      "Impresión de alta densidad de tacto cero en espalda",
      "Preservación de color al lavado reactivo",
      "Etiqueta bordada MZ.B LT.6 de autenticidad"
    ],
    images: {
      preview: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
    },
    quote: "HUMANIDAD, RESILIENCIA, MEMORIA, JUSTICIA, ESPERANZA, IDENTIDAD."
  },
  {
    id: "mzb-riqueza-vida",
    name: "Tee 'Riqueza es la Vida'",
    price: 75.00,
    description: "Polo negro premium con tipografía graffiti de alta vivacidad e ilustración de radiograbadora doble deck.",
    longDescription: "La verdadera riqueza no se mide en números, se mide en momentos y música. Con un poderoso estampado de parlante de barrio y tipografías líquidas en tonos amarillos y verdes neón de actitud urbana absoluta.",
    tag: "Colección 'Raíces'",
    sizes: ["M", "L", "XL"],
    category: "raices",
    color: "Negro Profundo Premium",
    wash: "Tinturado Reactivo a dos baños (Anti-decoloramiento)",
    details: [
      "Algodón pre-encogido de 220 gramos",
      "Estampado Plastisol de alta flexibilidad y brillo controlado",
      "Silueta street ancha y pesada",
      "Cuello redondo de alta cobertura",
      "Look callejero imponente y con peso"
    ],
    images: {
      preview: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80",
    },
    quote: "¡RIQUEZA ES LA VIDA! LA MÚSICA DE MI BARRIO SUEÑA MÁS FUERTE."
  },
  {
    id: "mzb-classic-signature",
    name: "Tee 'Classics Mz.B Lt.6'",
    price: 65.00,
    description: "Polo minimalista off-white con logo bordado en el pecho y las coordenadas geográficas de origen.",
    longDescription: "Nuestra firma. Un diseño limpio, pulcro, pero lleno de identidad para combinar en cualquier outfit de calle. Lleva el logo degradado original bordado con hilo de alta definición en el pecho izquierdo y las coordenadas físicas de origen impresas con tinta plateada reflectiva en la espalda.",
    tag: "Colección 'Esenciales'",
    sizes: ["S", "M", "L"],
    category: "esenciales",
    color: "Blanco Hueso / Off-White",
    wash: "Lavado suavizado con siliconas de bambú",
    details: [
      "Algodón Heavyweight premium peinado",
      "Logotipo bordado con hilos metálicos de alta gama",
      "Detalle reflectivo Mz.B Lt.6 en la zona lumbar",
      "Calce relaxed contemporáneo",
      "La pieza ideal para armar capas streetwear"
    ],
    images: {
      preview: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&auto=format&fit=crop&q=80",
    },
    quote: "DE LA CALLE NACE TODO. MZ.B LT.6 ORIGINAL DESDE EL DÍA UNO."
  }
];
