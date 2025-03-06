import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },

    education: [
        {
            degree: String,
            institution: String,
            yearOfCompletion: Number
        }
    ],
    experience: [
        {
            company: String,
            role: String,
            from: Date,
            to: Date,
            description: String
        },
    ],
    skills: [String],
    profileImage: {
        type: String
    },
    documents: [
        {
            name: String,
            fileUrl: String
        },
    ],
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }
}, {timestamps: true});

export const Employee = mongoose.model("Employee", employeeSchema);