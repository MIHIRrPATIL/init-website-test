import BlurTextAnimation from "@/components/blur-text-animation";
import FlippingChromaGridV2 from "@/components/FlippingChromaGridV2";
import FinalNavbar from "@/components/FinalNavbar";
import FinalFooter from "@/components/FinalFooter";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaInstagram } from "react-icons/fa";
import ThreeJSHeader_Team from "@/components/ThreeJSHeader_Team";

const colors = [
  { hex: "#4F46E5", name: "Indigo" },
  { hex: "#10B981", name: "Emerald" },
  { hex: "#F59E0B", name: "Amber" },
  { hex: "#EF4444", name: "Red" },
  { hex: "#8B5CF6", name: "Violet" },
  { hex: "#06B6D4", name: "Cyan" },
  { hex: "#EC4899", name: "Pink" },
  { hex: "#14B8A6", name: "Teal" },
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
const getRandomBorderColor = () => {
  const randomColors = [...colors].sort(() => Math.random() - 0.5);
  return randomColors[0].hex;
};
const getRandomGradient = () => {
  const availableColors = [...colors];
  const color1Index = Math.floor(Math.random() * availableColors.length);
  const color1 = availableColors[color1Index];
  availableColors.splice(color1Index, 1);
  
  const color2 = availableColors[Math.floor(Math.random() * availableColors.length)];
  const angle = Math.floor(Math.random() * 360);
  
  return `linear-gradient(${angle}deg, ${color1.hex}, ${color2.hex})`;
};

export default function Team() {
  return (
    <section className="min-h-screen bg-[#03071e] text-white">
      <FinalNavbar />

      {/* ✅ Added ThreeJSHeader Section */}
      <section className="relative z-10">
        <ThreeJSHeader_Team />
      </section>
            {/* New FlippingChromaGridV2 */}
      <div className="bg-[#03071e]">
        <div className="container mx-auto px-4">
          <BlurTextAnimation
            text="Meet our team"
            className="mb-8 text-center max-w-4xl mx-auto"
            fontSize="text-3xl md:text-4xl"
            textColor="text-white"
            animationDelay={800}
          />
          {/* Faculty in charge */}
          <FlippingChromaGridV2 
            items={[
              {
                image: "./core_images/Prachi_Satam.png",
                title: "Prof. Prachi Satam",
                subtitle: "Faculty Co-ordinator",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: FaLinkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/prachi-tawde-a17414208/" },
                ]
              },
              {
                image: "./core_images/Priyanca_Gonsalves.png",
                title: "Prof. Priyanca Gonsalves",
                subtitle: "Faculty Co-ordinator",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: FaLinkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/priyanca-gonsalves-b141451b1/" },
                ]
              },
            ]}
            columns={2}
          />

          {/* Core Team Members*/}
          <FlippingChromaGridV2 
            items={[
              {
                image: "./core_images/Paril.jpg",
                title: "Paril Rupani",
                subtitle: "Vice Chairperson Reseach and Development",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: "github", label: "GitHub", url: "https://github.com/paril-01" },
                  { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/paril-rupani-6396232a5" },
                  { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/paril.rupani.351/" },

                ]
              },
              {
                image: "./core_images/Nandini.jpg",
                title: "Nandini Nema",
                subtitle: "Chairperson",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: "github", label: "GitHub", url: "https://github.com/nandininema07" },
                  { icon: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/nandininema" },
                  { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/nandininema_07/" },
                ]
              },
              {
                image: "./core_images/Rachit.jpg",
                title: "Rachit Chawda",
                subtitle: "Vice Chairperson Outreach",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: "github", label: "GitHub", url: "https://github.com/Rachit1903" },
                  { icon: "linkedin", label: "LinkedIn", url: "http://www.linkedin.com/in/rachit-chawda" },
                  { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/rachit_chawda" },

                ]
              }          
            ]}
            columns={3}
          />

          {/* Secretary */}
          <FlippingChromaGridV2 
            items={[
              {
                image: "./core_images/Nyasa.jpg",
                title: "Nyasa Parikh",
                subtitle: "Secretary",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: FaGithub, label: "GitHub", url: "https://github.com/Nyasa-Parikh-17" },
                  { icon: FaLinkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/nyasa-parikh-911a77293/" },
                ]
              },
              {
                image: "./core_images/Sneh.jpg",
                title: "Sneh Shrimankar",
                subtitle: "Secretary",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: FaGithub, label: "GitHub", url: "https://github.com/Sneh-Shrimankar/" },
                  { icon: FaLinkedin, label: "LinkedIn", url: "http://www.linkedin.com/in/snehshrimankar" },
                  { icon: FaInstagram, label: "Instagram", url: "https://www.instagram.com/sneh_1002/" },
                ]
              }
            ]}
            columns={2}
          />


          {/* Research Team Members*/}
          <FlippingChromaGridV2 
            items={[
              {
                image: "./core_images/Amit.png",
                title: "Amit Upadhayay",
                subtitle: "Research Lead",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: "github", label: "GitHub", url: "https://github.com/CelestialRouge" },
                  { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/celstialrouge/" },
                  { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/_a.m.i.t_u/" },

                ]
              },
              {
                image: "./core_images/Krishna.jpg",
                title: "Krishna Naudiyal",
                subtitle: "Research Lead",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: "github", label: "GitHub", url: "https://github.com/krznanoziyal" },
                  { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/krishna-naudiyal13/" },
                  { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/krishna_naudiyal/" },

                ]
              },
              {
                image: "./core_images/Mallank.jpeg",
                title: "Mallank Gogri",
                subtitle: "Research Lead",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: "github", label: "GitHub", url: "https://github.com/mallankg" },
                  { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/mallankgogri/" },
                  { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/mallankg" },

                ]
              },
              {
                image: "./core_images/Mihik.jpg",
                title: "Mihik Chaudhari",
                subtitle: "Research Lead",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: "github", label: "GitHub", url: "https://github.com/Mihik197" },
                  { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/mihik-chaudhari/" },
                  { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/mihik_c123/" },

                ]
              },
              {
                image: "./core_images/Nachiket.jpg",
                title: "Nachiket Jain",
                subtitle: "Research Lead",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: "github", label: "GitHub", url: "https://github.com/Nachiket-Jain" },
                  { icon: "linkedin", label: "LinkedIn", url: "http://www.linkedin.com/in/jain-nachiket" },
                  { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/nachijain/" },

                ]
              },
              {
                image: "./core_images/PranavS.jpg",
                title: "Pranav Sonmale",
                subtitle: "Research Lead",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: "github", label: "GitHub", url: "https://github.com/Sonmale25" },
                  { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/pranav-sonmale-1364582b2/" },

                ]
              }              
            ]}
            columns={3}
          />

          {/* Research part 2 */}
          <FlippingChromaGridV2 
            items={[
              {
                image: "./core_images/Rohana.jpg",
                title: "Rohana Mahimkar",
                subtitle: "Research Lead",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: "github", label: "GitHub", url: "http://github.com/rohana-2005" },
                  { icon: "linkedin", label: "LinkedIn", url: "http://linkedin.com/in/rohana-mahimkar-96341a283" },
                  { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/_rohana.m_/#" },

                ]
              },
              {
                image: "./core_images/Sagar.jpg",
                title: "Sagar Harsora",
                subtitle: "Research Lead",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: "github", label: "GitHub", url: "https://github.com/sagarrh" },
                  { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/sagarharsora" },
                  { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/sagarr.h/" },

                ]
              }
            ]}
            columns={2}
          />

          {/* Tech Team Members */}
          <FlippingChromaGridV2 
            items={[
              {
                image: "./core_images/Mihir.jpg",
                title: "Mihir Patil",
                subtitle: "Technical Head",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: "github", label: "GitHub", url: "https://github.com/MIHIRrPATIL" },
                  { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/mihir-patil-a97777290/" },

                ]
              },
              {
                image: "./core_images/PranavD.jpg",
                title: "Pranav Dharwadkar",
                subtitle: "Technical Head",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: "github", label: "GitHub", url: "https://github.com/Pranaavvvv" },
                  { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/pranav-dharwadkar-7051b4293/" },
                  { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/_praanavvvv_?igsh=MXhoaDRwZ2tvdW44eg==" },
                ]
              },
              {
                image: "./core_images/Krishnakant.jpg",
                title: "Krishnakant Singh",
                subtitle: "Techical Head",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: "github", label: "GitHub", url: "https://github.com/kktheomniscient" },
                  { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/krishnakant-singh-5754a628b/" },

                ]
              }
            ]}
            columns={3}
          />

          {/* Marketing and Social Media Team Members - PHOTOS */}
          <FlippingChromaGridV2 
            items={[
              {
                image: "./core_images/Parth.jpg",
                title: "Parth Patil",
                subtitle: "Marketing Head",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: "github", label: "GitHub", url: "https://github.com/BoomBoi44" },
                  { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/parth-patillll/" },
                  { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/parth._.clicks/?next=%2F" },

                ]
              },
              {
                image: "./core_images/Ibrahim.jpg",
                title: "Ibrahim Kothari",
                subtitle: "Social Media Head",
                borderColor: getRandomBorderColor(),
                gradient: getRandomGradient(),
                socials: [
                  { icon: "github", label: "GitHub", url: "https://github.com/IbrahimKo04" },
                  { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/ibrahim-kothari" },
                  { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/_ibrahim04_ko" },

                ]
              }
            ]}
            columns={2}
          />
        </div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-4">
          <FinalFooter/>
        </div>
      </div>
      </section>
    )
}