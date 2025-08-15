import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaDiscord,
  FaMedium,
} from "react-icons/fa";
import { IconType } from "react-icons";
import {
  EmailContact,
  PhoneContact,
  LocationInfo,
  SocialLink,
} from "@/lib/types";

// Legacy contact info structure for backward compatibility
// This will be transformed by the ContactRepository to match the new ContactInfo interface
export const contactInfo = {
  emails: [
    {
      address: "uyronmarcherhyssq@gmail.com",
      label: "Primary Email",
    },
    {
      address: "Ronmarcheuy@example.com",
      label: "Secondary Email",
    },
  ],
  phones: [
    {
      number: "0993-296-4304",
      label: "Mobile",
    },
    {
      number: "0956-873-2869",
      label: "Office",
    },
  ],
  location: {
    address: "Upper bicutan, Taguig City, Philippines",
    mapUrl: "https://maps.google.com/?q=Taguig+City,+Philippines",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.802548850809!2d121.04155931482183!3d14.553551689828368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8efd99f5459%3A0xf26e2c5e8a39bc!2sTaguig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1629789045693!5m2!1sen!2sph",
  },
};

// Legacy social links structure for backward compatibility
export const socialLinks: {
  icon: IconType;
  href: string;
  label: string;
  color: string;
}[] = [
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/ron-marche-rhyss-uy-578b80240/",
    label: "LinkedIn",
    color: "#0077B5",
  },
  {
    icon: FaGithub,
    href: "https://github.com/uyronmarche14",
    label: "GitHub",
    color: "#333",
  },
  {
    icon: FaTwitter,
    href: "https://twitter.com/yourhandle",
    label: "Twitter",
    color: "#1DA1F2",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/ronmarcheee/",
    label: "Instagram",
    color: "#E4405F",
  },
  {
    icon: FaYoutube,
    href: "https://www.youtube.com/@UyRonMarcheRhyssQ",
    label: "YouTube",
    color: "#FF0000",
  },
  {
    icon: FaTiktok,
    href: "https://www.tiktok.com/@ronmarcheuy",
    label: "TikTok",
    color: "#000000",
  },
  {
    icon: FaDiscord,
    href: "881515697535090708",
    label: "Discord",
    color: "#7289DA",
  },
  {
    icon: FaMedium,
    href: "https://medium.com/@ronmarcheuy",
    label: "Medium",
    color: "#00AB6C",
  },
];
