import Image from "next/image";

const LandingFooter = () => {
    const brandChars = ["D", "e", "v", "T", "i", "n", "d", "e", "r"];
    
    return (
        <footer className="relative isolate min-h-[70dvh] w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-0 z-0 select-none">
                <Image
                    src="/images/footer-bg.webp"
                    alt=""
                    role="presentation"
                    fill
                    sizes="100vw"
                    className="object-cover max-lg:hidden"
                />

                <Image
                    src="/images/footer-bg-mobile.webp"
                    alt=""
                    role="presentation"
                    fill
                    sizes="100vw"
                    className="object-cover lg:hidden"
                />
                <div className="absolute inset-0 bg-[#111111]/30" />
            </div>

            <div className="relative z-10">
                <div className="col-span-full -mb-10 flex justify-center overflow-hidden px-1 pt-[14px] lg:-mb-14 lg:px-0 lg:pt-8">
                    <div className="font-brand font-extrabold text-center mb-[calc(-12_/_360_*_100vw)] text-[calc(86_/_360_*_100vw)] leading-[80%] tracking-[calc(-2.1_/_360_*_100vw)] md:-mb-6 md:text-[180px] md:tracking-[-2px] lg:-mb-8 lg:text-[240px] xl:-mb-10 xl:-ml-3 xl:text-[320px]">
                        <span className="word inline-block text-nowrap">
                            {brandChars.map((char, index) => (
                                <span key={index} className="char inline-block" style={{
                                    willChange: "transform",
                                    transform: "translate(0px, 0px)"
                                }}>
                                    {char}
                                </span>
                            ))}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;