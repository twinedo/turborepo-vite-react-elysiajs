
import { BiChevronLeft } from 'react-icons/bi';
import Slider from 'react-slick';
import { AiFillApple } from 'react-icons/ai';
import { TbWorld } from 'react-icons/tb';
import { FaGooglePlay } from 'react-icons/fa';
import {NavLink, useNavigate} from 'react-router';
import { Section } from '../section';
import type { IProject } from '~repo-shared';

export function ProjectDetail({
  data,
  imageData,
}: {
  data: IProject;
  imageData: Array<string>;
}) {
  const navigate = useNavigate();
  
  const imageSettings = {
    dots: true,
    infinite: imageData?.length > 3,
    arrows: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const imageMSettings = {
    dots: true,
    infinite: imageData?.length > 3,
    arrows: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white">
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col space-y-5">
            {/* Header Section */}
            <div className="flex flex-row justify-between items-center">
              <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
                {data?.name}
              </h1>
              <button 
                onClick={() => navigate(-1)}
                className="
                  border border-gray-300
                  rounded-md
                  px-3 py-1.5
                  flex items-center
                  hover:bg-gray-50
                  transition-colors
                "
              >
                <BiChevronLeft />
                <span className="ml-2.5">Back</span>
              </button>
            </div>

            {/* Metadata Section */}
            <div className="flex flex-row items-center space-x-4">
              <div className="flex flex-col">
                <span className="font-bold">Date</span>
                <span className="text-gray-500">{data?.year}</span>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div className="flex flex-col">
                <span className="font-bold">Platform</span>
                <span className="text-gray-500 capitalize">
                  {data?.platform}
                </span>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div className="flex flex-col">
                <span className="font-bold">Tech</span>
                <span className="text-gray-500">{data?.tag}</span>
              </div>
            </div>

            {/* Image Sliders */}
            {data?.platform === 'website' && (
              <Slider {...imageSettings}>
                {imageData.map((o, i) => (
                  <div key={i} className="flex justify-center items-center">
                    <img
                      src={o}
                      alt={data?.name}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </div>
                ))}
              </Slider>
            )}

            {data?.platform === 'mobile' && (
              <Slider {...imageMSettings}>
                {imageData.map((o, i) => (
                  <div key={i} className="p-7 flex justify-center items-center">
                    <img 
                      src={o} 
                      alt={data?.name} 
                      className="rounded-lg w-full h-auto"
                    />
                  </div>
                ))}
              </Slider>
            )}

            {/* Description Section */}
            <div className="flex flex-col space-y-2">
              <h2 className="font-bold">Description</h2>
              <p>{data?.description}</p>
            </div>

            {/* Available On Section */}
            <div className="flex flex-col space-y-2">
              <h2 className="font-bold">Available on</h2>
              {data?.platform === 'website' && data?.link_website !== '-' && (
                <NavLink
                  to={data?.link_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl"
                >
                  <TbWorld />
                </NavLink>
              )}

              {data?.platform === 'mobile' && (
                <div className="flex flex-row items-center space-x-5">
                  {data?.link_appstore !== '-' && (
                    <div className="flex flex-row items-center space-x-5">
                      <NavLink
                        to={data?.link_appstore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl"
                      >
                        <AiFillApple />
                      </NavLink>
                      <div className="h-5 w-px bg-gray-300"></div>
                    </div>
                  )}
                  {data?.link_playstore !== '-' && (
                    <div className="flex flex-row items-center space-x-5">
                      <NavLink
                        to={data?.link_playstore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl"
                      >
                        <FaGooglePlay />
                      </NavLink>
                      <div className="h-5 w-px bg-gray-300"></div>
                    </div>
                  )}
                  {data?.link_website !== '-' && (
                    <NavLink
                      to={data?.link_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl"
                    >
                      <TbWorld />
                    </NavLink>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}