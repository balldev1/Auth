import {useEffect, useState} from "react";
import {User} from "@/types";

export const WelcomePage = () => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/register');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const userData: User = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        fetchUser();
    }, []);

    console.log(user)

    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <div className="grid xl:grid-cols-3 sm:grid-cols-2  gap-5 w-[60rem] xl:h-[30rem] h-[60rem]
            xl:mx-0 mx-5
            ">
                <div className="shadow-md shadow-gray-950 rounded-lg bg-gray-500/50 ">
                    1
                </div>
                <div className="shadow-md shadow-gray-950 rounded-lg bg-gray-500/50">
                    1
                </div>
                <div className="shadow-md shadow-gray-950 rounded-lg bg-gray-500/50">
                    1
                </div>
                <div className="shadow-md shadow-gray-950 rounded-lg bg-gray-500/50">
                    1
                </div>
                <div className="shadow-md shadow-gray-950 rounded-lg bg-gray-500/50">
                    1
                </div>
                <div className="shadow-md shadow-gray-950 rounded-lg bg-gray-500/50">
                    1
                </div>
            </div>
        </div>
    )
}