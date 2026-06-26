import { createBoardsService , getBoardsService, getBoardByIdService, updateBoardService, deleteBoardService } from "../services/boardService.js";

export const createBoard = async (req, res)=>{
    try{
        const{title, description} = req.body;

        console.log("Controller User ID:", req.user._id);

        const board = await createBoardsService({
            title,
            description,
            owner: req.user._id
        });
        return res.status(201).json({
            success: true,
            message: "Board Created Successfully",
            data: board,
        });
    }catch(error){
        console.error("Create Board Error:",error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            errors: [],
        });

    }
    
};

export const getBoards = async(req,res) =>{
    try{
        const boards = await getBoardsService(req.user._id);
        return res.status(200).json({
            success: true,
            message: "Boards fetched successfuly",
            data: boards,
        });
    }catch(error){
        console.error("Get Boards Error",error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            errors: [],
        });
    }
};

export const getBoardById = async (req,res) =>{
    try{
        const {id} = req.params;

        const board = await getBoardByIdService(
            id,
            req.user._id
        );
        if(!board){
            return res.status(404).json({
                success: false,
                message: "Board not found",
                errors: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: "Board fetched successfully",
            data: board
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Sevrer Error",
            errors: []
        });
    }
};

export const updateBoard = async (req, res) =>{
    try{
        const {id} = req.params;

        const board = await updateBoardService(
            id,
            req.user._id,
            req.body
        );
        if(!board){
            return res.status(404).json({
                success: false,
                message: "Board not found",
                errors: [],
            });
        }
        return res.status(200).json({
            success: true,
            message: "Board Updated Successfully",
            data: board,
        });
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            errors: [],
        });

    }
};

export const deleteBoard = async(req,res)=>{
    try{
        const {id} = req.params;
        
        const board = await deleteBoardService(
            id,
            req.user._id
        );
        if(!board){
            return res.status(404).json({
                success:false,
                message: "Board not found",
                errors: [],
            });

        }
        return res.status(200).json({
            success: true,
            message: "Board deleted Successfully",
            data: {},
        });
    }catch(error){
        console.error("Delete Board Error:",error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            errors: [],
        });
    }
};
