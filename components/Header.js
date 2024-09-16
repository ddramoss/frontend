import LogoutButton from './LogoutButton';

export default function UserInfo({ user }) {
    return (
        <div className="flex justify-between items-center mb-4">
            <span className="inline-block bg-indigo-200 rounded-full px-3 py-1 text-sm font-semibold text-indigo-700 mr-2 mb-2 ml-2">
                {user.name} - {user.email}
            </span>
            <LogoutButton />
        </div>
    );
}
