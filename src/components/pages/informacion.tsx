import QuienesSomos from "../views/general_info/AboutUs";

const AboutUs = () => {
  return(
    <>
      <div
        className="bg-cover  bg-fixed h-96 backdrop-blur-sm  bg-center"
        style={{ backgroundImage: "url('https://discoveryeb.com/wp-content/uploads/2022/09/Discovery_Sobre-nosotros_banner.jpg')" }}
      >
        <div className="flex backdrop-blur-sm w-full h-full bg-black/50 justify-center items-center">
          <h2 className="font-bold text-center text-white text-7xl sm:text-8xl top-0 sticky">Sobre nosotros</h2>
        </div>
        <div className="flex h-full flex-col py-6 px-10 gap-y-5 ">
          <QuienesSomos/>
        </div>
      </div>
    </>
  )
}

export default AboutUs;