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
const getDestinationImage = (name, state) =>
    `https://www.sourcesplash.com/i/random?w=1200&h=800&q=${encodeURIComponent(`${name} ${state} India travel destination`)}`;
const destinationImageOverrides = {
    'Tirupati': 'https://plus.unsplash.com/premium_photo-1697730420879-dc2a8dbaa31f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGlydXBhdGl8ZW58MHx8MHx8fDA%3D',
    'Araku Valley': 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/7b/31/15/araku-valley.jpg?w=1200&h=1200&s=1',
    'Mechuka': 'https://plus.unsplash.com/premium_photo-1680260413569-7e28013a3d8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVjaHVrYXxlbnwwfHwwfHx8MA%3D%3D',
    'Guwahati': 'https://images.unsplash.com/photo-1594803205835-d121cb46e518?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGd1d2FoYXRpfGVufDB8fDB8fHww',
    'Kaziranga': 'https://plus.unsplash.com/premium_photo-1664302740919-e6645ba8c053?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2F6aXJhbmdhfGVufDB8fDB8fHww',
    'Bodh Gaya': 'https://plus.unsplash.com/premium_photo-1691763916216-d64cfad0f42e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9kaCUyMGdheWF8ZW58MHx8MHx8fDA%3D',
    'Jagdalpur': 'https://images.unsplash.com/photo-1638738105885-3e43f3b156a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amFiYWxwdXJ8ZW58MHx8MHx8fDA%3D',
    'Goa': 'https://plus.unsplash.com/premium_photo-1697729701846-e34563b06d47?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29hfGVufDB8fDB8fHww',
    'Ahmedabad': 'https://images.unsplash.com/photo-1638006524490-492fdf36ee04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWhtZWRhYmFkfGVufDB8fDB8fHww',
    'Dwarka': 'https://images.unsplash.com/photo-1722404353053-7c99652ec9f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGR3YXJrYXxlbnwwfHwwfHx8MA%3D%3D',
    'Kurukshetra': 'https://images.unsplash.com/photo-1727253112274-ca80addee55c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3VydWtzaGV0cmF8ZW58MHx8MHx8fDA%3D',
    'Manali': 'https://plus.unsplash.com/premium_photo-1661935282164-5ee95f5bf490?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFuYWxpfGVufDB8fDB8fHww',
    'Spiti Valley': 'https://plus.unsplash.com/premium_photo-1661878309257-f4343940ce4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BpdGklMjB2YWxsZXl8ZW58MHx8MHx8fDA%3D',
    'Ranchi': 'https://plus.unsplash.com/premium_photo-1697729770899-75269b3c26dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuY2hpfGVufDB8fDB8fHww',
    'Hampi': 'https://plus.unsplash.com/premium_photo-1697730337612-8bd916249e30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFtcGl8ZW58MHx8MHx8fDA%3D',
    'Coorg': 'https://images.unsplash.com/photo-1710612198146-77512950a4b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29vcmd8ZW58MHx8MHx8fDA%3D',
    'Kochi': 'https://plus.unsplash.com/premium_photo-1697729597066-7b3d09b6dab7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a29jaGl8ZW58MHx8MHx8fDA%3D',
    'Alappuzha': 'https://plus.unsplash.com/premium_photo-1697729442042-c071ef0415b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QWxhcHB1emhhfGVufDB8fDB8fHww',
    'Khajuraho': 'https://plus.unsplash.com/premium_photo-1697730370661-51bf72769ff6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2hhanVyYWhvfGVufDB8fDB8fHww',
    'Ujjain': 'https://images.unsplash.com/photo-1658730487395-dcc99f5d997c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dWpqYWlufGVufDB8fDB8fHww',
    'Mumbai': 'https://images.unsplash.com/photo-1562979314-bee7453e911c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVtYmFpfGVufDB8fDB8fHww',
    'Mahabaleshwar': 'https://plus.unsplash.com/premium_photo-1661963629241-52c812d5c7f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFoYWJhbGVzaHdhcnxlbnwwfHwwfHx8MA%3D%3D',
    'Imphal': 'https://plus.unsplash.com/premium_photo-1666865792731-0a2656f2b12c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFuaXB1cnxlbnwwfHwwfHx8MA%3D%3D',
    'Shillong': 'https://images.unsplash.com/photo-1646409143950-6931aa246d36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hpbGxvbmd8ZW58MHx8MHx8fDA%3D',
    'Cherrapunji': 'https://images.unsplash.com/photo-1593813738953-fb3c93e0769d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVnaGFsYXlhfGVufDB8fDB8fHww',
    'Munnar': 'https://images.unsplash.com/photo-1637066742971-726bee8d9f56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVubmFyfGVufDB8fDB8fHww',
    'Gulmarg': 'https://images.unsplash.com/photo-1651509094074-e8acaeb84d8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3VsbWFyZ3xlbnwwfHwwfHx8MA%3D%3D',
    'Jaisalmer': 'https://plus.unsplash.com/premium_photo-1661962428918-6a57ab674e23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFpc2FsbWVyfGVufDB8fDB8fHww',
    'Aizawl': 'https://images.unsplash.com/photo-1629406352863-7b697c415d30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWl6b3JhbXxlbnwwfHwwfHx8MA%3D%3D',
    'Kohima': 'https://plus.unsplash.com/premium_photo-1697729729075-3e56242aef49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmFnYWxhbmR8ZW58MHx8MHx8fDA%3D',
    'Bhubaneswar-Puri-Konark': 'https://images.unsplash.com/photo-1706465416840-85482d841da7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymh1YmFuZXNod2FyfGVufDB8fDB8fHww',
    'Amritsar': 'https://plus.unsplash.com/premium_photo-1697730324062-c012bc98eb13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW1yaXRzYXJ8ZW58MHx8MHx8fDA%3D',
    'Jaipur': 'https://plus.unsplash.com/premium_photo-1661963054563-ce928e477ff3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFpcHVyfGVufDB8fDB8fHww',
    'Udaipur': 'https://plus.unsplash.com/premium_photo-1661964079694-ccfaf7dc8028?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dWRhaXB1cnxlbnwwfHwwfHx8MA%3D%3D',
    'Gangtok': 'https://images.unsplash.com/photo-1573398643956-2b9e6ade3456?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lra2ltfGVufDB8fDB8fHww',
    'Pelling': 'https://images.unsplash.com/photo-1600402808924-9c591a6dace8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2lra2ltfGVufDB8fDB8fHww',
    'Chennai-Mahabalipuram': 'https://images.unsplash.com/photo-1717480103667-fc55675a9ae4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFoYWJhbGlwdXJhbXxlbnwwfHwwfHx8MA%3D%3D',
    'Rameswaram': 'https://images.unsplash.com/photo-1621338615866-4e6bc5cf5762?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFtZXNod2FyYW18ZW58MHx8MHx8fDA%3D',
    'Hyderabad': 'https://images.unsplash.com/photo-1551161242-b5af797b7233?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHlkZXJhYmFkfGVufDB8fDB8fHww',
    'Agartala': 'https://images.unsplash.com/photo-1551161242-b5af797b7233?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHlkZXJhYmFkfGVufDB8fDB8fHww',
    'Varanasi': 'https://images.unsplash.com/photo-1627938823193-fd13c1c867dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmFyYW5hc2l8ZW58MHx8MHx8fDA%3D',
    'Agra': 'https://plus.unsplash.com/premium_photo-1697729441569-f706fdd1f71c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWdyYXxlbnwwfHwwfHx8MA%3D%3D',
    'Rishikesh': 'https://plus.unsplash.com/premium_photo-1697730398251-40cd8dc57e0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmlzaGlrZXNofGVufDB8fDB8fHww',
    'Kolkata': 'https://plus.unsplash.com/premium_photo-1697730414399-3d4d9ada98bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a29sa2F0YXxlbnwwfHwwfHx8MA%3D%3D',
    'Darjeeling': 'https://plus.unsplash.com/premium_photo-1697729733902-f8c92710db07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGFyamVlbGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    'Port Blair & Havelock': 'https://images.unsplash.com/photo-1586053226626-febc8817962f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5kYW1hbiUyMGFuZCUyMG5pY29iYXIlMjBpc2xhbmRzfGVufDB8fDB8fHww',
    'Chandigarh': 'https://plus.unsplash.com/premium_photo-1691031429261-aeb324882888?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hhbmRpZ2FyaHxlbnwwfHwwfHx8MA%3D%3D',
    'Diu': 'https://images.unsplash.com/photo-1569776186059-f26b84be14b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGl1fGVufDB8fDB8fHww',
    'Delhi': 'https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVsaGl8ZW58MHx8MHx8fDA%3D',
    'Srinagar': 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3JpbmFnYXJ8ZW58MHx8MHx8fDA%3D',
    'Leh-Ladakh': 'https://images.unsplash.com/photo-1600242466690-c1c04f081762?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVofGVufDB8fDB8fHww',
    'Kavaratti': 'https://images.unsplash.com/photo-1646130322178-c9d8da261891?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFrc2hhZHdlZXB8ZW58MHx8MHx8fDA%3D',
    'Puducherry': 'https://images.unsplash.com/photo-1597073642928-48c0971f7ded?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9uZGljaGVycnl8ZW58MHx8MHx8fDA%3D',
    'Visakhapatnam': 'https://plus.unsplash.com/premium_photo-1697730409114-ff9db6cc8277?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmlzYWtoYXBhdG5hbXxlbnwwfHwwfHx8MA%3D%3D',
    'Vijayawada': 'https://plus.unsplash.com/premium_photo-1697729444936-8c6a6f643312?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlqYXlhd2FkYXxlbnwwfHwwfHx8MA%3D%3D',
    'Tawang': 'https://images.unsplash.com/photo-1626761627604-f27d98885f4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGF3YW5nfGVufDB8fDB8fHww',
    'Ziro Valley': 'https://images.unsplash.com/photo-1645390052613-1a95b2cb09e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8emlyb3xlbnwwfHwwfHx8MA%3D%3D',
    'Majuli': 'https://images.unsplash.com/photo-1735566993787-20572d53001b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFqdWxpfGVufDB8fDB8fHww',
    'Patna': 'https://images.unsplash.com/photo-1642069695904-528045db6443?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGF0bmF8ZW58MHx8MHx8fDA%3D',
    'Raipur': 'https://plus.unsplash.com/premium_photo-1676487748067-4da1e9afa701?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFpcHVyfGVufDB8fDB8fHww',
    'Saputara': 'https://images.unsplash.com/photo-1583168493328-8249a78a6ff3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2FwdXRhcmF8ZW58MHx8MHx8fDA%3D',
    'Somnath': 'https://images.unsplash.com/photo-1620103143245-9efb3e4a7553?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3VqYXJhdHxlbnwwfHwwfHx8MA%3D%3D',
    'Kutch': 'https://images.unsplash.com/photo-1670406312373-6d4d1776e4aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3V0Y2h8ZW58MHx8MHx8fDA%3D',
    'Morni Hills': 'https://plus.unsplash.com/premium_photo-1726579703124-c8ee0c8df0d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9ybmklMjBoaWxsc3xlbnwwfHwwfHx8MA%3D%3D',
    'Shimla': 'https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hpbWxhfGVufDB8fDB8fHww',
    'Kasauli': 'https://images.unsplash.com/photo-1659636093863-b8db1524da86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FzYXVsaXxlbnwwfHwwfHx8MA%3D%3D',
    'Deoghar': 'https://plus.unsplash.com/premium_photo-1676761976616-a185bc5f7981?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVvZ2hhcnxlbnwwfHwwfHx8MA%3D%3D',
    'Mysuru': 'https://plus.unsplash.com/premium_photo-1697729434815-40ab4970ebc1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXlzb3JlfGVufDB8fDB8fHww',
    'Gokarna': 'https://plus.unsplash.com/premium_photo-1668150898421-d857412ca923?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29rYXJuYXxlbnwwfHwwfHx8MA%3D%3D',
    'Wayanad': 'https://images.unsplash.com/photo-1623302485960-d61687113a11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F5YW5hZHxlbnwwfHwwfHx8MA%3D%3D',
    'Orchha': 'https://images.unsplash.com/photo-1742105881125-c4874d19759d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JjY2hhfGVufDB8fDB8fHww',
    'Pachmarhi': 'https://images.unsplash.com/photo-1674500547677-6a779a7faefe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFjaG1hcmhpfGVufDB8fDB8fHww',
    'Aurangabad': 'https://images.unsplash.com/photo-1626331915556-c4f817fbcc5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXVyYW5nYWJhZHxlbnwwfHwwfHx8MA%3D%3D',
    'Nashik': 'https://images.unsplash.com/photo-1694667509674-676629c9d069?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmFzaGlrfGVufDB8fDB8fHww',
    'Lonavala': 'https://plus.unsplash.com/premium_photo-1728117267325-534ccbd21a5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9uYXZhbGF8ZW58MHx8MHx8fDA%3D',
    'Mawlynnong': 'https://images.unsplash.com/photo-1650874210673-88f05078fbbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWF3bHlubm9uZ3xlbnwwfHwwfHx8MA%3D%3D',
    'Lunglei': 'https://static.india.com/wp-content/uploads/2019/06/Lunglei-Mizoram.-.jpg',
    'Dimapur': 'https://www.indianholiday.com/pictures/travelguide/other-images/dest_head_img-1141.png',
    'Puri': 'https://images.unsplash.com/photo-1706790574525-d218c4c52b5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVyaXxlbnwwfHwwfHx8MA%3D%3D',
    'Patiala': 'https://images.unsplash.com/photo-1611331384915-732d894028fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVuamFifGVufDB8fDB8fHww',
    'Jodhpur': 'https://plus.unsplash.com/premium_photo-1661904165347-369200d4bf72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8am9kaHB1cnxlbnwwfHwwfHx8MA%3D%3D',
    'Bikaner': 'https://images.unsplash.com/photo-1514007631454-28669d6cc960?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlrYW5lcnxlbnwwfHwwfHx8MA%3D%3D',
    'Mount Abu': 'https://images.unsplash.com/photo-1630825828081-e80577f6e2df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnQlMjBhYnV8ZW58MHx8MHx8fDA%3D',
    'Lachung': 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Lachung_Town.jpg',
    'Yuksom': 'https://plus.unsplash.com/premium_photo-1697730423240-643152b8f984?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8WXVrc29tfGVufDB8fDB8fHww',
    'Ooty': 'https://plus.unsplash.com/premium_photo-1725408090963-49dd5bfc1baf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b290eXxlbnwwfHwwfHx8MA%3D%3D',
    'Kodaikanal': 'https://images.unsplash.com/photo-1593692716621-1e228b0a9224?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8S29kYWlrYW5hbHxlbnwwfHwwfHx8MA%3D%3D',
    'Madurai': 'https://plus.unsplash.com/premium_photo-1697729444936-8c6a6f643312?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFkdXJhaXxlbnwwfHwwfHx8MA%3D%3D',
    'Thanjavur': 'https://plus.unsplash.com/premium_photo-1697729536647-4e23a32dd324?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGhhbmphdnVyfGVufDB8fDB8fHww',
    'Warangal': 'https://plus.unsplash.com/premium_photo-1675624628827-e4ec8857f720?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FyYW5nYWx8ZW58MHx8MHx8fDA%3D',
    'Bhadrachalam': 'https://images.unsplash.com/photo-1709389137208-866afd05ad4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmhhZHJhY2hhbGFtfGVufDB8fDB8fHww',
    'Unakoti': 'https://images.unsplash.com/photo-1695150854909-a00039a284b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VW5ha290aXxlbnwwfHwwfHx8MA%3D%3D',
    'Ayodhya': 'https://plus.unsplash.com/premium_photo-1697730334768-6e65fa8fded0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXlvZGh5YXxlbnwwfHwwfHx8MA%3D%3D',
    'Lucknow': 'https://plus.unsplash.com/premium_photo-1697730430283-7e4456c78375?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bHVja25vd3xlbnwwfHwwfHx8MA%3D%3D',
    'Nainital': 'https://images.unsplash.com/photo-1667029838861-2fe3a590a1d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmFpbml0YWx8ZW58MHx8MHx8fDA%3D',
    'Mussoorie': 'https://plus.unsplash.com/premium_photo-1661954540196-47f72de1a97c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzc29vcmllfGVufDB8fDB8fHww',
    'Auli': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPaWOKfjq_V7Q-D240qW1vN953n4nhCoW_dQ&s',
    'Kalimpong': 'https://plus.unsplash.com/premium_photo-1697729733902-f8c92710db07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2FsaW1wb25nfGVufDB8fDB8fHww',
    'Sundarbans': 'https://plus.unsplash.com/premium_photo-1686310335921-38acc0679321?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3VuZGFyYmFufGVufDB8fDB8fHww',
    'Daman': 'https://images.unsplash.com/photo-1559910975-bde0c741ac54?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGFtYW58ZW58MHx8MHx8fDA%3D',
    'Silvassa': 'https://images.unsplash.com/photo-1623825448685-15dab79bb78b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2lsdmFzc2F8ZW58MHx8MHx8fDA%3D',
    'Jammu': 'https://images.unsplash.com/photo-1719377678428-d9bcec6976f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFtbXV8ZW58MHx8MHx8fDA%3D',
    'Minicoy': 'https://images.unsplash.com/photo-1572025310208-2fd6b91764c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFrc2hhZHdlZXB8ZW58MHx8MHx8fDA%3D',
};

