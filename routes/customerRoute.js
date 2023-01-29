const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");
const auth = require("../auth/auth");
const router = new express.Router();
const upload = require("../uploads/uploads");

// route for customer registration
router.post("/customer/register", function (req, res) {
  const username = req.body.username;
  Customer.findOne({ username: username }).then(function (customerData) {
    // if the username is in the database
    if (customerData != null) {
      res.json({ message: "Username already exists!" });
      return;
    }
    // now it means we are ready for registration
    const password = req.body.password;
    bcryptjs.hash(password, 10, function (e, hashed_pw) {
      const username = req.body.username;
      const address = req.body.address;
      const phone = req.body.phone;

      const cdata = new Customer({
        username: username,
        password: hashed_pw,
        phone: phone,
        address: address,

      });
      cdata
        .save()
        .then(function () {
          res.json({ message: "Registered Success!", success: true });
        })
        .catch(function (e) {
          res.json(e);
        });
    });
  });
});

// login route - for customer
router.post("/customer/login", function (req, res) {
  const username = req.body.username;
  //Select * from customer where username = "admin"
  Customer.findOne({ username: username }).then(function (customerData) {
    // console.log(customerData);
    if (customerData === null) {
      return res.json({ message: "invalid" });
    }
    // need to check password
    const password = req.body.password;
    bcryptjs.compare(password, customerData.password, function (e, result) {
      //true - correct pw, false = incorrect pw
      if (result === false) {
        return res.json({ message: "Invalid" });
      }
      // ticket generate - jsonwebtoken
      const token = jwt.sign({ cusId: customerData._id }, "anysecretkey");
      res.json({ token: token, message: "success", username: username });
    });
  });
});

// customer profile update

// router.put(
//   "/customer/profile/update",
//   auth.verifyCustomer,
//   function (req, res) {
//     // console.log(req.CustomerInfo._id);
//     const id = req.CustomerInfo._id;
//     const name = req.body.name;
//     const email = req.body.email;
//     const phone = req.body.phone;
//     const website = req.body.website;
//     const street = req.body.street;
//     const city = req.body.city;
//     const state = req.body.state;
//     const zipcode = req.body.zipcode;
    

//     Customer.updateOne({ _id: id }, { phone: phone,name:name,email:email,website:website,street:street,city:city,state:state,zipcode:zipcode })
//       .then(function () {
//         res.json({ msg: "Updated!" });
//       })
//       .catch(function () {
//         res.json({ msg: "Try again!!" });
//       });
//   }
// );

// customer delete by customer themselves
// router.delete(
//   "/customer/profile/delete",
//   auth.verifyCustomer,
//   function (req, res) {
//     const id = req.CustomerInfo._id;
//     Customer.findOneAndDelete(id)
//       .then(function () {
//         res.json({ msg: "deleted!" });
//       })
//       .catch(function () {
//         res.json({ msg: "Try again!" });
//       });
//   }
// );

// // customer delete by admin
// router.delete("/customer/delete", auth.verifyAdmin, function(req,res){
//     // const id = req.adminInfo._id;
//     const cid = req.body.id;
//     Customer.deleteOne({_id : cid})
//     .then(function(){
//         res.json({msg : "admin deleted!"})
//     })
//     .catch(function(){
//         res.json({msg: "Try again!"})
//     })

// })

// router.delete("/customer/delete",auth.verifyCustomer,function(req,res){
//     res.json({msg : "deleted!"})
//     res.json({phone : req.customerInfo.phone})
// })

router.post("/news/upload", upload.single("ab_cd"), function (req, res) {
  if (req.file == undefined) {
    return res.json({
      message: "Invalid file format. Only jpeg and png allowed",
    });
  }
  //code after sucess
});


//to update
// router.put("/profile/update", auth.verifyCustomer, function (req, res) {
//   const prid = req.body.prid;
//   const prname = req.body.prname;
//   const premail = req.body.premail;
//   const prphone = req.body.prphone;
//   const prwebsite = req.body.prwebsite;
//   const prstreet = req.body.prstreet;
//   const prcity = req.body.prcity;
//   const prstate = req.body.prstate;
//   const przipcode = req.body.przipcode;

//   Profile.updateOne(
//     { _id: prid },
//     {
//       prname: prname,
//       premail: premail,
//       prphone: prphone,
//       prwebsite: prwebsite,
//       prstreet: prstreet,
//       prcity: prcity,
//       prstate: prstate,
//       przipcode: przipcode,
//     }
//   )
//     .then(function () {
//       res.json({ message: "Profile Updated", success: true });
//     })
//     .catch(function () {
//       res.json({ message: "Something went wrong!" });
//     });
// });


router.get('/alluser', function (req, res) {
  Customer.find()
      .then(function (alluser) {
          res.json({alluser })
      })
      .catch(function(){
          res.json({ message: "not found"})
      })
})




module.exports = router;
