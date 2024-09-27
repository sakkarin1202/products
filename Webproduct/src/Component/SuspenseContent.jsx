import Loading from "./Loading";
import loadingAnimation from "../loading/loading.json";

const SuspenseContent = () => {
  return (
    <div className="w-full h-screen text-grey-300 bg-base-100">
      <div className="flex items-center justify-center h-full">
        <Loading animation={loadingAnimation} />
      </div>
    </div>
  );
};

export default SuspenseContent;
