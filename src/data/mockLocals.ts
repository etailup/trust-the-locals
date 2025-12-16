export interface Local {
  id: string;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  media?: { type: 'image' | 'video'; src: string }[];
  specialties: string[];
  availability: string;
  languages: string[];
  imageHeight?: string;
  detailImageHeight?: string;
  imagePosition?: string;
  cardImagePosition?: string;
  detailImagePosition?: string;
  cropX?: number;
  cropY?: number;
}

const defaultCropX = 20;
const defaultCropY = 20;

// Private Chefs
export const mockChefs: Local[] = [
  {
    id: 'chef-1',
    name: 'Gianluca',
    category: 'Private Chef',
    description: 'Florentine chef; sailor-chef combining sea and cuisine.',
    fullDescription: 'Gianluca, born in Florence in 1974. A lover of simplicity and organisation, which he believes to be the fundamental pillars of an excellent recipe. He has cooked in many places in Florence and Tuscany, until he decided to combine his two great passions: the sea and cooking. Thus embarking on a career as a chef on yachts. SAILORCHEF',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/chef_gianluca.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/chef_gianluca.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Chef%20Gianluca%20%281%29.mp4' },
    ],
    specialties: ['Italian Cuisine', 'Yacht Chef'],
    availability: 'Available upon request',
    languages: ['English', 'French', 'Spanish'],
    cropX: 20, 
    cropY: 8,
  },
  {
    id: 'chef-2',
    name: 'Rocco',
    category: 'Private Chef',
    description: 'Creative, globetrotter chef inspired by Asia and South America.',
    fullDescription: 'Rocco, born in Marsicovetere in 1987. A free spirit and creative soul: these are the ingredients of his cuisine. Keeping Italy in his heart, at a very young age he went abroad, and there, away from his beloved Italy, was where he found the inspiration to his cuisine. Asia and South America are his muses. Flirting with Japan, he masters his technique with fish and meat. GLOBETROTTER',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/chef_rocco.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/chef_rocco.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Chef%20Rocco%20%281%29.mp4' },
    ],
    cropX: 20,
    cropY: 18,
    specialties: ['Asian Fusion', 'Fish & Meat'],
    availability: 'Available upon request',
    languages: ['English', 'Spanish'],
  },
  {
    id: 'chef-3',
    name: 'Pietro',
    category: 'Private Chef',
    description: 'Florentine chef, pasta lover, perfectionist.',
    fullDescription: 'Pietro, born in Florence in 1993. A perfectionist and never superficial in the kitchen. He is loyal to his territory and its traditions, bringing his love for Chianti into his dishes. He has worked mainly in Tuscany, in Florentine restaurants and hotels. A crazy enthusiast of anecdotes, fresh egg pasta (thanks to his mother’s Emiliana roots) and first courses in general. PASTALOVER',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/chef_pietro.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/chef_pietro.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Chef%20Pietro%20%281%29.mp4' },
    ],
    specialties: ['Fresh Pasta', 'Tuscan Tradition'],
    availability: 'Available upon request',
    languages: ['English'],
    cropX: 20,
    cropY: 18,
  },
];

