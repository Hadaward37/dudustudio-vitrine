import { CartProvider } from '@/app/hooks/useCart';
import { WishlistProvider } from '@/app/hooks/useWishlist';
import { ToastProvider } from '@/app/hooks/useToast';
import Hero from '@/app/sections/Hero';
import Navigation from '@/app/sections/Navigation';
import Featured from '@/app/sections/Featured';
import Seasonal from '@/app/sections/Seasonal';
import AllChocolates from '@/app/sections/AllChocolates';
import BeanToBar from '@/app/sections/BeanToBar';
import GiftGuide from '@/app/sections/GiftGuide';
import Footer from '@/app/sections/Footer';

export default function Home() {
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          <Navigation />
          <main>
            <Hero />
            <Featured />
            <Seasonal />
            <AllChocolates />
            <BeanToBar />
            <GiftGuide />
            <Footer />
          </main>
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
