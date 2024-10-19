import User from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { transporter } from "../middleware/mailer";
const JWT_SECRET = "123";

export const createuser = async (req: any, res: any) => {
  try {
    const {
      id,
      firstname,
      lastname,
      email,  
      phone,
      gender,
      usertype,
      hobbies,
      agencyid,
      agency,
    } = req.body;
    const { photopath } = req.files;
    const { cvpath } = req.files;

    console.log("Agency: ", agency);
    console.log("Hobbies: ", hobbies);

    if (usertype === 'jobseeker' && !agencyid) {
      return res.status(400).json({ message: "Job seekers must be associated with an agency." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const generateRandomPassword = (length: number): string => {
      return Math.random().toString(36).slice(-length);
    };

    const randomPass = generateRandomPassword(5);

    const hashedPassword = await bcrypt.hash(randomPass, 10);

    let agencyName = null;
    if (usertype === "jobseeker") {
      const agency = await User.findByPk(agencyid);
      if (!agency) {
        return res.status(400).json({ message: "Agency not found." });
      }
      agencyName = agency.firstname; // Assuming agency's name is in firstname
    }

    const user = await User.create({
      id,
      firstname,
      lastname,
      email,
      phone,
      gender,
      usertype,
      hobbies,
      photopath: photopath ? photopath[0].path : null,
      cvpath: cvpath ? cvpath[0].path : null,
      agencyid,
      agency,
      password: hashedPassword,
    });

    const sendEmail = async (to: string, subject: string, text: string) => {
      const mailOptions = {
        from: "arpit8345@gmail.com",
        to,
        subject,
        text,
      };

      try { 
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    };

    await sendEmail(
      email,
      "Welcome to Our Service",
      `Welcome ${firstname} ${lastname}! Thank you for signing up. Your one-time password is: ${randomPass}`
    );

    return res.status(201).json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Error creating user" });
  }
};

export const getallagencies = async (req: any, res: any) => {
  try {
    const allagencies = await User.findAll({
      where: {
        usertype: "agency",
      },
    });
    res.status(200).json(allagencies);
  } catch (error) {
    console.log("<<<<<<<<<<<<", error);
  }
};

//get user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "wrong credentials" });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        gender: user.gender,
        usertype: user.usertype,
        agencyid: user.agencyid,
        hobbies: user.hobbies,
      },
      JWT_SECRET
    );

    res.status(200).json({
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        gender: user.gender,
        usertype: user.usertype,
        agencyid: user.agencyid,
      },
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//getjobseeker

export const getJobSeekers = async (req: any, res: any) => {
  const userId = req.user.id;
  const userType = req.user.usertype;
  console.log(userId, "");

  const user = await User.findByPk(userId);

  if (!user || user.usertype !== "agency") {
    return res
      .status(403)
      .send({ message: "Access denied. Only agencies can view job seekers." });
  }

  try {
    const jobSeekers = await User.findAll({ where: { agencyid: userId } });

    res.status(200).json({ jobSeekers });
  } catch (error) {
    console.error("Error fetching job seekers:", error);
    res.status(500).send({ message: "Error fetching job seekers" });
  }
};

export const getAgencyDetails = async (req: any, res: any) => {
  const userId = req.user.id;
  try {
    const jobSeeker: any = await User.findByPk(userId);

    const agency = await User.findByPk(jobSeeker.agencyid);

    if (!agency) {
      return res.status(404).send({ message: "Agency not found." });
    }

    res.status(200).send(agency);
  } catch (error) {
    console.error("Error fetching agency details:", error);
    res.status(500).send({ message: "Error fetching agency details" });
  }
};


export const updateUserStatus = async (req: any, res: any) => {
  const { id } = req.params; // Get user ID from the request parameters
  const { status } = req.body; // Get status from the request body

  // Validate status
  const validStatuses = ["accepted", "declined"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
   
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    user.status = status;
    await user.save();

    return res.status(200).json({ message: "User status updated", user });
  } catch (error) {
    console.error("Error updating user status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// export const getuser =async(req: Request, res: Response)=>{
//     const {id}=req.params;
//     const user = await User.findByPk(id)  //SINGLE PARAM THATS WHY ()

//     console.log("<<<<<<<<<<",user)
//     res.json(user).status(200);
//     }

//     export const updatetuser =async(req: any, res: any)=>{
//         const {id}=req.params;
//         const user = await User.findByPk(id);

//         console.log("<<<<<<<<<<<<<<<<<",req.body,req.file);

// const {photopath} =req.files;
// const {pdfpath}=req.files;
//         await user?.update({
//             firstname:req.body.firstname,
//             lastname:req.body.lastname,
//             email:req.body.email,
//             photopath:photopath[0].path,
//         })
//         const Address = await address.findOne({ where: { userId: id } });
//         await Address?.update({
//             companyadress: req.body.companyadress,
//             companycity: req.body.companycity,
//             companystate: req.body.companystate,
//             companyzip: req.body.companyzip,
//             homeaddress: req.body.homeaddress,
//             homecity: req.body.homecity,
//             homestate: req.body.homestate,
//             homezip: req.body.homezip,
//            pdfpath:pdfpath[0].path
//         });
//         res.json({user,Address});
//     }
