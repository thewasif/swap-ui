import { cn } from "@/lib/utils";
import { Power, TrendingDown, TrendingUp } from "lucide-react";

export function WalletSummaryCard() {
  return (
    <section
      className={cn(
        "bg-[#050706F5] h-full backdrop-blur p-4 text-foreground",
        "w-full max-w-sm",
      )}
      aria-label="Wallet summary"
    >
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={"/ETH.png"}
            alt="Wallet avatar"
            className="size-6 rounded-full"
            crossOrigin="anonymous"
          />
          <span className="text-sm md:text-base font-medium">
            0x90ef...ce01
          </span>
        </div>
        <button
          type="button"
          aria-label="Power"
          className="rounded-full p-1 hover:bg-muted/50 transition-colors"
        >
          <Power className="size-6 text-destructive-foreground" />
        </button>
      </header>

      {/* Balance */}
      <div className="mt-3">
        <div className="text-3xl font-semibold tracking-tight">
          {Number(Math.random() * 1000).toFixed(2)}
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm">
          <span>
            <span className={"text-destructive-foreground"}>{"▼"}</span>{" "}
            {Math.random().toFixed(4)} ({Math.random().toFixed(4)})
          </span>
          <span className="text-muted-foreground">Today</span>
        </div>
      </div>

      {/* Tokens */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-white ">Tokens</h3>
        <div className="mt-2 flex flex-col gap-2">
          {[
            {
              name: "ETH",
              symbol: "ETH",
              amount: "0.055 ETH",
              price: "$1100.5",
              changePct: "2.39%",
              isPositive: false,
              iconSrc: "/ETH.png",
            },
            {
              name: "USDT",
              symbol: "USDT",
              amount: "100.055 USDT",
              price: "$100.1",
              changePct: "2.39%",
              isPositive: true,
              iconSrc: "/USDT.png",
            },
          ].map((t) => (
            <div
              key={t.symbol}
              className="rounded-xl border border-border bg-panel px-3 py-2"
              role="listitem"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      t.iconSrc ||
                      `/placeholder.svg?height=28&width=28&query=${encodeURIComponent(t.name)}%20token%20icon`
                    }
                    alt={`${t.name} icon`}
                    className="size-7 rounded-full"
                    crossOrigin="anonymous"
                  />
                  <div className="flex flex-col">
                    <span className="text-base font-medium">{t.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {t.amount}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-base font-medium">{t.price}</span>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-sm",
                      t.isPositive
                        ? "text-[#62E43A]"
                        : "text-destructive-foreground",
                    )}
                  >
                    {t.isPositive ? (
                      <TrendingUp className="size-4" aria-hidden="true" />
                    ) : (
                      <TrendingDown className="size-4" aria-hidden="true" />
                    )}
                    <span>{t.changePct}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WalletSummaryCard;
