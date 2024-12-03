const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");

//------------------------------------------------------------------------

const fileSchema = new Schema({
  name: String, // The original file name
  description: String, // File description
  type: String, // MIME type (e.g., image/jpeg, application/pdf)
  size: Number, // File size in bytes
  data: String, // Base64-encoded binary data
});

fileSchema.plugin(mongoosePaginate);
fileSchema.plugin(mongooseAggregatePaginate);

//------------------------------------------------------------------------

module.exports = fileSchema;
