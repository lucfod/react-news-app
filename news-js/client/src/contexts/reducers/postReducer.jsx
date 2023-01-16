import { POST_TYPES } from "../types/postTypes";

const postReducer = (state, action) => {
  switch (action.type) {
    case POST_TYPES.SEARCH_POST:
      return {
        ...state,
        search: action.payload,
      };
    case POST_TYPES.IS_EDIT_POST:
      return {
        ...state,
        isEdit: action.payload,
      };
    case POST_TYPES.ON_MODAL_POST:
      return {
        ...state,
        onModal: action.payload,
      };
    case POST_TYPES.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case POST_TYPES.GET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case POST_TYPES.CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case POST_TYPES.UPDATE_POST: {
      const newData = state.posts.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );

      return {
        ...state,
        posts: newData,
      };
    }
    case POST_TYPES.DELETE_POST: {
      const newData = state.posts.filter((item) => item.id !== action.payload);

      return {
        ...state,
        posts: newData,
      };
    }
    default:
      return state;
  }
};

export default postReducer;
