import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'grand-overcoat',
    slug: 'the-grand-nocturne-overcoat',
    name: 'The Grand Nocturne Overcoat',
    subtitle: 'Hand-stitched in Milan',
    price: 1850,
    category: 'outerwear',
    badge: 'Limited 018/100',
    fabric: '100% Biella Double-Faced Cashmere',
    description: 'Engineered with a razor-sculpted shoulder and flowing double-faced virgin cashmere. A silhouette engineered for nocturne galas and crisp winter transatlantic arrivals.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA_5JBUie5R1wvNR2-KBOmhmaaPlvQKvgnmNJq0wiwToSYHkXLGqNBs95uQDEBpTQBfObX7k69IDnyr7VD3D3_Ix0VvEKQa5l0C_OIbYHCFpWOK5JH3IfdusfDwnnkUe1wfNCCAnMu-MDJZwyx0yAh9xzKW9V5XIIx1zozRVAbHCjGG1HXrKBbBx5g2lDo9ww8mB9AWREGKSjn83OzqVekUpvnA2ThF4uUMZM7Y0Iuz1kcCoNa2GhZD',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCxKexFsPxnVGcGqsxxOmA2yQ3Nc-0Mnrzl2pX8NoAzuq47pATJ7tazdCabwJggiclILUkMcHZz2EzcRShbr1VoLno0nvRIr--ra9Tocuhxqutsr-xvxnw4AK2R0lzPN0UVKEdpnoVnxER_HoNDiPo2uctAaBxNzlopu5V8R2GpBlW7ElzwxhwahhPRQl7bbC0Cdkrxh9FbmQOBQBxNSy7Qal1P_MFxWEo9_JqRVyVSYRS5zXioo4h_',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBf9UUDCvuBn94hUOKOYX-sC7HjCGlA1yPwC5NKEesqp3ltDKCbPHkead_NfZwYS7t9o5IATREnb5tgDdFEdAIt58Y7IDPQr2gizKjNljfpWirIBiV3eerVj7ewD13vbjIpvFZbJBB1CTNbV2EfaZq0pkW-J13U5fD8U3PTme-N5PPBbFgUGh3pIOYaCfLvr995pmTXOmt9rJaNujq9CgiRT7YZAzSbWjCo8FW9EzrsMype3EIho2hG',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA5WZH8TGdW9o9HQ02jlKea7lrJQzY1R0_Ox37WELM1aaBTyQAI6H-fajtY_BDKjUJ3wS1haoZnLbcfpxZ8ZA1f2egDeVI6T3mORO4u0FvvcN5BCDWQZaT0_vZhtwRAcNAJ5FeG3dRU1jCncd6fb21TA5R2NGKoGtb4VRfFOE5SSkXNaoePfzKXus-Z-OxZdJ-WUwD68DuTkdfmQsX-s5eWfRw49x7tWRy917VV48AUu68JKbd3N7Kb',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDuYq-nzRJanMzxqhcAtBU8tymJv7yoJ-REeJHfltCLZ8Rf0C7qttKe9IxXvkp-yU__1BJtPz-KFvTc-MQYGnjPazqempRQJG-QeK_yVI323PjIRkEU_7UvPsvzHge_GZHWTjvSWnW6INsKQlVd-XuKZjaeEQ75LfncrwDu-v_vNI0AW1VjdMkwNCuMPKIyAHZZEKkOH9tGAjEClH86k0B69-LVBuVAz6n1WHSYpEUPexT5xmB-2TNM'
    ],
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { name: 'Midnight Sapphire', hex: '#0a1936' },
      { name: 'Obsidian Noir', hex: '#08080a' },
      { name: 'Deep Castoreum', hex: '#1e1713' }
    ],
    edition: '018/100',
    origin: 'Lanificio 1894 • Biella, Italy',
    stockBySize: {
      '38': 4,
      '40': 3,
      '42': 2,
      '44': 1,
      '46': 3
    },
    details: {
      composition: '100% 14.5µm Virgin Mongolian Double-Faced Cashmere',
      weight: '480 GSM Architectural Weight',
      lining: 'Unlined with hand-split blind-stitched self-facing',
      buttons: 'Veneto turned natural water buffalo horn with laser Getzy hallmarks',
      care: 'Specialist eco-dry clean only. Store on included cedar hanger.'
    },
    companionIds: ['cashmere-blazer', 'silk-slip', 'sovereign-trench']
  },
  {
    id: 'cashmere-blazer',
    slug: 'structured-double-breasted-blazer',
    name: 'Structured Double-Breasted Blazer',
    subtitle: 'Atelier Sartoria',
    price: 1290,
    category: 'blazers',
    badge: 'Biella Wool & Silk',
    fabric: 'Cashmere Blend with Silk Facings',
    description: 'Architectural padded shoulders, elongated peaked lapels, and horn buttons. Sculpted waistline tailored in virgin wool cashmere blend for black-tie resonance.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7XejIhYMdIPvgsKN46UptBuhOJgkvw19Rl7ksre4nOb_uFIO5o93r2BMxF__EQ78WoEkfZKftTMe-2o4lpcLLyzL8TLWNXQ9ULm1qN1UN9sKwmbeCKHDNlm0ePD_DxCfWXg1CiXNt5xdHeUEy_iPb9AolnVBe3gsIO1_anRvNJ5IJ9urb1ui2U8FQfpklhcw6IG_mhx_BavuYFT5pZBLpgvO6P_GDiFeVN055hKDX-O7nyV-OdDI_',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBitM3gy4xwYXUzR8nsKhbBnK3pv63UvKuoV8Sboxff-HE7XMWMLBDyJkdNW7O-bt_5rWsJp4gJdWX8Vnqy4J-rF92wUggnSiVBL8UwhAglAKe8_reSbnfFbH3xbNmjE01NLuCQQ8mb5gd5D3-MeJIhfh7nZqoTflGUBWWInmlvossXDkMCwXCw20Mt3ejTXi1Ts5ksShybJ19Bm0jA02aHkE7_tBJYjKkv_SidwkZ8IbHJgP7r0Njb'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Deep Sapphire', hex: '#0b1528' },
      { name: 'Midnight Obsidian', hex: '#1e2330' }
    ],
    edition: '042/150',
    origin: 'Atelier Sartoria • Lombardy, Italy',
    stockBySize: {
      'S': 3,
      'M': 2,
      'L': 4
    },
    details: {
      composition: '85% Virgin Wool, 15% Cashmere with 100% Silk Faille Facings',
      weight: '340 GSM',
      lining: 'Cupro cupro-breathable half lining',
      buttons: 'Smoked Mother-of-Pearl & Hand-Turned Horn',
      care: 'Specialist dry clean only.'
    },
    companionIds: ['grand-overcoat', 'silk-slip']
  },
  {
    id: 'sovereign-trench',
    slug: 'sovereign-trench-in-sapphire-wool',
    name: 'Sovereign Trench in Sapphire Wool',
    subtitle: 'Numbered Edition',
    price: 2150,
    category: 'outerwear',
    badge: 'Edition 042/100',
    fabric: '450g Heavy Melton Italian Wool',
    description: 'Signature full-length architectural silhouette featuring handcrafted belt with solid matte-gunmetal clasp buckle and bonded water-resistant technical gabardine.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDaKruS880-a-fXHZlnw9l0W9aFONoiAUcYXSJlIib95FhBgQQvxaGu238sc7Pb0bby6tgxs9fEgnmZcFq6ywQNM98AuzALVKpMYYI7x80Y84j75qfkB0bomy_J1QF1yparRUoJtCAkcUjNbd5jdIiWUVOO_9Tfcu6YiMOv1VzSXDnckalSr3e4SLMHmoctiZBeJe-iefNOoLqlXAVwULuJ00bK8ZCwBYI6-5I3y4EhJGsHxMtNl3fV',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAQREMIi3HNUV957kVawW4B-VysE01QxN5kKDN8WQAO2VKaBdbbu_AfXM1B6iLFwej9fkE-c9CgAHNEkCXbVrYnaebLc5MGC4K9-YVpUhtY3HCvL1k3hGPEYu-NSCoYaspszaQHCypgY_TQ8PhjakhDo4st2hWALXDngS3AZRYC9y7LAohx3Q0VIEFlFZBRLo-ql0VJMlK9vZ5bWOUkQo2PAhHDPhImyIFgO7x371ErED07NemV9TXt',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAOjrR3IpcVDi9gFCbOzA2NmPPXyN3X2e3jDZZcyhzSW4Ld7NYGIJzwCg_YpLRkxsq-uy72ZXrcd4QlsZvCC1L7nYU5WAssYWg-fm8uo-7knholSEk40IKmlisstIe1VoU7xMMx99DyzC1J3K7Zh-f-FWDRrWlcctHa3Kp3WvnkbKlo9WxCwa0aVxgV6gJdEDOJOlUmtRb0Ed83T-nAhOMWF-lDpaCL0BHnWLgWj0-wmgFss-Cq-Mpv'
    ],
    sizes: ['36', '38', '40', '42'],
    colors: [
      { name: 'Royal Midnight', hex: '#172554' },
      { name: 'Obsidian Shadow', hex: '#0f172a' }
    ],
    edition: '042/100',
    origin: 'Atelier Sartoria • Turin, Italy',
    stockBySize: {
      '36': 2,
      '38': 3,
      '40': 1,
      '42': 2
    },
    details: {
      composition: '450g Heavy Melton Italian Wool & Technical Gabardine',
      weight: '450 GSM Storm-Shield',
      lining: 'Archival Jacquard Silk blend',
      buttons: 'Calfskin storm buckles and gunmetal throat latch',
      care: 'Specialist dry clean only.'
    },
    companionIds: ['grand-overcoat', 'cashmere-blazer']
  },
  {
    id: 'silk-slip',
    slug: 'silk-cowl-atelier-slip-dress',
    name: 'Silk Cowl Atelier Slip Dress',
    subtitle: 'Made in Como',
    price: 890,
    category: 'eveningwear',
    badge: 'Como 30mm Mulberry Silk',
    fabric: '100% Como Mulberry Silk Charmeuse',
    description: 'Heavy 32-momme liquid silk charmeuse cut on the true bias with raw organza edge finishes, floor-grazing hem, and self-covered micro buttons.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAfl_acVAaW99mLkDjDo_Yh4C4n-_j0k5KdCreA9FpzKggMxa43FG5W34c0ktRzBXoYUvE_qfc9YQGTb7sUJfkuwactvphgZ41R1cfpRHCsNmZgnyzLp9pQ3aWq5Y3Xe0et1YCtpMr24OHHJ-7eZQ8SCkcdIy3DjBaswKftGeEA7W1lu2ZY5BDyC118Q42zd2-goyiq2z8T4e7ygdgOlF-szulk61fKZ6DxuwostTIDXI3F-5qmTxYU',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJwqwjZbjSvkGlSSWnmid27P0w1SsOWYRc3at2ui3TMZGNOPX88NUPiOmGZEUsv5963zghUO2TdTvFgX6F2YOapZGqwozAu0Q-51iYRpr_xvC4tKc2DVcRfuzwrmovkVilu9magEt4_GGRQF64ipWzuY1Cj2vG4IlbaVsPErd62hhf7hfOOeFj__ELuQbOECUXeoxfPD6v9gBdOcVDq2U13gQX5lBTAFatTWR17724u3djOmzOpLL7'
    ],
    sizes: ['XS', 'S', 'M'],
    colors: [
      { name: 'Liquid Obsidian', hex: '#050507' },
      { name: 'Abyss Navy', hex: '#0c1322' }
    ],
    edition: '065/100',
    origin: 'Silk Archivio • Lake Como, Italy',
    stockBySize: {
      'XS': 2,
      'S': 3,
      'M': 1
    },
    details: {
      composition: '100% 32-Momme Como Mulberry Silk Charmeuse',
      weight: 'Fluid Bias Cut',
      lining: 'Double-faced silk bustier lining',
      buttons: 'Silk-wrapped micro loop fastenings',
      care: 'Dry clean only with silk specialist.'
    },
    companionIds: ['grand-overcoat', 'cashmere-blazer']
  },
  {
    id: 'archival-portfolio',
    slug: 'nocturne-leather-portfolio',
    name: 'Nocturne Archival Portfolio',
    subtitle: 'Tuscan Saddle Leather',
    price: 680,
    category: 'accessories',
    badge: 'Tuscan Calfskin',
    fabric: 'Full-Grain Box Calf Leather',
    description: 'Hand-burnished Italian calfskin document case featuring magnetic stealth closure and palladium monogram plaque.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNMdzgYHDDCun4ie5qQACAhWu-zbXshR4RHWxZsswHUAInps-qLreT00UV2mL-TVFwr-c-wRAlZle9p7p5I0iCnSPQfmch-TG-YZ2HFx-ly7x1_PQUI55mYDyLeGoW07iYWZKmwQ7zkMVbBqPZEpLnHaO3oQ7eLOo3Ty5QTOahg71E1uQzyNiMVu1yDzSrcwat1vr4JeeK0YVG1ApvmltZ5lUrcrwxcRfocvl9mGxty0fw1k69tS6M'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Nocturne Black', hex: '#060709' },
      { name: 'Navy Patina', hex: '#0e1828' }
    ],
    edition: '088/200',
    origin: 'Scuola del Cuoio • Florence, Italy',
    stockBySize: {
      'One Size': 6
    },
    details: {
      composition: '100% Vegetable-Tanned Box Calfskin',
      weight: 'Structured 1.8mm Leather',
      lining: 'Suede lambskin interior',
      buttons: 'Hidden neodymium magnet closure',
      care: 'Condition biannually with organic beeswax balm.'
    }
  }
];

export const PACKAGING_OPTIONS = [
  {
    id: 'signature' as const,
    title: 'The Nocturne Signature Vault Box',
    description: 'Heavy midnight navy linen hardbox, embossed sapphire wax seal, organic cedar garment shield, buffalo horn lint brush.',
    price: 0,
    icon: 'inventory_2'
  },
  {
    id: 'diplomatic' as const,
    title: 'Minimalist Diplomatic Travel Case',
    description: 'Waterproof ultra-dense ballistic twill garment carrier with milled solid brass latches and dual hanger rail for transit.',
    price: 0,
    icon: 'luggage'
  },
  {
    id: 'coffret' as const,
    title: 'Ceremonial Presentation Coffret',
    description: 'Hand-lacquered piano black walnut chest with velvet cushioning and custom engraved brass plate.',
    price: 250,
    icon: 'workspace_premium'
  }
];
