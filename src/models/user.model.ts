import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import validator from "validator";
import transporter from "../config/mail.config";
import * as WorkloadMethods from "../controllers/workload.controller";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: (value: any) => {
        return validator.isEmail(value);
      }
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    photoUrl: {
      type: String
    },
    disciplineIds: [
      {
        type: String,
        ref: "Discipline"
      }
    ],
    positionId: {
      type: String,
      ref: "Position"
    },
    departmentId: {
      type: String,
      ref: "Department"
    },
    gender: {
      type: String
    },
    nationality: {
      type: String
    },
    workFocusName: {
      type: String,
      default: "Balanced",
      ref: "WorkFocus"
    },
    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// VIRTUALS
userSchema.virtual("disciplines", {
  ref: "Discipline",
  localField: "disciplineIds",
  foreignField: "disciplineId"
});
userSchema.virtual("position", {
  ref: "Position",
  localField: "positionId",
  foreignField: "positionId",
  justOne: true
});
userSchema.virtual("workFocus", {
  ref: "WorkFocus",
  localField: "workFocusName",
  foreignField: "name",
  justOne: true
});
userSchema.virtual("workFocus", {
  ref: "WorkFocus",
  localField: "workFocusName",
  foreignField: "name",
  justOne: true
});
userSchema.virtual("department", {
  ref: "Department",
  localField: "departmentId",
  foreignField: "departmentId",
  justOne: true
});
userSchema.virtual("full").get(function() {
  return (
    this.userId +
    "." +
    this.email +
    "." +
    this.firstName +
    "." +
    this.lastName +
    "." +
    this.photoUrl +
    "." +
    this.workFocusName +
    "." +
    this.disciplineId +
    "." +
    this.positionId +
    "." +
    this.gender +
    "." +
    this.nationality
  );
});

// HOOKS
// Pre-hook to hash password. Make sure to use function and not arrow (lexical 'this' problem)
userSchema.pre("save", async function() {
  const user: any = this;

  // Generate default Work Focus
  user.workFocusName = "Balanced";

  // Generate random password
  user.password = Math.random()
    .toString(36)
    .slice(-8);

  // Prepare and send user account mail
  const mailOptions = {
    from: "c4mahlangu@gmail.com", // sender address
    to: user.email, // list of receivers
    subject: "Eworkload Credentials", // Subject line
    html: `<p>Welcome to the Eworkload system. Please find default credentials below</p>
          <p>User ID: ${user.userId}</p>
          <p>Password: ${user.password}</p>
          <br>
          <p>Autogenerated password may be changed from the user profile at any time.</p>
          <p>Kind regards</p>
          <p>Administrator</p>` // plain text body
  };
  console.log("Mail options", mailOptions);
  await transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) console.log(err);
    else console.log(info);
  });

  // Generate salt and hash password
  const password = user.password;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  user.password = hash;

  // Initialize workloads
  await WorkloadMethods.initializeWorkloads(user.userId);
});

// INSTANCE METHODS
// Ensure correct password
userSchema.methods.isValidPassword = async (password: string) => {
  const user: any = this;

  // Hash sent password and compare with db hash
  const compare = await bcrypt.compare(password, user.password, (err, res) => {
    console.log(err);
  });
  return compare;
};

const User = mongoose.model("User", userSchema);
export default User;
