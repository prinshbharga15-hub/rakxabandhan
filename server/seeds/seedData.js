const mongoose = require('mongoose');
const Wish = require('../models/Wish');
const GalleryItem = require('../models/GalleryItem');
const RakhiDesign = require('../models/RakhiDesign');
require('dotenv').config({ path: '../.env' });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/raksha_bandhan_db';

const defaultRakhis = [
  {
    creatorName: 'આરોહી',
    recipientName: 'દેવ',
    threadColor: '#DC2626',
    secondaryThreadColor: '#F59E0B',
    threadStyle: 'mauli',
    centerMotif: 'floral_mandala',
    dialColor: '#D97706',
    gemstone: 'ruby',
    beadType: 'gold_pearl',
    customText: 'વીરા',
    likes: 18
  },
  {
    creatorName: 'રીયા',
    recipientName: 'કબીર',
    threadColor: '#7C3AED',
    secondaryThreadColor: '#FBBF24',
    threadStyle: 'royal_velvet',
    centerMotif: 'peacock',
    dialColor: '#D97706',
    gemstone: 'emerald',
    beadType: 'rudraksha',
    customText: 'ભાઈ',
    likes: 24
  }
];

const wishesSeed = [
  {
    senderName: 'અનન્યા શર્મા',
    recipientName: 'આરવ શર્મા',
    relationship: 'મોટો ભાઈ',
    message: 'વ્હાલા ભાઈ, તું હમેશાં મારી ઢાલ અને સપોર્ટ બનીને રહ્યો છે. આ રક્ષાબંધન પર તારા જીવનમાં સુખ, શાંતિ અને અપાર સફળતા રહે તેવી મંગલ કામના!',
    language: 'gu',
    category: 'heartfelt',
    likes: 42,
    isFeatured: true
  },
  {
    senderName: 'રોહન વર્મા',
    recipientName: 'પૂજા વર્મા',
    relationship: 'નાની બહેન',
    message: 'હેપ્પી રક્ષાબંધન બહેની! તારી મુસ્કાન સદાય ખીલતી રહે અને તારી દરેક ઈચ્છા પૂરી થાય. તને હમેશાં ખુશ રાખવાનું મારું વચન છે.',
    language: 'gu',
    category: 'funny',
    likes: 29,
    isFeatured: true
  },
  {
    senderName: 'પ્રિયા આયંગર',
    recipientName: 'કાર્તિક આયંગર',
    relationship: 'ભાઈ',
    message: 'કંકુ કેરો ચાંદલો ને રેશમ કેરી દોર, સાવન કેરી હેલીમાં વ્હાલ વરસે ચારેકોર! રક્ષાબંધનની ખૂબ ખૂબ શુભકામનાઓ ભાઈલા!',
    language: 'gu',
    category: 'poetic',
    likes: 56,
    isFeatured: true
  },
  {
    senderName: 'દિવ્યા કપૂર',
    recipientName: 'કબીર કપૂર',
    relationship: 'જોડિયા ભાઈ',
    message: 'એક જ દિવસે જન્મ્યા અને આખી જિંદગીના સૌથી પાક્કા મિત્ર બન્યા. હેપ્પી રાખી મારા વ્હાલા કબીર!',
    language: 'gu',
    category: 'heartfelt',
    likes: 38,
    isFeatured: false
  },
  {
    senderName: 'સ્નેહા પટેલ',
    recipientName: 'દેવ પટેલ',
    relationship: 'નાનો ભાઈ',
    message: 'મારા નાના વીરા, પ્રભુ તને સદાય તંદુરસ્ત રાખે અને તું પ્રગતિના નવા શિખરો સર કરે. રક્ષાબંધન મુબારક!',
    language: 'gu',
    category: 'blessing',
    likes: 19,
    isFeatured: false
  },
  {
    senderName: 'વિક્રમ રાજપૂત',
    recipientName: 'અદિતી રાજપૂત',
    relationship: 'મોટી બહેન',
    message: 'બહેન તારી ખુશી એ જ મારી સાચી દોલત છે. દરેક જન્મમાં તારો જ ભાઈ બનવાનું સૌભાગ્ય મળે એવી ઈશ્વરને પ્રાર્થના. રક્ષાબંધનની હાર્દિક શુભેચ્છાઓ!',
    language: 'gu',
    category: 'heartfelt',
    likes: 64,
    isFeatured: true
  }
];

