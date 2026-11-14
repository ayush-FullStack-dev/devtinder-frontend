import LogoHorizontal from "@/components/brand/LogoHorizontal"
import LogoMark from "@/components/brand/LogoMark"
import LogoName from "@/components/brand/LogoName"

const LandingMobileMenuOverlay = () => {
    return (
        <div className='fixed w-dvw h-dvh z-100 bg-[#F0EEEE] flex justify-center items-center'>
            <div className="w-[95vw] h-[95dvh]">
                <div className="w-45">
                    <LogoName
                        className="text-black h-full w-full"
                        monoChrome
                    />
                </div>

            </div>
        </div>
    )
}

export default LandingMobileMenuOverlay