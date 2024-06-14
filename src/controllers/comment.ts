import { Comment } from "../models/comment";
import { Portfolio } from "../models/portfolio";
import { User } from "../models/user";
import { Request, Response } from "express";

export const writeComment = async (req: Request, res: Response) => {
  const { description, dummyUserId, dummyPortfolioId } = req.body;

  // 더미 값
  // const dummyUserId = 1;
  // const dummyPortfolioId = 2;

  try {
    // 더미 포트폴리오와 유저가 실제로 존재하는지 확인 (테스트 데이터)
    const user = await User.findByPk(dummyUserId);
    const portfolio = await Portfolio.findByPk(dummyPortfolioId);

    if (!user || !portfolio) {
      return res.status(404).json({ message: "해당 포트폴리오나 유저가 없습니다." });
    }

    const newComment = await Comment.create({
      portfolio_id: dummyPortfolioId,
      user_id: dummyUserId,
      description: description,
      create_dt: new Date(),
    });

    res.status(201).json({ message: "댓글 작성 완료", newComment });
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Comment 읽기 API
export const readComment = async (req: Request, res: Response) =>{
      const { portfolio_id } = req.params;

      try {
        const portfolio = await Portfolio.findByPk(portfolio_id);
        if (!portfolio) {
          return res.status(404).json({ message: "Portfolio not found" });
        }

        const comments = await Comment.findAll({
          where: { portfolio_id },
          include: [
            {
              model: User,
              attributes: ["username"], // 가져올 사용자 정보
            },
          ],
          attributes: ["description", "create_dt"], // 가져올 댓글 정보
        });

        const formattedComments = comments.map((comment) => ({
          author: comment.user.username,
          description: comment.description,
          create_dt: comment.create_dt,
        }));

        res.status(200).json({ comments: formattedComments });
      } catch (error) {
        console.error("Error reading comments:", error);
        res.status(500).json({ message: "Server error", error });
      }
    };


// Comment 삭제 API
export const deleteComment =  async (req: Request, res: Response) => {
  const { comment_id } = req.params;

  try {
    const comment = await Comment.findByPk(comment_id);
    if (!comment) {
      return res.status(404).json({ message: "댓글이 존재하지 않습니다." });
    }

    await comment.destroy();
    res.status(200).json({ message: "댓글이 삭제되었습니다." });
  } catch (error) {
    console.error("에러발생:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Comment 업데이트 API
export const updateComment = async (req: Request, res: Response) => {
  const { comment_id } = req.params;
  const { description } = req.body;

  try {
    const comment = await Comment.findByPk(comment_id);
    if (!comment) {
      return res.status(404).json({ message: "댓글이 존재하지 않습니다." });
    }

    // 업데이트 할 데이터 설정
    comment.description = description;
    comment.update_dt = new Date();
    comment.is_update = true;

    await comment.save();
    res.status(200).json({ message: "댓글이 업데이트되었습니다.", comment });
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(500).json({ message: "Server error", error });
  }
};