import { useContext } from "react";
import { BuilderActionsContext } from "../Contexts/BuilderActionsContext";
import { IBuilderActionsContext } from "../interfaces";


export const useBuilderActions = () => useContext(BuilderActionsContext) as IBuilderActionsContext;