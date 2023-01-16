import { PostApi } from "../../api/post.api";
import { ALERT_TYPES } from "../types/alertTypes";
import { POST_TYPES } from "../types/postTypes";

export const postAction = (dispatch) => {
  // const [posts, setPosts] = useState([]);
  // const [post, setPost] = useState("");
  // const [searchPost, setSearchPost] = useState("");
  // const [onPost, setOnPost] = useState(false);
  // const [postEdit, setPostEdit] = useState(false);

  const getPosts = async () => {
    try {
      const res = await PostApi.getAll();

      dispatch({
        type: POST_TYPES.GET_POSTS,
        payload: res.data.posts,
      });
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();

      dispatch({
        type: ALERT_TYPES.ALERT_ERROR,
        payload: errorMessage,
      });
    }
  };

  const getPost = async (data, auth) => {
    try {
      const res = await PostApi.get(data, auth);

      dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post });
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();

      dispatch({
        type: ALERT_TYPES.ALERT_ERROR,
        payload: errorMessage,
      });
    }
  };

  const createPost = async (data, auth) => {
    try {
      const resCreate = await PostApi.create(data, auth);

      const resGet = await PostApi.get(resCreate.data.post.id, auth);
      console.log(resGet.data.post);
      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: resGet.data.post,
      });

      dispatch({
        type: ALERT_TYPES.ALERT_SUCCESS,
        payload: resCreate.data.message,
      });
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();

      dispatch({
        type: ALERT_TYPES.ALERT_ERROR,
        payload: errorMessage,
      });
    }
  };

  const updatePost = async (data, auth) => {
    try {
      const resUpdate = await PostApi.update(data, auth);

      const resGet = await PostApi.get(resUpdate.data.post.id, auth);

      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: resGet.data.post,
      });

      dispatch({
        type: ALERT_TYPES.ALERT_SUCCESS,
        payload: resGet.data.message,
      });
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();

      dispatch({
        type: ALERT_TYPES.ALERT_ERROR,
        payload: errorMessage,
      });
    }
  };

  const deletePost = async (data, auth) => {
    try {
      const res = await PostApi.delete(data, auth);

      dispatch({
        type: POST_TYPES.DELETE_POST,
        payload: data,
      });

      dispatch({
        type: ALERT_TYPES.ALERT_SUCCESS,
        payload: res.data.message,
      });
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();

      dispatch({
        type: ALERT_TYPES.ALERT_ERROR,
        payload: errorMessage,
      });
    }
  };

  const searchPost = (text) => {
    dispatch({ type: POST_TYPES.SEARCH_POST, payload: text });
  };

  const setOnPost = (show) => {
    dispatch({ type: POST_TYPES.ON_MODAL_POST, payload: show });
  };

  const setIsEdit = (isEdit) => {
    dispatch({ type: POST_TYPES.IS_EDIT_POST, payload: isEdit });
  };

  return {
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost,
    searchPost,
    setOnPost,
    setIsEdit,
  };
};
