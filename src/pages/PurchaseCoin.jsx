import Title from "@/components/Title";
import { Button } from "@/components/ui/button";

const PurchaseCoin = () => {
  return (
    <>
      <Title>PurchaseCoin</Title>
      <section className="py-6">
        <div className="container p-4 mx-auto sm:p-10">
          <div className="mb-12 space-y-4 text-center">
            <h1 className="text-4xl font-semibold leadi">
              Buy Coins for Your Recipe Vault
            </h1>
            <p className="px-4 sm:px-8 lg:px-24">
              Fuel Your Foodie Adventures: Get Coins for More Recipes
            </p>
          </div>
          <div className="grid max-w-md grid-cols-1 gap-6 mx-auto auto-rows-fr lg:grid-cols-3 lg:max-w-full">
            <div className="flex flex-col overflow-hidden border-2 rounded-md">
              <div className="flex flex-col items-center justify-center px-2 py-8 space-y-4">
                <p className="text-lg font-medium">Beginner</p>
                <p className="text-5xl font-bold">1$</p>
              </div>
              <div className="flex flex-col items-center justify-center px-2 py-8">
                <ul className="self-stretch flex-1 space-y-2">
                  <li className="flex justify-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      ></path>
                    </svg>
                    <span>Get 100 coins</span>
                  </li>
                </ul>
                <Button className="px-8 py-3 mt-6 text-lg font-semibold rounded sm:mt-12">
                  Buy Now
                </Button>
              </div>
            </div>
            <div className="flex flex-col overflow-hidden border-2 rounded-md border-primary">
              <div className="flex flex-col items-center justify-center px-2 py-8 space-y-4">
                <p className="text-lg font-medium">Pro</p>
                <p className="text-5xl font-bold">5$</p>
              </div>
              <div className="flex flex-col items-center justify-center px-2 py-8">
                <ul className="self-stretch flex-1 space-y-2">
                  <li className="flex justify-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      ></path>
                    </svg>
                    <span>Get 500 coins</span>
                  </li>
                </ul>
                <Button className="px-8 py-3 mt-6 text-lg font-semibold rounded sm:mt-12">
                  Buy Now
                </Button>
              </div>
            </div>
            <div className="flex flex-col overflow-hidden border-2 rounded-md">
              <div className="flex flex-col items-center justify-center px-2 py-8 space-y-4">
                <p className="text-lg font-medium">Chef</p>
                <p className="text-5xl font-bold">10$</p>
              </div>
              <div className="flex flex-col items-center justify-center px-2 py-8">
                <ul className="self-stretch flex-1 space-y-2">
                  <li className="flex justify-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      ></path>
                    </svg>
                    <span>Get 1000 coins</span>
                  </li>
                </ul>
                <Button className="px-8 py-3 mt-6 text-lg font-semibold rounded sm:mt-12">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PurchaseCoin;
