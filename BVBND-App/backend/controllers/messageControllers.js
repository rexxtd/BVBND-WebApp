const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel")
const Message = require("../models/messageModel")
const User = require("../models/userModel")

const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
    
    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(404);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "username profilePicture");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'username profilePicture email'
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage:message,
        })
        res.json(message);
    } catch (error) { 
        throw new Error(error.message);
    }
});

const allMessage = asyncHandler(async(req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "username profilePicture email")
        .populate("chat");
        
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

module.exports = { sendMessage, allMessage };