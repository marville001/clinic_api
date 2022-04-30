import { Schema, model } from "mongoose";

const assignedDoctorSchema = new Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Patient",
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Doctor",
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

const AssignedDoctor = model("AssignedDoctor", assignedDoctorSchema);
export default AssignedDoctor;
