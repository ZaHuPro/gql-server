import mongoose from "../providers/Database";

interface ISchema {
  sender: mongoose.Types.ObjectId;
  receivers: mongoose.Types.ObjectId[];
  channelId: mongoose.Types.ObjectId;
  body: string;
  state: { thread: boolean };
  threads: mongoose.Types.ObjectId[];
  mode: string;
  subType: string;
  disappearAfter: Date;
}

export const contentSchema = new mongoose.Schema<ISchema>(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receivers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },
    body: { type: String },
    // attachment: {
    //   name: { type: String },
    //   formate: { type: String },
    //   attachmentId: {}
    // },
    state: {
      thread: { type: Boolean, default: false },
    },
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }],
    mode: { type: String, enum: ["message", "activity"], default: "message" },
    subType: {
      type: String,
      enum: [
        "text_message",
        "attachment_message",
        "channel_created",
        "joined_member",
        "existed_member",
        "added_member",
        "removed_member",
        "added_admin",
        "removed_admin",
        "title_update",
        "description_update",
        "avatar_update",
        "mode_update",
      ],
      default: "text_message",
    },
    disappearAfter: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<ISchema>("Content", contentSchema);
