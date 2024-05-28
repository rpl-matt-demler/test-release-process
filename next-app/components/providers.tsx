"use client";

import { Provider } from "jotai";
import { appStore } from "@/state/stores";

/**
 *
 * @param children child component tree
 * @returns all our providers
 */
export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => <Provider store={appStore}>{children}</Provider>;
