import {
  FaLinkedin,
  FaGithub,

  FaInstagram,

  FaDiscord,
  FaMedium,
  FaGoogle,
} from "react-icons/fa";
import type { IconType } from "react-icons";

// Legacy contact info structure for backward compatibility
// This will be transformed by the ContactRepository to match the new ContactInfo interface
export const contactInfo = {
  emails: [
    {
      address: "uyronmarcherhyssq@gmail.com",
      label: "Primary Email",
    },
  ],
  phones: [
    {
      number: "0993-296-4304",
      label: "Mobile",
    },
  ],
  location: {
    address: "Upper Bicutan, Taguig City, Philippines",
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
    icon: FaGoogle,
    href: "mailto:uyronmarcherhyssq@gmail.com",
    label: "Gmail",
    color: "#EA4335",
  },
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
    icon: FaInstagram,
    href: "https://www.instagram.com/ronmarcheee/",
    label: "Instagram",
    color: "#E4405F",
  },
  {
    icon: FaDiscord,
    href: "https://discord.com/users/881515697535090708",
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
