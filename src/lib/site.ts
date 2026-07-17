import logoImage from "@/assets/logo.png";

export const SITE = {
  name: "Aashlesha Enterprises",
  tagline: "Our promise, Your Trust!",
  description:
    "Wholesale & retail supplier of premium plywood, plastics, tarpaulins and interior design materials.",
  logo: logoImage,
  phone: "+91 93797 03815",
  whatsapp: "+91 9379703815",
  email: "aashleshenterprisesgangolli@gmail.com",
  address: "JMRC PFV Ashlesh Enterprises, Gangolli, Karnataka 576216",
  mapEmbed: "https://www.google.com/maps?q=JMRC%20PFV%20Ashlesh%20Enterprises%2C%20Gangolli%2C%20Karnataka%20576216&output=embed",
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
  },
} as const;

export function mapEmbedUrl(address = SITE.address) {
  if (address === "JMRC PFV Ashlesh Enterprises, Gangolli, Karnataka 576216") {
    return "https://www.google.com/maps?q=JMRC%20PFV%20Ashlesh%20Enterprises%2C%20Gangolli%2C%20Karnataka%20576216&output=embed";
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

export function whatsappLink(text?: string) {
  const num = SITE.whatsapp.replace(/[^\d]/g, "");
  return `https://wa.me/${num}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function telLink() {
  return `tel:${SITE.phone.replace(/\s/g, "")}`;
}
