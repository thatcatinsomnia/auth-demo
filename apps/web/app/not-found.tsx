import FullHeightContent from "#/components/FullHeightContent";

export default function NotFound() {
  return (
    <FullHeightContent>
      <div className="h-full flex flex-col items-center justify-center">
        <h1 className="text-6xl">404</h1>
        <p className="mt-5 text-3xl">PAGE NOT FOUND</p>
      </div>
    </FullHeightContent>
  );
}

