import Banner from "@/components/Banner";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
import axiosPublic from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { ChefHat } from "lucide-react";
import CountUp from "react-countup";

const Home = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      try {
        const result = await axiosPublic.get(`/home`);
        return result.data;
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    },
  });

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Title>Home</Title>
      <Banner />

      <section className=" mt-6">
        <div className="container mx-auto sm:p-10">
          <div className=" space-y-4 text-center">
            <h1 className="text-4xl font-semibold leadi">
              Our Success Stories
            </h1>

            <p className="px-4 sm:px-8 lg:px-24">
              Recipe Vault: Unlock a treasure trove of culinary delights with
              Recipe Vault, where you can discover, share, and enjoy recipes,
              earn rewards, and enhance your cooking journey with a vibrant
              community.
            </p>

            <div className="mt-6  ">
              <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
                <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-accent ">
                  <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-primary">
                    <ChefHat className="h-9 w-9 " />
                  </div>
                  <div className="flex flex-col justify-center align-middle">
                    <p className="text-3xl font-semibold leadi">
                      <CountUp
                        start={0}
                        end={data.recipeCount}
                        // enableScrollSpy={true}
                        scrollSpyOnce={true}
                        duration={2}
                      />
                    </p>
                    <p className="capitalize">Recipes</p>
                  </div>
                </div>
                <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-accent ">
                  <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      className="h-9 w-9 "
                    >
                      <path d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                      <path d="M256,384A104,104,0,0,0,360,280H152A104,104,0,0,0,256,384Z"></path>
                      <polygon points="205.757 228.292 226.243 203.708 168 155.173 109.757 203.708 130.243 228.292 168 196.827 205.757 228.292"></polygon>
                      <polygon points="285.757 203.708 306.243 228.292 344 196.827 381.757 228.292 402.243 203.708 344 155.173 285.757 203.708"></polygon>
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center align-middle">
                    <p className="text-3xl font-semibold leadi">
                      <CountUp
                        start={0}
                        end={data.userCount}
                        // enableScrollSpy={true}
                        scrollSpyOnce={true}
                        duration={2}
                      />
                    </p>
                    <p className="capitalize">Users</p>
                  </div>
                </div>
                <div className="flex p-4 space-x-4 rounded-lg md:space-x-6  bg-accent">
                  <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      className="h-9 w-9 "
                    >
                      <path d="M425.706,142.294A240,240,0,0,0,16,312v88H160V368H48V312c0-114.691,93.309-208,208-208s208,93.309,208,208v56H352v32H496V312A238.432,238.432,0,0,0,425.706,142.294Z"></path>
                      <rect width="32" height="32" x="80" y="264"></rect>
                      <rect width="32" height="32" x="240" y="128"></rect>
                      <rect width="32" height="32" x="136" y="168"></rect>
                      <rect width="32" height="32" x="400" y="264"></rect>
                      <path d="M297.222,335.1l69.2-144.173-28.85-13.848L268.389,321.214A64.141,64.141,0,1,0,297.222,335.1ZM256,416a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,416Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center align-middle">
                    <p className="text-3xl font-semibold leadi">
                      <CountUp
                        start={0}
                        end={171}
                        // enableScrollSpy={true}
                        scrollSpyOnce={true}
                        duration={2}
                      />
                      %
                    </p>
                    <p className="capitalize">Growth</p>
                  </div>
                </div>
                <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-accent ">
                  <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      className="h-9 w-9 "
                    >
                      <path d="M454.423,278.957,328,243.839v-8.185a116,116,0,1,0-104,0V312H199.582l-18.494-22.6a90.414,90.414,0,0,0-126.43-13.367,20.862,20.862,0,0,0-8.026,33.47L215.084,496H472V302.08A24.067,24.067,0,0,0,454.423,278.957ZM192,132a84,84,0,1,1,136,65.9V132a52,52,0,0,0-104,0v65.9A83.866,83.866,0,0,1,192,132ZM440,464H229.3L79.141,297.75a58.438,58.438,0,0,1,77.181,11.91l28.1,34.34H256V132a20,20,0,0,1,40,0V268.161l144,40Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center align-middle">
                    <p className="text-3xl font-semibold leadi">
                      <CountUp
                        start={0}
                        end={27}
                        // enableScrollSpy={true}
                        scrollSpyOnce={true}
                        duration={2}
                      />{" "}
                      %
                    </p>
                    <p className="capitalize">Bounce rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="container mx-auto sm:p-10">
          <div className="mb-12 space-y-4 text-center">
            <h1 className="text-4xl font-semibold leadi">Dev Info</h1>

            <div className="p-6 sm:p-12 bg-muted rounded-md">
              <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                <img
                  src="https://media.licdn.com/dms/image/D5603AQFIfMM1RpwtrQ/profile-displayphoto-shrink_800_800/0/1702119980687?e=1722470400&v=beta&t=dMduyPxz7dq8HvWq5rYEIRAoGD2-fVxLvvygXGgvSIk"
                  alt=""
                  className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start"
                />
                <div className="flex flex-col">
                  <h4 className="text-lg font-semibold text-center md:text-left">
                    Md. Noor E Musa
                  </h4>
                  <p className="text-left">
                    Hello I am Md. Noor E Musa, I am a enthusiastic React
                    Developer _ I love coding in JavaScript and Python!
                    <br />
                    <br />
                    <span className="text-primary">Education: </span>B. Sc in
                    Computer Science and Engineering, <br /> Bangabandhu Sheikh
                    Mujibur Rahman Science and Technology University, Gopalganj,
                    Bangladesh.
                    <br />
                    <br />
                    <span className="text-primary">Skills: </span>I am a
                    full-stack developer skilled in JavaScript, Python. My
                    expertise includes building dynamic UIs with React.js and
                    data handling with ReactQuery and Mongoose.js. I create
                    responsive designs using MaterialUI, TailWind CSS and craft
                    animations with Framer-Motion and GSAP. On the backend, I
                    utilize Express.js, and manage databases with MongoDB.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
