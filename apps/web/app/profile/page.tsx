import { getSession } from '#/libs/auth';
import SignOutButton from '#/components/SignOutButton';

export default async function Me() {
  const user = await getSession();

  return (
    <div className="px-6 grid place-items-center dark:text-white">
      <h1 className="py-6 text-4xl">Profile</h1>

      <div className="mx-auto max-w-xs">
        <ul className="mb-10 space-y-2">
          <li><strong className="mr-2 text-lg">id:</strong>{user?.id}</li>
          <li><strong className="mr-2 text-lg">name:</strong>{user?.name}</li>
          <li><strong className="mr-2 text-lg">email:</strong>{user?.email}</li>
          <li className="break-all"><strong className="mr-2">token:</strong>{user?.accessToken}</li>
        </ul>

        <SignOutButton />
      </div>
    </div>
  );
}