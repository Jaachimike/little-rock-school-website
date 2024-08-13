import React from "react";
import heroImage from "../assets/jpg/mission-and-values.jpg";

const MissionAndVision = () => {
  return (
    <div className="content-container">
      <h2 className="text-3xl md:text-4xl text-littleRockBlue-500 font-bold mb-8">
        Mission & Vision
      </h2>
      <div className="w-full">
        <img src={heroImage} alt="" className="h-96 w-full rounded-xl" />
      </div>
      <div className="pt-20 flex flex-col gap-8">
        {/* our mission */}
        <div>
          <h3 className="text-xl md:text-2xl text-littleRockBlue-500 font-bold mb-3">
            Mission
          </h3>
          <p className="text-base md:text-lg">
            Blake engages students with a dynamic, academically challenging
            education in a diverse and supportive community committed to
            pluralism and a common set of values. Students pursue an integrated
            program of academic, artistic and athletic activities, preparing for
            college, lifelong learning and purposeful lives as community and
            global citizens.
          </p>
        </div>
        <div>
          <h3 className="text-xl md:text-2xl text-littleRockBlue-500 font-bold mb-3">
            Vision
          </h3>
          <p className="text-base md:text-lg">
            A vibrant learning environment springs from a diverse school
            community. For this reason, Blake seeks and values students,
            families and employees with a wide range of backgrounds, identities
            and life experiences. Individually and collectively, we strive for
            understanding across differences in an inclusive environment where
            everyone can belong, contribute and thrive.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionAndVision;
