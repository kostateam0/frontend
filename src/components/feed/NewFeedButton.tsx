import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { NewFeed } from './NewFeed';
import { useUserStore } from '@/store/userStore';

export function NewFeedButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useUserStore();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {!isLoggedIn && (
        <Button
          variant='outline'
          className='h-12 w-full bg-[#4a6741] dark:bg-[#4a6741]'
        >
          <Pencil className='mr-2 h-4 w-4' />
          로그인이 필요합니다.
        </Button>
      )}
      {isLoggedIn && (
        <Button
          variant='outline'
          className='h-12 w-full bg-[#4a6741] dark:bg-[#4a6741]'
          onClick={handleOpen}
        >
          <Pencil className='mr-2 h-4 w-4' />새 게시물 작성
        </Button>
      )}

      <NewFeed isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