// Security
export const mockSecurity: Local[] = [
    {
    id: 'security-4',
    name: 'Andrea',
    category: 'Security',
    description: 'Professional personal security specialist.',
    fullDescription: 'Professional personal security specialist.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/bodyguard_2.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/bodyguard_2.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Bodyguard%20Andrea%20%281%29.mp4' },
    ],
    specialties: ['Personal Protection'],
    availability: 'Available upon request',
    languages: ['English'],
    cropX: 20,
    cropY: 11,
  },
  {
    id: 'security-1',
    name: 'Elion',
    category: 'Security',
    description: 'Specialized in personal security and risk management with structured, prevention-driven approach.',
    fullDescription: 'My name is Elion and I am specialized in personal security and risk management. Over the years, I have provided tailored protection and preventive services to individuals and professional environments, ensuring a structured, discreet, and prevention-driven approach.\n\nMy work philosophy is founded on three core principles:\n• Professional excellence – I operate with discipline, expertise, and full regulatory compliance, ensuring the highest level of confidentiality and reliability.\n• Strategic risk assessment – I carefully analyze each environment to identify vulnerabilities and develop customized preventive solutions.\n• Effective and coordinated response – in critical situations, I intervene promptly and precisely, applying targeted operational strategies to guarantee immediate safety.\n\nI am trained in advanced personal defense techniques, threat evaluation, conflict management, and first-response procedures. My mission is to create a secure and controlled environment that allows my clients to carry out their daily activities with confidence, peace of mind, and full protection',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/bodyguard_5.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/bodyguard_5.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Bodyguard%20Elyon%20%281%29.mp4' },
    ],
    specialties: ['Personal Security', 'Risk Management'],
    availability: 'Available upon request',
    languages: ['English', 'French'],
    cropX: 20,
    cropY: 9,
  },
  {
    id: 'security-2',
    name: 'Cosimo',
    category: 'Security',
    description: 'Personal security specialist focused on professionalism, prevention, and active protection.',
    fullDescription: 'Hi my name is Cosimo, and I am a professional specialized in personal security. For years, I have been involved in protection, risk prevention, and the management of critical situations, offering reliable and discreet support to private individuals, professionals, and companies.\n\nMy approach is based on three fundamental principles:\n• Professionalism – I operate with seriousness, compliance with regulations, and maximum confidentiality.\n• Prevention – I analyze every situation to identify potential risks and prevent them effectively.\n• Active protection – I ensure prompt, coordinated, and appropriate intervention in any context.\n\nI am trained in self-defense techniques, threat assessment, conflict management, and first aid. My goal is to create a safe and controlled environment in which my clients can feel protected and at ease.\n\nI remain available for an introductory meeting or to evaluate specific security needs together',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/bodyguard_4.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/bodyguard_4.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Bodyguard%20Cosimo%20%281%29.mp4' },
    ],
    specialties: ['Protection', 'Prevention'],
    availability: 'Available upon request',
    languages: ['English'],
    cropX: defaultCropX,
    cropY: defaultCropY,
  },
  {
    id: 'security-3',
    name: 'Alessandro',
    category: 'Security',
    description: 'Specialized in personal security and risk management.',
    fullDescription: 'Specialized in personal security and risk management.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/bodyguard_1.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/bodyguard_1.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Bodyguard%20Alessandro%20%281%29.mp4' },
    ],
    specialties: ['Personal Security'],
    availability: 'Available upon request',
    languages: ['English', 'French'],
    cropX: 20,
    cropY: 17,
  },
  {
    id: 'security-5',
    name: 'Kuelly',
    category: 'Security',
    description: 'Specialized in personal security, risk management, and preventive strategies.',
    fullDescription: 'Specialized in personal security, risk management, and preventive strategies.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/bodyguard_3.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/bodyguard_3.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Bodyguard%20Kuelly%20%281%29.mp4' },
    ],
    specialties: ['Personal Security', 'Risk Management'],
    availability: 'Available upon request',
    languages: ['English', 'French'],
    cropX: 20,
    cropY: 8,
  },
];

// Personal Trainers
export const mockTrainers: Local[] = [
  {
    id: 'trainer-1',
    name: 'Martina',
    category: 'Personal Trainer',
    description: 'Pilates instructor; structured, playful approach to posture, strength, and mobility.',
    fullDescription: 'ABOUT ME\nHi, I’m Martina, and I believe movement is the most honest conversation we have with ourselves. I grew up loving sport, then fell for yoga, and that curiosity led me to study how the body really works, so we can move not just more, but better. In 2023 I completed a UISP Pilates training, diving into matwork and reformer through plenty of hands-on practice.\nWhat began as personal research has become my profession. I teach Pilates to help people refine posture, build strength and mobility, and feel more at home in their bodies. My approach is rational and structured, yet never rigid: thoughtful progressions, clear cues, and a touch of play. The goal isn’t  perfection—it’s sustainable well-being that carries into daily life.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/pilates.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/pilates.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Pilates_Instructor_Martina.mp4' },
    ],
    specialties: ['Pilates', 'Postural Training'],
    availability: 'Available upon request',
    languages: ['English', 'Spanish'],
    cropX: defaultCropX,
    cropY: defaultCropY,
  },
  {
    id: 'trainer-2',
    name: 'Marco',
    category: 'Personal Trainer',
    description: 'Professional boxer and certified coach bringing boxing discipline to personal training.',
    fullDescription: 'My name is Marco. I’m a professional boxer with 11 matches under my belt, as well as an FPI (Italian Boxing Federation) certified coach, a Fight1 certified Muay Thai instructor, and an ATS certified functional training instructor. I also play for Florence’s historic Calcio Storico football club, proudly representing the Santa Maria Novella neighborhood. I’ll be your in-home personal trainer here in Florence, combining the beauty of our city with the strength, discipline, and joy of boxing.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/PT_boxing.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/PT_boxing.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Boxing_Coach_Marco.mp4' },
    ],
    specialties: ['Boxing', 'Functional Training'],
    availability: 'Available upon request',
    languages: ['English', 'Spanish'],
    cropX: 20,
    cropY: 12,
  },
  {
    id: 'trainer-3',
    name: 'Gina',
    category: 'Personal Trainer',
    description: 'Private training to sculpt muscles and core; English-speaking trainer in Florence.',
    fullDescription: 'Sculpt: Sculpt your muscles and keep your core strong and active with a private training session in Florence, 1:1 or small private group training with our English-speaking trainer, Gina.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/pt_fitness.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/pt_fitness.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Fitness_Instructor_Gina.mp4' },
    ],
    specialties: ['Sculpt Training', 'Core Strength'],
    availability: 'Available upon request',
    languages: ['English'],
    cropX: 20,
    cropY: 10,
  },
];

