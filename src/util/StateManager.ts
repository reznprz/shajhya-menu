export enum StateType {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Failure = "failure",
}

export interface State {
  state: StateType;
  error: string | null;
  setIdle: () => void;
  setLoading: () => void;
  setSuccess: () => void;
  setFailure: (error: string) => void;
}

export function createStateManager(): State {
  return {
    state: StateType.Idle,
    error: null,

    setIdle() {
      this.state = StateType.Idle;
      this.error = null;
    },

    setLoading() {
      this.state = StateType.Loading;
      this.error = null;
    },

    setSuccess() {
      this.state = StateType.Success;
      this.error = null;
    },

    setFailure(error: string) {
      this.state = StateType.Failure;
      this.error = error;
    },
  };
}
