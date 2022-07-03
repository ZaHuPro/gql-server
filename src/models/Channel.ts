import mongoose from "../providers/Database";

interface ISchema {
  title: string;
  description: string;
  avatar: string;
  members: mongoose.Types.ObjectId[];
  managers: mongoose.Types.ObjectId[];
  requests: mongoose.Types.ObjectId[];
  invites: mongoose.Types.ObjectId[];
  visibility: string;
  mode: string;
  messaging: string;
  disappearIn: {
    value: number;
    unit: string;
  };
}

export const channelSchema = new mongoose.Schema<ISchema>(
  {
    title: { type: String },
    description: { type: String },
    avatar: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    managers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    invites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    visibility: { type: String, enum: ["open", "close"], default: "open" },
    mode: {
      type: String,
      enum: ["open", "close", "approved"],
      default: "open",
    },
    messaging: {
      type: String,
      enum: ["personal", "group"],
      default: "personal",
    },
    disappearIn: {
      value: "number",
      unit: "string",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<ISchema>("Channel", channelSchema);
