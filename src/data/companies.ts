export interface Company {
  id: string;
  name: string;
  industry: string;
  logoUrl?: string;
}

export const INDUSTRIES = [
  "All Industries",
  "IT & Software Development",
  "AI Automation & Smart Business Systems",
  "CRM & ERP Solutions",
  "Digital & Performance Marketing",
  "Project Outsourcing",
  "Virtual & Trained Workforce",
  "SMEs & Startups",
  "Marketing & IT Agencies",
  "HR & Recruitment Firms",
  "Web & mobile app development",
  "Game development services",
  "IT project outsourcing",
  "Lead generation company",
  "Growth marketing services",
  "Online marketing for businesses",
  "Marketing automation services",
  "Business growth services",
  "SME business solutions",
  "Startup support services",
  "Scale business operations",
  "Cost-effective business services",
  "Business consulting & execution"
];

// Helper to get clearbit logo
const getLogo = (domain: string) => `https://logo.clearbit.com/${domain}`;

export const partnerCompanies: Company[] = [
  { id: "c1", name: "Sawariya Solution", industry: "IT & Software Development", logoUrl: getLogo("sawariyasolutions.com") },
  { id: "c2", name: "Jash Packaging Co", industry: "SMEs & Startups", logoUrl: getLogo("jashpackaging.com") },
  { id: "c3", name: "AATAPI Wonderland", industry: "SMEs & Startups", logoUrl: getLogo("aatapiwonderland.com") },
  { id: "c4", name: "Speedline Taxis", industry: "SMEs & Startups", logoUrl: getLogo("speedlinetaxis.com") },
  { id: "c5", name: "Pandits Cafe And Restaurant", industry: "SMEs & Startups", logoUrl: getLogo("pandits.com") },
  { id: "c6", name: "Aldar International", industry: "Business consulting & execution", logoUrl: getLogo("aldar.com") },
  { id: "c7", name: "Essar Group", industry: "Project Outsourcing", logoUrl: getLogo("essar.com") },
  { id: "c8", name: "Nexrise Aac Blocks", industry: "SMEs & Startups", logoUrl: getLogo("nexrise.in") },
  { id: "c9", name: "Mudra Takshashila Institute Of Design & Architecture", industry: "Web & mobile app development", logoUrl: getLogo("mti.edu.in") },
  { id: "c10", name: "Framestore", industry: "Game development services", logoUrl: getLogo("framestore.com") },
  { id: "c11", name: "Ekra Decor", industry: "SMEs & Startups", logoUrl: getLogo("ekradecor.com") },
  { id: "c12", name: "Lakshya", industry: "IT project outsourcing", logoUrl: getLogo("lakshyadigital.com") },
  { id: "c13", name: "Packman", industry: "SMEs & Startups", logoUrl: getLogo("packman.co.in") },
  { id: "c14", name: "ADF Aroma De France", industry: "SMEs & Startups", logoUrl: getLogo("aromadefrance.com") },
  { id: "c15", name: "Cizzara", industry: "SMEs & Startups", logoUrl: getLogo("cizzara.com") },
  { id: "c16", name: "Shiv Agro Chemical Industries", industry: "SMEs & Startups", logoUrl: getLogo("shivagro.com") },
  { id: "c17", name: "Pizza Bell", industry: "SMEs & Startups", logoUrl: getLogo("pizzabell.com") },
  { id: "c18", name: "Anibrain", industry: "Game development services", logoUrl: getLogo("anibrain.com") },
  { id: "c19", name: "VFXWAALA", industry: "Game development services", logoUrl: getLogo("vfxwaala.com") },
  { id: "c20", name: "Weta Digital", industry: "Game development services", logoUrl: getLogo("wetafx.co.nz") },
  { id: "c21", name: "Vistaprint", industry: "Digital & Performance Marketing", logoUrl: getLogo("vistaprint.com") },
  { id: "c22", name: "National Foods", industry: "SMEs & Startups", logoUrl: getLogo("nationalfoods.com") },
  { id: "c23", name: "Method Studios", industry: "Game development services", logoUrl: getLogo("methodstudios.com") },
  { id: "c24", name: "3D Studio", industry: "Game development services", logoUrl: getLogo("3dstudio.com") },
  { id: "c25", name: "Damyaa", industry: "SMEs & Startups", logoUrl: getLogo("damyaa.com") },
  { id: "c26", name: "APS-Associates", industry: "HR & Recruitment Firms", logoUrl: getLogo("apsassociates.com") },
  { id: "c27", name: "Asha Tours & Travels", industry: "SMEs & Startups", logoUrl: getLogo("ashatours.com") },
  { id: "c28", name: "Ayansh Security", industry: "SMEs & Startups", logoUrl: getLogo("ayanshsecurity.com") },
  { id: "c29", name: "CSD Instruments", industry: "IT & Software Development", logoUrl: getLogo("csdinstruments.com") },
  { id: "c30", name: "Destinee Visa", industry: "Business consulting & execution", logoUrl: getLogo("destineevisa.com") },
  { id: "c31", name: "Drapple Healthcare", industry: "HR & Recruitment Firms", logoUrl: getLogo("drapple.com") },
  { id: "c32", name: "Green Clean Solar", industry: "SMEs & Startups", logoUrl: getLogo("greencleansolar.com") },
  { id: "c33", name: "Manavta Hospital", industry: "SMEs & Startups", logoUrl: getLogo("manavtahospital.com") },
  { id: "c34", name: "SIAMP", industry: "Project Outsourcing", logoUrl: getLogo("siamp.com") },
  { id: "c35", name: "Otto Valves & Rubers", industry: "SMEs & Startups", logoUrl: getLogo("ottovalves.com") },
  { id: "c36", name: "Little Millennium", industry: "SMEs & Startups", logoUrl: getLogo("littlemillennium.com") },
  { id: "c37", name: "NHSRCL", industry: "Project Outsourcing", logoUrl: getLogo("nhsrcl.in") },
  { id: "c38", name: "Bizpack", industry: "Business growth services", logoUrl: getLogo("bizpack.com") },
  { id: "c39", name: "Associated Power Solution Pvt. Ltd", industry: "SMEs & Startups", logoUrl: getLogo("associatedpower.com") },
  { id: "c40", name: "3insys", industry: "IT & Software Development", logoUrl: getLogo("3insys.com") },
  { id: "c41", name: "Indian Western Railway", industry: "Project Outsourcing", logoUrl: getLogo("wr.indianrailways.gov.in") },
  { id: "c42", name: "Global Discovery School", industry: "SMEs & Startups", logoUrl: getLogo("globaldiscoveryschool.com") }
];
