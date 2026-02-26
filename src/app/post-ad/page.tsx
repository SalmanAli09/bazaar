import PostAdHeader from '@/components/PostAdHeader';
import BasicDetails from '@/components/BasicDetails';
import Pricing from '@/components/Pricing';
import PhotoUpload from '@/components/PhotoUpload';
import BoostListing from '@/components/BoostListing';
import PostAdFooter from '@/components/PostAdFooter';

export default function PostAdPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <PostAdHeader />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold dark:text-white">Post an Ad</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Fill in details below to reach thousands of potential buyers.
          </p>
        </div>
        <form className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-24">
          <div className="lg:col-span-7 space-y-8">
            <BasicDetails />
            <Pricing />
          </div>
          <div className="lg:col-span-5 space-y-8">
            <PhotoUpload />
            <BoostListing />
          </div>
        </form>
      </main>
      <PostAdFooter />
    </div>
  );
}

export const metadata = {
  title: 'Post an Ad | Bazaar Marketplace',
  description: 'Fill in details below to reach thousands of potential buyers.',
};
