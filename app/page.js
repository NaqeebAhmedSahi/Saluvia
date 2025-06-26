// import Image from "next/image";
import Hero from '@/app/MainPage/Hero';
import About from '@/app/MainPage/About';
import Product from '@/app/MainPage/Product';
import Category from '@/app/MainPage/Category';
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Product />
      <Category />
    </>
  );
}
