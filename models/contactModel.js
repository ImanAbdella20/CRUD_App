import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    email: {
        type: String,
        required: [true, "Please add the contact email address"]
    },
    phone: {
        type: String,
        required: [true, "Please add the contact phone number"]
    },
}, {
    timestamps: true,
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
