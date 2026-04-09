const heroImages = {
    heritage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=80',
    nature: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    adventure: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
    coast: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    spiritual: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=80',
    city: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80',
};

const budgetLabels = { economical: 'Economical', moderate: 'Moderate', luxury: 'Luxury' };
const averageRange = ([min, max]) => (min + max) / 2;
const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const formatCurrency = (value) => formatter.format(Math.round(value));
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const d = ([
    slug, name, state, category, imageKey, minDays, idealDays, stay, food, transport, attractions, cuisines, tags, aliases = [],
]) => ({
    slug, name, state, category, image: heroImages[imageKey] || heroImages.city, minDays, maxDays: 14, idealDays,
    stay: { economical: [stay[0], stay[1]], moderate: [stay[2], stay[3]], luxury: [stay[4], stay[5]] },
    food: { economical: food[0], moderate: food[1], luxury: food[2] },
    transport: { economical: transport[0], moderate: transport[1], luxury: transport[2] },
    attractions, cuisines, tags, aliases,
});

export const indiaDestinationCatalog = [
    d(['tirupati','Tirupati','Andhra Pradesh','heritage','spiritual',3,4,[1100,2000,2800,5200,7500,15000],[550,1250,2800],[450,900,2200],['Sri Venkateswara Temple','Akasa Ganga','Papavinasam','Govindaraja Swamy Temple','Kapila Theertham'],['Tirupati laddu','Andhra meals','pulihora'],['spiritual','family'],['Tirumala','Tirupati Balaji']]),
    d(['araku-valley','Araku Valley','Andhra Pradesh','nature','nature',3,4,[1200,2200,3000,5500,7000,13500],[600,1300,2800],[550,1100,2400],['Coffee Museum','Padmapuram Gardens','Borra Caves','Ananthagiri viewpoint','Katiki Falls'],['bamboo chicken','tribal millet meals','Araku coffee'],['nature','hills','road-trip']]),
    d(['mechuka','Mechuka','Arunachal Pradesh','adventure','adventure',4,5,[1800,2800,4000,6500,8500,15000],[700,1450,3000],[700,1300,2800],['Samten Yongcha Monastery','Siyom riverfront','Hanging bridge','Dorjeeling village','Hanuman Point'],['thukpa','momo','Memba-style stew'],['adventure','mountains','offbeat']]),
    d(['guwahati','Guwahati','Assam','heritage','spiritual',3,4,[1300,2300,3200,6000,8500,17000],[650,1400,3000],[500,950,2300],['Kamakhya Temple','Umananda Temple','Brahmaputra river cruise','Assam State Museum','Fancy Bazaar'],['Assamese thali','masor tenga','pitha'],['heritage','spiritual','food']]),
    d(['kaziranga','Kaziranga','Assam','adventure','adventure',3,4,[1700,2800,4200,7000,9500,18000],[700,1500,3200],[750,1350,2800],['Central Range safari','Western Range safari','Eastern Range safari','Kaziranga Orchid Park','wetland sunset'],['duck curry','bamboo shoot dishes','pitha'],['wildlife','adventure','nature']]),
    d(['bodh-gaya','Bodh Gaya','Bihar','heritage','spiritual',3,4,[1000,1800,2600,4800,7000,13500],[500,1150,2600],[350,800,2000],['Mahabodhi Temple','Bodhi Tree','Great Buddha Statue','Thai Monastery','Nalanda ruins'],['litti chokha','khaja','Tibetan noodles'],['spiritual','heritage','peaceful']]),
    d(['jagdalpur','Jagdalpur','Chhattisgarh','nature','nature',3,4,[1400,2300,3200,5600,8000,14500],[600,1300,2800],[650,1200,2500],['Chitrakote Falls','Tirathgarh Falls','Kanger Valley National Park','Kutumsar Caves','Bastar Palace'],['chila','faraa','tribal dishes'],['nature','offbeat','culture']]),
    d(['goa','Goa','Goa','adventure','coast',3,4,[1700,3000,4200,7800,10000,22000],[800,1700,3600],[650,1200,2800],['Fort Aguada','Candolim Beach','Calangute','Basilica of Bom Jesus','Anjuna Beach'],['Goan fish curry rice','bebinca','cafreal'],['beaches','adventure','nightlife'],['North Goa','Goa Beach Adventure']]),
    d(['ahmedabad','Ahmedabad','Gujarat','heritage','heritage',3,4,[1400,2500,3500,6500,9000,18000],[650,1350,3000],[450,900,2200],['Sabarmati Ashram','Pol houses','Manek Chowk','Adalaj Stepwell','Sabarmati Riverfront'],['Gujarati thali','fafda jalebi','khandvi'],['heritage','food','city']]),
    d(['dwarka','Dwarka','Gujarat','heritage','spiritual',3,4,[1200,2200,3000,5200,7800,15000],[550,1200,2800],[450,900,2200],['Dwarkadhish Temple','Gomti Ghat','Beyt Dwarka','Nageshwar Jyotirlinga','Shivrajpur Beach'],['Gujarati satvik thali','thepla','shrikhand'],['spiritual','coast','heritage']]),
    d(['kurukshetra','Kurukshetra','Haryana','heritage','spiritual',3,3,[1100,1900,2700,4800,7000,12500],[550,1150,2500],[350,750,1900],['Brahma Sarovar','Sannihit Sarovar','Sri Krishna Museum','Jyotisar','Bhadrakali Temple'],['Haryanvi thali','bajra roti','lassi'],['heritage','spiritual','family']]),
    d(['manali','Manali','Himachal Pradesh','adventure','adventure',4,5,[1700,2900,4200,7600,10500,22000],[700,1500,3200],[650,1250,2800],['Hadimba Temple','Old Manali','Solang Valley','Atal Tunnel','Sissu waterfall'],['siddu','trout fish','Himachali dham'],['mountains','adventure','honeymoon']]),
    d(['spiti-valley','Spiti Valley','Himachal Pradesh','adventure','adventure',6,8,[1800,3000,4300,7600,10000,21000],[750,1550,3200],[900,1700,3600],['Kaza market','Key Monastery','Kibber village','Komic','Langza','Pin Valley'],['thenthuk','momos','barley village meals'],['road-trip','adventure','mountains']]),
    d(['ranchi','Ranchi','Jharkhand','nature','nature',3,4,[1200,2200,3000,5400,7600,14500],[550,1250,2800],[500,950,2300],['Rock Garden','Kanke Dam','Tagore Hill','Hundru Falls','Dassam Falls'],['dhuska','rugra curry','malpua'],['nature','waterfalls','family']]),
    d(['hampi','Hampi','Karnataka','heritage','heritage',3,4,[1300,2400,3200,6200,8500,16500],[600,1350,3000],[450,900,2200],['Virupaksha Temple','Hampi Bazaar','Hemakuta Hill','Royal Enclosure','Vittala Temple'],['North Karnataka meals','jolada rotti','banana pancakes'],['heritage','ruins','photography']]),
    d(['coorg','Coorg','Karnataka','nature','nature',3,4,[1700,2800,4200,7200,10000,20000],[700,1450,3200],[650,1200,2600],['Madikeri Fort','Raja Seat','Abbey Falls','Dubare Elephant Camp','coffee estate walk'],['pandi curry','akki rotti','Coorg coffee'],['nature','food','road-trip']]),
    d(['kochi','Kochi','Kerala','heritage','coast',3,4,[1500,2600,3600,6800,9500,18500],[700,1450,3200],[450,900,2200],['Chinese Fishing Nets','St. Francis Church','Mattancherry Palace','Jew Town','Marine Drive'],['appam and stew','karimeen pollichathu','banana chips'],['heritage','food','coast']]),
    d(['alappuzha','Alappuzha','Kerala','nature','coast',3,4,[1800,3200,4500,8000,12000,24000],[700,1500,3400],[500,950,2300],['Alleppey Beach','canal shikara ride','houseboat cruise','Kuttanad villages','Marari'],['Karimeen fry','toddy shop food','puttu and kadala'],['nature','relaxing','backwaters']]),
    d(['khajuraho','Khajuraho','Madhya Pradesh','heritage','heritage',3,3,[1300,2300,3200,5800,8500,16000],[550,1250,2800],[400,850,2100],['Kandariya Mahadeva Temple','Lakshmana Temple','Parsvanath Temple','Raneh Falls','light and sound show'],['Bundeli thali','dal bafla','mawa bati'],['heritage','architecture','culture']]),
    d(['ujjain','Ujjain','Madhya Pradesh','heritage','spiritual',3,3,[1100,2100,2900,5200,7600,14500],[550,1200,2700],[350,800,2000],['Mahakaleshwar Temple','Harsiddhi Temple','Ram Ghat','Kal Bhairav Temple','Mangalnath Temple'],['poha jalebi','dal bafla','malpua'],['spiritual','heritage','family']]),
    d(['mumbai','Mumbai','Maharashtra','heritage','city',3,5,[2200,4200,5500,10000,14000,32000],[900,2000,4200],[550,1150,3000],['Gateway of India','Kala Ghoda','Marine Drive','Crawford Market','Elephanta Caves'],['vada pav','Parsi berry pulao','kulfi falooda'],['city','food','heritage']]),
    d(['mahabaleshwar','Mahabaleshwar','Maharashtra','nature','nature',3,4,[1500,2600,3600,6500,9000,18500],[650,1350,3000],[550,1000,2400],['Arthur Seat','Kate Point','Venna Lake','Mapro Garden','Pratapgad Fort'],['corn patties','strawberries with cream','Maharashtrian thali'],['nature','hills','relaxing']]),
    d(['imphal','Imphal','Manipur','heritage','heritage',3,4,[1300,2400,3200,6000,8200,15500],[650,1350,2900],[500,950,2300],['Kangla Fort','Ima Keithel','War Cemetery','Loktak Lake','State Museum'],['eromba','kangsoi','chak-hao kheer'],['culture','heritage','food']]),
    d(['shillong','Shillong','Meghalaya','nature','nature',3,4,[1600,2800,3800,6800,9500,18500],[700,1450,3200],[600,1100,2500],['Ward’s Lake','Police Bazaar','Shillong Peak','Elephant Falls','Laitlum Canyons'],['jadoh','dohneiiong','pineapple cakes'],['nature','hills','food']]),
    d(['cherrapunji','Cherrapunji','Meghalaya','adventure','adventure',3,4,[1700,2900,4000,7000,9800,19000],[700,1450,3200],[700,1300,2800],['Mawsmai Cave','Nohkalikai Falls','Nongriat trail','Double Decker Root Bridge','Dainthlen Falls'],['smoked pork','jadoh','local oranges'],['adventure','nature','trekking']]),
    d(['munnar','Munnar','Kerala','nature','nature',3,4,[1600,2800,3800,7000,9800,19500],[650,1400,3100],[550,1050,2400],['Tea Museum','Eravikulam National Park','Mattupetty Dam','Top Station','Echo Point'],['Kerala meals','cardamom tea','appam and stew'],['nature','hills','tea'],['Munnar Tea Gardens']]),
    d(['gulmarg','Gulmarg','Jammu and Kashmir','adventure','nature',3,4,[1900,3300,4700,8500,13000,26500],[750,1550,3400],[700,1300,2900],['Gulmarg Gondola','meadow circuit','St. Mary’s Church','golf course area','Khilanmarg'],['kahwa','wazwan dishes','Kashmiri breads'],['adventure','snow','mountains'],['Gulmarg Ski Retreat']]),
    d(['jaisalmer','Jaisalmer','Rajasthan','adventure','heritage',3,4,[1600,2900,3900,7200,10500,21500],[650,1400,3200],[550,1050,2500],['Jaisalmer Fort','Patwon Ki Haveli','Gadisar Lake','Sam Sand Dunes','Kuldhara'],['dal pakwan','ker sangri','gatte ki sabzi'],['adventure','desert','heritage'],['Jaisalmer Desert Safari']]),
    d(['aizawl','Aizawl','Mizoram','heritage','heritage',3,3,[1300,2300,3100,5800,7800,14500],[650,1300,2800],[450,900,2200],['Mizoram State Museum','Bara Bazar','Durtlang viewpoint','Solomon’s Temple','Berawtlang complex'],['bai','smoked pork','sticky rice'],['culture','city','food']]),
    d(['kohima','Kohima','Nagaland','heritage','heritage',3,4,[1500,2500,3500,6500,8800,16500],[700,1450,3100],[500,950,2300],['War Cemetery','State Museum','Kisama Heritage Village','Khonoma village','ridge viewpoints'],['smoked pork with bamboo shoot','axone dishes','galho'],['culture','heritage','food']]),
    d(['bhubaneswar-puri-konark','Bhubaneswar-Puri-Konark','Odisha','heritage','spiritual',4,5,[1400,2500,3400,6400,9000,17500],[650,1350,3000],[650,1200,2700],['Lingaraj Temple','Mukteshwar Temple','Konark Sun Temple','Jagannath Temple area','Puri beach'],['dalma','chena poda','machha besara'],['heritage','spiritual','coast']]),
    d(['amritsar','Amritsar','Punjab','heritage','spiritual',3,3,[1400,2500,3500,6200,9000,17500],[700,1450,3200],[400,850,2100],['Golden Temple','Partition Museum','Hall Bazaar','Jallianwala Bagh','Wagah border ceremony'],['langar meal','amritsari kulcha','lassi'],['spiritual','food','heritage']]),
    d(['jaipur','Jaipur','Rajasthan','heritage','heritage',3,4,[1500,2700,3800,7000,11000,23000],[700,1450,3300],[500,1000,2500],['Hawa Mahal','City Palace','Jantar Mantar','Amber Fort','Johri Bazaar'],['dal baati churma','pyaaz kachori','ghewar'],['heritage','food','shopping'],['Jaipur Royalty Tour']]),
    d(['udaipur','Udaipur','Rajasthan','heritage','heritage',3,4,[1700,3000,4200,7800,12000,26000],[700,1450,3400],[450,900,2300],['City Palace','Jagdish Temple','Lake Pichola','Sajjangarh','Fateh Sagar'],['dal baati','gatte ki sabzi','mawa kachori'],['heritage','romantic','lakes']]),
    d(['gangtok','Gangtok','Sikkim','nature','nature',4,5,[1800,3000,4200,7600,10000,21000],[700,1450,3200],[700,1300,2800],['MG Marg','Enchey Monastery','Tashi View Point','Tsomgo Lake','Namgyal Institute'],['momos','thukpa','sel roti'],['mountains','nature','family']]),
    d(['pelling','Pelling','Sikkim','nature','nature',3,4,[1700,2800,4000,7200,9800,19500],[700,1450,3200],[700,1300,2800],['Pemayangtse Monastery','Rabdentse ruins','Pelling skywalk','Rimbi Waterfall','Khecheopalri Lake'],['thenthuk','momos','gundruk'],['nature','mountains','peaceful']]),
    d(['chennai-mahabalipuram','Chennai-Mahabalipuram','Tamil Nadu','heritage','coast',4,5,[1700,3000,4200,7800,11000,22000],[700,1450,3200],[600,1100,2600],['Marina Beach','Kapaleeshwarar Temple','Government Museum','Shore Temple','Five Rathas'],['filter coffee','Chettinad meals','kothu parotta'],['heritage','food','coast']]),
    d(['rameswaram','Rameswaram','Tamil Nadu','heritage','spiritual',3,4,[1300,2400,3200,5800,8200,15500],[600,1300,2900],[500,950,2300],['Ramanathaswamy Temple','Agni Theertham','Pamban Bridge viewpoints','Dhanushkodi ruins','Kothandaramaswamy Temple'],['South Indian meals','fresh seafood','idiyappam'],['spiritual','coast','heritage']]),
    d(['hyderabad','Hyderabad','Telangana','heritage','city',3,4,[1600,2800,4000,7200,11000,22000],[750,1550,3400],[500,950,2400],['Charminar','Laad Bazaar','Golconda Fort','Qutb Shahi Tombs','Salar Jung Museum'],['Hyderabadi biryani','haleem','irani chai'],['food','heritage','city']]),
    d(['agartala','Agartala','Tripura','heritage','heritage',3,3,[1200,2200,3000,5500,7800,14500],[600,1250,2800],[450,850,2100],['Ujjayanta Palace','Jagannath Temple','Neermahal','Rudrasagar Lake','Tripura Sundari Temple'],['mui borok dishes','fish curry','rice cakes'],['heritage','culture','family']]),
    d(['varanasi','Varanasi','Uttar Pradesh','heritage','spiritual',3,4,[1300,2400,3300,6200,9000,18000],[600,1300,3000],[400,850,2100],['Assi Ghat','Kashi Vishwanath corridor','Dashashwamedh Aarti','Sarnath','Banarasi silk cluster'],['kachori sabzi','tamatar chaat','banarasi paan'],['spiritual','heritage','food'],['Varanasi Spiritual Walk']]),
    d(['agra','Agra','Uttar Pradesh','heritage','heritage',3,3,[1400,2500,3400,6200,9500,18500],[650,1300,3000],[450,900,2200],['Taj Mahal','Mehtab Bagh','Agra Fort','Itmad-ud-Daulah','Kinari Bazaar'],['petha','bedai and aloo','mughlai curries'],['heritage','architecture','family']]),
    d(['rishikesh','Rishikesh','Uttarakhand','adventure','spiritual',3,4,[1300,2500,3200,6200,9000,18500],[600,1300,3000],[450,900,2200],['Ram Jhula','Parmarth Niketan','Triveni Ghat','rafting stretch','Beatles Ashram'],['satvik thali','Garhwali dishes','masala chai'],['adventure','spiritual','wellness'],['Rishikesh Yoga & Rafting']]),
    d(['kolkata','Kolkata','West Bengal','heritage','city',3,4,[1500,2700,3600,6800,10000,21000],[700,1450,3200],[400,850,2200],['Victoria Memorial','Maidan','Kumartuli','College Street','Park Street'],['kosha mangsho','kathi roll','mishti doi'],['heritage','food','city']]),
    d(['darjeeling','Darjeeling','West Bengal','nature','nature',3,4,[1700,2900,4000,7200,10000,20500],[700,1450,3200],[600,1100,2500],['Chowrasta','Tiger Hill','Ghoom Monastery','Batasia Loop','Happy Valley Tea Estate'],['Darjeeling momos','thukpa','tea and bakery spreads'],['nature','hills','tea']]),
    d(['port-blair-havelock','Port Blair & Havelock','Andaman and Nicobar Islands','nature','coast',4,6,[2200,4000,5200,9800,14000,30000],[900,1800,4000],[750,1400,3200],['Cellular Jail','Corbyn’s Cove','Radhanagar Beach','Kalapathar','Elephant Beach'],['seafood platters','coconut curries','grilled fish'],['beaches','nature','adventure']]),
    d(['chandigarh','Chandigarh','Chandigarh','heritage','city',3,3,[1500,2600,3600,6500,9800,19000],[700,1450,3200],[400,850,2100],['Rock Garden','Sukhna Lake','Capitol Complex','Rose Garden','Sector 17 market'],['butter chicken','chole kulche','lassi'],['city','architecture','food']]),
    d(['diu','Diu','Dadra and Nagar Haveli and Daman and Diu','nature','coast',3,4,[1500,2600,3600,6500,9500,18500],[700,1450,3200],[500,950,2300],['Diu Fort','St. Paul’s Church','Nagoa Beach','Naida Caves','Gangeshwar Temple'],['seafood','Gujarati thali','coconut sweets'],['coast','relaxing','heritage']]),
    d(['delhi','Delhi','Delhi','heritage','city',3,5,[1800,3200,4500,8200,13000,26000],[800,1650,3600],[450,900,2300],['Jama Masjid','Chandni Chowk','India Gate','Humayun’s Tomb','Qutub Minar'],['chaat','butter chicken','kulfi'],['heritage','food','city']]),
    d(['srinagar','Srinagar','Jammu and Kashmir','nature','nature',4,5,[1800,3200,4500,8200,13000,26000],[750,1550,3400],[650,1200,2800],['Dal Lake','Nishat Bagh','Shalimar Bagh','Shankaracharya Temple','Gulmarg or Sonamarg'],['wazwan','kahwa','gushtaba'],['nature','romantic','mountains']]),
    d(['leh-ladakh','Leh-Ladakh','Ladakh','adventure','adventure',5,7,[1900,3300,4700,8600,13000,27000],[750,1600,3500],[900,1700,3600],['Shanti Stupa','Leh Palace','Thiksey Monastery','Hemis Monastery','Nubra or Pangong'],['thukpa','skyu','butter tea'],['adventure','road-trip','mountains'],['Leh','Leh-Ladakh Adventure']]),
    d(['kavaratti','Kavaratti','Lakshadweep','nature','coast',4,5,[2500,4200,6000,11000,15000,32000],[850,1750,3800],[700,1300,3000],['Kavaratti lagoon','island village walk','jetty sunset','snorkeling point','reef leisure'],['tuna dishes','coconut curries','reef-fish grills'],['nature','islands','relaxing']]),
    d(['puducherry','Puducherry','Puducherry','heritage','coast',3,4,[1600,2800,3900,7200,11000,22000],[700,1450,3300],[400,850,2200],['Promenade Beach','White Town','Sri Aurobindo Ashram','Auroville visitor area','Paradise Beach'],['French-Tamil cafe plates','seafood curries','croissants'],['heritage','coast','relaxing']]),
];

