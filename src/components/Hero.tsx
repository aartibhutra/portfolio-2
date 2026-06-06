import { prisma } from "@/lib/prisma";
import { HeroContent } from "./HeroContent";

const Hero = async () => {
  const hero = await prisma.heroSection.findFirst();

  return (
    <HeroContent
      headline={hero?.headline}
      subheadline={hero?.subheadline}
      primaryBtnText={hero?.primaryBtnText}
      primaryBtnLink={hero?.primaryBtnLink}
      secondaryBtnText={hero?.secondaryBtnText}
      secondaryBtnLink={hero?.secondaryBtnLink}
      imageUrl={hero?.imageUrl}
    />
  );
};

export default Hero;
