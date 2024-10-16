class ApiFeatures {
  constructor(queryObj, queryStr) {
    this.queryObj = queryObj;
    this.queryStr = queryStr;
  }

  filter() {
    // Fields to exclude from query object
    const excludedFields = ["sort", "page", "limit", "fields", "search"];

    // making a shallow copy of the req query object
    let queryObject = { ...this.queryStr };

    // Delete any fields in excludeFields from queryObject
    excludedFields.forEach((field) => {
      delete queryObject[field];
    });

    // Turn query object into a string
    let queryString = JSON.stringify(queryObject);

    // Use regex to replace targated strings
    queryString = queryString.replace(/(\bgte|gt|lte|lt)\b/g, (match) => {
      return `$${match}`;
    });

    queryObject = JSON.parse(queryString);

    this.queryObj = this.queryObj.find(queryObject);

    return this;
  }
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.queryObj = this.queryObj.sort(sortBy);
    }
    // If now value is provided to sort or sort is not included, sort from newest to old
    else {
      this.queryObj = this.queryObj.sort("-createdAt _id");
    }
    return this;
  }
  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      console.log(fields);
      this.queryObj = this.queryObj.select(fields);
    } else {
      // Remove the __v field
      this.queryObj = this.queryObj.select("-__v");
    }
    return this;
  }
  paginate() {
    const page = parseInt(this.queryStr.page) || 1;
    const limit = parseInt(this.queryStr.limit) || 10;
    // page 1: 1-10, 2: 11-20, 3: 21-30
    const skip = (page - 1) * limit;

    this.queryObj = this.queryObj.skip(skip).limit(limit);

    // if (this.queryStr.page) {
    //   const recipeCount = await Recipe.countDocuments();

    //   if (skip >= recipeCount) {
    //     return res.status(404).json({
    //       status: "Failed!",
    //       message: "Page is not found!",
    //     });
    //   }
    // }

    return this;
  }
  search() {
    if (this.queryStr.search) {
      const query = this.queryStr.search;
      this.queryObj = this.queryObj.find({
        name: { $regex: query, $options: "i" },
      });
    }

    return this;
  }
}

export default ApiFeatures;
