import Image from "next/image";

const LandingFooter = () => {
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
            </div>
        </footer>
    );
};

export default LandingFooter;