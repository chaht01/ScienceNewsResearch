import { typeStringCreator } from "./creator";

export const types = {
  EXAMPLE_FILTER_SELECT: typeStringCreator("EXAMPLE_FILTER_SELECT")
};

// EXAMPLE FILTER
export const filterExampleQuestion = idx => {
  return {
    type: types.EXAMPLE_FILTER_SELECT,
    payload: {
      idx
    }
  };
};
