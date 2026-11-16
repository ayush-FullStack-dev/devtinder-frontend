import CompleteVerification from "./_components/CompleteVerification";
import VerifyPageContent from "./_components/VerifyPageContent";

type PageProps = {
    searchParams: Promise<{
        token?: string;
        status?: string;
        email?: string;
    }>;
};

type VerifyStatus = "success" | "invalid" | "expired" | "error";

async function VerifyPage({ searchParams }: PageProps) {
    const {
        token,
        status: queryStatus,
        email: queryEmail,
    } = await searchParams;

    if (token) {
        return <CompleteVerification key={token} token={token} />;
    }

    const status: VerifyStatus =
        queryStatus === "success" ||
            queryStatus === "invalid" ||
            queryStatus === "expired" ||
            queryStatus === "error"
            ? queryStatus
            : "error";

    return (
        <VerifyPageContent
            status={status}
            email={queryEmail ?? ""}
        />
    );
}

export default VerifyPage;