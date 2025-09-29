import { Navbar } from "@/components/navbar";
import { SwapCard } from "@/components/swap/swap-card";

export default function Page() {
  return (
    <main
      className="min-h-dvh bg-hero"
      style={{
        backgroundImage: `url('/background.png')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={"bg-[rgba(0,0,0,0.9)] min-h-dvh"}>
        <Navbar />
        <section className="container mx-auto px-4 py-8 sm:py-10">
          <div className="mx-auto max-w-md sm:max-w-lg lg:max-w-lg">
            <SwapCard />
          </div>
        </section>
      </div>
    </main>
  );
}
