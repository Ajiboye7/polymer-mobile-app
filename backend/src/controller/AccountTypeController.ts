import { Request, Response } from "express";
import User from "../models/UserModels";

export const accountType = async(req: Request, res: Response): Promise<any> =>{
    const {/*userId,*/ accountType} = req.body
    const userId = req.user._id;

    try{
        if(!userId || !accountType){
            return res.status(400).json({
                success: false,
                message: 'User ID and account type are required'
            })
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, {accountType}, {new: true}
        )

        if(!updatedUser){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Account type updated successfully',
            data:{
                accountType: updatedUser.accountType
            }
        })

    }catch(error){
        console.log('Account type update error', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during account type update'
        })
    }
}