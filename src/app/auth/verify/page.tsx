import VerifyPageContent from "./_components/VerifyPageContent";

type PageProps = {
    searchParams: Promise<{
        status?: string;
        email?: string;
    }>;
};

type VerifyStatus = "success" | "invalid" | "expired" | "error";

async function VerifyPage({ searchParams }: PageProps) {
    const {
        status: queryStatus,
        email: queryEmail,
    } = await searchParams;

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