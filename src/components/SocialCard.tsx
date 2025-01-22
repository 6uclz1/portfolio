
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';

interface SocialCardProps {
  username: string;
  userImage: string;
  postImage: string;
  caption: string;
  tags: string[];
  likes: number;
  comments: number;
  posted: string;
}

const SocialCard = ({
  username,
  userImage,
  postImage,
  caption,
  tags,
  likes,
  comments,
  posted
}: SocialCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* ユーザーヘッダー */}
      <div className="flex items-center p-4">
        <img
          src={userImage}
          alt={username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h3 className="font-medium text-gray-800">{username}</h3>
          <p className="text-sm text-gray-500">{posted}</p>
        </div>
      </div>

      {/* メイン画像 */}
      <div className="relative aspect-square">
        <img
          src={postImage}
          alt="Project preview"
          className="w-full h-full object-cover"
        />
      </div>

      {/* アクションボタン */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button className="hover:text-red-500 transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button className="hover:text-blue-500 transition-colors">
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="hover:text-green-500 transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
          <button className="hover:text-yellow-500 transition-colors">
            <Bookmark className="w-6 h-6" />
          </button>
        </div>

        {/* いいね数 */}
        <p className="font-medium text-sm mb-2">{likes.toLocaleString()} likes</p>

        {/* キャプション */}
        <div className="mb-2">
          <span className="font-medium mr-2">{username}</span>
          <span className="text-gray-800">{caption}</span>
        </div>

        {/* タグ */}
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-blue-600 text-sm hover:underline cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* コメント数 */}
        <button className="text-gray-500 text-sm">
          View all {comments} comments
        </button>
      </div>
    </div>
  );
};

export default SocialCard;
