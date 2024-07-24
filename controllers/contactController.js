import asyncHandler from 'express-async-handler';
import Contact from "../models/contactModel.js";

// Get all contacts for the logged-in user
const getContact = asyncHandler(async (req, res) => {
    console.log("The user is:", req.user); // Log the user information

    try {
        const contacts = await Contact.find({ user_id: req.user._id }); // Use the user ID
        console.log("Fetched contacts:", contacts);
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Create a new contact for the logged-in user
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    console.log("The user is:", req.user); // Log the user information

    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const contact = new Contact({
        name,
        email,
        phone,
        user_id: req.user._id // Use the user ID
    });

    const createdContact = await contact.save();
    console.log("Created contact:", createdContact); // Log the created contact
    res.status(200).json(createdContact);
});

// Update a contact for the logged-in user
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("User does not have permission to update another user's contact!");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
});

// Delete a contact for the logged-in user
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("User does not have permission to delete another user's contact!");
    }

    await contact.remove();
    res.status(200).json({ message: "Contact removed" });
});

// Get an individual contact for the logged-in user
const getIndividualContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    console.log("Contact found:", contact);
    res.status(200).json(contact);
});

// Export all functions in a single object
export default {
    getContact,
    createContact,
    updateContact,
    deleteContact,
    getIndividualContact,
};
