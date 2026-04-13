import Link from 'next/link';


const NotFoundPage = () => {
  return (
    <section className="flex-1 flex items-center justify-center bg-surface px-4 py-24">
      <div className="w-full max-w-2xl">
        <div className="bg-surface border border-border shadow-sm rounded-xl px-6 py-24">
          <div className="text-center">

            <h1 className="text-3xl font-bold text-text-primary mb-3">
              Page Not Found
            </h1>

            <p className="text-xl text-text-muted mb-10">
              The page you are looking for does not exist.
            </p>

            <Link
              href="/"
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
            >
              Go Home
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;