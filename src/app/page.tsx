import NeuralNetwork from '@/components/NeuralNetwork';
import SocialLinkCard from '@/components/SocialLinkCard';
import { Square } from 'lucide-react';

export default function Home() {
  const socialLinks = [
    {
      platform: 'github',
      username: '@6uclz1',
      url: 'https://github.com/6uclz1',
    },
    {
      platform: 'twitter',
      username: '@6uclz1',
      url: 'https://twitter.com/6uclz1',
    },
    {
      platform: 'hatena',
      username: '6uclz1',
      url: 'http://6uclz1.hatenablog.com',
    },
    {
      platform: 'note',
      username: '6uclz1',
      url: 'https://note.com/6uclz1',
    },
    {
      platform: 'sizu.me',
      username: '6uclz1',
      url: 'https://sizu.me/6uclz1',
    },
    {
      platform: 'qiita',
      username: 'Portfolio Site',
      url: 'https://qiita.com/6uclz1',
    },
    {
      platform: 'soundcloud',
      username: '6uclz1',
      url: 'https://soundcloud.com/6uclz1',
    },
    {
      platform: 'zenn',
      username: '6uclz1',
      url: 'https://zenn.dev/6uclz1',
    },
    {
      platform: 'book history',
      username: '6uclz1',
      url: 'https://github.com/6uclz1/book-read-history',
    }
  ] as const;

  return (
    <div className="h-screen">
      <NeuralNetwork />
      <header className="flex sticky w-full border-b-[1px] shadow-sm bg-opacity-60 bg-white">
        <div className="flex text-sm font-medium mx-[2vw] px-8 py-4">
          <Square className="w-3 h-3" color="#bbb" strokeWidth={'2px'} />
          <div className='px-1.5'></div>
          <div className='text-sm text-gray-400 gap-6 max-w-6xl'>
            6uclz1&apos;s profile page
          </div>
        </div>
      </header>
      <main className="flex container mx-auto my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {socialLinks.map((link, index) => (
            <SocialLinkCard
              key={index}
              {...link}
            />
          ))}
        </div>
      </main>
      <footer className="flex items-center justify-center sticky w-full top-[100vh] border-t-[1px] bg-opacity-60 bg-white">
        <div className='text-sm text-gray-400 p-4'>
          Create by @6uclz1.
        </div>
      </footer>
    </div>
  );
}