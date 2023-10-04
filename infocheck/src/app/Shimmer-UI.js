"use client";

const Shimmer = () => {
  return (
    <div className="flex flex-wrap">
      {Array(10)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 w-52 h-52 m-5 rounded-md"
            style={{ flexBasis: "calc(33.33% - 1rem)" }}
          ></div>
        ))}
    </div>
  );
};

export default Shimmer;
