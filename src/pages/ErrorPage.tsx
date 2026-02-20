import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage() {
    const error = useRouteError();
    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        // error is type `ErrorResponse`
        errorMessage = `${error.status} ${error.statusText}`;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = 'Unknown error';
    }

    return (
        <div id="error-page" className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center">
            <div className="bg-destructive/10 p-4 rounded-full mb-6">
                <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Oops!</h1>
            <p className="text-xl text-muted-foreground mb-6">Sorry, an unexpected error has occurred.</p>
            <p className="font-mono bg-muted p-2 rounded mb-8 text-sm">
                <i>{errorMessage}</i>
            </p>
            <div className="flex gap-4">
                <Button asChild variant="outline">
                    <Link to="/">Go Home</Link>
                </Button>
                <Button asChild>
                    <Link to="/blog-admin/posts">Go to Dashboard</Link>
                </Button>
            </div>
        </div>
    );
}
