import { useAuth } from "@clerk/nextjs";

export const usePlanAccess = () => {
  const { has } = useAuth();
  const isPro = has?.({ plan: "pro" || "premium" }) || false;
  const isFree = !isPro;

  const planAccess = {
    // free plan tools
    resize: true,
    crop: true,
    adjust: true,
    text: true,
    // pro plan tools
    background: isPro,
    ai_extender: isPro,
    ai_edit: isPro,
  };
  //   helper function to check if a user has access to a tool
  const hasAccess = (toolId) => {
    return planAccess[toolId] === true;
  };
  const getRestrictedTools = () => {
    return Object.entries(planAccess)
      .filter(([_, hasAccess]) => hasAccess)
      .map(([toolId]) => toolId);
  };
  const canCreateProject = () => {
    if (isPro) return true;
    return currentProjectCount < 3; // free limit
  };

  const canExport = (currentExportThisMonth) => {
    if (isPro) return true;
    return currentExportThisMonth < 20; // free limit
  };
  return {
    isPro: isPro ? "Pro" : "Free",
    isFree,
    hasAccess,
    planAccess,
    canCreateProject,
    canExport,
    getRestrictedTools,
  };
};
