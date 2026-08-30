"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export type NeuformMode = "dark" | "light";
export type NeuformModePreference = NeuformMode | "auto";

export type GatewayFlowProps = {
  mode?: NeuformModePreference;
  speed?: number;
  size?: number;
  gap?: number;
  length?: number;
  density?: number;
  strokeWidth?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

import GatewayFlowJsx from "./gateway-flow.jsx";

export default function GatewayFlow(props: GatewayFlowProps) {
  return <GatewayFlowJsx {...props} />;
}
