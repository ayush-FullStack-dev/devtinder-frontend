import { poynter } from "@/assets/fonts/font.poynter";
import Image from "next/image";

const RightPanel = () => {
    return (
        <div className="dark relative w-[55vw] hidden lg:flex items-center justify-center rounded-r-2xl overflow-hidden">

            <div className="absolute inset-0 bg-white dark:bg-black text-black dark:text-white">

                <Image
                    src="/images/signup-illustration.png"
                    alt="auth background"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-5" />

                <div className={`${poynter.className} relative h-full flex flex-col justify-between pt-30 pb-10 absolute z-6`}>

                    <div className={`ml-[15%] w-fit flex flex-col text-7xl opacity-95`}>
                        <span>Find your</span>
                        <span className="text-[#2BA96F]">Dev match.</span>
                        <span>Build together.</span>
                        <span className="text-[#2BA96F]">Grow together.</span>
                    </div>

                    <div className="w-full overflow-hidden opacity-90 select-none pointer-events-none font-serif ">

                        <span className="block w-max whitespace-nowrap text-[#1b3629] animate-code-one">
                            {`const dev = findMatch(skills); if (dev) connect(dev); function connect(dev) { const match = createMatch(dev); return match; } const team = buildTogether(matches); team.add(dev);`}
                        </span>

                        <span className="block w-max whitespace-nowrap text-[#1b3629] animate-code-two">
                            {`team.grow(); function findMatch(skills) { return developers.find(dev => dev.skills.some(skill => skills.includes(skill))); }`}
                        </span>

                    </div>

                </div>
            </div>
        </div>

    );
};

export default RightPanel;