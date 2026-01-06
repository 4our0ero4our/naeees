// This is the model for all students in the school database
import mongoose, { Schema, models, model } from "mongoose";

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    matricNumber: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
});


export const Student = models.Student || model("Student", StudentSchema);

// Example usage in database
// {
//     "name": "Non Member",
//     "email": "nonmember@st.futminna.edu.ng",
//     "matricNumber": "2020/1/12345CE",
//     "department": "Civil Engineering",
//     "level": "400",
// }