const gallerySeed = [
  {
    id: 1,
    title: "બહેને ભાઈના કાંડે બાંધી પવિત્ર રાખડી",
    category: "siblings",
    imageUrl: "/assets/closeup-hands-sister-tying-rakhi-260nw-1782940118.webp",
    description: "કંકુ-તિલક કરી બહેને ભાઈના લાંબા આયુષ્ય અને સુખ-સમૃદ્ધિની પ્રાર્થના સાથે પવિત્ર રક્ષા સૂત્ર બાંધ્યું.",
    likes: 312
  },
  {
    id: 2,
    title: "રાધા-કૃષ્ણ ડિઝાઇનર રાખડી અને ગિફ્ટ બોક્સ",
    category: "rakhis",
    imageUrl: "/assets/Radha-Krishna-Rakhi-Gift-Box-with-Laxmi-Ganesh-Idol_533x.webp",
    description: "લક્ષ્મી-ગણેશજીની મૂર્તિ, પૂજાની સામગ્રી અને ઉત્તમ કુંદન રાખડીથી સજ્જ ભવ્ય તહેવાર ગિફ્ટ બોક્સ.",
    likes: 420
  },
  {
    id: 3,
    title: "શુદ્ધ ઘીની મોતીચૂર લાડુ અને કાજુ કતરી થાળી",
    category: "sweets",
    imageUrl: "/assets/images (3).jpg",
    description: "રક્ષાબંધનના શુભ અવસરે મોં મીઠું કરાવવા માટે ઘેવર, કાજુ કતરી અને કેસરિયા લાડુની મિષ્ટાન્ન થાળી.",
    likes: 385
  },
  {
    id: 4,
    title: "પરિવાર સાથે ભવ્ય રક્ષાબંધન ઉત્સવ મિલન",
    category: "family",
    imageUrl: "/assets/images (2).jpg",
    description: "દાદા-દાદી, ભાઈઓ અને બહેનો બધા સાથે મળીને હસી-ખુશીથી શ્રાવણી પૂર્ણિમાની ભવ્ય ઉજવણી કરે છે.",
    likes: 450
  },
  {
    id: 5,
    title: "ભાઈ-બહેનનો ખુશીઓભર્યો તહેવાર અને હાસ્ય",
    category: "siblings",
    imageUrl: "/assets/360_F_2036594154_JCJia5XZe6rArcduB3tVZ79jLaN6H7IZ.jpg",
    description: "પરંપરાગત વસ્ત્રોમાં સજ્જ ભાઈ-બહેન રાખડી બાંધ્યા પછી ગિફ્ટ ખોલીને આનંદ માણી રહ્યા છે.",
    likes: 298
  },
  {
    id: 6,
    title: "રાજસ્થાની કુંદન અને જરીવાળી રોયલ રાખડી",
    category: "rakhis",
    imageUrl: "/assets/NVR1136_8ea64a1a-2ca3-4add-bb4f-e9dd21c6dae8.webp",
    description: "સોનેરી તાર, મોતી અને રૂબી રત્નોથી હાથથી બનાવેલી આકર્ષક રોયલ કુંદન રાખડીઓનો સંગ્રહ.",
    likes: 365
  },
  {
    id: 7,
    title: "ભાઈ-બહેનનો સ્નેહભર્યો રાખડી ઉત્સવ કાર્ટૂન",
    category: "siblings",
    imageUrl: "/assets/happy-raksha-bandhan-cartoon-illustration-sister-tying-rakhi-her-brothers-wrist-to-signify-bond-love-indian-festival-249645669.webp",
    description: "બહેન પોતાના વ્હાલા ભાઈને તિલક કરી રાખડી બાંધીને મીઠાઈ ખવડાવતી સુંદર કલાત્મક તસવીર.",
    likes: 330
  },
  {
    id: 8,
    title: "પવિત્ર આરતી થાળી, કંકુ-ચોખા અને દીપ પૂજન",
    category: "rituals",
    imageUrl: "/assets/images (1).jpg",
    description: "પીતળની દીપ થાળી, અક્ષત, સુગંધિત ગુલાબ અને પવિત્ર રાખડી સાથે તૈયાર કરેલ શુભ આરતી થાળી.",
    likes: 345
  },
  {
    id: 9,
    title: "રક્ષાબંધનની સ્વાદિષ્ટ મીઠાઈઓ અને ગિફ્ટ પેક",
    category: "sweets",
    imageUrl: "/assets/images (4).jpg",
    description: "તહેવારમાં ભાઈ-બહેનનું મોં મીઠું કરાવવા માટે સુંદર બોક્સમાં પેક કરેલી સ્વાદિષ્ટ પરંપરાગત મીઠાઈઓ.",
    likes: 275
  },
  {
    id: 10,
    title: "આનંદમય પરિવારિક મેળાવડો અને આશીર્વાદ",
    category: "family",
    imageUrl: "/assets/images (5).jpg",
    description: "ઘરમાં વડીલોના આશીર્વાદ લઈ ભાઈ-બહેનો એકબીજાને શુભકામનાઓ આપી ઉજવણી કરે છે.",
    likes: 390
  },
  {
    id: 11,
    title: "પ્રજ્વલિત દીવા અને તાજા પુષ્પોથી સજેલી પૂજા થાળી",
    category: "rituals",
    imageUrl: "/assets/images (6).jpg",
    description: "જગમગતા કોડિયાના દીવા અને કેસૂડા-ગલગોટાના ફૂલોથી સુશોભિત મંગલકારી રક્ષાબંધન પૂજા થાળી.",
    likes: 360
  },
  {
    id: 12,
    title: "ભાઈ-બહેનની મસ્તી અને તહેવારની મોજ",
    category: "siblings",
    imageUrl: "/assets/ff97990b8e894bb5f1c0a54e1823a894.jpg",
    description: "એકબીજાને મીઠાઈ ખવડાવી, બાળપણની વાતો યાદ કરી ખડખડાટ હસતા ભાઈ અને બહેન.",
    likes: 320
  },
  {
    id: 13,
    title: "પરંપરાગત ગુજરાતી તહેવારની મીઠાઈઓ",
    category: "sweets",
    imageUrl: "/assets/images.jpg",
    description: "શુદ્ધ દેશી ઘી અને ડ્રાયફ્રૂટ્સથી બનેલી સ્વાદિષ્ટ ગુજરાતી મિષ્ટાન થાળી.",
    likes: 310
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('🌱 Connected to MongoDB for Gujarati Seeding...');

    await Wish.deleteMany({});
    await Wish.insertMany(wishesSeed);

    await GalleryItem.deleteMany({});
    await GalleryItem.insertMany(gallerySeed);

    console.log('✅ MongoDB Database Seeded Successfully with Gujarati Celebrations!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding Error:', err.message);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = {
  defaultWishes: wishesSeed,
  defaultGallery: gallerySeed,
  defaultRakhis,
  wishesSeed,
  gallerySeed
};
