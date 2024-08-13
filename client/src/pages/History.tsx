import heroImage from "../assets/jpg/history.jpg";

const History = () => {
  return (
    <div className="content-container">
      <h2 className="text-3xl md:text-4xl text-littleRockBlue-500 font-bold mb-8">
        History
      </h2>
      <div className="w-full flex gap-8">
        <div className="flex flex-col gap-6 font-calluna text-2xl">
          <p>
            For more than 110 years, The Blake School and its predecessors —
            Northrop Collegiate School (1900), Blake School (1907), and
            Highcroft Country Day School (1958) — have provided excellent
            education for students in the Twin Cities area.
          </p>
          <p>
            In the early 20th century, a small group of families who wanted to
            prepare their children for schools in the East founded Blake (for
            boys) and Northrop (for girls) in Minneapolis. Migration to the
            Minneapolis suburbs led to the 1958 incorporation of Highcroft, a
            co-ed elementary school in Wayzata. The three schools merged to
            become The Blake School(s) in 1974.
          </p>
        </div>
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

export default History;
