import { ImageSliderCustom } from "@/components";
import Image from "next/image";
import Slide1 from "@/assets/images/slides/slide_1.jpg";
import { Carousel } from "antd";
import { FaShippingFast } from "react-icons/fa";
import { LiaShippingFastSolid } from "react-icons/lia";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="relative max-h-[500px] w-full bg-[orange]">
        <div>
          <Carousel autoplay className="select-none rounded-xl">
            <ImageSliderCustom
              src={Slide1}
              alt="slide1"
              width={1000}
              height={1000}
              quality={100}
              className="h-[500px]"
            />
            <ImageSliderCustom
              src={Slide1}
              alt="slide1"
              width={1000}
              height={1000}
              quality={100}
              className="h-[500px]"
            />
            <ImageSliderCustom
              src={Slide1}
              alt="slide1"
              width={1000}
              height={1000}
              quality={100}
              className="h-[500px]"
            />
          </Carousel>
        </div>
        <div className="absolute bottom-[-50px] left-1/2 z-[99] flex h-[100px] w-[992px] -translate-x-1/2 transform items-center justify-between rounded-lg border border-primary bg-primary/80 px-5">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <LiaShippingFastSolid
                size={70}
                className="rounded-full border border-[#fff] p-3 text-[#fff]"
              />
              <div>
                <p className="font-bold text-[#fff]">Miễn phí vận chuyển</p>
                <p>Miễn phí vận chuyển</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LiaShippingFastSolid
                size={70}
                className="rounded-full border border-[#fff] p-3 text-[#fff]"
              />
              <div>
                <p className="font-bold text-[#fff]">Miễn phí vận chuyển</p>

                <p>Miễn phí vận chuyển</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LiaShippingFastSolid
                size={70}
                className="rounded-full border border-[#fff] p-3 text-[#fff]"
              />
              <div>
                <p className="font-bold text-[#fff]">Miễn phí vận chuyển</p>

                <p>Miễn phí vận chuyển</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