const getBudgetKey = (budget) => {
    const normalized = (budget || 'moderate').toLowerCase();
    if (normalized === 'budget' || normalized === 'economical') return 'economical';
    if (normalized === 'luxury' || normalized === 'luxurious') return 'luxury';
    return 'moderate';
};

const startOfDay = (dateString) => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
};

const addDays = (date, offset) => {
    const next = new Date(date);
    next.setDate(next.getDate() + offset);
    return next;
};

const formatDateLabel = (date) => date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

export const getTripDaysFromDates = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = startOfDay(startDate);
    const end = startOfDay(endDate);
    if (end < start) return 0;
    return Math.round((end - start) / 86400000) + 1;
};

const getTravelerProfile = (travelers = []) => {
    const safeTravelers = travelers.length ? travelers : [{ gender: 'Male', age: 28 }];
    let adults = 0;
    let children = 0;
    let pricingUnits = 0;

    safeTravelers.forEach((traveler) => {
        const age = Number(traveler.age) || 0;
        if (age >= 18) adults += 1;
        else children += 1;
        pricingUnits += age <= 5 ? 0.25 : age <= 11 ? 0.55 : 1;
    });

    return {
        travelers: safeTravelers,
        adults,
        children,
        count: safeTravelers.length,
        pricingUnits: Math.max(1, pricingUnits),
        rooms: clamp(Math.ceil((adults + Math.max(children - 1, 0) * 0.5) / 2) || 1, 1, 4),
    };
};

