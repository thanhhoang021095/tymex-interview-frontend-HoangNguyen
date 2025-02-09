import Banner from '@/components/common/Banner';
import Products from '@/components/common/Products';

const HomePage = () => (
  <div className="bg-[url(/images/content_bg.jpg)]" data-testid="home-page">
    <Banner />
    <Products />
  </div>
);

export default HomePage;
