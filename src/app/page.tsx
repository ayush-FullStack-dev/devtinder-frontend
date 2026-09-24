import JsonLd from "@/constants/JsonLd";
import { softLoginCheck } from "@/actions/softloginCheck";
import LandingPageContent from "@/sections/Landing/LandingPageContent";

export async function PageLayout() {
    const isLoggedIn = await softLoginCheck("refresh");

    return (
        <LandingPageContent isLoggedIn={isLoggedIn} />
    );
}

export default function HomePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(JsonLd),
                }}
            />

            <PageLayout />
        </>
    );
}