const buildDayStops = (destination, index) => {
    const baseStops = destination.attractions.slice(index * 2, index * 2 + 3);
    if (baseStops.length) return baseStops;
    return [
        destination.attractions[index % destination.attractions.length],
        destination.cuisines[index % destination.cuisines.length],
        `${destination.name} market and local evening`,
    ];
};

const buildDayTheme = (destination, index) => {
    const pools = ['arrival and orientation', 'landmark circuit', 'culture and food', 'nature and viewpoints', 'heritage deep dive', 'slow exploration'];
    return `${destination.name} ${pools[index % pools.length]}`;
};

const buildDayPlan = (destination, budgetKey, index) => {
    const stops = buildDayStops(destination, index);
    const note = budgetKey === 'economical'
        ? 'Use public transport, shared cabs, and local eateries to keep costs low.'
        : budgetKey === 'moderate'
            ? 'Mix app cabs with landmark meals for a balanced comfort level.'
            : 'Use private transfers and premium dining for a smoother, higher-comfort day.';

    return {
        theme: buildDayTheme(destination, index),
        meal: `${destination.cuisines[index % destination.cuisines.length]} and ${destination.cuisines[(index + 1) % destination.cuisines.length]}`,
        activities: [
            { timeWindow: 'Morning', name: stops[0], description: `Start with ${stops[0]} and keep the day paced around ${destination.name}.`, emoji: '📍' },
            { timeWindow: 'Afternoon', name: stops[1] || destination.name, description: `Continue through ${stops[1] || destination.name} with enough time for photos and local exploration.`, emoji: '🧭' },
            { timeWindow: 'Evening', name: stops[2] || `${destination.name} evening`, description: `${note} Focus on ${destination.cuisines[index % destination.cuisines.length]}.`, emoji: '🍽️' },
        ],
        activityBase: 250 + (index % 3) * 180,
        premiumBase: budgetKey === 'economical' ? 0 : budgetKey === 'moderate' ? 250 + (index % 2) * 120 : 900 + (index % 3) * 400,
    };
};

