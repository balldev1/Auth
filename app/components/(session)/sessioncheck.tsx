import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SessionCheck = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login'); // Redirect to the login page if not authenticated
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div>Loading...</div>; // Optionally, show a loading spinner
    }

    return null; // Or return children if you want to wrap other components
};

export default SessionCheck;
