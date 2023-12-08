import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../model/userModel.js";
import Post from "../../model/postModel.js";

class Task {
 ///////////////////////////////////////Create APIs for login and registration using passport JWT token////////////////////////////////
  async register(req, res) {
    try {
      const { email, username, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const payload = { id: user._id };
      const token = jwt.sign(payload, "your_secret_key", { expiresIn: "1h" });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  }

  ////////////////////////////////Create the CRUD of Post for the only authenticated user ////////////////////////////////////////////
  async createPost(req, res) {
    try {
      const { title, body, latitude, longitude, createdBy, activity } =
        req.body;
      const userId = req.user.userId;

      const newPost = await Post.create({
        title,
        body,
        createdBy,
        activity,
        latitude,
        longitude,
      });

      res
        .status(201)
        .json({ message: "Post created successfully", post: newPost });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllPosts(req, res) {
    try {
      const createdBy = req.body.createdBy;

      const userPosts = await Post.find({ createdBy });

      res.status(200).json({ posts: userPosts });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

 

  async updatePost(req, res) {
    try {
      const { _id } = req.params;
      const { title, body, latitude, longitude, active } = req.body;
      const userId = req.user.userId;

      const updatedPost = await Post.findOneAndUpdate(
        { _id },
        {
          title,
          body,
          active,
          geoLocation: {
            latitude,
            longitude,
          },
        },
        { new: true }
      );

      if (!updatedPost) {
        return res
          .status(404)
          .json({ message: "Post not found or you do not have access" });
      }

      res
        .status(200)
        .json({ message: "Post updated successfully", post: updatedPost });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deletePost(req, res) {
    try {
      const { _id } = req.params;

      const deletedPost = await Post.findOneAndDelete({
        _id,
      });

      if (!deletedPost) {
        return res
          .status(404)
          .json({ message: "Post not found or you do not have access" });
      }

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  /////////////////////////////Create an API to retrieve posts using latitude and longitude/////////////////////////////
  async getPostByLocation(req, res) {
    try {
      console.log("<<<<<<147>>>>>")
      const { longitude, latitude } = req.body;
      const post = await Post.find({ latitude, longitude });

      if (!post || post.length === 0) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ post });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
////////////////////////////////Show the count of active and inactive post in the dashboard//////////////////////////////
  async getAcitivity(req, res) {
    try {
      const { activity } = req.body;
      console.log(activity);
      const post = await Post.find({ activity });

      if (!post || post.length === 0) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ message: `${post.length} Posts are ${activity}` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new Task();
