import LogoHorizontal from "@/components/brand/LogoHorizontal"
import LogoMark from "@/components/brand/LogoMark"
import LogoName from "@/components/brand/LogoName"

const LandingMobileMenuOverlay = () => {
    return (
        <div className='fixed w-dvw h-dvh z-100 bg-[#F0EEEE] flex justify-center items-center'>
            <div className="w-[95vw] h-[95dvh]">
                <LogoHorizontal
                    className="text-[#16a968]"
                    monoChrome
                />

            </div>
        </div>
    )
}

export default LandingMobileMenuOverlay