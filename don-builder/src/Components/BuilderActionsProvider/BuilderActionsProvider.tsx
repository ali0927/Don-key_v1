import { memo } from "react";
import { BuilderActionsContext } from "../../Contexts/BuilderActionsContext";
import { IBuilderActionsContext } from "../../interfaces";

export const BuilderActionsProvider: React.FC<{
  actions: IBuilderActionsContext;
}> = memo(({ actions, children }) => {
  return (
    <BuilderActionsContext.Provider value={actions}>
      {children}
    </BuilderActionsContext.Provider>
  );
});