export const searchDestinations = (query) => {
    const search = query.trim().toLowerCase();
    if (!search) return [];

    return indiaDestinationCatalog.filter((item) => {
        const haystack = [item.name, item.state, ...item.tags, ...item.aliases].join(' ').toLowerCase();
        return haystack.includes(search);
    }).slice(0, 8);
};

export const getDestinationByQuery = (query) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return null;
    return indiaDestinationCatalog.find((item) => item.name.toLowerCase() === normalized)
        || indiaDestinationCatalog.find((item) => item.aliases.some((alias) => alias.toLowerCase() === normalized))
        || null;
};

const buildTripPlanInternal = (destination, budgetKey, startDate, dayCount, travelers, mode, reason = '') => {
    const party = getTravelerProfile(travelers);
    const stayCostPerRoom = averageRange(destination.stay[budgetKey]);
    const foodCostBase = destination.food[budgetKey];
    const transportBase = destination.transport[budgetKey];
    const foodMultiplier = party.adults + party.children * 0.65 || 1;
    const transportMultiplier = party.count <= 2 ? 1 : party.count <= 4 ? 1.35 : 1.75;
    const nights = Math.max(1, dayCount - 1);
    const totals = { stay: stayCostPerRoom * party.rooms * nights, food: 0, localTransport: 0, activities: 0, extras: 0 };
    const days = [];

    for (let index = 0; index < dayCount; index += 1) {
        const plan = buildDayPlan(destination, budgetKey, index);
        const food = foodCostBase * foodMultiplier;
        const localTransport = transportBase * transportMultiplier;
        const activities = plan.activityBase * party.pricingUnits;
        const extras = plan.premiumBase * (budgetKey === 'luxury' ? Math.max(1, party.rooms * 0.8) : 1);
        const stay = index === dayCount - 1 ? 0 : stayCostPerRoom * party.rooms;
        totals.food += food;
        totals.localTransport += localTransport;
        totals.activities += activities;
        totals.extras += extras;

        days.push({
            dayNumber: index + 1,
            dateLabel: formatDateLabel(addDays(startOfDay(startDate), index)),
            theme: plan.theme,
            cuisineFocus: plan.meal,
            dayExpense: {
                stay,
                food,
                localTransport,
                activities,
                extras,
                total: stay + food + localTransport + activities + extras,
            },
            activities: plan.activities,
        });
    }

    const totalEstimatedCost = totals.stay + totals.food + totals.localTransport + totals.activities + totals.extras;

    return {
        title: `${dayCount} Days in ${destination.name}`,
        overview: `${budgetLabels[budgetKey]} ${mode === 'suggest' ? 'suggested' : 'custom'} itinerary for ${destination.name}, ${destination.state}${reason ? ` • ${reason}` : ''}. Cuisine focus includes ${destination.cuisines.slice(0, 3).join(', ')}.`,
        bannerUrl: destination.image,
        totalEstimatedCost: formatCurrency(totalEstimatedCost),
        budgetLabel: budgetLabels[budgetKey],
        travelerSummary: `${party.count} traveler${party.count > 1 ? 's' : ''} • ${party.adults} adult${party.adults !== 1 ? 's' : ''}${party.children ? ` • ${party.children} child${party.children > 1 ? 'ren' : ''}` : ''}`,
        planningNote: 'Costs are local planning estimates built from a curated India destination knowledge-base and should be rechecked before booking.',
        budgetBreakdown: [
            { category: 'Accommodation', estimatedCost: formatCurrency(totals.stay), percentage: Math.round((totals.stay / totalEstimatedCost) * 100) || 0 },
            { category: 'Food & Dining', estimatedCost: formatCurrency(totals.food), percentage: Math.round((totals.food / totalEstimatedCost) * 100) || 0 },
            { category: 'Local Transport', estimatedCost: formatCurrency(totals.localTransport), percentage: Math.round((totals.localTransport / totalEstimatedCost) * 100) || 0 },
            { category: 'Tickets & Activities', estimatedCost: formatCurrency(totals.activities), percentage: Math.round((totals.activities / totalEstimatedCost) * 100) || 0 },
            { category: 'Comfort Extras', estimatedCost: formatCurrency(totals.extras), percentage: Math.round((totals.extras / totalEstimatedCost) * 100) || 0 },
        ],
        days,
    };
};

