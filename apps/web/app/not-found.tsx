import FullHeightContent from "#/components/FullHeightContent";

export default function NotFound() {
  return (
    <FullHeightContent>
      <div className="h-full flex flex-col items-center justify-center">
        <h1 className="text-8xl font-bold">404</h1>
        <p className="mt-5 text-3xl font-bold">PAGE NOT FOUND</p>
      </div>
    </FullHeightContent>
  );
}

