"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6TTAgMzR2Mkg0di0ySDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Sell Faster.
            <br />
            Buy Smarter.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-emerald-100 max-w-lg">
            Pakistan&apos;s trusted thrift marketplace. Find amazing deals on
            second-hand items or sell what you no longer need.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold"
            >
              <Link href="/post">
                Start Selling
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/category/clothing">Browse Items</Link>
            </Button>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-lg"
        >
          <div className="flex items-center gap-2 text-emerald-100">
            <ShieldCheck className="h-5 w-5 shrink-0" />
            <span className="text-sm font-medium">Verified Sellers</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-100">
            <Zap className="h-5 w-5 shrink-0" />
            <span className="text-sm font-medium">Quick Deals</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-100">
            <TrendingUp className="h-5 w-5 shrink-0" />
            <span className="text-sm font-medium">Best Prices</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
