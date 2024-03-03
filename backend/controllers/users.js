import User from '../modal/User.js';
export const getUser= async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.findById(id);
        res.status(200).json(user);
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

export const getUserFriends = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Use populate to fetch friends data efficiently
      const user = await User.findById(id).populate("friends", { _id: true, username: true, profilepath: true });
  
      const formattedFriends = user.friends.map((friend) => {
        return { _id: friend._id, username: friend.username, profilepath: friend.profilepath };
      });
  
      res.status(200).json(formattedFriends);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  
//update
export const addRemoveFriend = async (req, res) => {
    try {
      const { id, friendId } = req.params;
      const user = await User.findById(id);
      const friend = await User.findById(friendId);
  
      if (user.friends.includes(friendId)) {
        // Remove friend
        user.friends = user.friends.filter((_id) => _id.toString() !== friendId); // Use _id.toString() for comparison
      } else {
        // Add friend (no need to update friend.friends)
        user.friends.push(friendId);
      }
  
      await user.save();
      const friends = await Promise.all(
        user.friends.map((_id) => User.findById(_id))
      );
      const formattedFriends = friends.map((friend) => ({
        _id: friend._id,
        username: friend.username,
        profilepath: friend.profilepath,
      }));
  
      res.status(200).json(formattedFriends);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  