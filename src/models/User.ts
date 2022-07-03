import mongoose from "../providers/Database";

interface ISchema {
  name: string;
  slogan: string;
  avatar: string;
  password: string;
  salt: string;
  dob: Date;
  phone: {
    e164Format: string;
    countryCode: string;
    country: string;
    number: string;
  };
  contacts: mongoose.Types.ObjectId[];
  groups: mongoose.Types.ObjectId[];
  personals: mongoose.Types.ObjectId[];
  logs: {
    lastLogin: Date;
    lastPasswordReset: Date;
    lastActivity: Date;
  };
  state: {
    online: boolean;
    available: boolean;
    passwordAdded: boolean;
    phoneVerified: boolean;
  };
  otp: {
    code: string;
    generatedTime: Date;
    expiredAfter: Date;
    source: string;
  }[];
  isPasswordAdded: boolean;
  isPhoneVerified: boolean;
  disappearIn: {
    value: number;
    unit: string;
  };
}

export const userSchema = new mongoose.Schema<ISchema>(
  {
    name: { type: String },
    slogan: { type: String },
    avatar: { type: String },
    password: { type: String },
    salt: { type: String },
    dob: { type: Date },
    phone: {
      e164Format: { type: String, unique: true },
      countryCode: { type: String },
      country: { type: String },
      number: { type: String },
    },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
    personals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
    logs: {
      lastLogin: { type: Date },
      lastPasswordReset: { type: Date },
      lastActivity: { type: Date },
    },
    state: {
      online: { type: Boolean, default: false },
      available: { type: Boolean, default: false },
      passwordAdded: { type: Boolean, default: false },
      phoneVerified: { type: Boolean, default: false },
    },
    otp: [
      {
        code: { type: String },
        generatedTime: { type: Date, default: Date.now },
        expiredAfter: { type: Date, default: Date.now },
        source: { type: String, enum: ["phone", "email"], default: "phone" },
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<ISchema>("User", userSchema);
