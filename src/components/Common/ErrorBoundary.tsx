import { Component,type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-netflix-dark-gray flex items-center justify-center text-white">
                    <div className="text-center max-w-md px-4">
                        <h1 className="text-6xl font-bold text-netflix-red mb-4">Oops!</h1>
                        <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
                        <p className="text-gray-400 mb-8">
                            Please try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-netflix-red hover:bg-hover-red text-white font-bold py-3 px-8 rounded-full cursor-pointer"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
