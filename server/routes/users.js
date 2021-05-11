const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        bookmark: req.user.bookmark
    });
});

router.post("/register", (req, res) => {
    console.log(req.body)
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});



router.get("/addToBookmark", auth, (req, res) => {
    console.log(req.body)
    User.findOne({ _id: req.user._id }, (err, userInfo) => {
        let duplicate = false;

        console.log('productId: ',req.query.productId)

        userInfo.bookmark.forEach((item) => {
            if (item == req.query.productId) {
                duplicate = true;
            }
        })

        console.log('duplicate: ', duplicate)

        if (duplicate) {
            User.findOneAndUpdate(
                { _id: req.user._id },
                { $pull: { "bookmark": req.query.productId } },
                { new: true },
                (err, userInfo) => {
                    console.log('exist')
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.bookmark)
                }
            )
        } else {
            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        "bookmark": req.query.productId
                    }
                },
                { new: true },
                (err, userInfo) => {
                    console.log('non')
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.bookmark)
                }
            )
        }
    })
});

module.exports = router;
