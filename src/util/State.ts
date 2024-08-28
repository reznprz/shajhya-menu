import { useState } from "react";

export enum StateType {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Failure = "failure",
}

export interface ApiState {
  state: StateType;
  error: string | null;
}

export function useApiState() {
  const [state, setState] = useState<ApiState>({
    state: StateType.Idle,
    error: null,
  });

  return {
    get state() {
      return state.state;
    },
    get error() {
      return state.error;
    },
    loading() {
      setState({ state: StateType.Loading, error: null });
    },
    success() {
      setState({ state: StateType.Success, error: null });
    },
    failure(error: string) {
      setState({ state: StateType.Failure, error });
    },
  };
}
