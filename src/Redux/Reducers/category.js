import { categoryConstants } from "../Constants/constants";

const initState = {
  categories: [],
  loading: false,
  error: "",
};

const buildCategories = (parentId, constCategory, newCategory) => {
  let updatedCategories = [];

  if (parentId == undefined) {
    return [
      ...constCategory,
      {
        _id: newCategory._id,
        name: newCategory.name,
        slug: newCategory.slug,
        childrenCategory: [],
      },
    ];
  } else {
    for (let cat of constCategory) {
      if (cat._id == parentId) {
        const tempCategory = {
          _id: newCategory._id,
          name: newCategory.name,
          slug: newCategory.slug,
          parentId: newCategory.parentId,
          childrenCategory: [],
        };

        updatedCategories.push({
          ...cat,
          childrenCategory:
            cat.childrenCategory.length > 0
              ? [...cat.childrenCategory, tempCategory]
              : [tempCategory],
        });
      } else {
        updatedCategories.push({
          ...cat,
          childrenCategory: cat.childrenCategory
            ? buildCategories(parentId, cat.childrenCategory, newCategory)
            : [],
        });
      }
    }
  }

  return updatedCategories;
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
      state = { ...state, loading: true };
      break;

    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
      break;

    case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;

    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      state = { ...state, loading: true };
      break;

    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      const newCategory = action.payload.category;
      const updatedCategories = buildCategories(
        newCategory.parentId,
        state.categories,
        newCategory
      );

      state = {
        ...state,
        categories: updatedCategories,
        loading: false,
      };
      break;

    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;

    case categoryConstants.DELETE_CATEGORIES_REQUEST:
      state = { ...state, loading: true };
      break;

    case categoryConstants.DELETE_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case categoryConstants.DELETE_CATEGORIES_FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;
  }
  return state;
};
