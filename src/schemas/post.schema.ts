import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true, minlength: 4 })
  title: string;

  @Prop({ required: true, minlength: 50 })
  content: string;

  @Prop({ required: true, maxlength: 30 })
  slug: string;

  @Prop({ default: 0 })
  likes?: number;

  @Prop({ default: 0 })
  views?: number;

  @Prop({ default: Date.now })
  readonly createdAt?: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
