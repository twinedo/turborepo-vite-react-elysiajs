import { useEffect, useState } from "react";
import Slider from "react-slick";
import { NavLink } from "react-router";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlineMobile } from "react-icons/ai";
import { TbWorld } from "react-icons/tb";
import { Section } from "../section";
import type { IProject } from "~repo-shared";
import { dummyProjects } from "../../utils/const";

export function HomeProjects() {
  const [loading, setLoading] = useState(true);
  const [dataListMobile, setDataListMobile] = useState<Array<IProject>>([]);

  useEffect(() => {
    setLoading(true);

    const sortYear = dummyProjects.sort((a, b) => b.year.localeCompare(a.year));
    const slice5 = sortYear.slice(0, 4);
    setDataListMobile(slice5);

    setTimeout(() => {
      setLoading(false);
    }, 500); // Shorter timeout for dummy data
  }, []);

  const settings = {
    dots: true,
    infinite: dataListMobile.length > 3,
    arrows: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
    <Section className="bg-[#192841] w-full">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col space-y-5">
          <div className="flex flex-row items-center justify-between space-x-4">
            <div className="flex flex-row items-center space-x-4">
              <p className="text-white font-bold text-base tracking-[0.3em]">
                PROJECTS
              </p>
              <div className="h-[3px] w-[45px] bg-white" />
            </div>
            <NavLink to="/projects">
              <div className="flex flex-row items-center hover:text-yellow-300">
                <p className="text-white text-xs font-semibold cursor-pointer">
                  View More
                </p>
                <BiChevronRight className="text-white text-xl" />
              </div>
            </NavLink>
          </div>

          <div className="overflow-hidden w-full">
            <Slider {...settings}>
              {dataListMobile.map((o: IProject) => (
                <div key={o.key} className="px-2.5 py-5">
                  <div className="flex flex-col space-y-3 rounded-lg bg-[#1e3f66] cursor-pointer hover:shadow-[0_2px_8px_0_rgba(255,255,255,0.8)]">
                    <div className="w-full h-[100px]">
                      <img
                        src={o.display}
                        alt="image"
                        className="object-cover object-center w-full h-full overflow-hidden rounded-t-lg"
                      />
                    </div>
                    <div className="pt-1 pb-2.5 px-2.5">
                      <div className="flex flex-col space-y-2">
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex-1">
                            <p className="text-white font-semibold truncate">
                              {o.name}
                            </p>
                          </div>
                          {o.platform === "mobile" ? (
                            <AiOutlineMobile className="text-white" />
                          ) : (
                            <TbWorld className="text-white" />
                          )}
                        </div>
                        <div className="w-full h-px bg-white" />
                        <div className="flex flex-row justify-between items-center">
                          <p className="text-white text-xs text-center">
                            {o.year}
                          </p>
                          <NavLink
                            to={{
                              pathname: `projects/${o.key}`,
                              query: { platform: o.platform },
                            }}
                            passHref
                          >
                            <p className="text-white border border-white rounded-full py-1 px-5 text-xs text-center hover:bg-white hover:text-black">
                              Detail
                            </p>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </Section>
  );
}
