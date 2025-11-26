import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const localUser = 'authUser';

const getUserFromStorage = (): string | null => localStorage.getItem(localUser);

const setUserInStorage = (username: string | null) => {
    if (username) localStorage.setItem(localUser, username);
    else localStorage.removeItem(localUser);
};

export const useAuth = () => {
    const queryClient = useQueryClient();

    const { data: user } = useQuery<string | null>({
        queryKey: ['authUser'],
        queryFn: getUserFromStorage,
        initialData: getUserFromStorage(),
    });

    // Login mutation
    const loginMutation = useMutation({
        mutationFn: async (username: string) => {
            setUserInStorage(username);
            return username;
        },
        onSuccess: (username: string) => {
            queryClient.setQueryData(['authUser'], username);
        },
    });

    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: async () => {
            setUserInStorage(null);
            return null;
        },
        onSuccess: () => {
            queryClient.setQueryData(['authUser'], null);
        },
    });

    const login = async (username: string) => await loginMutation.mutateAsync(username);
    const logout = async () => await logoutMutation.mutateAsync();

    return {
        user,
        login,
        logout,
        isLoggingIn: loginMutation.status === 'pending',
        isLoggingOut: logoutMutation.status === 'pending',
        isLoginError: loginMutation.status === 'error',
        isLogoutError: logoutMutation.status === 'error',
    };
};
