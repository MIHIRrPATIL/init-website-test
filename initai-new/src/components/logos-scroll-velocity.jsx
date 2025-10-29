import { ScrollVelocity } from "./ui/scroll-velocity";

const LogosScrollVelocity = () => {
  const logos = [
    { name: "Google", icon: "🔍" },
    { name: "Microsoft", icon: "⬜" },
    { name: "OpenAI", icon: "🤖" },
    { name: "Meta", icon: "f" },
    { name: "Amazon", icon: "📦" },
    { name: "Apple", icon: "🍎" },
    { name: "Tesla", icon: "⚡" },
    { name: "IBM", icon: "🖥️" },
  ];

  return (
    <div className="w-full py-16 bg-[#03071e]">
      <div className="relative z-20 w-full">
        <h1 className="text-white text-center mb-8 text-3xl font-bold">Our Clients</h1>
      </div>

      <div className="relative z-10 w-screen left-1/2 right-1/2 -mx-[50vw]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-linear-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        <div className="relative z-10 w-full py-8">
        <ScrollVelocity
          velocity={5}
          movable={true}
          className="py-4"
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-300 whitespace-nowrap shadow-lg"
            >
              <span className="text-2xl filter brightness-0 invert">{logo.icon}</span>
              <span className="text-white font-semibold text-sm md:text-base">
                {logo.name}
              </span>
            </div>
          ))}
        </ScrollVelocity>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#03071e] to-transparent pointer-events-none" />
    </div>
  );
};

export default LogosScrollVelocity;
