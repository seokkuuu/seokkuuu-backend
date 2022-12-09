import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto): Promise<PostDocument> {
    return await this.postModel.create(createPostDto);
  }

  async findAll(): Promise<PostDocument[]> {
    return await this.postModel.find();
  }

  async findOne(id: string): Promise<PostDocument> {
    await this.addViewToPost(id);

    return await this.postModel.findById(id);
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostDocument> {
    const post = await this.postModel.findByIdAndUpdate(id, updatePostDto);

    return post;
  }

  async remove(id: string): Promise<void> {
    await this.postModel.findByIdAndDelete(id);
  }

  async addLike(id: string): Promise<void> {
    await this.postModel.findByIdAndUpdate(id, {
      $inc: {
        likes: 1,
      },
    });
  }

  private async addViewToPost(id: string): Promise<void> {
    await this.postModel.findByIdAndUpdate(id, {
      $inc: {
        views: 1,
      },
    });
  }
}
