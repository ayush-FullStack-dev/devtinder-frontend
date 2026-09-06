import { poynter } from "@/assets/fonts/font.poynter";
import Image from "next/image";

const RightPanel = () => {
    return (
        <div className="dark relative hidden h-full min-h-0 w-[55vw] overflow-hidden rounded-r-2xl lg:flex">
            <div className="absolute inset-0 bg-black text-white">
                <Image
                    src="/images/signup-illustration.png"
                    alt="auth background"
                    fill
                    sizes="55vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 z-5 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

                <div
                    className={`${poynter.className} absolute inset-0 z-6 flex h-full flex-col justify-between pt-30 pb-10`}
                >
                    <div className="ml-[15%] flex w-fit flex-col text-7xl opacity-95">
                        <span>Find your</span>
                        <span className="text-[#2BA96F]">Dev match.</span>
                        <span>Build together.</span>
                        <span className="text-[#2BA96F]">Grow together.</span>
                    </div>

                    <div className="text-[1vw] w-full overflow-hidden font-serif opacity-90 select-none pointer-events-none">
                        <div className="flex w-max animate-code-one gap-2">
                            <span className="shrink-0 whitespace-nowrap text-[#1b3629]">
                                {`const dev = findMatch(skills); if (dev) connect(dev); function connect(dev) { const match = createMatch(dev); return match; } const team = buildTogether(matches); team.add(dev);`}
                            </span>

                            <span
                                aria-hidden="true"
                                className="shrink-0 whitespace-nowrap text-[#1b3629]"
                            >
                                {`const dev = findMatch(skills); if (dev) connect(dev); function connect(dev) { const match = createMatch(dev); return match; } const team = buildTogether(matches); team.add(dev);`}
                            </span>
                        </div>

                        <div className="flex w-max animate-code-two gap-2">
                            <span className="shrink-0 whitespace-nowrap text-[#1b3629]">
                                {`team.grow(); function findMatch(skills) { return developers.find(dev => dev.skills.some(skill => skills.includes(skill))); }`}
                            </span>

                            <span
                                aria-hidden="true"
                                className="shrink-0 whitespace-nowrap text-[#1b3629]"
                            >
                                {`team.grow(); function findMatch(skills) { return developers.find(dev => dev.skills.some(skill => skills.includes(skill))); }`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default RightPanel;