const d = ([
    slug, name, state, category, imageKey, minDays, idealDays, stay, food, transport, attractions, cuisines, tags, aliases = [],
]) => ({
    slug, name, state, category, image: destinationImageOverrides[name] || getDestinationImage(name, state, imageKey), minDays, maxDays: 14, idealDays,
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
    d(['visakhapatnam','Visakhapatnam','Andhra Pradesh','nature','coast',3,4,[1500,2600,3600,6600,9200,18500],[650,1400,3100],[500,980,2300],['RK Beach','Kailasagiri','Submarine Museum','Yarada Beach','Simhachalam Temple'],['Andhra seafood','punugulu','gongura meals'],['nature','coast','city']]),
    d(['vijayawada','Vijayawada','Andhra Pradesh','heritage','spiritual',3,3,[1200,2200,3000,5400,7800,15000],[550,1250,2800],[400,850,2100],['Kanaka Durga Temple','Prakasam Barrage','Bhavani Island','Undavalli Caves','Kondapalli Fort'],['Andhra thali','punugulu','pesarattu'],['heritage','spiritual','family']]),
    d(['tawang','Tawang','Arunachal Pradesh','adventure','adventure',4,5,[1900,3200,4400,7800,10500,21000],[700,1500,3200],[750,1400,3000],['Tawang Monastery','War Memorial','Sela Pass','Madhuri Lake','Nuranang Falls'],['thukpa','momos','butter tea'],['adventure','mountains','spiritual']]),
    d(['ziro-valley','Ziro Valley','Arunachal Pradesh','nature','nature',3,4,[1800,3000,4200,7200,9800,19500],[650,1400,3000],[650,1200,2600],['Apatani villages','Pine Grove','Talley Valley edge','Ziro market','hill viewpoints'],['millet dishes','smoked pork','local rice beer foods'],['nature','culture','offbeat']]),
    d(['majuli','Majuli','Assam','heritage','nature',3,4,[1500,2500,3400,6200,8800,17000],[600,1300,2900],[500,950,2200],['Auniati Satra','Kamalabari Satra','Mishing village','river ferry circuit','island sunset point'],['Assamese thali','fish tenga','pitha'],['heritage','river','culture']]),
    d(['patna','Patna','Bihar','heritage','city',3,3,[1200,2200,3000,5400,7800,15000],[550,1250,2800],[400,850,2100],['Golghar','Bihar Museum','Takht Sri Patna Sahib','Gandhi Maidan','Patna Planetarium'],['litti chokha','khaja','sattu drinks'],['heritage','city','food']]),
    d(['raipur','Raipur','Chhattisgarh','heritage','city',3,3,[1200,2200,3000,5400,7800,15000],[550,1250,2800],[450,900,2200],['Nandan Van','Mahant Ghasidas Museum','Purkhouti Muktangan','Vivekananda Sarovar','Banjari Mata area'],['faraa','chila','tribal curries'],['heritage','family','city']]),
    d(['saputara','Saputara','Gujarat','nature','nature',3,4,[1500,2600,3500,6500,9000,18000],[650,1350,3000],[500,950,2300],['Saputara Lake','Sunset Point','Artist Village','Ropeway','Governor Hill'],['Gujarati thali','corn snacks','tribal meals'],['nature','hills','relaxing']]),
    d(['somnath','Somnath','Gujarat','heritage','spiritual',3,3,[1300,2300,3100,5600,8200,16000],[550,1200,2700],[450,900,2200],['Somnath Temple','Triveni Sangam','Bhalka Tirth','Somnath beach','light and sound show'],['Gujarati satvik thali','thepla','shrikhand'],['spiritual','heritage','coast']]),
    d(['kutch','Kutch','Gujarat','nature','nature',4,5,[1700,3000,4000,7200,10000,20000],[700,1450,3200],[700,1300,2900],['White Rann','Kala Dungar','Bhujodi','Mandvi Beach','Vijay Vilas Palace'],['Kutchi dabeli','Gujarati thali','mesub'],['nature','desert','culture']]),
    d(['morni-hills','Morni Hills','Haryana','nature','nature',3,3,[1400,2400,3200,5800,7800,15000],[550,1200,2700],[500,900,2100],['Tikkar Taal','Morni Fort','lake viewpoints','nature trails','adventure park area'],['paratha meals','lassi','north Indian thali'],['nature','hills','weekend']]),
    d(['shimla','Shimla','Himachal Pradesh','heritage','nature',3,4,[1800,3100,4300,7600,10500,21000],[700,1450,3200],[600,1100,2500],['Mall Road','Ridge','Jakhoo Temple','Kufri','Christ Church'],['siddu','madra','cafe bakes'],['heritage','hills','family']]),
    d(['kasauli','Kasauli','Himachal Pradesh','nature','nature',3,3,[1600,2700,3800,6800,9200,18500],[650,1350,3000],[500,950,2200],['Gilbert Trail','Sunset Point','Christ Church','Monkey Point','Mall Road'],['Himachali meals','bakery snacks','chai cafe plates'],['nature','relaxing','hills']]),
    d(['deoghar','Deoghar','Jharkhand','heritage','spiritual',3,3,[1200,2200,2900,5200,7600,14500],[500,1150,2600],[400,800,2000],['Baidyanath Dham','Naulakha Temple','Tapovan','Trikut Pahar','Rikhiya ashram belt'],['litti chokha','malpua','simple satvik meals'],['spiritual','heritage','family']]),
    d(['mysuru','Mysuru','Karnataka','heritage','heritage',3,4,[1500,2700,3600,6800,9500,19000],[650,1400,3100],[450,900,2200],['Mysore Palace','Chamundi Hills','Devaraja Market','St. Philomenas Church','Brindavan Gardens'],['Mysore masala dosa','Mysore pak','south Indian meals'],['heritage','food','family']]),
    d(['gokarna','Gokarna','Karnataka','nature','coast',3,4,[1600,2800,3900,7000,9800,19500],[700,1450,3200],[550,1000,2400],['Om Beach','Kudle Beach','Mahabaleshwar Temple','Half Moon Beach','beach trek route'],['seafood','coastal thali','south Indian breakfasts'],['nature','coast','relaxing']]),
    d(['wayanad','Wayanad','Kerala','nature','nature',3,4,[1700,2900,4000,7200,10200,20500],[700,1450,3200],[600,1100,2500],['Edakkal Caves','Soochipara Falls','Banasura Sagar Dam','Pookode Lake','Chembra trail area'],['Kerala meals','malabar snacks','appam and stew'],['nature','wildlife','hills']]),
    d(['orchha','Orchha','Madhya Pradesh','heritage','heritage',3,3,[1300,2300,3100,5600,8200,16000],[550,1200,2700],[400,850,2100],['Orchha Fort','Jahangir Mahal','Ram Raja Temple','Chhatris','Betwa riverfront'],['Bundeli thali','dal bafla','mawa sweets'],['heritage','architecture','peaceful']]),
    d(['pachmarhi','Pachmarhi','Madhya Pradesh','nature','nature',3,4,[1600,2800,3800,6800,9200,18500],[650,1350,3000],[550,1000,2400],['Bee Falls','Jata Shankar','Dhoopgarh','Pandav Caves','Apsara Vihar'],['Madhya Pradesh thali','poha','local sweets'],['nature','hills','family']]),
    d(['aurangabad','Aurangabad','Maharashtra','heritage','heritage',4,5,[1600,2900,3900,7200,10000,20500],[650,1450,3200],[600,1100,2600],['Bibi Ka Maqbara','Daulatabad Fort','Ellora Caves','Ajanta Caves','Panchakki'],['naan qalia','Maharashtrian thali','kebabs'],['heritage','architecture','food']]),
    d(['nashik','Nashik','Maharashtra','heritage','nature',3,4,[1500,2700,3600,6600,9200,18500],[650,1400,3100],[500,950,2300],['Trimbakeshwar','Sula vineyards','Panchavati','Godavari ghats','Pandavleni Caves'],['misal pav','Maharashtrian thali','vineyard dining'],['heritage','food','spiritual']]),
    d(['lonavala','Lonavala','Maharashtra','nature','nature',3,3,[1500,2600,3500,6500,9000,18000],[650,1350,3000],[500,950,2200],['Tiger Point','Bhushi Dam','Karla Caves','Rajmachi viewpoint','Lonavala Lake'],['chikki','vada pav','Maharashtrian snacks'],['nature','hills','weekend']]),
    d(['mawlynnong','Mawlynnong','Meghalaya','nature','nature',3,3,[1700,2900,3900,7000,9600,19000],[650,1400,3100],[650,1200,2600],['clean village walk','living root bridge','balancing rock','sky view tower','Bangladesh plains viewpoint'],['Khasi meals','jadoh','smoked meats'],['nature','village','offbeat']]),
    d(['lunglei','Lunglei','Mizoram','nature','nature',3,4,[1500,2600,3500,6500,8800,17500],[600,1300,2900],[550,1000,2300],['Khawnglung Wildlife Sanctuary','Saikuti Hall area','Lunglei bridge viewpoint','hill roads','local market'],['bai','sticky rice','smoked pork'],['nature','offbeat','hills']]),
    d(['dimapur','Dimapur','Nagaland','heritage','city',3,3,[1400,2400,3200,5800,8200,16000],[650,1350,3000],[450,900,2200],['Kachari ruins','Diezephe craft village','Triple Falls access','city market','zoological area'],['Naga smoked pork','sticky rice','axone dishes'],['heritage','food','city']]),
    d(['puri','Puri','Odisha','heritage','coast',3,4,[1400,2500,3300,6200,9000,17500],[650,1350,3000],[450,900,2200],['Jagannath Temple area','Puri beach','Raghurajpur','Swargadwar','Chakrathirtha'],['khaja','dalma','seafood platters'],['heritage','coast','spiritual']]),
    d(['patiala','Patiala','Punjab','heritage','heritage',3,3,[1300,2300,3100,5600,8200,16000],[600,1300,2900],[450,900,2200],['Qila Mubarak','Sheesh Mahal','Baradari Gardens','Kali Temple','old bazaar'],['Punjabi thali','lassi','paratha meals'],['heritage','food','family']]),
    d(['jodhpur','Jodhpur','Rajasthan','heritage','heritage',3,4,[1500,2800,3800,7000,10500,21000],[700,1450,3200],[500,1000,2400],['Mehrangarh Fort','Jaswant Thada','Clock Tower','blue city lanes','Umaid Bhawan Museum'],['mirchi bada','mawa kachori','dal baati'],['heritage','food','architecture']]),
    d(['bikaner','Bikaner','Rajasthan','heritage','heritage',3,3,[1400,2500,3400,6200,9000,17500],[650,1350,3000],[500,950,2300],['Junagarh Fort','Karni Mata Temple','Rampuria Havelis','Camel Research Centre','old market'],['bhujia','rasgulla','Rajasthani thali'],['heritage','desert','food']]),
    d(['mount-abu','Mount Abu','Rajasthan','nature','nature',3,4,[1500,2700,3600,6600,9200,18500],[650,1350,3000],[500,950,2200],['Dilwara Temples','Nakki Lake','Sunset Point','Guru Shikhar','Toad Rock'],['Rajasthani thali','street snacks','milk sweets'],['nature','hills','family']]),
    d(['lachung','Lachung','Sikkim','nature','nature',3,4,[1900,3200,4300,7600,10500,21000],[700,1450,3200],[700,1300,2900],['Yumthang Valley','Zero Point route','Lachung Monastery','waterfalls circuit','riverfront views'],['momos','thukpa','butter tea'],['nature','mountains','snow']]),
    d(['yuksom','Yuksom','Sikkim','heritage','nature',3,4,[1700,2900,3900,7000,9800,19500],[650,1400,3100],[650,1200,2600],['Dubdi Monastery','Norbugang Park','village trails','Khangchendzonga park edge','coronation throne site'],['Sikkimese thali','momos','gundruk soup'],['heritage','nature','trekking']]),
    d(['ooty','Ooty','Tamil Nadu','nature','nature',3,4,[1700,3000,4000,7200,10000,20000],[700,1450,3200],[550,1050,2400],['Ooty Lake','Botanical Garden','Doddabetta Peak','tea factory','toy train section'],['Nilgiri tea','south Indian meals','homemade chocolates'],['nature','hills','family']]),
    d(['kodaikanal','Kodaikanal','Tamil Nadu','nature','nature',3,4,[1700,3000,4000,7200,10000,20000],[700,1450,3200],[550,1050,2400],['Kodai Lake','Coakers Walk','Pillar Rocks','Bryant Park','Guna Caves viewpoint'],['south Indian meals','homemade chocolates','pear desserts'],['nature','hills','relaxing']]),
    d(['madurai','Madurai','Tamil Nadu','heritage','spiritual',3,3,[1400,2500,3300,6200,8800,17000],[600,1300,2900],[450,900,2200],['Meenakshi Temple','Thirumalai Nayakkar Palace','Gandhi Museum','Puthu Mandapam','food streets'],['jigarthanda','kari dosa','Tamil meals'],['heritage','food','spiritual']]),
    d(['thanjavur','Thanjavur','Tamil Nadu','heritage','heritage',3,3,[1300,2400,3200,5800,8200,16000],[600,1250,2800],[450,900,2200],['Brihadeeswara Temple','Thanjavur Palace','Art Gallery','Saraswathi Mahal Library','bronze workshops'],['Tamil meals','filter coffee','banana leaf lunch'],['heritage','architecture','culture']]),
    d(['warangal','Warangal','Telangana','heritage','heritage',3,3,[1300,2300,3100,5600,8200,16000],[600,1300,2900],[450,900,2200],['Warangal Fort','Thousand Pillar Temple','Ramappa Temple','Bhadrakali Temple','Pakhal Lake route'],['Hyderabadi meals','sarva pindi','Telangana snacks'],['heritage','spiritual','architecture']]),
    d(['bhadrachalam','Bhadrachalam','Telangana','heritage','spiritual',3,3,[1200,2200,3000,5400,7800,15000],[550,1200,2700],[450,850,2100],['Sri Sita Ramachandra Swamy Temple','Godavari riverfront','Parnasala excursion','temple streets','ghat area'],['Andhra meals','simple satvik food','pesarattu'],['spiritual','heritage','family']]),
    d(['unakoti','Unakoti','Tripura','heritage','heritage',3,3,[1400,2400,3200,5800,8200,16000],[550,1200,2700],[550,1000,2300],['Unakoti rock carvings','water cascade area','forest trail','Kailashahar town','local market'],['Tripuri meals','fish curry','rice cakes'],['heritage','nature','offbeat']]),
    d(['ayodhya','Ayodhya','Uttar Pradesh','heritage','spiritual',3,3,[1400,2500,3300,6200,9000,17500],[600,1300,2900],[450,900,2200],['Ram Mandir area','Hanuman Garhi','Saryu Ghat','Kanak Bhawan','Ram ki Paidi'],['kachori','satvik thali','milk sweets'],['spiritual','heritage','family']]),
    d(['lucknow','Lucknow','Uttar Pradesh','heritage','city',3,4,[1500,2700,3600,6800,9500,19000],[700,1500,3300],[500,950,2300],['Bara Imambara','Rumi Darwaza','Chota Imambara','Hazratganj','Ambedkar Memorial'],['galouti kebab','nihari','kulfi'],['heritage','food','city']]),
    d(['nainital','Nainital','Uttarakhand','nature','nature',3,4,[1600,2800,3900,7000,9800,19500],[650,1400,3100],[550,1000,2400],['Naini Lake','Snow View Point','Mall Road','Naina Devi Temple','Eco Cave Gardens'],['Kumaoni meals','bun tikki','bal mithai'],['nature','hills','family']]),
    d(['mussoorie','Mussoorie','Uttarakhand','nature','nature',3,4,[1600,2800,3900,7000,9800,19500],[650,1400,3100],[550,1000,2400],['Mall Road','Kempty Falls','Gun Hill','Lal Tibba','Landour'],['Garhwali meals','chai snacks','cafe bakes'],['nature','hills','relaxing']]),
    d(['auli','Auli','Uttarakhand','adventure','nature',3,4,[1900,3200,4300,7600,10500,21000],[700,1450,3200],[700,1300,2900],['Auli ropeway','ski slopes','Joshimath base','Gurso Bugyal route','Narsingh Temple area'],['Garhwali thali','chai and maggi','north Indian meals'],['adventure','snow','mountains']]),
    d(['kalimpong','Kalimpong','West Bengal','nature','nature',3,4,[1600,2800,3800,6800,9200,18500],[650,1400,3100],[550,1000,2400],['Deolo Hill','Durpin Monastery','flower nurseries','Morgan House area','local bazaar'],['momos','thukpa','bakery items'],['nature','hills','peaceful']]),
    d(['sundarbans','Sundarbans','West Bengal','adventure','nature',3,4,[1800,3200,4200,7600,10500,21000],[700,1450,3200],[700,1300,2900],['boat safari channels','watch towers','village walk','mangrove creeks','delta sunset'],['Bengali fish curry','bhaja platters','mishti doi'],['adventure','wildlife','nature']]),
    d(['daman','Daman','Dadra and Nagar Haveli and Daman and Diu','nature','coast',3,3,[1500,2600,3500,6500,9000,18000],[650,1400,3100],[500,950,2300],['Devka Beach','Jampore Beach','Moti Daman Fort','Bom Jesus Church','promenade area'],['seafood','Gujarati thali','coastal snacks'],['coast','heritage','relaxing']]),
    d(['silvassa','Silvassa','Dadra and Nagar Haveli and Daman and Diu','nature','nature',3,3,[1400,2500,3300,6200,8800,17000],[600,1300,2900],[500,950,2200],['Vasona Lion Safari','Dudhni Lake','tribal museum','church square','water sports zone'],['Gujarati meals','tribal-style dishes','snack platters'],['nature','weekend','family']]),
    d(['jammu','Jammu','Jammu and Kashmir','heritage','spiritual',3,4,[1500,2700,3600,6800,9500,19000],[650,1400,3100],[500,950,2300],['Raghunath Temple','Bagh-e-Bahu','Amar Mahal Museum','Bahu Fort','Mubarak Mandi'],['dogri dishes','kaladi kulcha','rajma chawal'],['heritage','spiritual','food']]),
    d(['minicoy','Minicoy','Lakshadweep','nature','coast',4,5,[2600,4300,6200,11200,15200,32500],[850,1750,3800],[750,1350,3000],['Minicoy lighthouse','lagoon beach','tuna village walk','water sports zone','sunset jetty'],['tuna dishes','coconut curries','reef fish'],['nature','islands','relaxing']]),
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
        names: safeTravelers.map((traveler) => traveler.name).filter(Boolean),
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

export const travelTypeOptions = [
    'Nature',
    'Adventure',
    'Spiritual',
    'Historical',
    'Beaches',
    'Wildlife',
    'Hill Station',
    'Food',
    'Culture',
    'City Break',
    'Romantic',
    'Road Trip',
    'Desert',
    'Wellness',
];

const monthProfiles = {
    desert: [10, 11, 12, 1, 2, 3],
    plains: [10, 11, 12, 1, 2, 3],
    coast: [10, 11, 12, 1, 2, 3, 4],
    island: [10, 11, 12, 1, 2, 3, 4],
    hills: [3, 4, 5, 6, 9, 10, 11],
    highHimalaya: [5, 6, 7, 8, 9],
    snow: [12, 1, 2, 3],
    monsoonGreen: [7, 8, 9, 10, 11],
    wildlife: [10, 11, 12, 1, 2, 3, 4, 5],
};

const slugProfileOverrides = {
    'leh-ladakh': 'highHimalaya',
    'spiti-valley': 'highHimalaya',
    tawang: 'highHimalaya',
    lachung: 'highHimalaya',
    gulmarg: 'snow',
    auli: 'snow',
    goa: 'coast',
    'port-blair-havelock': 'island',
    kavaratti: 'island',
    minicoy: 'island',
    alappuzha: 'monsoonGreen',
    munnar: 'monsoonGreen',
    wayanad: 'monsoonGreen',
    cherrapunji: 'monsoonGreen',
    mawlynnong: 'monsoonGreen',
    kaziranga: 'wildlife',
    sundarbans: 'wildlife',
    ranchi: 'monsoonGreen',
    jaisalmer: 'desert',
    jodhpur: 'desert',
    bikaner: 'desert',
    kutch: 'desert',
};

const stateProfileMap = {
    Rajasthan: 'desert',
    Gujarat: 'plains',
    Goa: 'coast',
    Kerala: 'coast',
    'Andaman and Nicobar Islands': 'island',
    Lakshadweep: 'island',
    Ladakh: 'highHimalaya',
    'Jammu and Kashmir': 'hills',
    Uttarakhand: 'hills',
    'Himachal Pradesh': 'hills',
    Sikkim: 'hills',
    Meghalaya: 'hills',
    'Arunachal Pradesh': 'hills',
    Mizoram: 'hills',
    Nagaland: 'hills',
    'West Bengal': 'plains',
    Odisha: 'coast',
    Puducherry: 'coast',
    'Tamil Nadu': 'plains',
};

const styleAliases = {
    nature: ['nature', 'hill station', 'wildlife', 'beaches', 'romantic', 'wellness'],
    adventure: ['adventure', 'road trip', 'trekking', 'snow', 'wildlife'],
    spiritual: ['spiritual', 'culture', 'historical'],
    historical: ['historical', 'heritage', 'culture', 'architecture'],
    beaches: ['beaches', 'nature', 'romantic'],
    wildlife: ['wildlife', 'nature', 'adventure'],
    'hill station': ['hill station', 'nature', 'romantic', 'wellness'],
    food: ['food', 'culture', 'city break'],
    culture: ['culture', 'historical', 'spiritual', 'food'],
    'city break': ['city break', 'food', 'culture', 'historical'],
    romantic: ['romantic', 'nature', 'beaches', 'hill station'],
    'road trip': ['road trip', 'adventure', 'nature'],
    desert: ['desert', 'historical', 'adventure'],
    wellness: ['wellness', 'nature', 'spiritual', 'hill station'],
};

const unique = (items) => [...new Set(items)];

const getSeasonProfile = (destination) => {
    if (slugProfileOverrides[destination.slug]) return slugProfileOverrides[destination.slug];
    if (destination.tags.includes('wildlife')) return 'wildlife';
    if (destination.tags.includes('desert')) return 'desert';
    if (destination.tags.includes('beaches') || destination.tags.includes('coast')) return 'coast';
    if (destination.tags.includes('mountains') || destination.tags.includes('snow')) return 'hills';
    return stateProfileMap[destination.state] || 'plains';
};

const getBestMonths = (destination) => monthProfiles[getSeasonProfile(destination)] || monthProfiles.plains;

const getBestSeasonLabel = (destination) => {
    const profile = getSeasonProfile(destination);
    const labels = {
        desert: 'October to March',
        plains: 'October to March',
        coast: 'October to April',
        island: 'October to April',
        hills: 'March to June and September to November',
        highHimalaya: 'May to September',
        snow: 'December to March',
        monsoonGreen: 'July to November',
        wildlife: 'October to May',
    };
    return labels[profile] || labels.plains;
};

const getTravelStyles = (destination) => {
    const styles = [...destination.tags];
    if (destination.category === 'heritage') styles.push('historical', 'culture');
    if (destination.category === 'nature') styles.push('nature');
    if (destination.category === 'adventure') styles.push('adventure');
    if (destination.tags.includes('spiritual')) styles.push('spiritual');
    if (destination.tags.includes('food')) styles.push('food', 'city break');
    if (destination.tags.includes('city')) styles.push('city break');
    if (destination.tags.includes('coast') || destination.tags.includes('beaches') || destination.tags.includes('islands')) styles.push('beaches');
    if (destination.tags.includes('mountains') || destination.tags.includes('hills') || destination.tags.includes('snow')) styles.push('hill station');
    if (destination.tags.includes('romantic') || destination.tags.includes('lakes')) styles.push('romantic');
    if (destination.tags.includes('road-trip')) styles.push('road trip');
    if (destination.tags.includes('desert')) styles.push('desert');
    if (destination.tags.includes('wildlife')) styles.push('wildlife');
    if (destination.tags.includes('wellness') || destination.tags.includes('peaceful') || destination.tags.includes('relaxing')) styles.push('wellness');
    return unique(styles.map((style) => style.toLowerCase()));
};

const getMonthsBetween = (startDate, endDate) => {
    const start = startOfDay(startDate);
    const end = startOfDay(endDate);
    const months = [];
    const current = new Date(start.getFullYear(), start.getMonth(), 1);
    const boundary = new Date(end.getFullYear(), end.getMonth(), 1);

    while (current <= boundary) {
        months.push(current.getMonth() + 1);
        current.setMonth(current.getMonth() + 1);
    }

    return unique(months);
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
        travelers: party.travelers,
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

export const getTripRecommendations = ({ startDate, endDate, travelType }) => {
    const dayCount = getTripDaysFromDates(startDate, endDate);
    if (dayCount < 3 || dayCount > 14) {
        throw new Error('Suggested trips currently support itineraries from 3 to 14 days.');
    }

    const selectedMonths = getMonthsBetween(startDate, endDate);
    const selectedStyle = (travelType || '').trim().toLowerCase();
    const acceptableStyles = unique([selectedStyle, ...(styleAliases[selectedStyle] || [])]);

    const matches = indiaDestinationCatalog
        .map((destination) => {
            const styles = getTravelStyles(destination);
            const bestMonths = getBestMonths(destination);
            const monthOverlap = selectedMonths.filter((month) => bestMonths.includes(month)).length;
            const styleOverlap = acceptableStyles.filter((style) => styles.includes(style)).length;

            return {
                slug: destination.slug,
                name: destination.name,
                state: destination.state,
                summary: `${destination.name} is strongest in ${getBestSeasonLabel(destination)} and suits ${styles.slice(0, 4).join(', ')} trips.`,
                bestSeason: getBestSeasonLabel(destination),
                styles,
                category: destination.category,
                image: destination.image,
                idealDays: destination.idealDays,
                minDays: destination.minDays,
                score: monthOverlap * 3 + styleOverlap * 5 + (dayCount >= destination.minDays ? 1 : -5),
                monthOverlap,
                styleOverlap,
            };
        })
        .filter((destination) => destination.styleOverlap > 0 && destination.monthOverlap > 0 && dayCount >= destination.minDays)
        .sort((first, second) => second.score - first.score || first.name.localeCompare(second.name));

    if (!matches.length) {
        throw new Error('No strong destination matches found for those dates and vacation type. Try nearby dates or a broader travel style.');
    }

    return matches;
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
