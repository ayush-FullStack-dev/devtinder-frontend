"use client";

import { Suspense } from "react";
import ErrorPageContent from "./_components/ErrorContent";


const ErrorPage = () => {

    return (
        <Suspense fallback={null}>
            <ErrorPageContent />
        </Suspense>
    );
};

export default ErrorPage;