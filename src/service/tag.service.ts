import { getAllTags } from "../repository/tag.repository";

const fetchAllTags = async () => {
  try {
    const tags = await getAllTags();

    if (!tags) {
      return {
        code: 404,
        success: false,
        message: "tags not found",
        data: [],
      };
    }

    return {
      code: 200,
      success: true,
      message: "tags found",
      data: tags,
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

export { fetchAllTags };