// Nannies
export const mockNannies: Local[] = [
  {
    id: 'nanny-1',
    name: 'Giulia',
    category: 'Nanny',
    description: 'Professional, loving childcare expert.',
    fullDescription: 'Hello, I am Giulia, everyone’s Mamma. During your stay in Italy, I will lovingly take care of your children. With professionalism, discretion, and an eye for every detail, I ensure your holiday becomes truly special. Don’t trust just anyone. Trust our Italian luxury excellence in childcare.',
    image: '/locals/babysitter.jpg',
    media: [
      { type: 'image', src: '/locals/babysitter.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Babysitter_Giulia.mp4' },
    ],
    specialties: ['Childcare'],
    availability: 'Available upon request',
    languages: ['English', 'French', 'Spanish'],
    cropX: 20,
    cropY: 18,
  },
];

// Guides (merged under Personal Concierge and Guides)
export const mockGuides: Local[] = [
];

// Drivers
export const mockDrivers: Local[] = [
  {
    id: 'driver-1',
    name: 'Alessandro',
    category: 'Driver',
    description: 'Experienced driver from Florence.',
    fullDescription: 'Ciao, I’m Alessandro, 52, from Florence. For 25 years I’ve happily taken care of all my clients coming to visit my beautiful country.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/driver_alessandro.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/driver_alessandro.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Driver%20Alessandro%20(1).mp4' },
    ],
    specialties: ['Driver'],
    availability: 'Available upon request',
    languages: ['English', 'French'],
    cropX: defaultCropX,
    cropY: defaultCropY,
  },
  {
    id: 'driver-2',
    name: 'Guido',
    category: 'Driver',
    description: 'Driver from Florence.',
    fullDescription: 'Buonasera, my name is Guido, 56 years old, I’m from Florence. I started this job only two years ago and I really like it.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/driver_guido.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/driver_guido.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Driver%20Guido%20(1).mp4' },
    ],
    specialties: ['Driver'],
    availability: 'Available upon request',
    languages: ['English'],
    cropX: 20,
    cropY: 15,
  },
  {
    id: 'driver-3',
    name: 'Matteo',
    category: 'Driver',
    description: 'Driver from Florence.',
    fullDescription: 'Ciao, my name is Matteo, 45 years old, I’m from Florence and I enjoy sharing the beauty of my region with all my clients.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/driver_matteo.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/driver_matteo.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Driver%20Matteo%20(1).mp4' },
    ],
    specialties: ['Driver'],
    availability: 'Available upon request',
    languages: ['English', 'Spanish'],
    cropX: defaultCropX,
    cropY: defaultCropY,
  },
  {
    id: 'driver-4',
    name: 'Jacopo',
    category: 'Driver',
    description: 'Driver from Florence.',
    fullDescription: 'Ciao, my name is Jacopo, 41 years old, I love my city, Florence, and I’m happy driving all my clients around it. I’m doing it from only few months but I really like it.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/driver_jacopo.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/driver_jacopo.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Driver%20Jacopo%20(1).mp4' },
    ],
    specialties: ['Driver'],
    availability: 'Available upon request',
    languages: ['English', 'French', 'Spanish'],
    cropX: 20,
    cropY: 24,
  },
  {
    id: 'driver-5',
    name: 'Giulio',
    category: 'Driver',
    description: 'Driver from Florence.',
    fullDescription: 'Buonasera, my name is Giulio, I’m 29 and born and raised in Florence. I’ve been doing this job for four years now, and every day I enjoy sharing my city and its stories with travelers.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/driver_giulio.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/driver_giulio.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Driver%20Giulio%20(1).mp4' },
    ],
    specialties: ['Driver'],
    availability: 'Available upon request',
    languages: ['English'],
    cropX: 20,
    cropY: 10,
  },
  {
    id: 'driver-6',
    name: 'Tommaso',
    category: 'Driver',
    description: 'Driver from Florence.',
    fullDescription: 'Buonasera, I’m Tommaso, 28, Florentine. I started this job two years ago, and I love creating smooth, fun, stress-free days for anyone visiting Tuscany.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/driver_tommaso.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/driver_tommaso.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Driver%20Tommaso%20(1).mp4' },
    ],
    specialties: ['Driver'],
    availability: 'Available upon request',
    languages: ['English', 'Spanish'],
    cropX: 20,
    cropY: 14,
  },
  {
    id: 'driver-7',
    name: 'Niccolò',
    category: 'Driver',
    description: 'Driver from Florence.',
    fullDescription: 'Buonasera, my name is Niccolò, I’m 38 and proudly from Florence. After eleven years on the road, I still get a kick out of meeting new people and showing them the hidden corners that make this region special.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/driver_niccolo.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/driver_niccolo.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Driver%20Niccol%C3%B2%20(1).mp4' },
    ],
    specialties: ['Driver'],
    availability: 'Available upon request',
    languages: ['English', 'French'],
    cropX: 20,
    cropY: 12,
  },
  {
    id: 'driver-8',
    name: 'Giacomo',
    category: 'Driver',
    description: 'Driver from Florence.',
    fullDescription: 'Ciao, my name is Giacomo, I’m 48 and proudly from Florence. I’m a professional driver in town for 3 years and it’s always a pleasure sharing the beauty of the region with all my clients.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/driver_giacomo.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/driver_giacomo.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Driver%20Giacomo%20%281%29.mp4' },
    ],
    specialties: ['Driver'],
    availability: 'Available upon request',
    languages: ['English'],
    cropX: defaultCropX,
    cropY: defaultCropY,
  },
];

