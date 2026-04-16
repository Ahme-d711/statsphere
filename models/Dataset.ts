import mongoose from "mongoose";

export interface IDataset extends mongoose.Document {
  name: string;
  domain: "medical" | "engineering";
  rowCount: number;
  colCount: number;
  columns: string[];
  results?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const DatasetSchema = new mongoose.Schema<IDataset>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this dataset."],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    domain: {
      type: String,
      enum: ["medical", "engineering"],
      required: [true, "Please specify the domain."],
    },
    rowCount: {
      type: Number,
      required: true,
    },
    colCount: {
      type: Number,
      required: true,
    },
    columns: {
      type: [String],
      required: true,
    },
    results: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Dataset ||
  mongoose.model<IDataset>("Dataset", DatasetSchema);
