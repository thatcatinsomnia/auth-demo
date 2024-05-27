import { getSession } from '#/helpers/session';

export default async function Me() {
  const user = await getSession();

  return (
    <div className="pt-40 grid place-items-center text-white">
      <h1 className="text-4xl">Me</h1>
      <ul className="mx-auto max-w-xs pt-12 space-y-2">
        <li><strong className="mr-2 text-lg">id:</strong>{user?.id}</li>
        <li><strong className="mr-2 text-lg">name:</strong>{user?.name}</li>
        <li><strong className="mr-2 text-lg">email:</strong>{user?.email}</li>
        <li className="break-words"><strong className="mr-2">token:</strong>{user?.accessToken}</li>
      </ul>
    </div>
  );
}