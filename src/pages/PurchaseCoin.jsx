import PaymentDialog from "@/components/PaymentDialog";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import axiosPublic from "@/hooks/useAxios";
import { motion } from "framer-motion";
import { Coins } from "lucide-react";
import { useState } from "react";

const PurchaseCoin = () => {
  const [update, setUpdate] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [gettingIntent, setGettingIntent] = useState(false);
  const [open, setOpen] = useState(false);

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
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col overflow-hidden border-2 rounded-md"
            >
              <div className="flex flex-col items-center justify-center px-2 py-8 space-y-4">
                <p className="text-lg font-medium">Beginner</p>
                <p className="text-5xl font-bold">1$</p>
              </div>
              <div className="flex flex-col items-center justify-center px-2 py-8">
                <ul className="self-stretch flex-1 space-y-2">
                  <li className="flex justify-center space-x-2">
                    <Coins className="size-6" />
                    <span>Get 100 coins</span>
                  </li>
                </ul>
                <Button
                  onClick={async () => {
                    setOpen(true);

                    setGettingIntent(true);
                    setUpdate({ price: 1 });

                    const res = await axiosPublic.post(
                      "/create-payment-intent",
                      { price: 1 }
                    );
                    setClientSecret(res.data.clientSecret);
                    setGettingIntent(false);
                  }}
                  className="px-8 py-3 mt-6 text-lg font-semibold rounded sm:mt-12"
                >
                  Buy Now
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col overflow-hidden border-2 rounded-md border-primary"
            >
              <div className="flex flex-col items-center justify-center px-2 py-8 space-y-4">
                <p className="text-lg font-medium">Pro</p>
                <p className="text-5xl font-bold">5$</p>
              </div>
              <div className="flex flex-col items-center justify-center px-2 py-8">
                <ul className="self-stretch flex-1 space-y-2">
                  <li className="flex justify-center space-x-2">
                    <Coins className="size-6" />
                    <span>Get 500 coins</span>
                  </li>
                </ul>
                <Button
                  onClick={async () => {
                    setOpen(true);

                    setGettingIntent(true);
                    setUpdate({ price: 5 });

                    const res = await axiosPublic.post(
                      "/create-payment-intent",
                      { price: 5 }
                    );
                    setClientSecret(res.data.clientSecret);
                    setGettingIntent(false);
                  }}
                  className="px-8 py-3 mt-6 text-lg font-semibold rounded sm:mt-12"
                >
                  Buy Now
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col overflow-hidden border-2 rounded-md"
            >
              <div className="flex flex-col items-center justify-center px-2 py-8 space-y-4">
                <p className="text-lg font-medium">Chef</p>
                <p className="text-5xl font-bold">10$</p>
              </div>
              <div className="flex flex-col items-center justify-center px-2 py-8">
                <ul className="self-stretch flex-1 space-y-2">
                  <li className="flex justify-center space-x-2">
                    <Coins className="size-6" />
                    <span>Get 1000 coins</span>
                  </li>
                </ul>
                <Button
                  onClick={async () => {
                    setOpen(true);

                    setGettingIntent(true);
                    setUpdate({ price: 10 });

                    const res = await axiosPublic.post(
                      "/create-payment-intent",
                      { price: 10 }
                    );
                    setClientSecret(res.data.clientSecret);
                    setGettingIntent(false);
                  }}
                  className="px-8 py-3 mt-6 text-lg font-semibold rounded sm:mt-12"
                >
                  Buy Now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <PaymentDialog
        gettingIntent={gettingIntent}
        clientSecret={clientSecret}
        update={update}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default PurchaseCoin;