export const buildTripPlan = ({ destinationQuery, startDate, endDate, budget, travelers }) => {
    const destination = getDestinationByQuery(destinationQuery);
    if (!destination) {
        throw new Error('Place not found in our India travel database.');
    }

    const dayCount = getTripDaysFromDates(startDate, endDate);
    if (dayCount < 3 || dayCount > 14) {
        throw new Error('Choose a trip between 3 and 14 days.');
    }
    if (dayCount < destination.minDays) {
        throw new Error(`${destination.name} works better for at least ${destination.minDays} days.`);
    }

    return buildTripPlanInternal(destination, getBudgetKey(budget), startDate, dayCount, travelers, 'plan');
};

export const suggestTrip = ({ startDate, endDate, budget, travelers, travelType }) => {
    const dayCount = getTripDaysFromDates(startDate, endDate);
    if (dayCount < 3 || dayCount > 14) {
        throw new Error('Suggested trips currently support itineraries from 3 to 14 days.');
    }

    const style = (travelType || '').toLowerCase();
    const destination = indiaDestinationCatalog.find((item) => item.tags.some((tag) => tag.toLowerCase().includes(style)) && dayCount >= item.minDays)
        || indiaDestinationCatalog.find((item) => dayCount >= item.minDays)
        || indiaDestinationCatalog[0];

    return buildTripPlanInternal(destination, getBudgetKey(budget), startDate, dayCount, travelers, 'suggest', `picked for ${travelType || 'balanced'} travel style`);
};

const homepageSlugs = [
    'leh-ladakh',
    'varanasi',
    'munnar',
    'rishikesh',
    'jaipur',
    'hampi',
    'goa',
    'gulmarg',
    'udaipur',
    'port-blair-havelock',
    'khajuraho',
    'spiti-valley',
    'coorg',
    'jaisalmer',
    'mumbai',
];

export const homepageDestinations = homepageSlugs.map((slug, index) => {
    const item = indiaDestinationCatalog.find((destination) => destination.slug === slug);

    return {
        id: index + 1,
        title: item.name,
        location: `${item.state}, India`,
        category: item.category,
        image: item.image,
        price: formatCurrency(averageRange(item.stay.moderate) * Math.max(2, item.idealDays - 1)),
        duration: `${item.idealDays} Days`,
        rating: 4.8,
        description: `${item.name} trip covering ${item.attractions.slice(0, 2).join(' and ')}.`,
    };
});
