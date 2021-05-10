import IconButton from "./IconButton";
import Icon from "./Icon";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Scrollbar, A11y, Lazy, Virtual } from "swiper";
import { Tree } from "../data/tree";

SwiperCore.use([Scrollbar, A11y, Lazy, Virtual]);

export interface GridItemProps {
  data: Tree;
  isFlipped: boolean;
  onFlippedChange: () => void;
  isDone: boolean;
  onDoneChange: () => void;
}

export default function GridItem({
  data,
  isFlipped,
  onFlippedChange,
  isDone,
  onDoneChange,
}: GridItemProps) {
  const { name, latin, url, images } = data;

  if (isDone) return null;
  return (
    <li className="aspect-w-1 aspect-h-1 relative bg-white rounded-lg overflow-hidden shadow">
      <div className="flex items-center justify-center rounded-lg overflow-hidden">
        {isFlipped ? (
          <a
            href={url}
            className="flex justify-center items-center space-x-2 group"
          >
            <p className="text-xl font-bold group-hover:underline">{name}</p>
            <p className="text-xl font-bold group-hover:underline">{latin}</p>
            <div>
              <Icon className="text-gray-500 group-hover:text-gray-700">
                open_in_new
              </Icon>
            </div>
          </a>
        ) : (
          <Swiper
            className="w-full h-full"
            // navigation
            scrollbar={{ draggable: true }}
            preloadImages={false}
            lazy
            virtual
          >
            {images.map((image) => (
              <SwiperSlide key={image}>
                <img
                  loading="lazy"
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="absolute right-2 bottom-2 z-10">
          <IconButton onClick={onFlippedChange}>
            <Icon className="text-white">flip</Icon>
          </IconButton>
        </div>
        <div className="absolute right-2 top-2 z-10">
          <IconButton onClick={onDoneChange}>
            <Icon className="text-white">done</Icon>
          </IconButton>
        </div>
      </div>
    </li>
  );
}
