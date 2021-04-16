import { createContext } from "react";
import {IBuilderActionsContext} from "../interfaces";

export const BuilderActionsContext = createContext<IBuilderActionsContext | null>(null);