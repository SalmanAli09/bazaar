import BasicDetails from './BasicDetails';
import Pricing from './Pricing';

export default function PostAdForm() {
  return (
    <form className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-24">
      <div className="lg:col-span-7 space-y-8">
        <BasicDetails />
        <Pricing />
      </div>
      <div className="lg:col-span-5 space-y-8">
        {/* PhotoUpload and BoostListing will be added here in the main page */}
      </div>
    </form>
  );
}