// Personal Concierge
export const mockConcierges: Local[] = [
  {
    id: 'concierge-1',
    name: 'Mattia',
    category: 'Personal Concierge and Guides',
    description: 'Enterprising, trilingual, expert in client management across backgrounds.',
    fullDescription: 'I am an enterprising, trilingual person with excellent problem-solving skills and a strong ability to manage clients of different types and backgrounds. I am also proficient in all the duties required within my tourism agency, thanks to a broad and practical knowledge of the history and heritage of the city of Florence.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/PC_2.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/PC_2.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Personal%20Concierge%20Mattia%20%281%29.mp4' },
    ],
    specialties: ['Tourism', 'Problem Solving'],
    availability: 'Available upon request',
    languages: ['English', 'French', 'Spanish'],
    cropX: 20,
    cropY: 15,
  },
  {
    id: 'concierge-2',
    name: 'Cristian',
    category: 'Personal Concierge and Guides',
    description: 'Motivated professional ensuring unforgettable holidays; creator of Wine Safari Tour.',
    fullDescription: 'Hello, my name is Cristian. I am a highly motivated local professional committed to delivering exceptional service and ensuring every guest enjoys an unforgettable holiday. I manage complex situations with ease, adapt quickly to different client personalities, and speak English and Spanish fluently. I am also the creator of the Wine Safari Tour, an exclusive experience that takes guests aboard our Defender to discover outstanding local wineries.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/PC_1.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/PC_1.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Personal%20Concierge%20Cristian%20%281%29.mp4' },
    ],
    specialties: ['Wine Safari Tour'],
    availability: 'Available upon request',
    languages: ['English', 'Spanish'],
    cropX: 20,
    cropY: 13,
  },
  {
    id: 'concierge-3',
    name: 'Claudia',
    category: 'Personal Concierge and Guide',
    description: 'Florentine local expert and storyteller with deep passion for Tuscany.',
    fullDescription: 'Hello my dear guests! It’s Claudia here, always with a big smile and even a bigger passion for my homeland: Tuscany. Born and raised in Florence, I’m proud to be your local expert and storyteller. I’ll share not only the beauty and history of our cities and countryside, but also the hidden corners, unique traditions and curious anecdotes that bring this land to life. So, what are we waiting for? Let’s start your most personal, authentic, and unforgettable journey!',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/PC_3.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/PC_3.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Personal%20Concierge%20Claudia%20%281%29.mp4' },
    ],
    specialties: ['Tourism Agency'],
    availability: 'Available upon request',
    languages: ['English', 'French', 'Spanish'],
    cropX: 20,
    cropY: 9,
  },
];

