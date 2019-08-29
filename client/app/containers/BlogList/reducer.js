import produce from 'immer';
import * as types from './constants';

// The initial state of the App
export const initialState = {
  blogList: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  loading: true,
  blogByAuthor: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  blogByTag: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_BLOG_LIST_REQUEST:
        draft.loading = true;
        break;

      case types.LOAD_BLOG_LIST_SUCCESS:
        draft.blogList = action.payload;
        draft.loading = false;
        break;

      case types.LOAD_BLOG_LIST_FAILURE:
        draft.loading = false;
        break;

      case types.SET_PAGES_VALUE:
        draft.blogList[action.payload.key] = action.payload.value;
        break;

      case types.SET_SIZE_VALUE:
        draft.blogList.size = action.payload;
        break;
      case types.LOAD_BLOG_BY_AUTHOR_SUCCESS:
        draft.blogByAuthor = action.payload;
        draft.loading = false;
        break;

      case types.LOAD_BLOG_BY_TAG_SUCCESS:
        draft.blogByTag = action.payload;
        draft.loading = false;
        break;
    }
  });

export default reducer;
