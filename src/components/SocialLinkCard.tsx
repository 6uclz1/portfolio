import { Github, Twitter, ExternalLink, Layout } from 'lucide-react';

interface SocialLinkCardProps {
  platform: string;
  username: string;
  url: string;
}

const SocialLinkCard = ({
  platform,
  url,
}: SocialLinkCardProps) => {
  const getPlatformIcon = () => {
    switch (platform) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      default:
        return <Layout className="w-4 h-4" />;
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-white bg-opacity-60 hover:bg-opacity-90 rounded-md shadow border overflow-hidden transform transition-all duration-500 hover:shadow-md`}
    >
      <div className="px-8 py-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-gray-600">{getPlatformIcon()}</div>
            <div>
              <h3 className="font-medium text-base text-gray-600">{platform}</h3>
            </div>
          </div>
        </div>
        <div className='my-2'></div>
        <div className="flex items-center text-sm font-medium ">
          <ExternalLink className="w-4 h-4 mr-2" color="gray" />
          <span className="truncate text-gray-500">{url}</span>
        </div>
      </div>
    </a>
  );
};

export default SocialLinkCard;