// Massage Therapists
export const mockMassageTherapists: Local[] = [
  {
    id: 'massage-1',
    name: 'Monica',
    category: 'Massage Therapist',
    description: 'Beauty therapist offering a range of massages and treatments.',
    fullDescription: "My name is Monica. I'm 47 years old and have been working as a beauty therapist for 29 years. I offer various types of massage, including decontracting and relaxing massage, draining and modeling massage, holistic, facial and body treatments, and other treatments for personal well-being. I enjoy transmitting positive energy and inspiring emotions.",
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/massaggiatrice_2.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/massaggiatrice_2.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Massaggiatrice%20Monica%20%281%29.mp4' },
    ],
    specialties: ['Massage'],
    availability: 'Available upon request',
    languages: ['Italian', 'English'],
    cropX: defaultCropX,
    cropY: defaultCropY,
  },
  {
    id: 'massage-2',
    name: 'Dolores',
    category: 'Massage Therapist',
    description: 'Beauty therapist offering a range of massages and treatments.',
    fullDescription: "Hy, my name is Dolores. I'm 40 years old and have been working as a beauty therapist for 20 years. I offer various types of massage, including decontracting and relaxing massage, draining and modeling massage, holistic, facial and body treatments, and other treatments for personal well-being. I love doing this job because I give well-being and people feel pampered.",
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/massaggiatrice_1.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/massaggiatrice_1.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Massaggiatrice%20Dolores%20%281%29.mp4' },
    ],  
    specialties: ['Massage'],
    availability: 'Available upon request',
    languages: ['Italian', 'English'],
    cropX: defaultCropX,
    cropY: defaultCropY,
  },
  {
    id: 'physio-1',
    name: 'Francesco',
    category: 'Massage Therapist',
    description: 'A leading physiotherapist known for refined, personalized treatments.',
    fullDescription:
      'A leading physiotherapist known for refined, personalized treatments designed to restore balance, mobility, and optimal body performance.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/fisioterapista.jpg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/fisioterapista.jpg' },
      { type: 'video', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/locals/Fisioterapista%20Francesco.MP4' },
    ],
    specialties: ['Physiotherapy', 'Rehab', 'Mobility'],
    availability: 'Available upon request',
    languages: ['English'],
    cropX: defaultCropX,
    cropY: defaultCropY,
  },
];

// Physiotherapists
export const mockPhysiotherapists: Local[] = [];

export const mockLocalCare: Local[] = [
  {
    id: 'local-care-1',
    name: 'Local Care',
    category: 'Local Care',
    description: '24/7 remote concierge support for agencies whose guests are traveling in Italy.',
    fullDescription:
      'Local Care is our exclusive remote assistance service dedicated to international travel agencies and their clients visiting Italy. Our team provides 24/7 real-time support to solve any issue, manage unexpected situations, and arrange last-minute requests — all without requiring physical presence.\n\nFrom urgent reservations to itinerary changes, from on-the-spot guidance to quick problem resolution, Local Care ensures that every traveler feels supported, safe, and fully cared for throughout their entire stay in Italy.\n\nA reliable, human, always-available concierge — directly in your pocket.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/file_final_2.svg',
    media: [
      { type: 'image', src: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/file_final_2.svg' },
    ],
    specialties: ['24/7 Remote Assistance', 'Crisis Management'],
    availability: 'Available 24/7',
    languages: ['English', 'Italian'],
    cropX: defaultCropX,
    cropY: defaultCropY,
  },
];

// Combined export
export const mockLocals: Local[] = [
  ...mockChefs,
  ...mockSecurity,
  ...mockTrainers,
  ...mockNannies,
  ...mockDrivers,
  ...mockConcierges,
  ...mockGuides,
  ...mockMassageTherapists,
  ...mockPhysiotherapists,
];
