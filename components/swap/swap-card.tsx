"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Settings,
  ChevronDown,
  Repeat,
  Info,
  Clock,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@/components/ui/tooltip";

const TOKENS = [
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "USDT", name: "Tether USD" },
  { symbol: "SOL", name: "Solana" },
];

export function SwapCard() {
  const [sellAmount, setSellAmount] = useState<string>("1");
  const [sellToken, setSellToken] = useState<string>("ETH");
  const [buyToken, setBuyToken] = useState<string>("");
  const [detailsOpen, setDetailsOpen] = useState(true);

  const estPriceUsd = useMemo(() => {
    const n = Number(sellAmount || "0");
    return Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(3364.45 * (isNaN(n) ? 0 : n));
  }, [sellAmount]);

  return (
    <div className="relative mt-4">
      <div className={"w-full flex justify-end mb-4"}>
        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-2xl bg-brand/50 text-brand hover:bg-brand/60 hover:text-brand ml-auto"
          style={{
            background:
              "linear-gradient(268.27deg, #23445B 0%, rgba(83, 183, 250, 0.63) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03))",
          }}
        >
          <Settings className="size-5 text-white" />
          <span className="sr-only">Settings</span>
        </Button>
      </div>
      <div className={"sell-ring-outer relative"}>
        <div className={"sell-ring relative"}>
          <div className="relative rounded-xl border-2 border-brand sell-bg  overflow-hidden">
            <div
              className="absolute inset-0 bg-dots--fine pointer-events-none "
              aria-hidden
            />
            <div className="relative grid grid-cols-1 gap-3 p-4 sm:p-5 ">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-brand-foreground/90">
                  Sell
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <input
                    inputMode="decimal"
                    placeholder="0"
                    className="w-full bg-transparent text-4xl sm:text-5xl leading-none font-semibold outline-none text-brand-foreground"
                    value={sellAmount}
                    onChange={(e) => setSellAmount(e.target.value)}
                    aria-label="Sell amount"
                  />
                </div>
                <TokenPill
                  token={sellToken}
                  onSelect={(t) => setSellToken(t)}
                  ariaLabel="Select sell token"
                />
              </div>
              <div className="flex items-center justify-between gap-2 text-xs text-brand-foreground/80">
                <div className="mt-2 text-xs text-brand font-bold">
                  {estPriceUsd}
                </div>
                <div className="inline-flex items-center mt-2 text-xs text-brand-foreground/80">
                  <Wallet className={"inline size-4 me-2"} /> -- ETH
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center absolute left-1/2 p-2 btn-diamond-wrapper">
        <button
          className="btn-diamond bg-brand text-brand-foreground p-2 rounded-md  shadow-lg"
          aria-label="Reverse route"
        >
          <span className="flex items-center justify-center">
            <Repeat className="size-4 rotate-90" />
          </span>
        </button>
      </div>

      <div className="mt-3 sm:mt-4 rounded-xl border-2 border-border bg-panel">
        <div className="grid grid-cols-1 gap-3 p-4 sm:p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Buy
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <input
                disabled
                placeholder="0"
                className="w-full bg-transparent text-4xl sm:text-5xl leading-none font-semibold outline-none placeholder:text-foreground"
                aria-label="Buy amount"
              />
            </div>
            <TokenPill
              token={buyToken || "Select Token"}
              onSelect={(t) => setBuyToken(t)}
              placeholder={!buyToken}
              ariaLabel="Select buy token"
            />
          </div>
          <div className="flex items-center justify-between gap-2 text-xs text-brand-foreground/80">
            <div className="mt-2 text-xs text-brand font-bold">${"0.00"}</div>
            <div className="inline-flex items-center mt-2 text-xs text-brand-foreground/80">
              <Wallet className={"inline size-4 me-2"} /> -- {buyToken || ""}
            </div>{" "}
          </div>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 rounded-xl border-2 border-border bg-panel">
        <div className="w-full flex items-center justify-between gap-2 px-4 py-3">
          <span className="text-xs">
            {sellAmount || "0"} {sellToken} → 3,300 USDC (Est)
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground">
              {" "}
              <Clock className={"size-4 inline me-1"} />9 min
            </span>
            <button
              type="button"
              onClick={() => setDetailsOpen((s) => !s)}
              className="size-7 inline-flex items-center justify-center"
              aria-expanded={detailsOpen}
              aria-controls="swap-details"
              aria-label={detailsOpen ? "Collapse details" : "Expand details"}
            >
              <ChevronDown
                className={cn(
                  "size-4 transition-transform duration-200",
                  detailsOpen ? "rotate-180" : "rotate-0",
                )}
              />
            </button>
          </div>
        </div>

        <div
          id="swap-details"
          className={cn(
            "overflow-hidden transition-all duration-300",
            detailsOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="px-4 pb-4">
            <hr className={"my-2"} />
            <Row
              left="Network Fees (0.25%)"
              right="$0.235"
              tip="Estimated network and protocol fees for this swap."
            />
            <Row
              left="Some Data"
              right="5 BPS (0.05% of 1ETH)"
              tip="Basis points impact for this route."
            />
            <hr className={"my-2"} />
            <Row
              left="Some Data"
              right="0.0004 WETH ($1.67)"
              tip="Estimated wrapped ETH required for the swap."
            />
            <Row left="Some Data" right="6" tip="Additional route data." />
          </div>
        </div>
      </div>

      <Button className="mt-3 sm:mt-4 w-full rounded-lg bg-brand/20 text-brand py-6">
        Connect Wallet
      </Button>
    </div>
  );
}

function Row({
  left,
  right,
  tip,
}: {
  left: string;
  right: string;
  tip?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-sm">
      <div className="flex items-center gap-2 text-foreground">
        <span>{left}</span>
        <TooltipProvider delayDuration={120}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="More info"
                className="inline-flex h-5 w-5 items-center justify-center rounded-full ring-1 ring-border/50 hover:ring-border transition-colors bg-muted/30 text-foreground/80 hover:text-foreground"
              >
                <Info className="size-3.5" aria-hidden="true" />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              align="start"
              className="max-w-xs text-xs leading-relaxed"
            >
              {tip || "More info"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div>{right}</div>
    </div>
  );
}

function TokenPill({
  token,
  onSelect,
  placeholder,
  ariaLabel,
}: {
  token: string;
  onSelect: (symbol: string) => void;
  placeholder?: boolean;
  ariaLabel?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          className={`rounded-full border-border px-3 h-10 min-w-[9rem] flex items-center justify-between gap-2`}
          aria-label={ariaLabel}
          style={{
            background: placeholder
              ? "linear-gradient(87.81deg, #53B7FA -59%, #C0C5C8 -24.5%, #53B7FA 17.35%, #53B7FA 53.4%, #2F51B7 98.16%)"
              : "",
          }}
        >
          <div className="flex items-center gap-2">
            {!placeholder && (
              <img
                src={!placeholder ? `${token}.png` : `/placeholder.svg`}
                alt=""
                className="size-5 rounded-full"
              />
            )}
            <span
              className={cn(
                "text-sm",
                !placeholder ? "text-muted-foreground" : "text-[#000102]",
              )}
            >
              {token}
            </span>
          </div>
          <ChevronDown
            className={`size-4 opacity-70 ${placeholder && "text-[#000102]"}`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        {TOKENS.map((t) => (
          <DropdownMenuItem
            key={t.symbol}
            textValue={t.symbol}
            onClick={() => onSelect(t.symbol)}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <img
                src={`/${t.symbol}.png`}
                alt={`${t.name} icon`}
                className="size-5 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-sm">{t.symbol}</span>
                <span className="text-[11px] text-muted-foreground">
                  {t.name}
                </span>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
