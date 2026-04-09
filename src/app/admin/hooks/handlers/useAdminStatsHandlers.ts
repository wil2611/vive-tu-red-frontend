import { useCallback, type Dispatch, type SetStateAction } from "react";
import { getStatsDashboard, type StatsDashboard } from "@/lib/api";
import { getErrorText } from "./shared";

type UseAdminStatsHandlersParams = {
  buildStatsQuery: () => { rangeDays?: number; from?: string; to?: string };
  setStats: Dispatch<SetStateAction<StatsDashboard | null>>;
  setBusyAction: Dispatch<SetStateAction<string | null>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setSuccess: Dispatch<SetStateAction<string | null>>;
  onStatsApplied?: (query: {
    rangeDays?: number;
    from?: string;
    to?: string;
  }) => void;
};

export function useAdminStatsHandlers({
  buildStatsQuery,
  setStats,
  setBusyAction,
  setError,
  setSuccess,
  onStatsApplied,
}: UseAdminStatsHandlersParams) {
  const handleApplyStatsFilters = useCallback(async () => {
    setBusyAction("stats-filters");
    setError(null);
    setSuccess(null);

    try {
      const query = buildStatsQuery();
      const statsData = await getStatsDashboard(query);
      setStats(statsData);
      onStatsApplied?.(query);
    } catch (errorValue) {
      setError(getErrorText(errorValue, "No se pudieron actualizar las metricas"));
    } finally {
      setBusyAction(null);
    }
  }, [buildStatsQuery, onStatsApplied, setBusyAction, setError, setStats, setSuccess]);

  return {
    handleApplyStatsFilters,
  };
}
