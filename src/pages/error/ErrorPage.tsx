import { useRouteError } from "react-router-dom";

interface RouterError {
    statusText?: string;
    message?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isRouterError(error: any): error is RouterError {
    return (
        error != null &&
        typeof error === "object" &&
        ("statusText" in error || "message" in error)
    );
}

export default function ErrorPage() {
    const error = useRouteError();

    let errorMessage = "Unknown error";
    if (isRouterError(error)) {
        errorMessage = error.statusText || error.message || errorMessage;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === "string") {
        errorMessage = error;
    }

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{errorMessage}</i>
            </p>
        </div>
    );
}