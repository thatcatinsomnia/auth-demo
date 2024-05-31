import { getSession } from '#/libs/auth';
import SignOut from '#/components/SignOut';

export default async function Me() {
  const user = await getSession();

  return (
    <div className="px-6 grid place-items-center text-white">
      <h1 className="py-6 text-4xl">Profile</h1>

      <div className="mx-auto max-w-xs">
        <ul className="mb-8 space-y-2">
          <li><strong className="mr-2 text-lg">id:</strong>{user?.id}</li>
          <li><strong className="mr-2 text-lg">name:</strong>{user?.name}</li>
          <li><strong className="mr-2 text-lg">email:</strong>{user?.email}</li>
          <li className="break-all"><strong className="mr-2">token:</strong>{user?.accessToken}</li>
        </ul>

        <SignOut />
      </div>
    </div>
  );
}