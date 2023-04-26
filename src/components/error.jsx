import { MainStackLogo } from "./svg";

const Error = () => {
  return (
    <div class="h-[100vh] font-bold flex flex-col justify-center items-center gap-6">
        <MainStackLogo/>
      <h1 className="text-4xl">An Error as occured.</h1>
      <h1>
        {" "}
        <span class="ascii text-3xl">(╯°□°）╯︵ ┻━┻</span>
      </h1>
      <a href="#" className="text-black underline text-xl">Refresh this page or check your internet connection</a>
      {/* bifhiefbvefeengenge4gb4gb4bg */}
    </div>
  );
};

export default Error;