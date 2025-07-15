import { useNavigate } from "react-router";
import { generateRandomLightColor } from "../../utils/color";
import { Section } from "../section";
import { Timeline } from "../timeline";

export function HomeExperience() {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col space-y-5">
            <div className="flex flex-row items-center space-x-4">
              <p className="font-bold text-base tracking-[0.3em]">
                EXPERIENCES
              </p>
              <div className="h-[3px] w-[45px] bg-black" />
            </div>

            <div className="relative flex-col space-y-4">
              <Timeline
                dateText="Mar 2024 - Sep 2024"
                bgCard={generateRandomLightColor()}
              >
                <p className="font-bold">INSPIRO - Mobile Developer</p>
                <p>
                  - Engineered modules in the Pruforce Pulse app using Agile
                  methodologies, optimizing performance and scalability in a
                  manner consistent with modern React component design.
                  <br />- Diagnosed and resolved issues in both existing and new
                  modules while maintaining accurate version control with Git.
                  <br />- Collaborated with vendors to extend functionality
                  using React Native, demonstrating skills transferable to React
                  applications in full-stack development.
                  <br />- Delivered robust, high-quality code for iOS and
                  Android platforms with a focus on performance optimization and
                  adherence to mobile best practices.
                </p>
              </Timeline>
              <Timeline
                dateText="Jan 2022 - May 2023"
                bgCard={generateRandomLightColor()}
              >
                <p className="font-bold">DigitSense Ltd - Mobile Developer</p>
                <p>
                  - Constructed the Myrlabs app using React Native to ensure
                  cross-platform functionality and responsive design,
                  complementing web development practices in React.
                  <br />- Conducted thorough client requirement analyses and
                  provided actionable recommendations, aligning with Agile
                  methodologies for iterative development.
                  <br />- Supported team efforts in developing web applications
                  by applying mobile development insights to enhance UI
                  responsiveness and user experience.
                  <br />- Performed comprehensive testing and documentation to
                  ensure application reliability, incorporating unit testing
                  practices with tools like Jest and Vitest.
                </p>
              </Timeline>

              <div
                className="flex flex-row gap-5 items-center justify-center max-w-4xl bg-white/90 py-5mx-auto"
              >
                <div
                  className="bg-black px-5 py-2.5 rounded-lg cursor-pointer hover:shadow-[0_20px_30px_-10px_rgba(38,57,77,1)] transition-shado"
                  onClick={() => navigate("/cv#experiences")}
                >
                  <span className="text-white text-xs">View More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
