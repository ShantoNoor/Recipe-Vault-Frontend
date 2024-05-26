import PaymentDialog from "@/components/PaymentDialog";
import Title from "@/components/Title";
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
            {["Beginner", "Pro", "Chef"].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 * idx }}
                className="group flex flex-col overflow-hidden border-2 rounded-md cursor-pointer shadow hover:shadow-md hover:border-primary transition-colors duration-300"
                onClick={async () => {
                  setOpen(true);
                  setGettingIntent(true);
                  setUpdate({ price: idx === 0 ? 1 : 5 * idx });
                  const res = await axiosPublic.post("/create-payment-intent", {
                    price: idx === 0 ? 1 : 5 * idx,
                  });
                  setClientSecret(res.data.clientSecret);
                  setGettingIntent(false);
                }}
              >
                <div className="flex flex-col items-center justify-center px-2 py-8 space-y-4">
                  <p className="text-lg font-medium">{item}</p>
                  <p className="text-5xl font-bold">{idx === 0 ? 1 : 5 * idx} $</p>
                </div>
                <div className="flex flex-col items-center justify-center px-2 py-8">
                  <ul className="self-stretch flex-1 space-y-2">
                    <li className="flex justify-center space-x-2">
                      <Coins className="size-6" />
                      <span>Get {(idx === 0 ? 1 : 5 * idx) * 100} coins</span>
                    </li>
                  </ul>
                </div>
                <div className="relative flex justify-center items-center h-20 font-semibold group-hover:text-accent  transition-all duration-300">
                  <div className="absolute inset-0 bg-primary scale-y-0 group-hover:scale-y-100 origin-bottom  transition-all duration-150" />
                  <span className="z-[1]">Buy Now</span>
                </div>
              </motion.div>
            ))}
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
