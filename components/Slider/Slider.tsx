import Footer from './Footer';
import Logo from './Logo';
import Style from './Slider.module.scss';
import SliderList from './SliderList';

export default function Slider() {
  return (
    <div className={Style['slider-container']}>
      <Logo />
      <SliderList />
      <Footer />
    </div>
  );
}
