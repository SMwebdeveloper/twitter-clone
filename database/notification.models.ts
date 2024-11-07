import mongoose from "mongoose";

const NotificationScheme = new mongoose.Schema(
  {
    body: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationScheme);

export default Notification;
